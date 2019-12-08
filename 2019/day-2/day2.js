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

//console.log(part1());

const part2 = () => {
  const fs = require('fs');
  const values = fs
    .readFileSync('./input.txt', 'utf8')
    .split(',')
    .map(item => parseInt(item, 10));

  const target = 19690720;
  const step = 4;

  for (let i = 0; i <= 99; i++) {
    for (let j = 0; j <= 99; j++) {
      let valuesToBeChecked = [...values];
      valuesToBeChecked[1] = i;
      valuesToBeChecked[2] = j;

      if (checkValues(valuesToBeChecked, target, step)) {
        return 100 * valuesToBeChecked[1] + valuesToBeChecked[2];
      }
    }
  }

  return false;
};

const checkValues = (values, target, step) => {
  let idx = 0;

  while (idx < values.length) {
    let result;
    if (values[idx] === 1) {
      result = values[values[idx + 1]] + values[values[idx + 2]];
    } else if (values[idx] === 2) {
      result = values[values[idx + 1]] * values[values[idx + 2]];
    }

    values[values[idx + 3]] = result;
    idx += step;
  }

  if (values[0] === target) {
    return true;
  }

  return false;
};

console.log(part2());
