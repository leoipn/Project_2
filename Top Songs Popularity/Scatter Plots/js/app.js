// Set up the chart
// SVG Dimensions

var svgWidth = 960;
var svgHeight = 600;

// Margins

var margin = {
    top: 20,
    right: 40,
    bottom: 80,
    left: 50
  };

    var width = svgWidth - margin.left - margin.right;
    var height = svgHeight - margin.top - margin.bottom;

    // Create SVG Container
    var svg = d3.select("#scatter")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

    // Append a chart group to the SVG and move it to the top left
    var chartGroup = svg.append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

        // Import data from CSV
        d3.json("assets/data/data.csv").then(function (censusData) {

            // Parse the data to convert to numercial values
            censusData.forEach( function (data) {
                data.poverty = +data.poverty;
                data.age = +data.age;
                data.income = +data.income;
                data.healthcare = +data.healthcare;
                data.obesity = +data.obesity;
                data.smokes = +data.smokes;
            });

            // Create Scale Functions

            var xLinearScale = d3.scaleLinear()
                // .domain([8, d3.max(censusData, d => d.poverty+2)])
                .domain([d3.min(censusData, d => d.poverty) * 0.9, d3.max(censusData, d => d.poverty) * 1.1])
                .range([0,width]);

            var yLinearScale = d3.scaleLinear()
                // .domain([4, d3.max(censusData, d => d.healthcare+2)])
                .domain([d3.min(censusData, d => d.healthcare) * 0.8, d3.max(censusData, d => d.healthcare) * 1.1])
                .range([height, 0]);

            // Create Axis Function
            var bottomAxis = d3.axisBottom(xLinearScale);
            var leftAxis = d3.axisLeft(yLinearScale);

            // Append Axis to the chart
            chartGroup.append("g")
                .attr("transform", `translate(0,${height})`)
                .call(bottomAxis);

            chartGroup.append("g")
                .call(leftAxis);

            // Create Circles
            var circlesGroup = chartGroup.selectAll("circle")
                .data(censusData)
                .enter()
                .append("circle")
                .classed("circle", true)
                .attr("cx", d => xLinearScale(d.poverty))
                .attr("cy", d => yLinearScale(d.healthcare))
                .attr("r", "10")
                .attr("fill", "blue")
                .attr("opacity", ".6");

            var text = chartGroup.append("g").selectAll("text")
                .data(censusData)
                .enter()
                .append("text")
                .classed('text', true)
                .attr("x", d => xLinearScale(d.poverty))
                .attr("y", d => yLinearScale(d.healthcare))
                // .attr("dy", "50%")
                .text(d => d.abbr)
                .attr("text-anchor", "middle")
                .attr("font-family", "sans-serif")
                .attr("font-size", "10px")
                .attr("fill", "white")
                .attr("font-weight", "700");

            // Create a label group for x and y abels    
            var labelsGroup = chartGroup.append("g")
                .attr("transform", `translate(${width / 2}, ${height + 20 })`);

            // Create x label variable
            var xLabel = labelsGroup.append("text")
                .attr("x", 0)
                .attr("y", 20)
                .text("In Poverty (%) ")
                .style("font-weight", "bold")

            // Create y label variable
            chartGroup.append("text")
                .attr("transform", "rotate(-90)")
                .attr("x", 0 - (height/2))
                .attr("y", 0 - margin.left)
                .attr("dy", "1em")
                .text("Locks Healthcare (%)")
                .style("font-weight", "bold")    
            }).catch(function(error){
            console.log(error);
        });