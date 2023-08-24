let samplesData;
let metadata;

// Function to load and initialize the data
function init() {
  // Load samples.json using D3
  d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json")
    .then((data) => {
      // Store the samplesData and metadata in variables
      samplesData = data.samples;
      metadata = data.metadata;

      // Extract the necessary data for the dropdown menu
      const names = data.names;

      // Select the dropdown element
      const dropdown = d3.select("#selDataset");

      // Populate the dropdown with individual IDs
      names.forEach(name => {
        dropdown.append("option").text(name).property("value", name);
      });

      // Initialize the chart with the first individual's data
      const firstSample = names[0];
      createCharts(firstSample);
      displayMetadata(firstSample);

      // const firstWashingFrequency= metadata.

      // createGauge(washingFrequency)
    });

}

// Function to update the chart based on the selected individual
function updateData(sample) {
  createCharts(sample);
  displayMetadata(sample);
}

init();

// Function to create the charts
function createCharts(sample) {
  // Filter the data for the selected individual
  const selectedData = samplesData.find(data => data.id == sample);

  // Extract the necessary data for the top 10 OTUs
  const top10SampleValues = selectedData.sample_values.slice(0, 10).reverse();
  const top10OTUIds = selectedData.otu_ids.slice(0, 10).reverse();
  const top10OTULabels = selectedData.otu_labels.slice(0, 10).reverse();

  const trace_bar = [{
    x: top10SampleValues,
    y: top10OTUIds.map(id => `OTU ${id}`),
    type: 'bar',
    orientation: 'h',
    text: top10OTULabels
  }];

  // Extract the necessary data for bubble chart
  const otuIds = selectedData.otu_ids;
  const sampleValues = selectedData.sample_values;
  const otuLabels = selectedData.otu_labels;

  const trace_bubble = [{
    x: otuIds,
    y: sampleValues,
    text: otuLabels,
    mode: 'markers',
    marker: {
      size: sampleValues,
      color: otuIds,
      colorscale: 'Earth'
    }
  }];

  // Define the layout for the chart
  const layout_bar = {
    title: `Top 10 OTUs for Individual ${sample}`,
  };

  const layout_bubble = {
    title: `Bubble Chart for Individual ${sample}`,
    xaxis: { title: 'OTU ID' },
  };

  // Plot the chart using Plotly
  Plotly.newPlot("bar", trace_bar, layout_bar);
  Plotly.newPlot('bubble', trace_bubble, layout_bubble);
}

// Function to display the metadata
function displayMetadata(sample) {
  // Find the metadata for the selected individual
  const selectedMetadata = metadata.find(data => data.id == sample);

  // Select the HTML element where you want to display the metadata
  const metadataDiv = d3.select("#sample-metadata");

  // Clear any previous metadata content
  metadataDiv.html("");

  for (let key in selectedMetadata){
    metadataDiv.append("h6").text(`${key}: ${selectedMetadata[key]}`);
  };

  createGauge(selectedMetadata.wfrq);
}

function createGauge(washingFrequency) {
  // const washingFrequency = metadata.wfreq;

  // Define the Gauge Chart data and layout
  const data = [
    {
      type: "indicator",
      mode: "gauge+number",
      value: washingFrequency,
      title: { text: "Scrubs per Week", font: {size:16}},
      gauge: {
        axis: { range: [0, 9], tickvals: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]},
        bar: {color: 'darkblue'},
        steps: [
          { range: [0, 1], color: "rgba(0, 0, 255, 0.1)" },
          { range: [1, 2], color: "rgba(0, 0, 255, 0.2)" },
          { range: [2, 3], color: "rgba(0, 0, 255, 0.3)" },
          { range: [3, 4], color: "rgba(0, 0, 255, 0.4)" },
          { range: [4, 5], color: "rgba(0, 0, 255, 0.5)" },
          { range: [5, 6], color: "rgba(0, 0, 255, 0.6)" },
          { range: [6, 7], color: "rgba(0, 0, 255, 0.7)" },
          { range: [7, 8], color: "rgba(0, 0, 255, 0.8)" },
          { range: [8, 9], color: "rgba(0, 0, 255, 0.9)" },
        ],
      },
    },
  ];

  const layout = {
    width: 400,
    height: 300,
    margin: { t: 25, r: 25, l: 25, b: 25 },
    paper_bgcolor: "white",
    font: { color: "grey", family: "Arial" },
  };

  // Plot the Gauge Chart in the specified container
  Plotly.newPlot("gauge", data, layout);
}


// Add an event listener to the dropdown
const dropdown = document.getElementById('selDataset');
dropdown.addEventListener('change', (event) => {
  updateData(event.target.value);
});
