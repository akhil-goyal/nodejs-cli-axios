const axios = require('axios');

const NEWS_API_KEY = 'c3cd6edd23c64ae09998ad508e1076e8';

let query = process.argv[2];

const fetchData = (query) => {

    axios.get(`https://newsapi.org/v2/everything?q=${query}&apiKey=${NEWS_API_KEY}`)
        .then(response => {
            console.log(response.data);
        }).catch(error => {
            console.log(`Error while fetching data : ${error}`);
        });

}

fetchData(query);