class BarChart{
    constructor(_config, _data){
        // console.log("inside the bar chart constructor");
        this.config = {
            parentElement: _config.parentElement,
            containerWidth: _config.containerWidth || 500,
            containerHeight: _config.containerHeight || 140,
            margin: { top: 10, bottom: 100, right: 60, left: 60 },
            tooltipPadding: _config.tooltipPadding || 15
          }
        // console.log("Loading data now..");

        this.data = _data[0];
        this.totalData = _data[1];

        this.initVis();
    }

    initVis(){

        let vis = this; 
  
        vis.width = vis.config.containerWidth - vis.config.margin.left - vis.config.margin.right;
        vis.height = vis.config.containerHeight - vis.config.margin.top - vis.config.margin.bottom;
  
        vis.xValue = function(d) {
            return d.Character;
        }
        vis.yValue = function(d) {
            return d.TotalLines;
        }

        // console.log(vis.data)
        vis.xScale = d3.scaleBand()
            .domain(vis.data.map(vis.xValue)) 
            .range([0, vis.width])
            .paddingInner(0.2);
        // console.log("xscale set");
        // console.log(d3.max(vis.data, function (d) {return +d.TotalLines;}))

        vis.yScale = d3.scaleLinear()
            .domain([0,d3.max(vis.data, function (d) {return +d.TotalLines;})]) 
            .range([vis.height, 0]);
        // console.log("yscale set");

        // Initialize axes
        vis.xAxis = d3.axisBottom(vis.xScale);
        vis.yAxis = d3.axisLeft(vis.yScale);
        // console.log("Axes initialized");

        // Define size of SVG drawing area
        vis.svg = d3.select(vis.config.parentElement)
            .attr('width', vis.config.containerWidth)
            .attr('height', vis.config.containerHeight);

        // Append group element that will contain our actual chart (see margin convention)
        vis.chart = vis.svg.append('g')
            .attr('transform', `translate(${vis.config.margin.left},${vis.config.margin.top})`);

        // console.log("created the actual chart");

        //// Draw the axis
        //// Append x-axis group and move it to the bottom of the chart
        vis.xAxisG = vis.chart.append('g')
            .attr('class', 'axis x-axis')
            .attr('transform', `translate(0,${vis.height})`)
            .call(vis.xAxis)
            .selectAll("text")
                .attr("transform", "translate(-10,0)rotate(-45)")
                .style("text-anchor", "end");
            
        vis.svg.append("text")
            .attr("font-size", "15px")
            .attr("x", vis.width + 120)
            .attr("y", vis.height + 35)
            .attr("text-anchor", "end")
            .attr("stroke", "black")
            .text("Character");
            
        // Append y-axis group
        vis.yAxisG = vis.chart.append('g')
            .attr('class', 'axis y-axis')
            .call(vis.yAxis)
            .append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", 30)
                .attr("dy", "-5.1em")
                .attr("text-anchor", "end")
                .attr("stroke", "black")
                .attr("font-size", "14px")
                .text("Number of Lines Spoken"); 


        
        // Get # of episodes per each season

        let episodeList = {
            "All": "All",
            "S1": vis.data[0].S1Eps, 
            "S2": vis.data[0].S2Eps,
            "S3": vis.data[0].S3Eps,
            "S4": vis.data[0].S4Eps,
            "S5": vis.data[0].S5Eps,
            "S6": vis.data[0].S6Eps,
            "S7": vis.data[0].S7Eps
        }

        vis.selectedSeason = d3.select("#seasonSelect").node().value;
        setEpisodeOptions(vis.selectedSeason, episodeList);

        // console.log("Create rectangles for bar")
        // Add rectangles
        let bars = vis.chart.selectAll('.bar')
        .data(vis.data)
            .enter()
        .append('rect')
            .attr('class', 'bar')
            .attr('fill', 'steelblue')
            .attr('width', vis.xScale.bandwidth())
            .attr('height', function (d) { return vis.height - vis.yScale(d.TotalLines)})
            .attr('y', d => vis.yScale(d.TotalLines))
            .attr('x', d => vis.xScale(d.Character));

        bars.on('mouseover', function(event, d) {
            d3.select('#barChartTooltip')
                .style('opacity', 1)
                .style('z-index', 1000000)
                .html(`<div class="tooltip-label">${d.Character}</br>Lines: ${vis.yValue(d)}</div>`)
                .style('left', (event.pageX + 10) + 'px')   
                .style('top', (event.pageY + 10) + 'px')
                
            })
            .on('mousemove', (event) => {
                d3.select('#barChartTooltip')
                    .style('left', (event.pageX + 10) + 'px')   
                    .style('top', (event.pageY + 10) + 'px')
                })
            .on('mouseleave', function() {
                d3.select('#barChartTooltip').style('opacity', 0) //turn off the tooltip
                    .style('left', '0px')   
                    .style('top', '0px')
            })
        
// // TODO:  Make episode options change when different season option is selected
        d3.select("#seasonSelect").on("change", function(d) {
            // recover the option that has been chosen
            vis.selectedSeason = d3.select(this).property("value");
            vis.episodeOptions = [];

            setEpisodeOptions(vis.selectedSeason, episodeList);
            update(vis.selectedSeason + "Lines")
        })
        
                
        d3.select("#episodeSelect").on("change", function(d) {
            // recover the option that has been chosen
            var selectedOption = d3.select(this).property("value")
            // console.log(selectedOption)
            // run the updateChart function with this selected option
            update(selectedOption)
        })

        // Setup options for Episode dropdown based on selected season
        function setEpisodeOptions(selectedSeason, episodeList){
            //Clear previous options
            d3.select("#episodeSelect").html(null);

            vis.selectedSeasonEps = episodeList[selectedSeason];
            vis.episodeOptions = [
                {"name":"All","value": selectedSeason + "Lines"}]
            
            let epNum = 0;
            for(let i = 0; i < vis.selectedSeasonEps; i++){
                epNum = i + 1;
                vis.episodeOptions.push({"name": epNum, "value": selectedSeason + "E" + epNum});
            }   
    
            //Add functionality to the episode dropdown
            d3.select("#episodeSelect")
                .selectAll('myOptions')
                .data(vis.episodeOptions)
                .enter()
                .append('option')
                .text(function (d) { return d["name"]; }) // text showed in the menu
                .attr("value", function (d) { return d["value"]; }) // corresponding value returned by the button
        }

        // A function that update the chart
        function update(selectedEpisode) {
            vis.yValue = d => +d[selectedEpisode];

            let chart = vis.chart.selectAll('.bar')
                .data(vis.data);

            vis.yScale = d3.scaleLinear()
                .domain([0,d3.max(vis.data, vis.yValue)]) 
                .range([vis.height, 0]);
            vis.yAxis = d3.axisLeft(vis.yScale);

            d3.select(".y-axis").call(vis.yAxis)


            chart
                .transition().duration(500)
                .attr('width', vis.xScale.bandwidth())
                .attr('height', function (d) { return vis.height - vis.yScale(d[selectedEpisode])})
                .attr('y', d => vis.yScale(d[selectedEpisode]))
                .attr('x', d => vis.xScale(d.Character));
        }  

    }

    

    


    updateVis() {
        let vis = this;

        // vis.xValue = d => d.S1Lines;
        // vis.yValue = d => d.Character;

        // // Set the scale input domains
        // vis.xScaleFocus.domain(vis.data.map(vis.xValue).sort())
        // vis.yScaleFocus.domain(d3.extent(vis.data, vis.yValue));
        // vis.xScaleContext.domain(vis.xScaleFocus.domain());
        // vis.yScaleContext.domain(vis.yScaleFocus.domain());

        // vis.xAxisFocus = vis.makeAxis(vis.xScaleFocus)

        // vis.renderVis();
    }
}
