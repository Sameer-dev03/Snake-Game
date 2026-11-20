const gameboard = document.querySelector(".game-board")
let blockwidth = 50
let blockheight = 50
let ResetScreen = document.querySelector(".ResetScreen")
let resetBtn = document.querySelector(".reset")

let cols = Math.floor(gameboard.clientWidth / blockwidth)
let rows = Math.floor(gameboard.clientHeight / blockheight)
let startBtn = document.querySelector(".styled-button")
let WelcomeScreen = document.querySelector(".WelcomeScreen")
let scoreNum = document.querySelector(".scrore")
let timer = document.querySelector(".timer")

let blocks = []
let direction = "down"
let snack = [
    {
        x: 1,
        y: 3,
    },
    {
        x: 1,
        y: 4,
    },
    {
        x: 1,
        y: 5,
    }
]

let scrore = 0
let time = `00-00`

let hight = document.querySelector(".Hight")
let hightScrore = Number(localStorage.getItem("hightScrore")) || 0
hight.innerText = hightScrore





let food = {
    x: Math.floor(Math.random() * rows),
    y: Math.floor(Math.random() * cols)
}

const worng = new Audio("./wrongtype.mp3")

for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
        let block = document.createElement("div")
        block.classList.add("block")
        gameboard.appendChild(block)
        blocks[`${row}-${col}`] = block
        
    }
}

function snackrun() {
    snack.forEach(snackpoint => {
        blocks[`${snackpoint.x}-${snackpoint.y}`].classList.add("fill")
    })
}



function runNow() {

    let snackRun = setInterval(() => {



        let head = null

        blocks[`${food.x}-${food.y}`].classList.add("food")
        if (direction === "left") {
            head = { x: snack[0].x, y: snack[0].y - 1 }
        }

        else if (direction === "right") {
            head = { x: snack[0].x, y: snack[0].y + 1 }

        }

        else if (direction === "up") {
            head = { x: snack[0].x - 1, y: snack[0].y }
        }

        else if (direction === "down") {
            head = { x: snack[0].x + 1, y: snack[0].y }
        }


        if (head.x < 0 || head.x >= rows || head.y < 0 || head.y >= cols) {
            ResetScreen.style.display = "flex"
            clearInterval(snackRun)
        }




        snack.forEach(snackpoint => {
            blocks[`${snackpoint.x}-${snackpoint.y}`].classList.remove("fill")
        })

        if (head.x == food.x && head.y == food.y) {
            blocks[`${food.x}-${food.y}`].classList.remove("food")

            scrore += 10

            food = {
                x: Math.floor(Math.random() * rows),
                y: Math.floor(Math.random() * cols)
            }

            scoreNum.innerText = scrore

            blocks[`${food.x}-${food.y}`].classList.add("food")

            snack.unshift(head)
        }



        if (scrore > hightScrore) {

            hightScrore = scrore
            localStorage.setItem("hightScrore", hightScrore);
            
        }

        snack.unshift(head)
        snack.pop()

        snackrun()


    }, 300);
}




resetBtn.addEventListener("click", function () {
    ResetScreen.style.display = "none"
    scrore = 0
    scoreNum.innerText = scrore
    snack = [
        {
            x: 1,
            y: 3,
        },
        {
            x: 1,
            y: 4,
        },
        {
            x: 1,
            y: 5,
        }
    ]
time = `00-00`

timer.innerText = time



    blocks[`${food.x}-${food.y}`].classList.remove("food")
    food = {
        x: Math.floor(Math.random() * rows),
        y: Math.floor(Math.random() * cols)
    }

hight.innerText = hightScrore
    direction = "down"

    runNow()

})


addEventListener("keydown", function (btn) {

    if (btn.key == "ArrowUp") {
        direction = "up"
    }

    else if (btn.key === "ArrowDown") {
        direction = "down"
    }

    else if (btn.key == "ArrowLeft") {
        direction = "left"
    }

    else if (btn.key == "ArrowRight") {
        direction = "right"
    }

    else {

        worng.play()
    }

    console.log(btn)

})


startBtn.addEventListener("click", function () {
    WelcomeScreen.style.display = "none"
let timerun = setInterval(()=>{
        let [min , sec] = time.split("-").map(Number)

        if(sec == 59){
            min += 1
            sec = 0
        }

        else{
            sec += 1
        }

time = `${min}-${sec}`
timer.innerText =  time

    },1000)
    runNow()

})
