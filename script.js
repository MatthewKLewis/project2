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
}


function determineWinner() {
    console.log("Someone Won!");
}

//THE START METHOD:----------------------------------------
//Instantiations:
let totalDeck = new Deck([], []);
let playerDeck = new Deck([], []);
let computerDeck = new Deck([], []);
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

//THE GAME ------------------------------------------------
console.log(totalDeck.main);
console.log(playerDeck.main);
console.log(computerDeck.main);

