class House {
    constructor(name, maxPoints = 100) {
        this.name = name;
        this.points = 0;
        this.maxPoints = maxPoints;
    }

    incrementPoints(points = 5) {
        if (this.points + points <= this.maxPoints) {
            this.points += points;
        } else {
            this.points = this.maxPoints;
        }
        return this.points;
    }
}

module.exports = House;
