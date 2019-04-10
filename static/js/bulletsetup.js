var url = "api/veilofignorance";

// bulletdata(42);

function bulletdata (stateid) {
  d3.json(url, function(error, response)
{
  if (error) throw error;
  var state_data = response.filter(row => row.StateID== stateid)
  var povertyState = parseFloat(state_data[0]["Persons in poverty, percent"])
  var incomeState = parseFloat(state_data[0]["Median household income (in 2017 dollars), 2013-2017"].replace(/\$|,/g, ''))/1000
  var commuteState = parseFloat(state_data[0]["Mean travel time to work (minutes), workers age 16 years+, 2013-2017"])

  //console.log(incomeState)
  //console.log(povertyState)
  var us_data = response.filter(row => row.StateID== '100')
  var povertyUs = parseFloat(us_data[0]["Persons in poverty, percent"])
  var incomeUs = parseFloat(us_data[0]["Median household income (in 2017 dollars), 2013-2017"].replace(/\$|,/g, ''))/1000
  var commuteUs = parseFloat(us_data[0]["Mean travel time to work (minutes), workers age 16 years+, 2013-2017"])

  var data = 
  [
    {
      "title":"Poverty Rate  ",
      "subtitle":"(%)",
      "ranges":[0,10.9,13.0,14.8,22],
      "measures": [povertyState],
      "markers": [povertyUs]
    },
    {
      "title":"HHold Income",
      "subtitle":"($000s)",
      "ranges":[0,50.9, 56.6, 65.3, 78.9],
      "measures": [incomeState],
      "markers": [incomeUs]
    },
    {
      "title":"Commute",
      "subtitle":"(minutes)",
      "ranges":[0,21,24,27,35],
      "measures": [commuteState],
      "markers": [commuteUs]
    },
  ]

///// bullet data appended
var Width = 300, Height = 70;


  var margin = {top: 0, right: 20, bottom: 0, left: 80},
  width = Width - margin.left - margin.right,
  height = Height - margin.top - margin.bottom;
  
  var chart = d3.bulleT()
  .width(width)
  .height(height);

function bulleT(whichData,whereToPut,direction) {
  var a=window.Width, b=window.Height;
  if( direction == "vertical"){
    Height=a;Width=b+10;
    vertical = true;
  }else{
    Height=a;Width=b;
    vertical = false;
  }
   
  var svg = d3.select(whereToPut).selectAll("svg")
      .data(whichData)
    .enter().append("svg")
      .attr("class", "bulleT")
      .attr("width", Width)
      .attr("height", Height)
    .append("g")
      .attr("transform", function(){
        if( direction == "vertical"){
          return "rotate(-90)translate("+ -(Height-margin.left) +",10)";
        }else{
          return "translate("+ margin.left +","+ margin.top +")";
        }
      })
      .call(chart.vertical(vertical));

  // var title = svg.append("g")
  //     .style("text-anchor", function(){
  //       if( direction == "vertical"){
  //         return "middle";
  //       }else{
  //         return "end";
  //       }
  //     })
  //     .attr("transform", function(){
  //       if( direction == "vertical"){
  //         return "rotate(90)translate("+ Width/4 +",10)";
  //       }else{
  //         return "translate(0," + height / 3 + ")";
  //       }
  //     });

  var title = svg.append("g")
      .style("text-anchor", "end")
      .attr("transform", "translate(-6," + height / 2 + ")");


  title.append("text")
      .attr("class", "title")
      .text(function(d) { return d.title; });

  title.append("text")
      .attr("dy", "1.2em")
      .text(function(d) { return d.dimension; })

  title.append("text")
      .attr("class",function(d) {
          switch (true)
          {
            case ( (d.markers[1] < 30) || (70 < d.markers[1]) ): 
              return "subtitle s04";
              break;
              break;
            case ( (30 <= d.markers[1]) && (d.markers[1] < 40) ):
              return "subtitle s13";
              break;
            case ( (40 <= d.markers[1]) && (d.markers[1] <= 60) ):
              return "subtitle s2";
              break;
            case ( (60 < d.markers[1]) && (d.markers[1] <= 70) ):
              return "subtitle s13";
              break;
          }
        }
      )
      .attr("dy", "2.4em")
      .text(function(d) { return d.subtitle; });

};

bulleT(data,"#BulleT_vertical","vertical");  // "horizontal" or "vertical"
bulleT(data,"#BulleT_horizontal","horizontal");
  
})
};