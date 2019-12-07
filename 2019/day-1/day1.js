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

const part2 = () => {
  const fs = require('fs');
  const lines = fs
    .readFileSync('./input.txt', 'utf8')
    .trim()
    .split('\n');

  return lines
    .map(mass => getTotalFuel(mass))
    .reduce((total, current) => total + current, 0);
};

const getTotalFuel = mass => {
  let isPositive = true;
  let total = 0;

  while (isPositive) {
    const fuel = Math.floor(mass / 3) - 2;

    if (fuel > 0) {
      total += fuel;
      mass = fuel;
    } else {
      isPositive = false;
    }
  }

  return total;
};

console.log(part2());
