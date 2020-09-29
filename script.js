//DOM queries
let playerDeckImage = document.getElementById("playerDeck");
let computerDeckImage = document.getElementById("computerDeck");

let playerCardImage = document.getElementById("playerCard");
let computerCardImage = document.getElementById("computerCard");

let playerPrizesImage = document.getElementById("playerPrizes");
let computerPrizesImage = document.getElementById("computerPrizes");

let potTrackerText = document.getElementById("potTracker");

//1 = Clubs, 2 = Diamonds, 3 = Hearts, 4 = Spades
//11-J, 12-Q, 13-K, 14-A
class Card {
    constructor(number, suit) {
      this.number = number;     //2-14 No Jokers
      this.suit = suit;         //1-4 see below
    }

    resolveSuit() {
        switch (this.suit) {
            case 1:
                return "♣";
            case 2:
                return "♦";
            case 3:
                return "♥";
            case 4:
                return "♠";
        }
    }
    
    resolveFace() {
        if (this.number < 11) return this.number;
        else if (this.number == 11) return "jack";
        else if (this.number == 12) return "queen";
        else if (this.number == 13) return "king";
        else if (this.number == 14) return "ace";
    }
}

class Deck {
    constructor(array1, array2) {
      this.main = array1;
      this.winnings = array2;
    }

    drawCard() {
        if (this.totalLength() == 0) {
            console.log("Ran out of Cards!");
        } 
        else if (this.main.length > 0) {
            return this.main.pop();
        }
        else if (this.main.length == 0) {
            this.main = this.winnings;
            this.winnings = [];
            console.log("Shuffling!")
            this.shuffle(this.main);
            return this.drawCard();
        } else { console.log("error");}
        
    }

    length() {
        return this.main.length;
    }

    totalLength() {
        return (this.main.length + this.winnings.length);
    }

    shuffle() { //Credit to Richard Durstenfield for his classic shuffle method, I'll comment it out to better understand it
        for (var i = this.main.length - 1; i > 0; i--) {        //with the index traversing from the last element to the first...
            var j = Math.floor(Math.random() * (i + 1));        //the function picks a random element between 1 and the index
            var temp = this.main[i];                            //set a temp variable as the element at i
            this.main[i] = this.main[j];                        //i becomes j (the random element)
            this.main[j] = temp;                                //and j becomes what i was
        }
    }
}


function determineWinner() {
    gameHasEnded = true;
    if (playerDeck.totalLength() > computerDeck.totalLength()) console.log("The Player Won!")
    else if (computerDeck.totalLength() > playerDeck.totalLength()) console.log("The Computer Won!")
    else console.log("ERROR!")


}

//THE START METHOD:----------------------------------------
let totalDeck = new Deck([],[]);
let playerDeck = new Deck([],[])
let computerDeck = new Deck([],[])
let holdoverWinnings = new Deck([],[]);

let gameHasEnded = false;
let gameInWarState = false;

//Make the Deck
for (let i = 1; i <= 4; i++) {
    for (let j = 2; j <= 14; j++) {
        var tempCard = new Card(j,i);
        totalDeck.main.push(tempCard);
    }
    if (i == 1) console.log("making deck...");
    if (i == 4) console.log("done!");
}

//Shuffle
totalDeck.shuffle();

//Deal the Deck - one for me, one for you, twenty six times.
for (let index = 0; index < 26; index++) {
    playerDeck.main.push(totalDeck.main.pop());
    computerDeck.main.push(totalDeck.main.pop());
}

//Ensure they both have 26 shuffled cards
console.log(playerDeck.main); 
console.log(computerDeck.main);

//THE GAME ------------------------------------------------
function flipCard() {

    if (playerDeck.totalLength() <= 0 || computerDeck.totalLength() <= 0) determineWinner();
    else { //run a turn...

        console.log("player has " + playerDeck.totalLength() + " cards remaining total.");
        console.log("computer has " + computerDeck.totalLength() + " cards remaining total.");

        let playerCardInPlay = playerDeck.drawCard();
        let computerCardInPlay = computerDeck.drawCard();
        
        playerCardImage.innerText = playerCardInPlay.resolveFace() + " of " + playerCardInPlay.resolveSuit();
        computerCardImage.innerText = computerCardInPlay.resolveFace() + " of " + computerCardInPlay.resolveSuit();
    
        console.log("-----");
        console.log("flipping cards...");
        console.log("the player flipped..." + playerCardInPlay.number + " of " + playerCardInPlay.resolveSuit());
        console.log("the computer flipped..." + computerCardInPlay.number + " of " + computerCardInPlay.resolveSuit());

        if (playerCardInPlay.number > computerCardInPlay.number) {
            playerDeck.winnings.push(playerCardInPlay);
            playerDeck.winnings.push(computerCardInPlay);
            holdoverWinnings.winnings.forEach(element => {playerDeck.winnings.push(element)}); //for each e in prizecards, push that element into p winnings, can be zero!
            holdoverWinnings.winnings = [];
            gameInWarState = false;
        }
        else if (computerCardInPlay.number > playerCardInPlay.number) {
            computerDeck.winnings.push(playerCardInPlay);
            computerDeck.winnings.push(computerCardInPlay);
            holdoverWinnings.winnings.forEach(element => {computerDeck.winnings.push(element)}); //for each e in prizecards, push that element into p winnings, can be zero!
            holdoverWinnings.winnings = [];
            gameInWarState = false;
        } 
        else if (computerCardInPlay.number == playerCardInPlay.number) {
            gameInWarState = true;
            console.log("GET READY FOR WAR YOU DOGS!");
            holdoverWinnings.winnings.push(playerCardInPlay);       //the identical cards go into the bucket 1
            holdoverWinnings.winnings.push(computerCardInPlay);     //the identical cards go into the bucket 2
            for (let i = 0; i < 3; i++) {                           //plus 3 more each
                holdoverWinnings.winnings.push(playerDeck.drawCard());
                holdoverWinnings.winnings.push(computerDeck.drawCard());                 
                }
            flipCard();                                             //and the game recurses!
        }
        else console.log("ERROR")

        playerDeckImage.innerText = "player deck: " + playerDeck.main.length;
        computerDeckImage.innerText = "computer deck: " + computerDeck.main.length;
        playerPrizesImage.innerText = "player winnings: " + playerDeck.winnings.length;
        computerPrizesImage.innerText = "computer winnings: " + computerDeck.winnings.length;

    }
}

function playOut() {
    while (!gameHasEnded) {
        flipCard();
    }
    potTrackerText.innerText = "cards left in last pot: " + holdoverWinnings.winnings.length;
}