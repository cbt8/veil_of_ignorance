// in Plotly, trace refers to an object that contains 1) data to be plotted, and 2) specifications for plotting.
var trace1 = {
    labels: ["under 18 years", "18-65 years", "65 years and over"],
    values: [23.3,79.8,17.1],
    type: "pie"
  };
  
  // our trace is enclosed within an Array because you will later see that we can have multiple traces for a plot.
  var data = [trace1];
  
  // layout is optional, but contains chart title, axis information, and any other custom layout behavior
  
  var layout = {
    title: "% of people in workforce"
  };
  
  // the first argument below ("plot") refers to the id of the div where the play will be displayed
  // the second argument refers to our trace
  // the third argument is optional. It refers to the chart's layout details.
  Plotly.newPlot("plot", data, layout);
  
  
  