var url = "api/veilofignorance";
//working_population(48);
//ethnicity(48);
//education(48);

function working_population(stateid) {
  var pieFunc;
  d3.json(url, function (error, response) {
    if (error) throw error;
    //  console.log(response);
    var state_data = response.filter(row => row.StateID == stateid)
    //console.log(state_data)
    var person_under_18 = parseFloat(state_data[0]["Persons under 18 years, percent"])
    //  console.log(person_under_18)
    var person_over_65 = parseFloat(state_data[0]["Persons 65 years and over, percent"])
    //  console.log(person_over_65)
    var person_working = 100 - (parseFloat(person_under_18, 10) + parseFloat(person_over_65, 10))
    //  console.log(person_working)
    var ageValues = [person_under_18, person_working, person_over_65]
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
      values: ageValues,
      type: "pie",
      marker: {
        colors: [
          'orange',
          'purple',
          'red',
          'blue',
          'green'
        ]
      }
    };

    var data = [trace1];
    var layout = {
      title: `% of people in working age population for ${state_name}`,
      height: 500,
      width: 500
    };


    Plotly.newPlot("pie1", data, layout);

    function selectStat(ageValues) {
      /* selectStat takes a list of percentages and 
      will return a random number between 0 and the 
      length of the list. */
  
      statList = [];
      selector = 0;
      // console.log(ageValues)
  
  if (!ageValues) {
      ageValues = [1];
  }
  
      ageValues.forEach( percent => {
          percentage = Math.floor(100 * percent);
          for (i = 0; i < percentage; i++) {
              statList.push(selector);
          }
          selector++;
      });
          // console.log(statList);
          x = Math.floor(Math.random() * 100);
          console.log(`x = ${x}`);
          return statList[x];
      
    }
selectStat(ageValues);

  })

}

function ethnicity (stateid) {
  d3.json(url, function(error, response)
   {
    if (error) throw error;
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
  var ethnicityValues = [white_alone, black_alone, asian_alone, hispanic, two_or_more]
  //var otherUs =  parseFloat(us_data[0]["American Indian and Alaska Native alone, percent(a)"])+parseFloat(us_data[0]["Native Hawaiian and Other Pacific Islander alone, percent(a)"])
  //bar chart
  var state_trace2 = {
    x: ["White", "Black/African American", "Asian", "Hispanic/Latino", "2 or more races"],
    y: ethnicityValues,
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

Plotly.newPlot("bar1", data2, layout2)

function selectStat(ethnicityValues) {
  /* selectStat takes a list of percentages and 
  will return a random number between 0 and the 
  length of the list. */

  statList = [];
  selector = 0;
  // console.log(ethnicityValues)

if (!ethnicityValues) {
  ethnicityValues = [1];
}

  ethnicityValues.forEach( percent => {
      percentage = Math.floor(100 * percent);
      for (i = 0; i < percentage; i++) {
          statList.push(selector);
      }
      selector++;
  });
      // console.log(statList);
      x = Math.floor(Math.random() * 100);
      console.log(`x = ${x}`);
      return statList[x];

}
selectStat(ethnicityValues);

})};

function education (stateid) {
  d3.json(url, function(error, response)
   {
    if (error) throw error;
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
  var educationValues = [highschool, bachelor]
  //bar chart
  var state_trace3 = {
    x: ["High school degree", "Bachelor's degree"],
    y: educationValues,
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

Plotly.newPlot("bar2", data3, layout3);

  function selectStat(educationValues) {
  /* selectStat takes a list of percentages and 
  will return a random number between 0 and the 
  length of the list. */

  statList = [];
  selector = 0;
  // console.log(educationValues)

if (!educationValues) {
  educationValues = [1];
}

  educationValues.forEach( percent => {
      percentage = Math.floor(100 * percent);
      for (i = 0; i < percentage; i++) {
          statList.push(selector);
      }
      selector++;
  });
      // console.log(statList);
      x = Math.floor(Math.random() * 100);
      console.log(`x = ${x}`);
      return statList[x]; 

}
selectStat(educationValues);
  }
   )}; 