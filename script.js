const gameContainer = document.getElementById("game");

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}


// we set variable first and second card is not clicked yet
let firstCard = null; 
let secondCard = null; 
// wait is set to false as default. It allows user to set new card.
let wait = false;
let score = 0;  
let lowestScore = localStorage.getItem("lowestScore") || 0;

function updateScore() {
  document.getElementById('score').textContent = score; 
}
function updateLowestScore() {
  if (score > lowestScore) {
    lowestScore = score;
    localStorage.setItem("lowestScore", lowestScore); 
  }
}

// TODO: Implement this function!
function handleCardClick(event) {
// you can use event.target to see which element was clicked
  console.log("you just clicked", event.target);

  // to avoid selecting three cards when guessing a match. Users should only be able to select two cards.s
  // if wait is true then you are not able to click on more than two cards.
  if (wait) {
    return
  }
  
  if (firstCard === null) {
  // this captures the first card clicked and sets its color
  console.log('this is the first card'); 
  firstCard = event.target; 
  firstCard.style.backgroundColor = firstCard.className;
  return;
  }
  if (secondCard === null){
    console.log('this is the second card')
    secondCard = event.target; 
    secondCard.style.backgroundColor = secondCard.className; 
  }
  // if both cards are selected we go into if statement
  if (firstCard && secondCard) {
    wait = true; 
    // wait is set to true to prevent from clicking on the third card
    if (firstCard === secondCard) {
      // there is no match on clicking on the same card. 
      // so return and reset second card. 
      console.log("second card cannot be the same as first card!")
      // second card will be set to null so user can choose a second card
      secondCard = null; 
      wait = false; 
      // set to false to allow user to select a new card. 
      return; // exists the function
    }
    if (firstCard.className === secondCard.className) {
      console.log("Found a match!"); 
      // it prevents from clicking on the card that was already matched.
      firstCard.removeEventListener('click', handleCardClick);
      secondCard.removeEventListener('click', handleCardClick);
      firstCard = null;
      secondCard = null; 
      wait = false; 
// wait is set to false so user can choose new cards. If the cards don't match we set Timeout.

      score ++; 
      updateScore(); 
      updateLowestScore();
      
      
    } else {
      setTimeout(function() {
firstCard.style.backgroundColor = ''; 
secondCard.style.backgroundColor = ''; 
firstCard = null; 
secondCard = null; 
// user can choose new cards. 
wait = false; 
      }, 1000); 
      }    
    }
    }
    

// when the DOM loads
createDivsForColors(shuffledColors);
