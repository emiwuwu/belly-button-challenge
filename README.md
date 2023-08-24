# Belly-Button-Challenge Interactive Dashboard

In this assignment, I will create an interactive dashboard for the Belly Button Biodiversity dataset, highlighting prevalent microbes in the navels of over 70% of people.

## Build the Charts
- Utilize the D3 library to fetch data from the provided URL: https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json
- Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in an individual's sample, using 'sample_values' for values, 'otu_ids' for labels, and 'otu_labels' for hovertext.
- Generate a bubble chart for each sample, utilizing 'otu_ids' on the x-axis, 'sample_values' on the y-axis, 'sample_values' for marker size, 'otu_ids' for marker colors, and 'otu_labels' for text values.
- Adapt the Gauge Chart to visualize the weekly washing frequency, supporting values ranging from 0 to 9, and ensure dynamic updates upon selecting a new sample.

## Display the Metadata
- Present an individual's demographic data by showcasing each key-value pair from the metadata JSON object on the webpage.
