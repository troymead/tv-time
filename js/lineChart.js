class LineChart {
    constructor(_config, _data) {
        this.config = {
            parentElement: _config.parentElement,
            containerWidth: _config.containerWidth || 1000,
            containerHeight: _config.containerHeight || 280,
            margin: { top: 50, bottom: 30, right: 100, left: 50}
        }

        this.data = _data;

        this.initVis();
    }

    initVis() {
        let vis = this;

        console.log(vis.data)

        vis.width = vis.config.containerWidth - vis.config.margin.left - vis.config.margin.right
        vis.height = vis.config.containerHeight - vis.config.margin.top - vis.config.margin.bottom

        vis.xScale = d3.scalePoint()
            .range([0, vis.width])

        vis.yScale = d3.scaleLinear()
            .range([vis.height, 0])
            .nice()

        vis.xAxis = d3.axisBottom(vis.xScale)

        vis.yAxis = d3.axisLeft(vis.yScale)

        vis.svg = d3.select(vis.config.parentElement)
            .attr('width', vis.config.containerWidth)
            .attr('height', vis.config.containerHeight)

        vis.chart = vis.svg.append('g')
            .attr('transform', `translate(${vis.config.margin.left},${vis.config.margin.top})`)

        vis.xAxisG = vis.chart.append('g')
            .attr('class', 'axis x-axis')
            .attr('transform', `translate(0,${vis.height})`)

        vis.yAxisG = vis.chart.append('g')
            .attr('class', 'axis y-axis')

        vis.marks = vis.chart.append('g')

        vis.trackingArea = vis.chart.append('rect')
            .attr('width', vis.width+100)
            .attr('height', vis.height+100)
            .attr('fill', 'none')
            .attr('pointer-events', 'all')

        vis.tooltip = vis.chart.append('g')
            .attr('class', 'tooltip')
            .style('display', 'none')

        vis.tooltip.append('circle')
            .attr('r', 4)
            
        vis.tooltip.append('text')

        let options = vis.data.map((person, index) => ({name: person[0], value: index}))
        console.log(options)
        let seasonOptions = [
            {
                name: 'All Seasons',
                value: '0'
            },
            {
                name: 'Season 1',
                value: 'S1'
            },
            {
                name: 'Season 2',
                value: 'S2'
            },
            {
                name: 'Season 3',
                value: 'S3'
            },
            {
                name: 'Season 4',
                value: 'S4'
            },
            {
                name: 'Season 5',
                value: 'S5'
            },
            {
                name: 'Season 6',
                value: 'S6'
            },
            {
                name: 'Season 7',
                value: 'S7'
            },
        ]

        d3.select('#lineChartCharacterSelect')
            .selectAll('lineMyOptions')
            .data(options)
            .enter()
            .append('option')
            .text(function(d) { return d['name'] })
            .attr('value', function(d) { return d['value'] })

        d3.select('#lineChartSeasonSelect')
            .selectAll('lineMyOptions')
            .data(seasonOptions)
            .enter()
            .append('option')
            .text(function(d) { return d['name'] })
            .attr('value', function(d) { return d['value'] })

        vis.selectedCharacterOption = '0'
        vis.selectedSeasonOption = '0'

        d3.select('#lineChartCharacterSelect')
            .on('change', function(d) {
                vis.selectedCharacterOption = d3.select(this).property('value')
                vis.updateVis()
            })

        d3.select('#lineChartSeasonSelect')
            .on('change', function(d) {
                vis.selectedSeasonOption = d3.select(this).property('value')
                vis.updateVis()
            })


        vis.updateVis()

    }

    updateVis() {

        let vis = this

        vis.colors = ['#6929c4','#005d5d','#fa4d56','#198038','#ee538b','#009d9a','#8a3800','#1192e8','#9f1853','#002d9c','#a56eff']
        vis.charLineCount = []
        console.log(vis.data)
        // vis.charLineCount = this.allData(vis.data)
        console.log(vis.charLineCount)

        // if (vis.selectedCharacterOption == 11) {
        //     vis.charLineCount = this.allData(vis.data)
        // } else {

        // }

        let selectedData = vis.data[vis.selectedCharacterOption]
        console.log(selectedData)

        switch(vis.selectedSeasonOption){
            case '0':
                console.log('all seasons selected')
                vis.charLineCount = this.filterData('Lines', selectedData[1])
                break;
            case 'S1':
                console.log('season 1 selected')
                vis.charLineCount = this.filterData(1, selectedData[1])
                break;
            case 'S2':
                console.log('season 2 selected')
                vis.charLineCount = this.filterData(2, selectedData[1])
                break;
            case 'S3':
                console.log('season 3 selected')
                vis.charLineCount = this.filterData(3, selectedData[1])
                break;
            case 'S4':
                console.log('season 4 selected')
                vis.charLineCount = this.filterData(4, selectedData[1])
                break;
            case 'S5':
                console.log('season 5 selected')
                vis.charLineCount = this.filterData(5, selectedData[1])
                break;
            case 'S6':
                console.log('season 6 selected')
                vis.charLineCount = this.filterData(6, selectedData[1])
                break;
            case 'S7':
                console.log('season 7 selected')
                vis.charLineCount = this.filterData(7, selectedData[1])
                break;
        }

        vis.xValue = d => d.x_value // episode number
        vis.yValue = d => d.y_value // number of lines 


        vis.xDomain = []

        vis.charLineCount.forEach((row) => {
            vis.xDomain.push(row.x_value)
        })

        vis.xScale.domain(vis.xDomain)
            .range([0, vis.width])

        vis.xAxis.ticks(10)
        vis.yScale.domain([0,d3.max(vis.charLineCount,vis.yValue)])

        console.log(vis.xScale)
        console.log(vis.selectedCharacterOption)
        console.log(vis.colors[vis.selectedCharacterOption])

        vis.line = d3.line()
            .x(d => vis.xScale(vis.xValue(d)))
            .y(d => vis.yScale(vis.yValue(d)))
                
        vis.bisectSeason = d3.bisector(vis.xValue).left
        vis.renderVis()
    }

    renderVis() {

        let vis = this


        vis.xAxisG.call(vis.xAxis)
        vis.yAxisG.call(vis.yAxis)


        console.log(vis.charLineCount)
        vis.marks.selectAll('.chart-line')
        .data([vis.charLineCount])
        .join('path')
        .attr('class', 'chart-line')
        .attr('d', vis.line)
        .style('stroke', vis.colors[vis.selectedCharacterOption])

        vis.xScale.invert = (function(){
            var domain = vis.xScale.domain()
            var range = vis.xScale.range()
            var scale = d3.scaleQuantize().domain(range).range(domain)

            return function(x) {
                return scale(x)
            }
        })()


        vis.trackingArea
            .on('mouseenter', () => {
                vis.tooltip.style('display', 'block')
            })
            .on('mouseleave', () => {
                vis.tooltip.style('display', 'none')
            })
            .on('mousemove', () => {
                const xPos = d3.pointer(event, this)[0]
                const lineCount = vis.xScale.invert(xPos)

                const index = vis.bisectSeason(vis.charLineCount, lineCount, 1)
                const a = vis.charLineCount[index - 1]
                const b = vis.charLineCount[index]
                const d = b && (lineCount - a.x_value > b.x_value - lineCount) ? b : a

                vis.tooltip.select('circle')
                    .attr('transform', `translate(${vis.xScale(d.x_value)},${vis.yScale(d.y_value)})`)

                vis.tooltip.select('text')
                    .attr('transform', `translate(${vis.xScale(d.x_value)},${vis.yScale(d.y_value)-15})`)
                    .text(`${d.x_value}: ${d.y_value}`)
            })
        
        
    }

    filterData(seasonNum, data) {
        let filteredData = []
        data.forEach((elem, idx) => {
            Object.keys(elem).forEach((key, val) => {
                if(typeof seasonNum === 'string') {
                    if(key.endsWith('Lines')) {
                        filteredData.push({x_value: key, y_value: elem[key]})
                    }
                } else {
                    if(key.startsWith(`S${seasonNum}E`) && /\d/.test(key[3])) {
                        filteredData.push({x_value: key, y_value: elem[key]})
                    }
                }
            })
        })
        filteredData = filteredData.slice(0,filteredData.length-1)

        return filteredData

    }

    allData(data) {
        let filteredData= []
        data.forEach((elem, idx,array) => {
            for(let i = 1; i<8; i++){
                filteredData.push(this.filterData(i,elem[1]))
            }
                console.log(this.filterData(idx+1,elem[1]))
                filteredData.push(this.filterData(idx+1,elem[1]))
        })
        console.log(filteredData)
        return filteredData
    }
}