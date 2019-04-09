<<<<<<< HEAD
var url = "api/veilofignorance";
=======
var trace1 = {
  labels: ["under 18 years", "working age population", "65 years and over"],
  orientation: 'h',
  showlegend: true,
  legend: {
    x: 1,
    y: 1
  },
  values: [23.3,59.6,17.1],
  type: "pie",
  marker:{
  colors: [
    'orange',
    'purple',
    'red',
    'blue',
    'green'
    ]}
};
>>>>>>> b29f15e8aa94b84757cf205dee80e3c855e1e520

function working_population (stateid) {
  d3.json(url, function(error, response)
   {
    if (error) throw error;
  console.log(response);
  var state_data = response.filter(row => row.StateID== stateid)
  //console.log(state_data)
  var person_under_18 = parseFloat(state_data[0]["Persons under 18 years, percent"])
  console.log(person_under_18)
  var person_over_65 = parseFloat(state_data[0]["Persons 65 years and over, percent"])
  console.log(person_over_65)
  var person_working = 100-(parseFloat(person_under_18, 10)+parseFloat(person_over_65, 10))
  console.log(person_working)
  //pie chart
  var trace1 = {
    labels: ["under 18 years", "working age population", "65 years and over"],
    orientation: 'h',
    showlegend: true,
    legend: {
      x: 1,
      y: 1
    },
    values: [person_under_18, person_working, person_over_65],
    type: "pie",
    marker:{
    colors: [
      'orange',
      'purple',
      'red',
      'blue',
      'green'
      ]}
   };

   var data = [trace1];
   var layout = {
    title: "% of people in working age population",
    height: 400,
    width: 400
   };

<<<<<<< HEAD
   Plotly.newPlot("pie", data, layout);
   //Plotly.newPlot("pie2", data, layout);
   //Plotly.newPlot("pie3", data, layout);
  
=======
var layout = {
  title: "% of people in working age population",
  height: 400,
  width: 400
};

// the first argument below ("plot") refers to the id of the div where the play will be displayed
// the second argument refers to our trace
// the third argument is optional. It refers to the chart's layout details.
Plotly.newPlot("pie1", data, layout);
Plotly.newPlot("pie2", data, layout);
Plotly.newPlot("pie3", data, layout);
>>>>>>> b29f15e8aa94b84757cf205dee80e3c855e1e520

  }
    
   )}; 
  
  working_population(42);
