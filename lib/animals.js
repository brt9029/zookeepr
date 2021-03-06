const fs = require('fs');
const path = require('path');

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
            console.log(personalityTraitsArray);
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
};

function findById(id, animalsArray) {
    const result = animalsArray.filter(animal => animal.id === id)[0];
    return result;
};

function createNewAnimal(body, animalsArray) {
    const animal = body;
    animalsArray.push(body);
    fs.writeFileSync(
        path.join(__dirname, '../data/animals.json'),
        JSON.stringify({ animals: animalsArray }, null, 2)
    );

    return animal;
};

function validateAnimal(animal) {
    if (!animal.name || typeof animal.name !== 'string') {
        return false;
    }
    if (!animal.species || typeof animal.species !== 'string') {
        return false;
    }
    if (!animal.diet || typeof animal.diet !== 'string') {
        return false;
    }
    if (!animal.personalityTraits || !Array.isArray(animal.personalityTraits)) {
        return false;
    }
    return true;
};

module.exports = {
    filterByQuery,
    findById,
    createNewAnimal,
    validateAnimal
};