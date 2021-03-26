// Importing the packages.
const axios = require('axios');
const fs = require('fs');

// News API Key
const NEWS_API_KEY = 'c3cd6edd23c64ae09998ad508e1076e8';

// Getting the user input from Node CLI.
let query = process.argv[2];

// Creating a new file.
const createFile = articles => {

    // Initiating file writing stream.
    let file = fs.createWriteStream('headlines.txt');

    // In case, an error occurs while creation of the file.
    file.on('error', (error) => { console.log(`Error while creating file : ${error}`) });

    // Mapping the news articles array & storing their title to the newly created file.
    articles.map((article, index) => { file.write(`${index + 1}. ${article.title} \n\n`); });

    // Completion of file creation.
    file.end();

    // Displaying message when the file is created successfully.
    console.log('File created successfully.');

}

// Fetching the news data using the query from Node CLI.
const fetchData = query => {

    // In case, no query has been provided.
    if (query === undefined) {
        console.log('Please provide a search query to use this application.');

        // In case, the query is available.
    } else {

        // making the HTTP request to the resource.
        axios.get(`https://newsapi.org/v2/everything?q=${query}&apiKey=${NEWS_API_KEY}`)

            // Resolving the response.
            .then(response => {

                // Destructuring result count & news articles from response.
                const { totalResults, articles } = response.data;

                // In case, there are no results for the given query.
                if (totalResults === 0) {
                    console.log(`No result found for the query : "${query}"`);

                    // In case, there are results for the given query.
                } else {

                    // Displaying the results in console.
                    console.log(articles);

                    // Invoking the createFile function & setting articles as
                    // an argument.
                    createFile(articles);
                }

                // In case there's an error while fetching the data from the API.
            }).catch(error => {
                console.log(`Error while fetching data : ${error}`);
            });
    }

}

// A message to inform the user that the application is
// running whenever the file is run through the CLI.
console.log('Application is now running ...');

// Invoking the function fetchData & setting query
// as an argument.
fetchData(query);