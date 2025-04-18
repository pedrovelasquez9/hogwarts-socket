class IncrementHousePoints {
    constructor(houseRepository) {
        this.houseRepository = houseRepository;
    }

    execute(houseName, points = 5) {
        return this.houseRepository.incrementHousePoints(houseName, points);
    }
}

module.exports = IncrementHousePoints;
