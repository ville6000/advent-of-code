const fs = require('fs');
const values = fs
    .readFileSync('../inputs/day-1.txt', 'utf8')
    .split("\n")
    .map(item => parseInt(item));

const part1 = (values) => {
    const TARGET = 2020;
    let found = false;
    let currentIdx = 0;
    
    while (!found) {
        for (let idx = 0; idx < values.length; idx++) {
            if (idx !== currentIdx) {
                let sum = values[idx] + values[currentIdx];
    
                if (sum === TARGET) {
                    return values[idx] * values[currentIdx];
                }
            }
        }
    
        currentIdx++;
    }    

    return false;
}

console.log("Part 1", part1(values));
