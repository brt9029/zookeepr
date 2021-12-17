const fs = require('fs');
const {
    filterByQuery,
    findById,
    createNewZookeeper,
    validateZookeeper
} = require('../lib/zookeepers');
const { zookeepers } = require('../data/zookeepers');

jest.mock('fs');
test('creates an zookeeper object', () => {
    const zookeeper = createNewZookeeper(
        { name: "Darlene", id: "jhgdja3ng2" },
        zookeepers
    )

    expect(zookeeper.name).toBe('Darlene');
    expect(zookeeper.id).toBe('jhgdja3ng2');
});

test('filters by query', () => {
    const startingZookeepers = [
        {
            name: "Les",
            age: 64,
            favoriteAnimal: "Rabbit",
            id: "9"
        },
        {
            id: "8",
            name: "Lernantino",
            age: 19,
            favoriteAnimal: "Business Cat"
        }
    ];

    const updatedZookeepers = filterByQuery({ favoriteAnimal: 'Business Cat' }, startingZookeepers);
    expect(updatedZookeepers.length).toEqual(1);
});

test('finds by id', () => {
    const startingZookeepers = [
        {
            name: "Les",
            age: 64,
            favoriteAnimal: "Rabbit",
            id: "9"
        },
        {
            id: "8",
            name: "Lernantino",
            age: 19,
            favoriteAnimal: "Business Cat"
        }
    ];

    const result = findById('8', startingZookeepers);
    
    expect(result.name).toBe('Lernantino');
});

test('validates age', () => {
    const zookeeper = {
        id: "8",
        name: "Lernantino",
        age: 19,
        favoriteAnimal: "Business Cat"
    }

    const invalidZookeeper = {
        id: '3',
        name: 'Erica',
        species: 'gorilla',
        diet: 'omnivore'
    };

    const result = validateZookeeper(zookeeper);
    const result2 = validateZookeeper(invalidZookeeper);

    expect(result).toBe(true);
    expect(result2).toBe(false);
});