const fs = require("fs");
const values = fs.readFileSync("01.txt", "utf8").split("\n").filter(l => l.length)

const part2 = () => {
  return values.map((line) => {
    const firstMatch = findFirstMatch(line)
    const lastMatch = findLastMatch(line)

    return Number(String(firstMatch) + String(lastMatch))
  }).reduce((prev, curr) => prev + curr)
}

const findFirstMatch = (line) => {
  let charFirst = null;
  let numFirst = null;

  Object.keys(charMap).forEach(key => {
    const charIdx = line.indexOf(key)
    const numIdx = line.indexOf(charMap[key])

    if (charIdx !== -1 && (charFirst === null || charFirst.idx > charIdx)) {
        charFirst = { idx: charIdx, val: charMap[key] }
    }

    if (numIdx !== -1 && (numFirst === null || numFirst.idx > numIdx)) {
        numFirst = { idx: numIdx, val: charMap[key] }
    }
  })

  return getValForSum(numFirst, charFirst);
}

const findLastMatch = (line) => {
  let charLast = null;
  let numLast = null

  Object.keys(charMap).forEach(key => {
    const charIdx = line.lastIndexOf(key)
    const numIdx = line.lastIndexOf(charMap[key])

    if (charIdx !== -1 && (charLast === null || charLast.idx < charIdx)) {
        charLast = { idx: charIdx, val: charMap[key] }
    }

    if (numIdx !== -1 && (numLast === null || numLast.idx < numIdx)) {
        numLast = { idx: numIdx, val: charMap[key] }
    }
  })

  return getValForSum(numLast, charLast, true);
}

const getValForSum = (num, char, last = false) => {
  if (num === null) return char.val;
  if (char === null) return num.val;

  return last
    ? (num.idx > char.idx ? num.val : char.val)
    : (num.idx < char.idx ? num.val : char.val);
}

const charMap = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
}

console.log(part2());
