const fs = require('fs');
const { maxHeaderSize } = require('http');
const myFile = '1_input.txt';


let fileContent = fs.readFileSync(myFile, 'utf8');

let parsedFile = fileContent.split("\n\n").map((elfString) => {
  return elfString
    .split("\n")
    .map((food) => parseInt(food))
    .reduce((totalFood, food) => totalFood + food, 0);
});

const answer1 = Math.max(...parsedFile)

const answer2 = parsedFile.sort((a, b) => a - b).slice(-3).reduce((a, b) => a + b, 0)

console.log(answer1);
console.log(answer2);