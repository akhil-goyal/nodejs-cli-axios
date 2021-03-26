const axios = require('axios');
const fs = require('fs');

const NEWS_API_KEY = 'c3cd6edd23c64ae09998ad508e1076e8';

let query = process.argv[2];

const createFile = (articles) => {

    let file = fs.createWriteStream('headlines.txt');

    file.on('error', (error) => { console.log(`Error while creating file : ${error}`) });

    articles.map((article, index) => { file.write(`${index + 1}. ${article.title} \n\n`); });

    file.end();

}

const fetchData = (query) => {

    axios.get(`https://newsapi.org/v2/everything?q=${query}&apiKey=${NEWS_API_KEY}`)
        .then(response => {

            const { totalResults, articles } = response.data;

            if (totalResults === 0) {
                console.log(`No result found for the query : "${query}"`);
            } else {
                console.log(articles);
                createFile(articles);
            }

        }).catch(error => {
            console.log(`Error while fetching data : ${error}`);
        });

}

fetchData(query);