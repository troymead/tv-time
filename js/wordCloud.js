
class WordCloud{

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

        this.fontScale = 15;
        this.fontFamily = "sans-serif";
        this.fill = d3.scaleOrdinal(d3.schemeSet2);
        // this.fontScale = 2;
        this.padding = 5;
        this.rotate = () => 0; // () => (~~(Math.random() * 6) - 3) * 30


        let containerWidth = vis.config.width + vis.config.margin.left + vis.config.margin.right
        let containerHeight = vis.config.height + vis.config.margin.top + vis.config.margin.bottom

        vis.svg = d3.select(vis.config.parentElement)
            .append('svg')
                .attr('width', containerWidth)
                .attr('height', containerHeight)
                .attr("text-anchor", "middle")
                .append("g")
                .attr("transform", "translate(" + vis.config.width / 2 + "," + vis.config.height / 2 + ")")

        // Add functionality to the color by dropdown
        let options = vis.data.map((person, index) => ({ name: person.Character, value: index }))
        options = options.filter((d) => (d.name != "Total"));
        let seasonOptions = [{name:'All Seasons', value: '0'},{name:'Season 1',value:'1'},{name:'Season 2',value:'2'},{name:'Season 3',value:'3'},{name:'Season 4',value:'4'},{name:'Season 5',value:'5'},{name:'Season 6',value:'6'},{name:'Season 7',value:'7'}]
        
        // console.log(options)

        d3.select("#wordCloudCharacterSelect")
            .selectAll('myOptions')
            .data(options)
            .enter()
            .append('option')
            .text(function (d) { 
                return d["name"]; }) // text showed in the menu
            .attr("value", function (d) { return d["value"]; }) // corresponding value returned by the button

        d3.select("#wordCloudSeasonSelect")
            .selectAll('myOptions')
            .data(seasonOptions)
            .enter()
            .append('option')
            .text(function (d) { 
                return d["name"]; }) // text showed in the menu
            .attr("value", function (d) { return d["value"]; }) // corresponding value returned by the button


        vis.selectedCharacterOption = '0'
        vis.selectedSeasonOption = '0'

        d3.select("#wordCloudCharacterSelect").on("change", function(d) {
            vis.selectedCharacterOption = d3.select(this).property("value")
            console.log(vis.selectedCharacterOption)
            vis.updateVis()
        })

        d3.select("#wordCloudSeasonSelect").on("change", function(d) {
            vis.selectedSeasonOption = d3.select(this).property("value")
            console.log(vis.selectedSeasonOption)
            vis.updateVis()
        })


        vis.updateVis()
    }

    updateVis(){
        

        this.renderVis()
    }

    renderVis(){

        let vis = this;
        let selectedData = vis.data[vis.selectedCharacterOption]

        var myWords;
        switch(vis.selectedSeasonOption){
            case '0':
                myWords = [{text: selectedData.Top1Word, value: selectedData.Top1WordCount.toString()}, {text: selectedData.Top2Word, value: selectedData.Top2WordCount.toString()}, {text: selectedData.Top3Word, value: selectedData.Top3WordCount.toString()}, {text: selectedData.Top4Word, value: selectedData.Top4WordCount.toString()}, {text: selectedData.Top5Word, value: selectedData.Top5WordCount.toString()}, {text: selectedData.Top6Word, value: selectedData.Top6WordCount.toString()}, {text: selectedData.Top7Word, value: selectedData.Top7WordCount.toString()}, {text: selectedData.Top8Word, value: selectedData.Top8WordCount.toString()}, {text: selectedData.Top9Word, value: selectedData.Top9WordCount.toString()}, {text: selectedData.Top10Word, value: selectedData.Top10WordCount.toString()}]
                break;
            case '1':
                myWords = [{text: selectedData.S1Top1Word, value: selectedData.S1Top1WordCount.toString()}, {text: selectedData.S1Top2Word, value: selectedData.S1Top2WordCount.toString()}, {text: selectedData.S1Top3Word, value: selectedData.S1Top3WordCount.toString()}, {text: selectedData.S1Top4Word, value: selectedData.S1Top4WordCount.toString()}, {text: selectedData.S1Top5Word, value: selectedData.S1Top5WordCount.toString()}, {text: selectedData.S1Top6Word, value: selectedData.S1Top6WordCount.toString()}, {text: selectedData.S1Top7Word, value: selectedData.S1Top7WordCount.toString()}, {text: selectedData.S1Top8Word, value: selectedData.S1Top8WordCount.toString()}, {text: selectedData.S1Top9Word, value: selectedData.S1Top9WordCount.toString()}, {text: selectedData.S1Top10Word, value: selectedData.S1Top10WordCount.toString()}]
                break;
            case '2':
                myWords = [{text: selectedData.S2Top1Word, value: selectedData.S2Top1WordCount.toString()}, {text: selectedData.S2Top2Word, value: selectedData.S2Top2WordCount.toString()}, {text: selectedData.S2Top3Word, value: selectedData.S2Top3WordCount.toString()}, {text: selectedData.S2Top4Word, value: selectedData.S2Top4WordCount.toString()}, {text: selectedData.S2Top5Word, value: selectedData.S2Top5WordCount.toString()}, {text: selectedData.S2Top6Word, value: selectedData.S2Top6WordCount.toString()}, {text: selectedData.S2Top7Word, value: selectedData.S2Top7WordCount.toString()}, {text: selectedData.S2Top8Word, value: selectedData.S2Top8WordCount.toString()}, {text: selectedData.S2Top9Word, value: selectedData.S2Top9WordCount.toString()}, {text: selectedData.S2Top10Word, value: selectedData.S2Top10WordCount.toString()}]
                break;
            case '3':
                myWords = [{text: selectedData.S3Top1Word, value: selectedData.S3Top1WordCount.toString()}, {text: selectedData.S3Top2Word, value: selectedData.S3Top2WordCount.toString()}, {text: selectedData.S3Top3Word, value: selectedData.S3Top3WordCount.toString()}, {text: selectedData.S3Top4Word, value: selectedData.S3Top4WordCount.toString()}, {text: selectedData.S3Top5Word, value: selectedData.S3Top5WordCount.toString()}, {text: selectedData.S3Top6Word, value: selectedData.S3Top6WordCount.toString()}, {text: selectedData.S3Top7Word, value: selectedData.S3Top7WordCount.toString()}, {text: selectedData.S3Top8Word, value: selectedData.S3Top8WordCount.toString()}, {text: selectedData.S3Top9Word, value: selectedData.S3Top9WordCount.toString()}, {text: selectedData.S3Top10Word, value: selectedData.S3Top10WordCount.toString()}]
                break;
            case '4':
                myWords = [{text: selectedData.S4Top1Word, value: selectedData.S4Top1WordCount.toString()}, {text: selectedData.S4Top2Word, value: selectedData.S4Top2WordCount.toString()}, {text: selectedData.S4Top3Word, value: selectedData.S4Top3WordCount.toString()}, {text: selectedData.S4Top4Word, value: selectedData.S4Top4WordCount.toString()}, {text: selectedData.S4Top5Word, value: selectedData.S4Top5WordCount.toString()}, {text: selectedData.S4Top6Word, value: selectedData.S4Top6WordCount.toString()}, {text: selectedData.S4Top7Word, value: selectedData.S4Top7WordCount.toString()}, {text: selectedData.S4Top8Word, value: selectedData.S4Top8WordCount.toString()}, {text: selectedData.S4Top9Word, value: selectedData.S4Top9WordCount.toString()}, {text: selectedData.S4Top10Word, value: selectedData.S4Top10WordCount.toString()}]
                break;
            case '5':
                myWords = [{text: selectedData.S5Top1Word, value: selectedData.S5Top1WordCount.toString()}, {text: selectedData.S5Top2Word, value: selectedData.S5Top2WordCount.toString()}, {text: selectedData.S5Top3Word, value: selectedData.S5Top3WordCount.toString()}, {text: selectedData.S5Top4Word, value: selectedData.S5Top4WordCount.toString()}, {text: selectedData.S5Top5Word, value: selectedData.S5Top5WordCount.toString()}, {text: selectedData.S5Top6Word, value: selectedData.S5Top6WordCount.toString()}, {text: selectedData.S5Top7Word, value: selectedData.S5Top7WordCount.toString()}, {text: selectedData.S5Top8Word, value: selectedData.S5Top8WordCount.toString()}, {text: selectedData.S5Top9Word, value: selectedData.S5Top9WordCount.toString()}, {text: selectedData.S5Top10Word, value: selectedData.S5Top10WordCount.toString()}]
                break;
            case '6':
                myWords = [{text: selectedData.S6Top1Word, value: selectedData.S6Top1WordCount.toString()}, {text: selectedData.S6Top2Word, value: selectedData.S6Top2WordCount.toString()}, {text: selectedData.S6Top3Word, value: selectedData.S6Top3WordCount.toString()}, {text: selectedData.S6Top4Word, value: selectedData.S6Top4WordCount.toString()}, {text: selectedData.S6Top5Word, value: selectedData.S6Top5WordCount.toString()}, {text: selectedData.S6Top6Word, value: selectedData.S6Top6WordCount.toString()}, {text: selectedData.S6Top7Word, value: selectedData.S6Top7WordCount.toString()}, {text: selectedData.S6Top8Word, value: selectedData.S6Top8WordCount.toString()}, {text: selectedData.S6Top9Word, value: selectedData.S6Top9WordCount.toString()}, {text: selectedData.S6Top10Word, value: selectedData.S6Top10WordCount.toString()}]
                break;
            case '7':
                myWords = [{text: selectedData.S7Top1Word, value: selectedData.S7Top1WordCount.toString()}, {text: selectedData.S7Top2Word, value: selectedData.S7Top2WordCount.toString()}, {text: selectedData.S7Top3Word, value: selectedData.S7Top3WordCount.toString()}, {text: selectedData.S7Top4Word, value: selectedData.S7Top4WordCount.toString()}, {text: selectedData.S7Top5Word, value: selectedData.S7Top5WordCount.toString()}, {text: selectedData.S7Top6Word, value: selectedData.S7Top6WordCount.toString()}, {text: selectedData.S7Top7Word, value: selectedData.S7Top7WordCount.toString()}, {text: selectedData.S7Top8Word, value: selectedData.S7Top8WordCount.toString()}, {text: selectedData.S7Top9Word, value: selectedData.S7Top9WordCount.toString()}, {text: selectedData.S7Top10Word, value: selectedData.S7Top10WordCount.toString()}]
                break;
            
        }
        // console.log(myWords)
        let minVal = d3.min(myWords, function (d) {return +d.value;})
        let maxVal = d3.max(myWords, function (d) {return +d.value;})

        // console.log(minVal)
        // console.log(maxVal)

        vis.fontScale = d3.scaleLinear()
            .domain([minVal,maxVal])
            .range([20,60])

        // Adapted from http://bl.ocks.org/ericcoopey/6382449

        var layout = d3.layout.cloud().size([vis.config.width, vis.config.height])
            .words(myWords)
            .rotate(0)
            .padding(vis.padding)
            .fontSize((d) => vis.fontScale(d.value))//.fontSize((d) => Math.sqrt(d.value) * vis.fontScale)
            .on("end", draw)
            .start();

        function draw(words) {
            vis.svg
                .selectAll("text")
                .data(words)
                .join("text")
                .transition()
                .duration(600)
                .style("font-size", function(d) { return d.size + "px"; })
                .style("fill", (d,i) => (vis.fill(i)))
                .attr("text-anchor", "middle")
                .style("font-family", vis.fontFamily)
                .attr("transform", function(d) {
                    return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
                })
                .text(function(d) { return d.text; });
        }

    }
}