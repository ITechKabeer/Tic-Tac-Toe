let username1 = prompt("Please enter Player 1 name. (Optional)")
let username2 = prompt("Please enter Player 2 name. (Optional)")
const sound = new Audio("sounds/Click.mp3")
const drawSound = new Audio("sounds/WA.mp3")
const winSound = new Audio("sounds/win.wav")
const whooshSound = new Audio("sounds/Whoosh.mp3")
const boxes = document.querySelectorAll(".box")
const restartBtn = document.getElementsByClassName("restart-btn")
const p1Name = document.getElementsByClassName("p-1")
const p2Name = document.getElementsByClassName("p-2")
const mainContainer = document.getElementById("game-container")
const winCard = document.getElementById("win-card")
const drawLine = document.getElementsByClassName("draw-line")
const winnerLine = document.getElementsByClassName("winner-line")
const newBtn = document.querySelector(".new-btn")
let count = 0;
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
localStorage.setItem("Player2", username2)
if(!username1){
    p1Name[0].innerText = `Player 1`
}else{
    p1Name[0].innerText = `${username1}`
}

if(!username2){
    p2Name[0].innerText = `Player 2`
}else{
    p2Name[0].innerText = `${username2}`
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
            let isWinner = winnerCheck()
            if(isWinner){
                showWinner()
            }
            if(count === 9 && !isWinner){
                drawMatch()
            }
        }else{
            box.innerText = "O"
            player2 = false;
            player1 = true
            box.classList.add("box-o")
            p2Name[0].classList.remove("active-player")
            p1Name[0].classList.add("active-player")
            let isWinner = winnerCheck()
            if(isWinner){
                showWinner()
            }
            if(count === 9 && !isWinner){
                drawMatch()
            }
        }
        sound.play()
        box.disabled = true
    })
})

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
            winnerLine[0].innerHTML = `🎉 Congratulations <b>Player 1!</b> You did it!`
        }else{
            winnerLine[0].innerHTML = `🎉 Congratulations ${username1}! You did it!`
        }
    }else{
        if(!username2){
            winnerLine[0].innerHTML = `🎉 Congratulations <b>Player 2!</b> You did it!`
        }else{
            winnerLine[0].innerHTML = `🎉 Congratulations ${username2}! You did it!`
        }
    }
    confetti({
        particleCount: 200,
        spread: 90,
        origin: { y: 0.6 }
    });
    winSound.play()
    winSound.currentTime = 0;
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
    count = 0
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
})


restartBtn[0].addEventListener("click", () => {
    whooshSound.play()
    enableBoxes()
    player1 = true
    player2 = false
    p1Name[0].classList.add("active-player")
    p2Name[0].classList.remove("active-player")
})
