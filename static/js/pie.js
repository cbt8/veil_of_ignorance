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

// our trace is enclosed within an Array because you will later see that we can have multiple traces for a plot.
var data = [trace1];

// layout is optional, but contains chart title, axis information, and any other custom layout behavior

var layout = {
  title: "% of people in working age population",
  height: 500,
  width: 500
};

// the first argument below ("plot") refers to the id of the div where the play will be displayed
// the second argument refers to our trace
// the third argument is optional. It refers to the chart's layout details.
Plotly.newPlot("pie1", data, layout);
Plotly.newPlot("pie2", data, layout);
Plotly.newPlot("pie3", data, layout);

