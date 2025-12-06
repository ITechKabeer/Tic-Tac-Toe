let username1 = prompt("Please enter Player 1 name. (Optional)")
const sound = new Audio("sounds/Click.mp3")
const drawSound = new Audio("sounds/WA.mp3")
const winSound = new Audio("sounds/win.wav")
const loseSound = new Audio("sounds/awww.mp3")
const whooshSound = new Audio("sounds/Whoosh.mp3")
const boxes = document.querySelectorAll(".box")
const restartBtn = document.getElementsByClassName("restart-btn")
const p1Name = document.getElementsByClassName("p-1")
const p2Name = document.getElementsByClassName("p-2")
const mainContainer = document.getElementById("game-container")
const drawLine = document.getElementsByClassName("draw-line")
const winCard = document.getElementById("win-card")
const winnerLine = document.getElementsByClassName("winner-line")
const winnerImg = document.querySelector(".winner-img img")
const newBtn = document.querySelector(".new-btn")
let count = 0
let winner = ""
const winnerPattern = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
]

localStorage.setItem("Player1", username1)
if(!username1){
    p1Name[0].innerText = `Player`
}else{
    p1Name[0].innerText = `${username1}`
}

player1 = true
p1Name[0].classList.add("active-player")
player2 = false
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        count++
        if(player1){
            box.innerText = "X"
            player1 = false;
            player2 = true
            p1Name[0].classList.remove("active-player")
            p2Name[0].classList.add("active-player")
            box.classList.add("box-x")
            sound.play()
            box.disabled = true
            let isWinner = winnerCheck()
            if(isWinner){
                showWinner()
            }else if(count === 9){
            drawMatch()
            }else {
                setTimeout(() => {
                    computerMove();
                }, 2000);
            }
        }
        box.disabled = true
    })
})

function computerMove(){
    let availible = [];
    boxes.forEach((box,index) => {
        if(box.innerText === "") availible.push(index)
        })
    if(availible.length === 0){ return }
    let randomMove = Math.floor(Math.random() *availible.length)
    let box = boxes[availible[randomMove]]
    count++
    box.innerText = "O"
    player2 = false;
    player1 = true
    box.classList.add("box-o")
    p2Name[0].classList.remove("active-player")
    p1Name[0].classList.add("active-player")
    let isWinner = winnerCheck()
    if(isWinner){
        showWinner()
    }else if(count === 9){
        drawMatch()
    }
    sound.play()
    box.disabled = true
}


function winnerCheck(){
    for (const pattern of winnerPattern) {
        let box1Value = boxes[pattern[0]].innerText;
        let box2Value = boxes[pattern[1]].innerText;
        let box3Value = boxes[pattern[2]].innerText;
        if(box1Value !== "" && box2Value !== "" && box3Value !== ""){
            if(box1Value == box2Value && box2Value == box3Value){
                winner = box1Value;
                disableBoxes()
                boxes[pattern[0]].classList.add("game-box2");
                boxes[pattern[1]].classList.add("game-box2");
                boxes[pattern[2]].classList.add("game-box2");
                return true
            }
        }
    }
    return false
}

function showWinner(){
    setTimeout(() => {
    mainContainer.classList.add("hide")
    winCard.classList.remove("hide")
    if(winner === "X"){
        if(!username1){
            winnerLine[0].innerHTML = `🎉 Congratulations <b>Player!</b> You did it!`
        }else{
            winnerLine[0].innerHTML = `🎉 Congratulations ${username1}! You did it!`
        }
        winnerImg.src = "assets/img/winner.gif"
        confetti({
            particleCount: 200,
            spread: 90,
            origin: { y: 0.6 }
        });
        winSound.play()
        winSound.currentTime = 0;
    }else{
            winnerImg.src = "assets/img/sad.gif"
            winnerLine[0].innerHTML = `😔 Oops… Computer won this time. Try again, you got this!`
            loseSound.play()
            loseSound.currentTime = 0;
    }
    }, 1000)
}

function drawMatch(){
    drawLine[0].classList.remove("hide")
    drawLine[0].innerHTML = "🤝 It's a Draw! Great Match!"
    disableBoxes()
    drawSound.play()
    drawSound.currentTime = 0;
}

function disableBoxes(){
    boxes.forEach((box) => {
        box.disabled = true
    })
}

function enableBoxes(){
    boxes.forEach((box) => {
        box.disabled = false
        box.innerText = ""
        box.classList.remove("game-box2")
        box.classList.remove("box-x")
        box.classList.remove("box-o")
        drawLine[0].classList.add("hide")
    })
}

newBtn.addEventListener("click", () => {
    whooshSound.play()
    mainContainer.classList.remove("hide")
    winCard.classList.add("hide")
    enableBoxes()
    player1 = true
    player2 = false
    p1Name[0].classList.add("active-player")
    p2Name[0].classList.remove("active-player")
    count = 0
})

restartBtn[0].addEventListener("click", () => {
    whooshSound.play()
    enableBoxes()
    player1 = true
    player2 = false
    p1Name[0].classList.add("active-player")
    p2Name[0].classList.remove("active-player")
    count = 0
})