class PhraseList{

    constructor(_config, _data) {
        this.config = {
            parentElement: _config.parentElement,
            tooltip: _config.tooltipElement,
            width:  400,
            height: 200,
            margin: {
                top: 10,
                right: 10,
                bottom: 100,
                left: 45
            }
        }
        

        this.data = _data
        // console.log(this.data)
        this.initVis()
    }

    initVis() {
        let vis = this;

        let containerWidth = vis.config.width + vis.config.margin.left + vis.config.margin.right
        let containerHeight = vis.config.height + vis.config.margin.top + vis.config.margin.bottom

        // vis.xValue = d => d.x_value
        // vis.yValue = d => d.y_value

        vis.svg = d3.select(vis.config.parentElement)
        //     .append('svg')
        //         .attr('width', containerWidth)
        //         .attr('height', containerHeight)
        //         .attr("text-anchor", "middle")
        //         .append("g")
        //         .attr("transform", "translate(" + vis.config.width / 2 + "," + vis.config.height / 2 + ")")

        // Add functionality to the color by dropdown
        let options = vis.data.map((person, index) => ({ name: person.Character, value: index }));
        // let seasonOptions = [{name:'All Seasons', value: '0'},{name:'Season 1',value:'1'},{name:'Season 2',value:'2'},{name:'Season 3',value:'3'},{name:'Season 4',value:'4'},{name:'Season 5',value:'5'},{name:'Season 6',value:'6'},{name:'Season 7',value:'7'}]
        
        // d3.select("#wordCloudCharacterSelect")
        //     .selectAll('myOptions')
        //     .data(options)
        //     .enter()
        //     .append('option')
        //     .text(function (d) { 
        //         return d["name"]; }) // text showed in the menu
        //     .attr("value", function (d) { return d["value"]; }) // corresponding value returned by the button

        // d3.select("#wordCloudSeasonSelect")
        //     .selectAll('myOptions')
        //     .data(seasonOptions)
        //     .enter()
        //     .append('option')
        //     .text(function (d) { 
        //         return d["name"]; }) // text showed in the menu
        //     .attr("value", function (d) { return d["value"]; }) // corresponding value returned by the button


        vis.selectedCharacterOption = '0'
        // vis.selectedSeasonOption = '0'

        d3.select("#wordCloudCharacterSelect").on("change", function(d) {
            vis.selectedCharacterOption = d3.select(this).property("value")
            // console.log(vis.selectedCharacterOption)
            vis.updateVis()
        })

        // d3.select("#wordCloudSeasonSelect").on("change", function(d) {
        //     vis.selectedSeasonOption = d3.select(this).property("value")
        //     console.log(vis.selectedSeasonOption)
        //     vis.updateVis()
        // })


        vis.updateVis()
    }

    updateVis(){
        this.renderVis()
    }

    renderVis(){
        let vis = this
        // console.log(vis.data[vis.selectedCharacterOption])
        
        vis.svg.select("ol").html("");


        vis.svg.select("ol")
            .append("li")
            .text(vis.data[vis.selectedCharacterOption].Top1Line)

        vis.svg.select("ol")
            .append("li")
            .text(vis.data[vis.selectedCharacterOption].Top2Line)

        vis.svg.select("ol")
            .append("li")
            .text(vis.data[vis.selectedCharacterOption].Top3Line)
    }
}
