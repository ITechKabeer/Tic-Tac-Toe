let username = localStorage.getItem("userName")
let body = document.body
let inputSlider = document.getElementById("themetoggle")
let welcomeLine = document.getElementsByClassName("welcome-line")
const savedTheme = localStorage.getItem("QuickTheme")

if(savedTheme === 'dark'){
    body.classList.add('dark-theme')
    inputSlider.checked = true;
}else if(savedTheme === 'light'){
    body.classList.remove('dark-theme')
    inputSlider.checked = false;
}

function themeChange() {
    body.classList.toggle("dark-theme")

    if(body.classList.contains("dark-theme")){
        localStorage.setItem("QuickTheme" , "dark")
    }else{
        localStorage.setItem("QuickTheme" , "light")
    }
}

if(!username){
    do{
        username = prompt("Please enter Your Name to start quiz app")
        if(username == null){
            username = "";
        }
    }while(username.trim() === "")
    localStorage.setItem("userName" , username)
}

if(welcomeLine.length > 0){
    welcomeLine[0].innerHTML = `Welcome ${username}! React Fast. Win Faster.`;
}