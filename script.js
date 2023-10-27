
socket = io();

let statisticobj = {}
let colorobj = {
    green: "green",
    yellow: "yellow",
    red: "red",
    black: "black",
    kanach: "#4DFF00",
    gray: "gray"
}



var side = 62;
var matLength = 15
function setup() {
    frameRate(10);
    createCanvas(matLength * side, matLength * side);
    background('#acacac');
}

function drawmatrix(matrix) {

    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                fill(colorobj.green);
            }
            else if (matrix[y][x] == 0) {
                fill(colorobj.gray);
            } else if (matrix[y][x] == 2) {
                fill(colorobj.yellow);
            } else if (matrix[y][x] == 3) {
                fill(colorobj.red);
            } else if (matrix[y][x] == 4) {
                fill(colorobj.black);
            } else if (matrix[y][x] == 5) {
                fill(colorobj.kanach);

            }

            rect(x * side, y * side, side, side);

        }
    }
}

socket.on("matrix", drawmatrix);


socket.on("statobj", function (st) {
    statisticobj = st
    stat.innerHTML = `Grass: ${statisticobj.grass} ;
    Eater: ${statisticobj.grassEater} ;
    bombs: ${statisticobj.bomb} ;
    predators: ${statisticobj.predator} ;
    Hpoints: ${statisticobj.hpoint}
    `
})

// var jsonfile = JSON.stringify(statisticobj)

// console.log(statisticobj)

let stat = document.getElementById("stat-grass")

const spring = document.getElementById("spring")
spring.addEventListener("click",changeWeather )
const winter = document.getElementById("winter")
winter.addEventListener("click",changeWeather )
const summer = document.getElementById("summer")
summer.addEventListener("click",changeWeather )
const autumn = document.getElementById("autumn")
autumn.addEventListener("click",changeWeather )


function changeWeather(){
    if(spring.innerText === "spring"){
        colorobj.green = "#0EDB07"
        colorobj.yellow = "orange"
        colorobj.kanach = "white"

    }
    else if(winter.innerText === "winter"){
        colorobj.green = "white"
        colorobj.yellow = "red"
        colorobj.red = "#B35A94"
    }
    else if(summer.innerText === "summer" ){
        colorobj.green = "#A0BB26"
        colorobj.yellow = "purple"
        colorobj.red = "#00778E"
    }
    else if(autumn.innerText === "autumn"){
        colorobj.green = "green"
        colorobj.yellow = "yellow"
        colorobj.red = "#red"
    }

}










