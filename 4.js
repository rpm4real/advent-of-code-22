const fs = require('fs');
const myFile = '4_input.txt';
let fileContent = fs.readFileSync(myFile, 'utf8');
let pairsList = fileContent.split('\n').map(x => x.split(','));

const parseRange = s => {
    const vals = s.split('-').map(x => parseInt(x));
    const range = vals[1] - vals[0];
    return Array(range + 1).fill(vals[0]).map((el, i) => el + i);
}
const equals = (a, b) =>
    a.length === b.length &&
    a.every((v, i) => v === b[i]);

const isSubset = (a,b) => {
    return equals(a.filter(x => !b.includes(x)) , []);
}
function checkOverlap(range1, range2) {
    // given range string values, check for complete overlap (direct subset)
    let r1 = parseRange(range1);
    let r2 = parseRange(range2); 
    return isSubset(r1, r2) || isSubset(r2, r1);
} 
let overlapList = pairsList.map(x => checkOverlap(...x));

// part 1 answer
//console.log(overlapList.reduce((a,b) => a + b, 0));

////// part 2 

const anyOverlap = (a,b) => {
    return !equals(a.filter(x => !b.includes(x)), a);
}
function checkOverlap2(range1, range2) {
    let r1 = parseRange(range1);
    let r2 = parseRange(range2); 
    return anyOverlap(r1, r2);
}
let overlapList2 = pairsList.map(x => checkOverlap2(...x));

// part 2 answer 
console.log(overlapList2.reduce((a,b) => a + b, 0));
