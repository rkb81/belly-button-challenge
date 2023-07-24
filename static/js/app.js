// Get the JSON data URL
const bio_samples = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Function to update the metadata
function updateMetadata(sampleId) {
  // Fetch the JSON data
  d3.json(bio_samples).then(function(data) {
    // Find the metadata for the selected sampleId
    const metadata = data.metadata.find(item => item.id === parseInt(sampleId));

    // Get the container div for metadata
    const metadataContainer = document.getElementById("sample-metadata");

    // Clear the existing content
    metadataContainer.innerHTML = '';

    // Create a new <ul> element
    const metadataList = document.createElement("ul");

    // Iterate through the metadata object and create <li> elements for each key-value pair
    for (const [key, value] of Object.entries(metadata)) {
      // Create a new <li> element
      const listItem = document.createElement("li");

      // Set the inner HTML of the <li> to display the key and value
      listItem.innerHTML = `<strong>${key}:</strong> ${value}`;

      // Append the <li> element to the <ul> element
      metadataList.appendChild(listItem);
    }

    // Append the <ul> element to the container div
    metadataContainer.appendChild(metadataList);
  });
}

// Function to handle the dropdown change event
function optionChanged(sampleId) {
  // Call the function to update the metadata, bar chart, and bubble chart with the selected sampleId
  updateMetadata(sampleId);
  updateBarChart(sampleId);
  updateBubbleChart(sampleId);
  updateGaugeChart(sampleId); // Call the 'updateGaugeChart' function
}

// Function to populate the dropdown options with sample names
function populateDropdown(data) {
  // Get the dropdown select element
  const selectDropdown = document.getElementById("selDataset");

  // Populate the dropdown options with sample names and add event listener
  data.names.forEach(sampleId => {
    const option = document.createElement("option");
    option.value = sampleId;
    option.textContent = sampleId;
    selectDropdown.appendChild(option);
  });

  // Add event listener to the dropdown to handle changes
  selectDropdown.addEventListener("change", function() {
    optionChanged(this.value);
  });

  // Update the metadata, bar chart, and bubble chart with the first sampleId initially
  const initialSampleId = data.names[0];
  optionChanged(initialSampleId);
}

// Function to update the bar chart
function updateBarChart(sampleId) {
  // Fetch the JSON data
  d3.json(bio_samples).then(function(data) {
    // Find the sample data for the selected sampleId
    const sampleData = data.samples.find(item => item.id === sampleId);

    // Sort the data by sample_values in descending order and take the top 10
    const sortedData = sampleData.sample_values.slice(0, 10).reverse();
    const sortedOtuIds = sampleData.otu_ids.slice(0, 10).reverse();
    const sortedOtuLabels = sampleData.otu_labels.slice(0, 10).reverse();

    // Create the trace for the horizontal bar chart
    const trace = {
      x: sortedData,
      y: sortedOtuIds.map(otuId => `OTU ${otuId}`),
      text: sortedOtuLabels,
      type: 'bar',
      orientation: 'h',
      marker: {
        color: 'green', // Set the color to green for all bars
      },
    };

    // Create the data array
    const plotData = [trace];

    // Create the layout
    const layout = {
      title: `<b>Top 10 OTUs for Sample ${sampleId}<b>`,
      xaxis: { title: 'Sample Values' },
      yaxis: { tickfont: { size: 12 } },
    };

    // Plot the chart in the 'bar' div
    Plotly.newPlot('bar', plotData, layout);
  });
}

// Function to update the bubble chart
function updateBubbleChart(sampleId) {
  // Fetch the JSON data
  d3.json(bio_samples).then(function(data) {
    // Find the sample data for the selected sampleId
    const sampleData = data.samples.find(item => item.id === sampleId);

    // Extract data for bubble chart
    const xValues = sampleData.otu_ids;
    const yValues = sampleData.sample_values;
    const markerSizes = sampleData.sample_values;
    const markerColors = sampleData.otu_ids;
    const textValues = sampleData.otu_labels;

    // Create the trace for the bubble chart
    const trace = {
      x: xValues,
      y: yValues,
      text: textValues,
      mode: 'markers',
      marker: {
        size: markerSizes,
        color: markerColors,
        colorscale: 'Viridis' // Colorscale of preference
      }
    };

    // Create the data array
    const plotData = [trace];

    // Create the layout
    const layout = {
      title: `<b>Bubble Chart for Sample ${sampleId}<b>`,
      xaxis: { title: 'OTU IDs' },
      yaxis: { title: 'Sample Values' }
    };

    // Plot the chart in the 'bubble' div
    Plotly.newPlot('bubble', plotData, layout);
  });
}

// Fetch the JSON data and start the application
d3.json(bio_samples).then(function(data) {
  // Populate the dropdown options with sample names and add event listener
  populateDropdown(data);
});


