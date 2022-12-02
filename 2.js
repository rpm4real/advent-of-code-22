const fs = require('fs');
const myFile = '2_input.txt';

let fileContent = fs.readFileSync(myFile, 'utf8');

let gameArray = fileContent.split('\n');

function gameResult(a, b) {
    // assume inputs are A, B, or C as strings 
    const convert = (n, a) => n.charCodeAt(0) - (65 + a*23);
    const modulo3 = n => ((n % 3) + 3) % 3;
    return modulo3(convert(b, 1) - convert(a, 0));
}

function scoreRound(opp, me) {
    const convertMe =  me.charCodeAt(0) - 88;
    const convertGame = (a, b) => {
        if (gameResult(a, b) == 2)
            return 0; 
        else 
            return 3*gameResult(a, b) + 3;
    }
    return (convertMe + 1) + convertGame(opp, me);
}

let scoreArray = gameArray.map(x => {
    return scoreRound(...x.split('\ '));
});
console.log(scoreArray.reduce((a, b) => a + b, 0));


function gameResult2(opp, outcome) { 
    const oppNum = opp.charCodeAt(0) - 65;
    const modulo3 = n => ((n % 3) + 3) % 3;
    const outcomeNum = modulo3(outcome.charCodeAt(0) - 86);

    let myResultNum = modulo3(outcomeNum + oppNum); 
    const convertGame = () => {
        if (outcomeNum == 2)
            return 0; 
        else 
            return 3*outcomeNum + 3;
    }
    return (myResultNum + 1) + convertGame()
}

let scoreArray2 = gameArray.map(x => {
    return gameResult2(...x.split('\ '));
});
console.log(scoreArray2.reduce((a, b) => a + b, 0));

