

function startGame() {
    btn = document.getElementById('start-btn')
    btn.style.display = 'none'
    setTimeout(() => {
        start = true
    }, 300);

}

function replay() {
    btn = document.getElementById('replay-btn')
    btn.style.display = 'none'
    gameOver = false
    setTimeout(() => {

        start = true

    }, 1000);
}

checkGameOver = setInterval(() => {
    if (gameOver) {

        btn = document.getElementById('replay-btn')
        btn.style.display = 'unset'

    }
}, 1000);