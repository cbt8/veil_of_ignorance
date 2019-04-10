var url = "api/veilofignorance";

gender(42);

function gender(stateid) {
    d3.json(url, function (error, response) {
        if (error) throw error;
        var state_data = response.filter(row => row.StateID == stateid)
        var person_under_18 = parseFloat(state_data[0]["Persons under 18 years, percent"])
        var person_over_65 = parseFloat(state_data[0]["Persons 65 years and over, percent"])
        var person_working = 100 - (parseFloat(person_under_18, 10) + parseFloat(person_over_65, 10))
        var ageValues = [person_under_18, person_working, person_over_65]
        var ageTitles = ["Younger than 18", "Working age (18-65)", "Older than 65"];
        var state_name = state_data[0]["State"]

    var male = 1-(parseFloat(state_data[0]["Female persons, percent"]))
    var female = (parseFloat(state_data[0]["Female persons, percent"]))
    var ctx = document.getElementById('myChart').getContext('2d');
    var chart = new Chart(ctx, {
        type: 'polarArea',
        // The data for our dataset
        data: {
            labels: ['Male','Female'],
            datasets: [{
                label: 'My First dataset',
                backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
                borderColor:["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
                data: [male, female]
            }]
        },
        options: {}
    })
})
};

// function gender(stateid) {
//     var pieFunc;
    
//     d3.json(url, function (error, response) {
//       if (error) throw error;
//       var state_data = response.filter(row => row.StateID == stateid)
//       var person_under_18 = parseFloat(state_data[0]["Persons under 18 years, percent"])
//       var person_over_65 = parseFloat(state_data[0]["Persons 65 years and over, percent"])
//       var person_working = 100 - (parseFloat(person_under_18, 10) + parseFloat(person_over_65, 10))
//       var ageValues = [person_under_18, person_working, person_over_65]
//       var ageTitles = ["Younger than 18", "Working age (18-65)", "Older than 65"];
//       var state_name = state_data[0]["State"]
//       //pie chart
//       var ctx = document.getElementById('myChart').getContext('2d');
//       var chart = new Chart(ctx, {
//           type: 'polarArea',


//       var trace1 = {
//         labels: ["under 18 years", "working age population", "65 years and over"],
//         orientation: 'h',
//         showlegend: true,
//         legend: {
//           x: 1,
//           y: 1
//         },
//         values: ageValues,
//         type: "pie",
//         marker: {
//           colors: [
//             'orange',
//             'purple',
//             'red',
//             'blue',
//             'green'
//           ]
//         }
//       };
  
//       var data = [trace1];
//       var layout = {
//         title: `% of people in working age population for ${state_name}`,
//         height: 500,
//         width: 500
//       };
  
  
//       Plotly.newPlot("pie1", data, layout);