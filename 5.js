const fs = require('fs');
const myFile1 = '5_input1.txt';
const myFile2 = '5_input2.txt';
let fileContent1 = fs.readFileSync(myFile1, 'utf8');
let fileContent2 = fs.readFileSync(myFile2, 'utf8');

let instructions = x => {
    return  x.split('\n').map(x => {
            const half = x.substring(5); 
            const second = half.split(' from ');
            let cols = second[1].split(' to ');
            return [parseInt(second[0]), parseInt(cols[0]) - 1, parseInt(cols[1]) - 1];  // use 0 for starting stack index 
    });
};

// stack columns: 2, 6, 10, 14, 18, etc. 
let stackParse = x => {
    const lines = x.split('\n'); 
    let stack = Array();
    lines.slice(0, lines.length - 1).forEach((x) => {
        let row = x.split('').filter((_, j) => (j - 1) % 4 == 0); 
        row.forEach((z, k) => {
            if (z != ' ') {
                if (Array.isArray(stack[k])) {
                    stack[k].push(z); 
                }
                else {
                    stack[k] = Array(); 
                    stack[k].push(z); 
                }
            }
        });
    });
    return stack.map(a => a.reverse());
};

let performInstruction = (line, myStack) => {
    for (let step = 0; step < line[0]; step++) {
        if (typeof myStack[line[1]].at(0) == 'undefined') {
            console.log('error pulling from empty stack!');
            break; 
        }
        else {
            let x = myStack[line[1]].pop(); 
            myStack[line[2]].push(x);
        }
    }
    return myStack;
}

let iterateInstructions = (instructionArray, myStack, instructionCallback) => {
    for (let step = 0; step < instructionArray.length; step++) {
        myStack = instructionCallback(instructionArray[step], myStack); 
    }
    return myStack; 
}

const testStack = `    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 `;

const testInstructions = `move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`;

// part 1 answer 
//let testStackResult = iterateInstructions(instructions(fileContent2), stackParse(fileContent1), performInstruction);
//let testStackResult = iterateInstructions(instructions(testInstructions), stackParse(testStack));
//console.log(instructions(fileContent2));
//console.log(testStackResult.map(x => x.at(-1)));

///// part 2 

let performInstruction2 = (line, myStack) => {
    if (typeof myStack[line[1]].at(0) == 'undefined') {
        console.log('error pulling from empty stack!');
    }
    else {
        let x = myStack[line[1]].splice(myStack[line[1]].length - line[0], line[0]); 
        myStack[line[2]].push(...x);
    }
    return myStack;
}

let testStackResult = iterateInstructions(instructions(fileContent2), stackParse(fileContent1), performInstruction2);
console.log(testStackResult.map(x => x.at(-1)));
