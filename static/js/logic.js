var svg = d3.select("svg");
        
var path = d3.geoPath();

var states = ['AR', 'CA', 'IL', 'KS', 'MS', 'OH', 'TX', 'AL', 'IA', 'LA', 'MN', 'MO', 'NE', 'AZ', 
              'CO', 'IN', 'MI', 'MT', 'NY', 'OR', 'VA', 'WY', 'NC', 'OK', 'TN', 'WI', 'AK', 'VT',
              'ND', 'GA', 'ME', 'RI', 'WV', 'ID', 'SD', 'NM', 'WA', 'PA', 'FL', 'UT', 'KY', 'NH', 
              'SC', 'NV', 'HI', 'NJ', 'CT', 'MD', 'MA', 'DE', 'DC']
var stateID = {05:'AR', 06:'CA', 17:'IL', 20:'KS', 28:'MS', 39:'OH', 48:'TX', 01:'AL', 19:'IA', 22:'LA',
 27:'MN', 29:'MO', 31:'NE', 04:'AZ', 08:'CO', 18:'IN', 26:'MI', 30:'MT', 36:'NY', 41:'OR', 51:'VA', 56:'WY', 
 37:'NC', 40:'OK', 47:'TN', 55:'WI', 02:'AK', 50:'VT', 38:'ND', 13:'GA', 23:'ME', 44:'RI', 54:'WV', 16:'ID',
 46:'SD', 35:'NM', 53:'WA', 42:'PA', 12:'FL', 49:'UT', 21:'KY', 33:'NH', 45:'SC', 32:'NV', 15:'HI', 34:'NJ',
 09:'CT', 24:'MD', 25:'MA', 10:'DE', 11:'DC'}

var url = "https://d3js.org/us-10m.v1.json"


d3.json(url, function(error, us) {
  if (error) throw error;

var stateObject = topojson.feature(us, us.objects.states).features

  svg.append("g")
    .attr("class", "states")
    .selectAll("path")
    .data(stateObject)
    .enter().append("path")
      .attr("d", path)
      // d.id will be used to identify which database we are pulling from
      .on("click", function(d){
        // setStatistics('');
        working_population(d.id);
        ethnicity(d.id);
        education(d.id);
        rent(d.id);
        d3.select("#BulleT_horizontal").html('');
        bulletdata(d.id);
      })

  svg.append("path")
      .attr("class", "state-borders")
      .attr("d", path(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; })))
});

//var dataURL = window.location.href + "api/veilofignorance"

// d3.json(dataURL, function(error, data) {
//   if (error) throw error;

//   console.log(data)

// });