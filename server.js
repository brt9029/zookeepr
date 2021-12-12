const express = require('express');
const { animals } = require('./data/animals');
const PORT = process.env.PORT || 3001;
const app = express();

function filterByQuery(query, animalsArray) {
    let personalityTraitsArray = [];

    // save animalsArray as filteredResults
    let filteredResults = animalsArray;

    if (query.personalityTraits) {
            // save personalityTraits as a dedicated array
            // if personalityTraits is a string, place it into a new array and save
            if(typeof query.personalityTraits === 'string') {
                personalityTraitsArray = [query.personalityTraits];
            } else {
                personalityTraitsArray = query.personalityTraits;
            }

            // loop through each trait in the personalityTraits array
            personalityTraitsArray.forEach(trait => {
                /*
                Check the trait against each animal in the filteredResults array (initially its a copy of the animalsArray)
                update the array for each trait in this forEach loop
                for each trait being targeted by the filter, the filteredResults array
                will only contain the entries that match the trait, at th eend there will be an array of animals
                that have every one of the traits once the forEach loop is finished
                */
                filteredResults = filteredResults.filter(
                    animal => animal.personalityTraits.indexOf(trait) !== -1
            );
        });
    }
    
    if(query.diet) {
        filteredResults = filteredResults.filter(animal => animal.diet === query.diet);
    }
    if (query.species) {
        filteredResults = filteredResults.filter(animal => animal.species === query.species);
    }
    if (query.name) {
        filteredResults = filteredResults.filter(animal => animal.name === query.name);
    }
    return filteredResults;
}

function findById(id, animalsArray) {
    const result = animalsArray.filter(animal => animal.id === id)[0];
    return result;
}

app.get('/api/animals', (req, res) => {
    let results = animals;
    if (req.query) {
        results = filterByQuery(req.query, results);
    }
    res.json(results);
});

app.get('/api/animals/:id', (req, res) => {
    const result = findById(req.params.id, animals);
    if(result){
        res.json(result);
    } else {
        res.send(404);
    }
});

app.post('/api/animals', (req, res) => {
    // incoming content
    console.log(req.body);
    res.json(req.body);
})

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});