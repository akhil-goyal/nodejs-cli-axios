const axios = require('axios');

const NEWS_API_KEY = 'c3cd6edd23c64ae09998ad508e1076e8';

let query = process.argv[2];

const fetchData = (query) => {

    axios.get(`https://newsapi.org/v2/everything?q=${query}&apiKey=${NEWS_API_KEY}`)
        .then(response => {

            const { totalResults, articles } = response.data;

            if (totalResults === 0) {
                console.log(`No result found for the query : "${query}"`);
            } else {
                console.log(articles);
            }

        }).catch(error => {
            console.log(`Error while fetching data : ${error}`);
        });

}

fetchData(query);