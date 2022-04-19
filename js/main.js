
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
        let characterGroups = d3.groups(data, d => d.Character);

        let sznEps = {};

        let szn1Eps = d3.groups(data, d => d.S1Eps);

        console.log(characterGroups);
        console.log(szn1Eps);

    })
    
    wordCloud = new WordCloud({ parentElement: '#word-cloud'}, data)


    console.log(data);

})
.catch(error => console.error(error));
