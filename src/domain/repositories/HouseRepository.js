const House = require('../entities/House');

class HouseRepository {
    constructor() {
        this.houses = {
            Gryffindor: new House('Gryffindor'),
            Hufflepuff: new House('Hufflepuff'),
            Ravenclaw: new House('Ravenclaw'),
            Slytherin: new House('Slytherin')
        };
    }

    getHouseByName(name) {
        return this.houses[name];
    }

    incrementHousePoints(name, points = 5) {
        const house = this.getHouseByName(name);
        if (!house) {
            throw new Error('House not found');
        }
        const newPoints = house.incrementPoints(points);
        return newPoints;
    }

    getAllHouses() {
        return Object.values(this.houses);
    }
}

module.exports = HouseRepository;
