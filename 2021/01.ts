import fs = require("fs");

function getInput(): Array<number> {
  return fs
    .readFileSync("./01.txt", "utf8")
    .split("\n")
    .map((item: string) => Number(item));
}

function part1(numbers: Array<number>): number {
  let previous: number = numbers.unshift();
  let largerCount = 0;

  numbers.forEach((num: number) => {
    if (num > previous) {
      largerCount++;
    }

    previous = num;
  });

  return largerCount;
}

function part2(numbers: Array<number>): number {
  const chunkSize = 3;
  const chunks = [];

  for (let i = 0; i < numbers.length - 2; i++) {
    chunks.push(
      numbers
        .slice(i, i + chunkSize)
        .reduce((acc: number, cur: number) => cur + acc, 0)
    );
  }

  return part1(chunks);
}

console.log("Part 1", part1(getInput()));
console.log("Part 2", part2(getInput()));
