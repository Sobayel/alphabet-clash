// function play(){
    // step-1: hide the home screen to hide the screen add the class hidden to the home section
//     const homeSection = document.getElementById('home-screen');
//     homeSection.classList.add('hidden') 
    // console.log(homeSection.classList);

    // step-2: show the playground
//     const playgroundSection =document.getElementById('play-ground');
//     playgroundSection.classList.remove('hidden');
    // console.log(playgroundSection.classList);
// }
const audio = new Audio(); 

let isGamePLayOn = false;

function handlerKeyboardButtonPress(event){
    if (isGamePLayOn == false) return;
    const playerPressed = event.key;
    console.log('player pressed',playerPressed);

    // stop the game if pressed 'esc'
    if(playerPressed === 'Escape'){
        gameOver();
    }

    // get the expected to press
    const currentAlphabetElement = document.getElementById('current-alphabet');
    const currentAlphabet = currentAlphabetElement.innerText;
    const expectedAlphabet = currentAlphabet.toLowerCase();
    // console.log(playerPressed, expectedAlphabet);

    // key right or wrong pressed
    if(playerPressed === expectedAlphabet){
        console.log('you get a point');

        // right key audio add
        audio.src ="../audio/succses.wav";
        audio.play();

        const currentScore = getTextElementValueById('current-score')
        const updatedScore = currentScore + 1;
        setTextElementValueById('current-score', updatedScore);

        // .....................................................................
        // update score
        // 1. get the current score 
        // const currentScoreElement = document.getElementById('current-score');
        // const currentScoreText = currentScoreElement.innerText;
        // const currentScore = parseInt(currentScoreText);
        // console.log(currentScore);
        // 2. increase the score by 1
        // const newScore = currentScore + 1;
        // 3. show the updated score
        // currentScoreElement.innerText = newScore;

        // start a new round
        removeBackgroundColorById(expectedAlphabet);
        continueGame();
    }
    else{
        console.log('you missed. you lost a life');

        // wrong key audio add
        audio.src ="../audio/error.wav";
        audio.play();

        const currentLife = getTextElementValueById('current-life')
        const updatedLife = currentLife - 1;
        setTextElementValueById('current-life', updatedLife);

        if(updatedLife === 0){
            gameOver();
        }
        // ...................................................................
        // step-1: get the current life number
        // const currentLifeElement = document.getElementById('current-life');
        // const currentLifeText = currentLifeElement.innerText;
        // const currentLife = parseInt(currentLifeText);
        // step-2: reduce the life count
        // const newLife = currentLife - 1;
        // step-3: display the update life count
        // currentLifeElement.innerText = newLife;
    }
}
// capture keyboard key press
document.addEventListener('keyup', handlerKeyboardButtonPress);

function continueGame(){
    // step-1: generate a random alphabet
    const alphabet = getRandomAlphabet();
    // console.log('your random alphabet', alphabet);

    // set randomly alphabet to the screen alphabet (show it)
    const currentAlphabetElement = document.getElementById('current-alphabet');
    currentAlphabetElement.innerText = alphabet;

    // set background color
    setBackgroundColorById(alphabet);
}

function play(){
    // hide everything shoe only the playground
    hideElementById('home-screen');
    hideElementById('final-score');
    showElementById('play-ground');


    // reset score and life
    setTextElementValueById('current-life', 7);
    setTextElementValueById('current-score', 0);
    isGamePLayOn = true;
    continueGame();
}

function gameOver(){
    hideElementById('play-ground');
    showElementById('final-score');

    // update final score
    const gameScore = getTextElementValueById('current-score');
    setTextElementValueById('game-score',gameScore);

    // clear the last selected alphabet highlight
    const currentAlphabet = getElementTextById('current-alphabet');
    removeBackgroundColorById(currentAlphabet);
    isGamePLayOn = false;
}