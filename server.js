var express = require("express");

var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static("../programming3"));

app.get("/", function (req, res) {
    res.redirect("index.html");
});

server.listen(3000, function () {
    console.log("Example is running on port 3000");
});

matrix = [];
grassArr = [];
grassEaterArr = [];
predatorArr = [];
bombArr = [];
hpointArr = [];
side = 60;

LivingCreature = require("./LivingCreature")
Grass = require("./grass")
Bomb = require("./bomb")
GrassEater = require("./grassEater")
Hpoint = require("./hpoint")
Predator = require("./predator")

var cl = false;
io.on("connection", function (socket) {
    if (cl) {
        setInterval(drawserver, 200);
        cl = true;
    }
});

function generateMatrix(matLength, gr, grEa, pr, bm, hp) {
    for (let i = 0; i < matLength; i++) {
        matrix.push([])
        for (let j = 0; j < matLength; j++) {
            matrix[i].push(0)
        }
    }
    for (let i = 0; i < gr; i++) {
        let x = Math.floor(Math.random() * matLength);
        let y = Math.floor(Math.random() * matLength);
        if (matrix[y][x] == 0) {
            matrix[x][y] = 1;
        }
    }
    for (let i = 0; i < grEa; i++) {
        let x = Math.floor(Math.random() * matLength);
        let y = Math.floor(Math.random() * matLength);
        if (matrix[y][x] == 0) {
            matrix[x][y] = 2;
        }
    }
    for (let i = 0; i < pr; i++) {
        let x = Math.floor(Math.random() * matLength);
        let y = Math.floor(Math.random() * matLength);
        if (matrix[y][x] == 0) {
            matrix[x][y] = 3;
        }
    }
    for (let i = 0; i < bm; i++) {
        let x = Math.floor(Math.random() * matLength);
        let y = Math.floor(Math.random() * matLength);
        if (matrix[y][x] == 0) {
            matrix[x][y] = 4;
        }
    }
    for (let i = 0; i < hp; i++) {
        let x = Math.floor(Math.random() * matLength);
        let y = Math.floor(Math.random() * matLength);
        if (matrix[y][x] == 0) {
            matrix[x][y] = 5;
        }
    }

    return matrix;
}
matrix = generateMatrix(15, 60, 20, 6, 3, 10)

for (var y = 0; y < matrix.length; y++) {
    for (var x = 0; x < matrix[y].length; x++) {
        if (matrix[y][x] == 1) {
            let gr = new Grass(x, y);
            grassArr.push(gr)
        } else if (matrix[y][x] == 2) {
            let grEat = new GrassEater(x, y);
            grassEaterArr.push(grEat)
        }
        else if (matrix[y][x] == 3) {
            let pr = new Predator(x, y);
            predatorArr.push(pr)
        }
        else if (matrix[y][x] == 4) {
            let bm = new Bomb(x, y);
            bombArr.push(bm);
        }
    }
}

function drawserver() {
    for (let i in grassArr) {
        grassArr[i].mul()
    }

    for (let i in grassEaterArr) {
        grassEaterArr[i].eat()
    }
    for (let i in predatorArr) {
        predatorArr[i].eat()
    }
    for (let i in bombArr) {
        bombArr[i].bomb()
    }

    let sendData = {
        matrix: matrix
    }
    io.sockets.emit("matrix", sendData)
}

setInterval(drawserver, 1000)


