// Initialize tiles
const tiles = [];
let data = [0, 0, 0, 0, 0, 0, 0, 0, 0]

let tileNames = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
tileNames.forEach(tileName => addTile(tileName));

function addTile(name)
{
    let square = document.getElementsByClassName(name)[0];
    tiles.push(square);
}

// Listen for click events
for(let i = 0; i < tiles.length; ++i)
{
    tiles[i].addEventListener("click", () => processMove(i));
}

let newGameButton = document.getElementsByClassName("new_game")[0];
newGameButton.addEventListener("click", initNewGame);

let resetButton = document.getElementsByClassName("reset")[0];
resetButton.addEventListener("click", resetGame);

let playModeButton = document.getElementsByClassName("play_mode")[0];
playModeButton.addEventListener("click", changePlayMode);

// Start timer
const timePerTurn = 30;  // time in seconds before turn is skipped
let timerValue = timePerTurn;
const timerInterval = 0.1;
let timerText = document.getElementsByClassName("timer")[0];
setInterval(handleTimer, timerInterval * 1000);

let pause = false;  // paused in the event of a skipped turn

function handleTimer()
{
    if(pause)
    {
        return;
    }

    if(gameIsOver)
    {
        timerValue = timePerTurn;
        timerText.innerHTML = timerValue;
        return;
    }

    timerValue -= timerInterval;
    if(timerValue <= 0)
    {
        timerValue = 0;
        timerText.innerHTML = "Out of time!";
        pause = true;
        setTimeout(startNewTurn, 30000); // skip to new turn after 30 seconds of showing out of time prompt
    }
    else
    {
        timerText.innerHTML = timerValue.toFixed(1);
    }
}

// Other variables
let playMode = "Human";     // can be human or AI

let gameIsOver = false;
let noOneWins = false;
let scoreX = 0;
let scoreO = 0;
let textPrompt = document.getElementsByClassName("whose_turn")[0];
let isXsTurn = true;    // X always starts
let letter = "X";

// Functions for handling input
function initNewGame()
{
    gameIsOver = false;
    noOneWins = false;
    isXsTurn = true;
    letter = "X";
    textPrompt.innerHTML = "It's your turn, " + letter + ".";

    data = [0, 0, 0, 0, 0, 0, 0, 0, 0]

    for(let i = 0; i < tiles.length; ++i)
    {
        let textElement = tiles[i].getElementsByClassName("xo")[0];
        textElement.innerHTML = "";
        tiles[i].style.backgroundColor = "pink";
    }

    timerValue = timePerTurn;
}

function resetGame()
{
    scoreX = 0;
    scoreO = 0;
    updateScores();
    initNewGame();
}

function startNewTurn()
{
    timerValue = timePerTurn;
    
    isXsTurn = !isXsTurn;
    updateLetter();
    textPrompt.innerHTML = "It's your turn, " + letter + ".";

    pause = false;
    if(playMode == "AI" && !isXsTurn)
    {
        playAITurn();
    }
}

// Main logic for game executed through this function
function processMove(tileNum)
{
    // Don't process move if clicked already occupied tile, game is over or paused
    if(data[tileNum] != 0 || gameIsOver || pause)
    {
        return;
    }

    markTile(tileNum);

    checkWin();
    noOneWins = isBoardFull();

    if(gameIsOver)
    {
        updateScores();
        displayWinPrompt();
    }
    else
    {
        // Reset timer
        timerValue = timePerTurn;

        // Switch turn
        isXsTurn = !isXsTurn;
        updateLetter();

        // Update text prompt
        textPrompt.innerHTML = "It's your turn, " + letter + ".";

        if(playMode == "AI")
        {
            if(!isXsTurn)
            {
                playAITurn();
            }
        }
    }
}

function playAITurn()
{
    // Play the AI's turn
    let AIsTurn = 0;
    do
    {
        AIsTurn = Math.floor(Math.random() * 9);    // 9 because there are 9 tiles
    } while(data[AIsTurn] != 0);
    processMove(AIsTurn);
}

function markTile(tileNum)
{
    data[tileNum] = letter;
    console.log(data);
    tiles[tileNum].style.backgroundColor = "rgb(236, 124, 142)";
    let textElement = tiles[tileNum].getElementsByClassName("xo")[0];
    textElement.innerHTML = letter;
}

function updateLetter()
{
    letter = "X";
    if(!isXsTurn)
    {
        letter = "O";
    }
}

function updateScores()
{
    let scoreXText = document.getElementsByClassName("scoreX")[0];
    scoreXText.innerHTML = scoreX;

    let scoreOText = document.getElementsByClassName("scoreO")[0];
    scoreOText.innerHTML = scoreO;
}

function checkWin()
{
    let currentLetterWins = false;

    for(let i = 0; i < 3; ++i)
    {   
        // Check vertical
        if(data[i*3] != 0 &&
            data[i*3] === data[i*3+1] && data[i*3+1] === data[i*3+2])
        {
            currentLetterWins = true;
        }

        // Check horizontal
        if(data[i] != 0 &&
            data[i] === data[i+3] && data[i+3] === data[i+6])
        {
            currentLetterWins = true;
        }
    }

    // Check diagonals
    if(data[0] != 0 &&
        data[0] === data[4] && data[4] === data[8])
    {
        currentLetterWins = true;
    }

    if(data[2] != 0 &&
        data[2] === data[4] && data[4] === data[6])
    {
        currentLetterWins = true;
    }

    if(currentLetterWins)
    {
        console.log(letter + " wins!");
        
        gameIsOver = true;
        if(isXsTurn)
        {
            ++scoreX;
        }
        else
        {
            ++scoreO;
        }
    }
}

function isBoardFull()
{
    if(gameIsOver)
    {
        return false;
    }

    for(let i = 0; i < data.length; ++i)
    {
        if(data[i] == 0)
        {
            return false;
        }
    }

    gameIsOver = true;
    return true;
}

function displayWinPrompt()
{
    let textPrompt = document.getElementsByClassName("whose_turn")[0];
    if(noOneWins)
    {
        letter = "No one "
    }
    textPrompt.innerHTML = letter + " won!";
}

function changePlayMode()
{
    // Update text to be able to play against old playMode
    playModeButton.innerHTML = "Play against " + playMode;

    if(playMode == "Human")
    {
        playMode = "AI";
        if(!isXsTurn)
        {
            playAITurn();
        }
    }
    else
    {
        playMode = "Human";
    }
}