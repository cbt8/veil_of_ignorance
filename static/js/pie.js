var url = "api/veilofignorance";
//working_population(48);
//ethnicity(48);
//education(48);

function working_population(stateid) {
  var pieFunc;
  d3.json(url, function (error, response) {
    if (error) throw error;
    var state_data = response.filter(row => row.StateID == stateid)
    var person_under_18 = parseFloat(state_data[0]["Persons under 18 years, percent"])
    var person_over_65 = parseFloat(state_data[0]["Persons 65 years and over, percent"])
    var person_working = 100 - (parseFloat(person_under_18, 10) + parseFloat(person_over_65, 10))
    var ageValues = [person_under_18, person_working, person_over_65]
    var ageTitles = ["Younger than 18", "Working age (18-65)", "Older than 65"];
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
  
  if (!ageValues) {
      ageValues = [1];
  }
  
      ageValues.forEach( percent => {
          percentage = Math.floor(percent);
          for (i = 0; i < percentage; i++) {
              statList.push(selector);
          }
          selector++;
      });
          x = Math.floor(Math.random() * 100);
          return statList[x];
      
    }
    d3.select("#age").text(`${ageTitles[selectStat(ageValues)]}`);
    d3.select("#gender").text(`${["Female", "Male"][selectStat([50, 50])]}`);

  })

}

function ethnicity (stateid) {
  d3.json(url, function(error, response)
   {
    if (error) throw error;
  //gets the data for that state
  var state_data = response.filter(row => row.StateID== stateid)
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
  var ethnicityTitles = ["White", "Black", "Asian", "Hispanic", "Two or More Races"];
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

if (!ethnicityValues) {
  ethnicityValues = [1];
}

  ethnicityValues.forEach( percent => {
      integer = Math.floor(percent);
      for (i = 0; i < integer; i++) {
          statList.push(selector);
      }
      selector++;
  });
      x = Math.floor(Math.random() * 100);
      return statList[x];

}
    d3.select("#ethnicity").text(`${ethnicityTitles[selectStat(ethnicityValues)]}`);

})};

function education (stateid) {
  d3.json(url, function(error, response)
   {
    if (error) throw error;
  //gets the data for that state
  var state_data = response.filter(row => row.StateID== stateid)
  var highschool = parseFloat(state_data[0]["High school graduate or higher, percent of persons age 25 years+, 2013-2017"])
  var bachelor = parseFloat(state_data[0]["Bachelor's degree or higher, percent of persons age 25 years+, 2013-2017"])
  var state_name = state_data[0]["State"]
  //gets the data for total US
  var us_data = response.filter(row => row.StateID== '100')
  var highschoolUs = parseFloat(us_data[0]["High school graduate or higher, percent of persons age 25 years+, 2013-2017"])
  var bachelorUs = parseFloat(us_data[0]["Bachelor's degree or higher, percent of persons age 25 years+, 2013-2017"])
  var educationValues = [highschool, bachelor]
  var educationTitles = ["High School Diploma", "Bachelor's"]
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

if (!educationValues) {
  educationValues = [1];
}

  educationValues.forEach( percent => {
      percentage = Math.floor(percent);
      for (i = 0; i < percentage; i++) {
          statList.push(selector);
      }
      selector++;
  });
      x = Math.floor(Math.random() * 100);
      return statList[x]; 

}
    d3.select("#education").text(`${educationTitles[selectStat(educationValues)]}`);
  }
   )};

     function rent(stateid) {
       d3.json(url, function (error, response) {
           if (error) throw error;
       var state_data = response.filter(row => row.StateID== stateid)
       var state_name = state_data[0]["State"] 
       var us_data = response.filter(row => row.StateID== '100')
       var state_burden = (parseFloat(state_data[0]["Median gross rent, 2013-2017"].replace(/\$|,/g, '')))/(parseFloat(state_data[0]["Median household income (in 2017 dollars), 2013-2017"].replace(/\$|,/g, ''))/12)*100
       //console.log(state_burden)
       var us_burden = (parseFloat(us_data[0]["Median gross rent, 2013-2017"].replace(/\$|,/g, '')))/(parseFloat(us_data[0]["Median household income (in 2017 dollars), 2013-2017"].replace(/\$|,/g, ''))/12)*100
       var ctx = document.getElementById('myChart').getContext('2d');
       var chart = new Chart(ctx, {
           type: 'polarArea',
           // The data for our dataset
           data: {
               labels: [state_name, 'US'],
               datasets: [{
                   label: "Rent burden",
                   //backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
                   borderColor:["purple", "orange"],
                   data: [state_burden, us_burden]
               }]
           },
           options: {
             title: {
            display: true,
            text: `% of total income spent on rent for ${state_name} `
            
        }     
           }
       })
   })
   };

      //////// polar chart

   //gender(42);
   
  //  function gender(stateid) {
  //      d3.json(url, function (error, response) {
  //          if (error) throw error;
  //      var state_data = response.filter(row => row.StateID== stateid)
  //      var state_name = state_data[0]["State"] 
  //      var male = 100-(parseFloat(state_data[0]["Female persons, percent"]))
  //      var female = (parseFloat(state_data[0]["Female persons, percent"]))
  //      var ctx = document.getElementById('myChart').getContext('2d');
  //      var chart = new Chart(ctx, {
  //          type: 'polarArea',
  //          // The data for our dataset
  //          data: {
  //              labels: ['Male','Female'],
  //              datasets: [{
  //                  label: `Gender breakdown for ${state_name}`,
  //                  //backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
  //                  borderColor:["purple", "orange"],
  //                  data: [male, female]
  //              }]
  //          },
  //          options: {}
  //      })
  //  })
  //  };
      //rent (42)