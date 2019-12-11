const part1 = () => {
  const START = 168630;
  const END = 718098;
  let validCount = 0;

  for (let i = START; i <= END; i++) {
    if (isValidPassword(i)) {
      validCount++;
    }
  }

  return validCount;
};

const isValidPassword = password => {
  const digits = Array.from(password.toString()).map(Number);
  const uniqueItems = Array.from(new Set(digits));

  if (uniqueItems.length === digits.length) {
    return false;
  }

  for (let i = 1; i < digits.length; i++) {
    if (digits[i] < digits[i - 1]) {
      return false;
    }
  }

  return true;
};

console.log('Part 1:', part1());

const part2 = () => {
  const START = 168630;
  const END = 718098;
  let validCount = 0;

  for (let i = START; i <= END; i++) {
    if (isMostValidPassword(i)) {
      validCount++;
    }
  }

  return validCount;
};

const isMostValidPassword = password => {
  const digits = Array.from(password.toString()).map(Number);

  let repeatCounts = {};

  for (let i = 0; i < digits.length; i++) {
    if (i > 0 && digits[i] < digits[i - 1]) {
      return false;
    }

    if (typeof repeatCounts[digits[i]] === 'undefined') {
      repeatCounts[digits[i]] = 1;
    } else {
      repeatCounts[digits[i]]++;
    }
  }

  const validRepeat = Object.keys(repeatCounts).filter(key => {
    return repeatCounts[key] === 2;
  });

  return validRepeat.length >= 1;
};

console.log('Part 2:', part2());
