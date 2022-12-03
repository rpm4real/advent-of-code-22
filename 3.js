const fs = require('fs');
const myFile = '3_input.txt';
let fileContent = fs.readFileSync(myFile, 'utf8');
let sackArray = fileContent.split('\n');

function commonElement(sack) {
    const splitSack = s => {
        let half = s.length / 2;
        return [s.slice(0, half).split(''), s.slice(half).split('')]
    }
    let dividedSack = splitSack(sack);
    let commonElements = dividedSack[0].filter(x => dividedSack[1].includes(x));
    return commonElements[0];
}

const scoreElement = x => {
    let xCode = x.charCodeAt(0);
    if (x == x.toLowerCase())
        return xCode - 96; 
    else 
        return xCode - 38;
}

let scoreArray = sackArray.map(x => {
    return scoreElement(commonElement(x));
});

//answer 1 
//console.log(scoreArray.reduce((a, b) => a + b, 0));

////// part 2 

let badgeArray = (x => {
    //const chunkNum = x.length / 3; 
    let n = 0;
    let badgeArray = Array();
    let sackChunk = Array();
    while (n < x.length) { 
        sackChunk = x.slice(n, n + 3).map(a => {
            return a.split('')
        }); 
        badgeOptions = sackChunk[0].filter(y => sackChunk[1].includes(y)).filter(z => sackChunk[2].includes(z));
        badgeArray.push(badgeOptions[0]);
        n = n + 3; 
    }
    return badgeArray;
})(sackArray);

let scoreArray2 = badgeArray.map(x => {
    return scoreElement(x);
});

//answer 2
console.log(scoreArray2.reduce((a, b) => a + b, 0));
