
d3.csv('data/all_data.csv')
.then(data => {

    data.forEach((d) => {

        for (let key in d) {
            if (/\d/.test(d[key])) {
                d[key] = +d[key] // convert any numbers present to ints
            }
        }

        // console.log(d)

    })

    wordCloud = new WordCloud({ parentElement: '#word-cloud'}, data)
})
.catch(error => console.error(error));
