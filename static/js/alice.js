var url = "api/veilofignorance";

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

   Plotly.newPlot("pie", data, layout);
   //Plotly.newPlot("pie2", data, layout);
   //Plotly.newPlot("pie3", data, layout);
  

  }
    
   )}; 
  
  working_population(42);
