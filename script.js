const mainTheme = new Audio('src/assets/audio/mainTheme.mp3')
mainTheme.volume = 0.3
let mute = false

function startGame() {
    btn = document.getElementById('start-btn')
    btn.style.display = 'none'
    setTimeout(() => {
        start = true
    }, 300);

    if (!mute) {

        mainTheme.play()
    }

}

function replay() {
    btn = document.getElementById('replay-btn')
    btn.style.display = 'none'
    gameOver = false
    setTimeout(() => {

        start = true

    }, 1000);
}

function changeSound(){
    let soundOn = document.getElementById('soundOn')
    let soundOff = document.getElementById('mute')
    if(mute){
        mainTheme.volume = 0.3
        soundOff.style.display = 'none'
        soundOn.style.display = 'unset'
        
    }else{
        mainTheme.volume = 0
        soundOff.style.display = 'unset'
        soundOn.style.display = 'none'
      
    }
    mute = !mute
}

checkGameOver = setInterval(() => {
    if (gameOver) {

        btn = document.getElementById('replay-btn')
        btn.style.display = 'unset'

    }
}, 1000);