const part1 = () => {
  const fs = require('fs');
  const values = fs
    .readFileSync('./input.txt', 'utf8')
    .split(',')
    .map(item => parseInt(item, 10));

  values[1] = 12;
  values[2] = 2;

  let idx = 0;
  const step = 4;

  while (idx < values.length) {
    let result;
    if (values[idx] === 1) {
      result = values[values[idx + 1]] + values[values[idx + 2]];
    } else if (values[idx] === 2) {
      result = values[values[idx + 1]] * values[values[idx + 2]];
    } else if (values[idx] === 99) {
      return values[0];
    }

    values[values[idx + 3]] = result;
    idx += step;
  }

  return values[0];
};

console.log(part1());
