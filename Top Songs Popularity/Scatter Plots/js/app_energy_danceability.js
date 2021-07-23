// Chart
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

    // Create SVG Wrapper
    var svg_wrapper = d3.select("#scatter")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

    // Chart Group to the SVG
    var group_chart = svg_wrapper.append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

        // Import data from JSON
        d3.json("../Resources/JSON/TopGlobal.json").then(function (TopChartData) {

            // Parse the data to convert to numercial values
            TopChartData.forEach( function (data) {
                data.ArtistName = +data.ArtistName;
                data.TrackName = +data.TrackName;
                data.Danceability = +data.Danceability;
                data.Energy = +data.Energy;
                data.Key = +data.Key;
                data.Loudness = +data.Loudness;
                data.Acousticness = +data.Acousticness;
                data.Instrumentalness = +data.Instrumentalness;
                data.Liveness = +data.Liveness;
                data.Valence = +data.Valence;
                data.Tempo = +data.Tempo;
                data.TrackReference = +data.TrackReference;

            });

            // Create Scale Functions

            var x_linear_scale = d3.scaleLinear()
            
                .domain([d3.min(TopChartData, d => d.Danceability) * 0.9, d3.max(TopChartData, d => d.Danceability) * 1.1])
                .range([0,width]);

            var y_linear_scale = d3.scaleLinear()
        
                .domain([d3.min(TopChartData, d => d.Energy) * 0.8, d3.max(TopChartData, d => d.Energy) * 1.1])
                .range([height, 0]);

            // Create Axis Function
            var bottomAxis = d3.axisBottom(x_linear_scale);
            var leftAxis = d3.axisLeft(y_linear_scale);

            // Append Axis to the chart
            group_chart.append("g")
                .attr("transform", `translate(0,${height})`)
                .call(bottomAxis);

            group_chart.append("g")
                .call(leftAxis);

            // Create Circles
            var group_circles = group_chart.selectAll("circle")
                .data(TopChartData)
                .enter()
                .append("circle")
                .classed("circle", true)
                .attr("cx", d => x_linear_scale(d.Danceability))
                .attr("cy", d => y_linear_scale(d.Energy))
                .attr("r", "10")
                .attr("fill", "blue")
                .attr("opacity", ".6");

            var text = group_chart.append("g").selectAll("text")
                .data(TopChartData)
                .enter()
                .append("text")
                .classed('text', true)
                .attr("x", d => x_linear_scale(d.Danceability))
                .attr("y", d => y_linear_scale(d.Energy))
                .text(d => d.abbr)
                .attr("text-anchor", "middle")
                .attr("font-family", "sans-serif")
                .attr("font-size", "10px")
                .attr("fill", "white")
                .attr("font-weight", "700");

            // Label Group for X Labels and Y Labels  
            var group_labels = group_chart.append("g")
                .attr("transform", `translate(${width / 2}, ${height + 20 })`);

            // Variable X Label
            var xLabel = group_labels.append("text")
                .attr("x", 0)
                .attr("y", 20)
                .text("Danceability")
                .style("font-weight", "bold")

            // Variable Y Label
            var yLabel = group_chart.append("text")
                .attr("transform", "rotate(-90)")
                .attr("x", 0 - (height/2))
                .attr("y", 0 - margin.left)
                .attr("dy", "1em")
                .text("Energy")
                .style("font-weight", "bold")    
            }).catch(function(error){
            console.log(error);

            /*

            // Tooltip

            var chosenXAxis = "Danceability"
            var chosenYAxis = "Energy"

            function updateToolTip(chosenXAxis, chosenYAxis, circlesGroup) {
                var xLabel;
                var yLabel;
                
                var toolTip = d3.tip()
                  .attr("class", "d3-tip")
                  .offset([0, 0])
                  .html(function(d) {
                    return (`${d.ArtistName}<br>${xlabel} ${d[chosenXAxis]}%<br>${yLabel} ${d[chosenYAxis]}%`);
                  });
                circlesGroup.call(toolTip);
                circlesGroup.on("mouseover", function(data) {
                  toolTip.show(data);
                })
                  // onmouseout event
                  .on("mouseout", function(data, index) {
                    toolTip.hide(data);
                  });
                return circlesGroup;
              }

            */
        });
