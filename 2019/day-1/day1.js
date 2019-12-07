const part1 = () => {
  const fs = require('fs');
  const lines = fs
    .readFileSync('./input.txt', 'utf8')
    .trim()
    .split('\n');

  return lines
    .map(mass => Math.floor(mass / 3) - 2)
    .reduce((total, current) => total + current, 0);
};

console.log(part1());