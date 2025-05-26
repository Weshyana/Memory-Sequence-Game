const startButton = document.getElementById('start');
const grid = document.getElementById('grid');
const message = document.getElementById('message');
const scoreDisplay = document.getElementById('score');
const buttons = document.querySelectorAll('.button');

let sequence = [];
let playerSequence = [];
let score = 0;
let isPlayerTurn = false;

startButton.addEventListener('click', startGame);

function startGame() {
    sequence = [];
    playerSequence = [];
    score = 0;
    updateScore();
    message.textContent = 'Watch the sequence';
    startButton.disabled = true;
    nextRound();
}

function nextRound() {
    sequence.push(Math.floor(Math.random() * 4));
    playerSequence = [];
    playSequence();
}

function playSequence() {
    let i = 0;
    const interval = setInterval(() => {
        if (i < sequence.length) {
            const button = buttons[sequence[i]];
            highlightButton(button);
            i++;
        } else {
            clearInterval(interval);
            setTimeout(() => {
                message.textContent = 'Your turn';
                isPlayerTurn = true;
            }, 500);
        }
    }, 1000);
}

function highlightButton(button) {
    button.classList.add('active');
    setTimeout(() => {
        button.classList.remove('active');
    }, 500);
}

grid.addEventListener('click', (event) => {
    if (!isPlayerTurn) return;
    const button = event.target;
    if (button.classList.contains('button')) {
        const id = parseInt(button.dataset.id);
        playerSequence.push(id);
        highlightButton(button);
        checkPlayerInput();
    }
});

function checkPlayerInput() {
    const currentStep = playerSequence.length - 1;
    if (playerSequence[currentStep] !== sequence[currentStep]) {
        endGame();
    } else if (playerSequence.length === sequence.length) {
        score++;
        updateScore();
        isPlayerTurn = false;
        message.textContent = 'Correct! Watch the next sequence';
        setTimeout(nextRound, 1000);
    }
}

function endGame() {
    isPlayerTurn = false;
    message.textContent = `Game Over! Your score: ${score}. Click Start to play again`;
    startButton.disabled = false;
}

function updateScore() {
    scoreDisplay.textContent = `Score: ${score}`;
}
