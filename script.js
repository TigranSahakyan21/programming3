socket = io();

var side = 62;
var matLength = 15
function setup() {
    frameRate(10);
    createCanvas(matLength * side, matLength * side);
    background('#acacac');
}

function drawmatrix(data) {
    matrix = data.matrix;

    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                fill("green");
            }
            else if (matrix[y][x] == 0) {
                fill("#acacac");
            } else if (matrix[y][x] == 2) {
                fill("yellow");
            } else if (matrix[y][x] == 3) {
                fill("red");
            } else if (matrix[y][x] == 4) {
                fill("black");
            } else if (matrix[y][x] == 5) {
                fill("#4DFF00");

            }

            rect(x * side, y * side, side, side);

        }
    }
}

socket.on("matrix", drawmatrix);





