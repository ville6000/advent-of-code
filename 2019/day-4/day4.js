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

console.log(part1());
