var url = "api/veilofignorance";
<<<<<<< HEAD
///////////////////first function
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
  var state_name = state_data[0]["State"]
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
      'black'
      ]}
   };

   var data = [trace1];
   var layout = {
    title: `Working age population for ${state_name}`,
    height: 400,
    width: 400,
    showlegend: false
   };

   Plotly.newPlot("pie1", data, layout);
   //Plotly.newPlot("pie2", data, layout);
   Plotly.newPlot("pie3", data, layout);
  }
    
   )}; 
  
  working_population(42);

////////////////second function
function ethnicity (stateid) {
    d3.json(url, function(error, response)
     {
      if (error) throw error;
    console.log(response);
    //gets the data for that state
    var state_data = response.filter(row => row.StateID== stateid)
    //console.log(state_data)
    var white_alone = parseFloat(state_data[0]["White alone, percent"])
    var black_alone = parseFloat(state_data[0]["Black or African American alone, percent(a)"])
    //var american_indian_alone = parseFloat(state_data[0]["American Indian and Alaska Native alone, percent(a)"])
    var asian_alone = parseFloat(state_data[0]["Asian alone, percent(a)"])
    //var hawaiian_alone = parseFloat(state_data[0]["Native Hawaiian and Other Pacific Islander alone, percent(a)"])
    var two_or_more = parseFloat(state_data[0]["Two or More Races, percent"])
    var hispanic = parseFloat(state_data[0]["Hispanic or Latino, percent(b)"])
    //var white_not_hispanic = parseFloat(state_data[0]["White alone, not Hispanic or Latino, percent"])
    //var other = american_indian_alone + hawaiian_alone
    var state_name = state_data[0]["State"]

    //gets the data for total US
    var us_data = response.filter(row => row.StateID== '100')
    var white_aloneUs = parseFloat(us_data[0]["White alone, percent"])
    var black_aloneUs = parseFloat(us_data[0]["Black or African American alone, percent(a)"])
    var asian_aloneUs = parseFloat(us_data[0]["Asian alone, percent(a)"])
    var two_or_moreUs = parseFloat(us_data[0]["Two or More Races, percent"])
    var hispanicUs = parseFloat(us_data[0]["Hispanic or Latino, percent(b)"])
    //var otherUs =  parseFloat(us_data[0]["American Indian and Alaska Native alone, percent(a)"])+parseFloat(us_data[0]["Native Hawaiian and Other Pacific Islander alone, percent(a)"])

    //bar chart
    var state_trace2 = {
      x: ["White", "Black/African American", "Asian", "Hispanic/Latino", "2 or more races"],
      y: [white_alone, black_alone, asian_alone, hispanic, two_or_more],
      type: "bar",
      marker:{
      color: [
        'purple',
        'purple',
        'purple',
        'purple',
        'purple',
        'purple'
        ]},
      name: state_name
     };

     var us_trace2 = {
      x: ["White", "Black/African American", "Asian", "Hispanic/Latino", "2 or more races"],
      y: [white_aloneUs, black_aloneUs, asian_aloneUs, hispanicUs, two_or_moreUs],
      type: "bar",
      marker:{
      color: [
        'orange',
        'orange',
        'orange',
        'orange',
        'orange',
        'orange'
        ]},
        name: 'Total US'
     };

     
     var data2 = [state_trace2, us_trace2];
     var layout2 = {
      title: `Ethnicity breakdown for ${state_name}`,
      barmode:'group',
      height: 400,
      width: 500,
      showlegend: false,

     };
  
  
  //Plotly.newPlot("pie1", data, layout);
  Plotly.newPlot("bar1", data2, layout2);
  //Plotly.newPlot("pie3", data, layout);
  
    }
     )}; 

////////////////third function
function education (stateid) {
  d3.json(url, function(error, response)
   {
    if (error) throw error;
  console.log(response);
  //gets the data for that state
  var state_data = response.filter(row => row.StateID== stateid)
  //console.log(state_data)
  var highschool = parseFloat(state_data[0]["High school graduate or higher, percent of persons age 25 years+, 2013-2017"])
  var bachelor = parseFloat(state_data[0]["Bachelor's degree or higher, percent of persons age 25 years+, 2013-2017"])
  var state_name = state_data[0]["State"]

  //gets the data for total US
  var us_data = response.filter(row => row.StateID== '100')
  var highschoolUs = parseFloat(us_data[0]["High school graduate or higher, percent of persons age 25 years+, 2013-2017"])
  var bachelorUs = parseFloat(us_data[0]["Bachelor's degree or higher, percent of persons age 25 years+, 2013-2017"])
  
  //bar chart
  var state_trace3 = {
    x: ["High school degree", "Bachelor's degree"],
    y: [highschool, bachelor],
    //orientation: 'h',
    type: "bar",
    marker:{
    color: [
      'black',
      'black'
      ]},
    name: state_name
   };

   var us_trace3 = {
    x: ["High school degree", "Bachelor's degree"],
    y: [highschoolUs, bachelorUs],
    //orientation: 'h',
    type: "bar",
    marker:{
    color: [
      'purple',
      'purple'
      ]},
      name: 'Total US'
   };

   var data3 = [state_trace3, us_trace3];
   var layout3 = {
    title: `Minimum education breakdown for ${state_name}`,
    barmode:'group',
    height: 400,
    width: 400,
    showlegend: false,
    xaxis: {automargin:true},
    yxis: {automargin:true}
   };


//Plotly.newPlot("pie1", data, layout);
//Plotly.newPlot("bar1", data2, layout2);
Plotly.newPlot("bar2", data3, layout3);

  }
   )}; 




    working_population(42);
    ethnicity(42);
    education(42);
=======

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
   height: 500,
   width: 500
  };


Plotly.newPlot("pie1", data, layout);
Plotly.newPlot("pie2", data, layout);
Plotly.newPlot("pie3", data, layout);

 }

  )};



 working_population(42);
>>>>>>> a80ee3f9c8936728a85d8dcdaae77df9dfdd46b6
