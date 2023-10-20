let random = require("./random");
module.exports = class GrassEater extends LivingCreature {
    constructor(x, y) {
        super(x,y)
        this.energy = 8;
        this.directions = [];
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];

    }
    chooseCell(character, character2) {
        this.getNewCoordinates()
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {

                if (matrix[y][x] == character || matrix[y][x] == character2) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }

    mul() {
        var emptyCells = this.chooseCell(0);
        var newCell = random(emptyCells);

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 2;

            var newGrass = new GrassEater(newX, newY);
            grassEaterArr.push(newGrass);
            this.energy = 8;
        }
    }

    move() {
        this.energy--
        var emptyCells = this.chooseCell(0);
        var newCell = random(emptyCells);
        if (newCell && this.energy >= 0) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = matrix[this.y][this.x]
            matrix[this.y][this.x] = 0;
            this.x = newX
            this.y = newY
        } else {
            this.die()
        }
    }

    eat() {
        var emptyCells = this.chooseCell(1, 5);
        var newCell = random(emptyCells);
        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            if (matrix[newY][newX] === 1) {
                this.energy++
                matrix[newY][newX] = matrix[this.y][this.x]
                matrix[this.y][this.x] = 0;
                this.x = newX
                this.y = newY

                if (this.energy > 15) {
                    this.mul()
                }

                for (var i in grassArr) {
                    if (newX == grassArr[i].x && newY == grassArr[i].y) {
                        grassArr.splice(i, 1);
                        break;
                    }
                }

            }
        
        else if(matrix[newY][newX] === 5){
            this.energy += 7
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = matrix[this.y][this.x]
            matrix[this.y][this.x] = 0;
            this.x = newX
            this.y = newY
            if (this.energy > 8) {
                this.mul()
            }


            for (var i in hpointArr) {
                if (newX == hpointArr[i].x && newY == hpointArr[i].y) {
                    hpointArr.splice(i, 1);
                    break;
                }
            }
        }
    }
        else {
            this.move()
        }
    }
    // heal() {
    //     var emptyCells = this.chooseCell(5);
    //     var newCell = random(emptyCells);
    //     console.log('dhsgklds');
    //     if (newCell) {
    //         this.energy += 7
    //         var newX = newCell[0];
    //         var newY = newCell[1];
    //         matrix[newY][newX] = matrix[this.y][this.x]
    //         matrix[this.y][this.x] = 0;
    //         this.x = newX
    //         this.y = newY
    //         for (var i in hpointArr) {
    //             if (newX == hpointArr[i].x && newY == hpointArr[i].y) {
    //                 hpointArr.splice(i, 1);
    //                 break;
    //             }
    //         }
    //     }
    // }


    die() {
        matrix[this.y][this.x] = 0;
        for (var i in grassEaterArr) {
            if (this.x == grassEaterArr[i].x && this.y == grassEaterArr[i].y) {
                grassEaterArr.splice(i, 1);
                break;
            }
        }
    }
}