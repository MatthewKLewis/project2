//DOM queries
let playerDeckImage = document.getElementById("playerDeck");
let computerDeckImage = document.getElementById("computerDeck");

let playerCardImage = document.getElementById("playerCard");
let computerCardImage = document.getElementById("computerCard");

let playerPrizesImage = document.getElementById("playerPrizes");
let computerPrizesImage = document.getElementById("computerPrizes");

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
}

class Deck {
    constructor(array1, array2) {
      this.main = array1;
      this.winnings = array2;
    }

    drawCard() {
        if (this.main.length > 0) {
            this.main.pop
        }
        else if (this.main.length = 0) {
            this.main = this.winnings;
            this.winnings = [];
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
    console.log("Someone Won!");
}

//THE START METHOD:----------------------------------------
let totalDeck = new Deck([], []);
let playerDeck = new Deck([],[])
let computerDeck = new Deck([],[])
let gameHasEnded = false;

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

