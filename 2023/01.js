const fs = require("fs");
const values = fs.readFileSync("01.txt", "utf8").split("\n").filter(l => l.length)

const part2 = () => {
  const total = values.map((line) => {
    const firstMatch = findFirstMatch(line)
    const lastMatch = findLastMatch(line)

    return Number(String(firstMatch) + String(lastMatch))
  }).reduce((prev, curr) => prev + curr)

  console.log(total)
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

  if (numFirst === null) {
    return charFirst.val
  } else if (charFirst === null) {
    return numFirst.val
  }

  return numFirst.idx < charFirst.idx ? numFirst.val : charFirst.val
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

  if (numLast === null) {
    return charLast.val
  } else if (charLast === null) {
    return numLast.val
  }

  return numLast.idx > charLast.idx ? numLast.val : charLast.val
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

part2()
