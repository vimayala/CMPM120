// CMPM 120 Project 00 provided example
const defaultAttributeScores = [15, 14, 13, 12, 10, 8];

class Player {                                      // By convention, we capitalize the name of the class
    constructor(characterName = 'Naruto') {
        this.name = characterName;                  //this: think of it as a way to reference the instance of the object you are currently working within
        this.attributes = {
            strength: 0,
            dexterity: 0,
            constitution: 0,
            intelligence: 0,
            wisdom: 0,
            charisma: 0
        };
        let shuffledResult = shuffleArray(defaultAttributeScores);
        for (const [key, value] of Object.entries(this.attributes)) {
            let attributeValue = shuffledResult.pop();
            this.attributes[key] = attributeValue;
        }
    }

    rollAttributes() { 
        // console.log('Rolling dice...')              //How do you know ; vs not, bc string?
        for (const key in this.attributes) {
            let results = diceRoller(4, 6);
            results.sort(function(a,b){return a - b});
            results.shift();
            let sum = sumArrayElements(results);
            this.attributes[key] = sum;
        }
    }

    printPlayer() {
        // console.log(this.name);
        // console.log(this.attributes);
        console.log(`Name: ${this.name}`);
        for (const [key, value] of Object.entries(this.attributes)) {
            console.log(`${key.slice(0, 3).toUpperCase()}: ${value}`);
        }
    }
}

const player01 = new Player();                      //Uses default name Naruto
player01.printPlayer();
const player02 = new Player('Son Goku');
player02.rollAttributes();
player02.printPlayer();

// Fisher-Yates algorithm for randomly sorting an array
// from: https://dev.to/codebubb/how-to-shuffle-an-array-in-javascript-2ikj
// adapted to JS and reconfigured to return a new (non-mutated) array
function shuffleArray(targetArray) {
    let shuffled = Array.from(targetArray);        // arrays are reference values, meaning that if we make a copy of an array by assignment (eg, =), any changes to the copied array will also happen to the original array
    for (let i = shuffled.length - 1; i > 0; i--){
        const j = Math.floor(Math.random() * (i + 1));
        const temp = shuffled[i];
        shuffled[i] = shuffled[j];
        shuffled[j] = temp;
    }
    return shuffled;
}

function diceRoller(times, sides) {
    let results = [];
    for (let i = 0; i < times; i++) {
        results.push(Math.floor(Math.random() * sides + 1));
    }
    return results;
}

function sumArrayElements(array) {
    return array.reduce((total, currentNumber) => total + currentNumber); 
    // let sum = 0;
    // for (let i = 0; i < array.length; i++){
    //     sum += array[i];
    // }
    // return sum;
}