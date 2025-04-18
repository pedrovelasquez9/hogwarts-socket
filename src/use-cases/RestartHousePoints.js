class RestartHousePoints {
    constructor(houseRepository) {
        this.houseRepository = houseRepository;
    }

    execute(houseName) {
        return this.houseRepository.restartHousePoints(houseName);
    }
}

module.exports = RestartHousePoints;
