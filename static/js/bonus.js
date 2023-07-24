// Function to update the gauge chart
function updateGaugeChart(sampleId) {
    // Fetch the JSON data
    d3.json(bio_samples).then(function(data) {
      // Find the demographic info for the selected sampleId
      const demographicInfo = data.metadata.find(item => item.id === parseInt(sampleId));
  
      // Get the wfreq value for the gauge chart from the demographic info
      const wfreq = demographicInfo ? demographicInfo.wfreq : 0;
  
      // Create the trace for the gauge chart
      const trace = {
        type: "indicator",
        mode: "gauge+number",
        value: wfreq,
        title: { text: `<b>Belly Button Washing Frequency</b><br>Scrubs per Week` },
        gauge: {
          axis: { range: [null, 9], tickwidth: 1, tickcolor: "darkblue" },
          steps: [
            { range: [0, 1], color: "rgba(255, 255, 255, 0)" },
            { range: [1, 2], color: "rgba(232, 226, 202, .5)" },
            { range: [2, 3], color: "rgba(210, 206, 145, .5)" },
            { range: [3, 4], color: "rgba(202, 209, 95, .5)" },
            { range: [4, 5], color: "rgba(170, 202, 42, .5)" },
            { range: [5, 6], color: "rgba(110, 154, 22, .5)" },
            { range: [6, 7], color: "rgba(14, 127, 0, .5)" },
            { range: [7, 8], color: "rgba(10, 106, 0, .5)" },
            { range: [8, 9], color: "rgba(0, 90, 0, .5)" }
          ],
          threshold: {
            line: { color: "red", width: 4 },
            thickness: 0.75,
            value: wfreq || 0  // Use 0 as default value when wfreq is not available
          }
        }
      };
  
      // Create the data array
      const plotData = [trace];
  
      // Create the layout
      const layout = { 
        width: 500, 
        height: 400, 
        margin: { t: 25, r: 25, l: 25, b: 25 },
        paper_bgcolor: "white",
        font: { color: "black", family: "Arial" }
      };
  
      // Plot the chart in the 'gauge' div
      Plotly.newPlot('gauge', plotData, layout);
    });
  }
  