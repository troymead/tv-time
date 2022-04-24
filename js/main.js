
characterData = []
totalData = []
let characterGroups
let barChartData = []
d3.csv('data/all_data.csv')
.then(data => {
    console.log(data)
    data.forEach((d) => {

        for (let key in d) {
            if (/\d/.test(d[key])) {
                d[key] = +d[key]; // convert any numbers present to ints
            }
        }

        // TODO: restructure data for plotting on charts - use d3.groups
        characterGroups = d3.groups(data, d => d.Character);


    })
    console.log(data)

    let charGroups = d3.groups(data, d=> d.Character)

    
    wordCloud = new WordCloud({ parentElement: '#word-cloud'}, data)


    characterData = characterGroups.slice(0,-1);
    totalData = characterGroups.slice(-1);
    totalData = totalData[0][1]
    characterData.forEach(d => barChartData.push(d[1][0]));

    let lines = new BarChart({
        'parentElement': "#wordLines",
        'containerHeight': 400, 
        'containerWidth': 600,
    }, [barChartData, totalData])

    let numLinesChart = new LineChart({
        'parentElement': '#numLinesChart'
    }, charGroups)

})
.catch(error => console.error(error));
