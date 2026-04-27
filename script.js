const testWrapper = document.querySelector(".test-wrapper");
const testArea = document.querySelector("#test-area");
let originText = document.querySelector("#origin-text p").innerHTML;
const resetButton = document.querySelector("#reset");
const theTimer = document.querySelector(".timer");

const textSamples = [
    "Terry Teeter, a teeter-totter teacher, taught her daughter Tara to teeter-totter, but Tara Teeter didn't teeter-totter as Terry Teeter taught her to.",
    "How much wood would a woodchuck chuck if a woodchuck could chuck wood? If a woodchuck could chuck wood, he would chuck as much wood as a woodchuck would if a woodchuck could chuck wood.",
    "Peter Piper picked a peck of pickled peppers. A peck of pickled peppers Peter Piper picked. If Peter Piper picked a peck of pickled peppers, where's the peck of pickled peppers Peter Piper picked?",
    "Betty Botter bought some butter, but she said the butter's bitter. If I put it in my batter, it will make my batter bitter, but a bit of better butter will make my batter better. So 'twas better Betty Botter bought a bit of better butter.",
    "Sally Shore sells seashells by the seashore. The shells she sells are surely seashells. So if she sells shells on the seashore, I'm sure she sells seashore shells."
];

let timer = [0, 0, 0];
let interval;
let timerRunning = false;

// Add leading zero to numbers 9 or below (purely for aesthetics):
function leadingZero(time) {
  if (time <= 9) {
    time = "0" + time;
  }
  return time;
}

// Run a standard minute/second/hundredths timer:
function runTimer() {
    let currentTime = leadingZero(timer[0]) + ":" + leadingZero(timer[1]) + ":" + leadingZero(timer[2]);
    theTimer.innerHTML = currentTime;
    timer[2]++;
    if (timer[2] == 100) {
        timer[1]++;
        timer[2] = 0;
    }
    if (timer[1] == 60) {
        timer[0]++;
        timer[1] = 0;
    }
}

// Match the text entered with the provided text on the page:
function spellCheck() {
    let textEntered = testArea.value;
    let originTextMatch = originText.substring(0, textEntered.length);
    
    if (textEntered === originText) {
        clearInterval(interval);
        testWrapper.style.borderColor = "green";
    }
    else {
        if (textEntered === originTextMatch) {
            testWrapper.style.borderColor = "blue";
        }
        else {
            testWrapper.style.borderColor = "red";
        }
    }
}

// Start the timer:
function start() {
    let textEnteredLength = testArea.value.length;
    if (textEnteredLength === 0 && !timerRunning) {
        timerRunning = true;
        interval = setInterval(runTimer, 10);
    }
}

// Load a new text sample:
function loadNewText() {
    let randomIndex = Math.floor(Math.random() * textSamples.length);
    originText = textSamples[randomIndex];
    document.querySelector("#origin-text p").innerHTML = originText;
}
// Reset everything:
function reset() {
    clearInterval(interval);
    interval = null;
    timer = [0, 0, 0];
    timerRunning = false;

    testArea.value = "";
    theTimer.innerHTML = "00:00:00";
    testWrapper.style.borderColor = "grey";
    loadNewText();
}

// Event listeners for keyboard input and the reset button:
testArea.addEventListener("keypress", start);
testArea.addEventListener("keyup", spellCheck);
resetButton.addEventListener("click", reset);