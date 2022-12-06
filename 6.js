const fs = require('fs');
const myFile = '6_input.txt';
let fileContent = fs.readFileSync(myFile, 'utf8');

//testContent = 'zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw';
const repeatChar = s => { 
    return /(.).*\1/.test(s);
}

const lookbackWindow = 13;  //edit this for part 1 vs 2
let currentChar = 13; // edit for part 1 vs 2 
let windowString = '';
do {
    currentChar += 1;
    windowString = fileContent.slice(currentChar - lookbackWindow, currentChar + 1);
    //console.log(windowString);
} while (repeatChar(windowString));
console.log(currentChar + 1);

