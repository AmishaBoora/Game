let scoreH2 = document.getElementById('score');
let timeLeftH2 = document.getElementById('timeLeft');
let startNewGameButton = document.getElementById('startNewGame');
let pauseGameButton = document.getElementById('pauseGame');
let squares = document.querySelectorAll('.square');
let grid = document.getElementsByClassName('grid')[0];

let score = 0;
let timeLeft = 0;
let hitPosition = null;
let timerId = null;
let randomMoleId = null;

// randomly place mole
function randomMole() {
    squares.forEach(square =>{
        square.classList.remove('mole');
    })

    let randomSquare = squares[Math.floor(Math.random()*squares.length)];
    randomSquare.classList.add('mole');
    hitPosition = randomSquare.id;
   
}
randomMole();


function countDown(){
    timeLeft--;
    timeLeftH2.innerHTML=`Time Left : ${timeLeft}`;

    if(timeLeft === 0){
        clearInterval(timerId);
        clearInterval(randomMoleId);
        grid.style.display = 'none';
        pauseGameButton.style.display = 'none';
    }
}

function startGame() {
    pauseGameButton.style.display = 'inline-block';
    score = 0;
    timeLeft = 60;
    scoreH2.innerHTML = 'Your Score: 0';
    timeLeft.innerHTML = 'Time Left: 60';
    pauseGameButton.innerHTML = 'Pause';
    grid.style.display = 'grid';
    // callback function
    timerId =  setInterval(randomMole, 1000);
    randomMoleId = setInterval(countDown, 1000);
}

function pauseResumeGame() {
    if(pauseGameButton.innerHTML === 'Pause') { 
        clearInterval(timerId);
        clearInterval(randomMoleId);
        timerId = null;
        randomMoleId = null;
        pauseGameButton.innerHTML = 'Resume';
    }
    else {
        timerId =  setInterval(randomMole, 1000);
        randomMoleId = setInterval(countDown, 1000);
        pauseGameButton.innerHTML = 'Pause';
    }
}

squares.forEach(square => {
    square.addEventListener('mousedown', ()=>{
        if(timerId !== null) {
            if(square.id === hitPosition)
            {
                score++;
                scoreH2.innerHTML = `Your Score: ${score}`;
                hitPosition=null;
            }
        }
    } )
})


startNewGameButton.addEventListener('click', startGame);

pauseGameButton.addEventListener('click', pauseResumeGame);