characterData = []
totalData = []
let characterGroups
let barChartData = []

d3.csv('data/all_data.csv')
.then(data => {

    data.forEach((d) => {

        for (let key in d) {
            if (/\d/.test(d[key])) {
                d[key] = +d[key]; // convert any numbers present to ints
            }
        }

        // console.log(d);

        // TODO: restructure data for plotting on charts - use d3.groups
        characterGroups = d3.groups(data, d => d.Character);

        // let sznEps = {};

        // let szn1Eps = d3.groups(data, d => d.S1Eps);

        // console.log(characterGroups);
        // console.log(szn1Eps);

    })
   
    characterData = characterGroups.slice(0,-1);
    totalData = characterGroups.slice(-1);
    totalData = totalData[0][1]
    characterData.forEach(d => barChartData.push(d[1][0]));
    // console.log(characterData)
    // console.log(barChartData)

    let lines = new BarChart({
        'parentElement': "#wordLines",
        'containerHeight': 400, 
        'containerWidth': 600,
    }, [barChartData, totalData])

     
    wordCloud = new WordCloud({ parentElement: '#word-cloud'}, data)

    phraseList = new PhraseList({parentElement: '#phrase-list'}, data)


})
.catch(error => console.error(error));
