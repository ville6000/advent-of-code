const fs = require("fs");

interface Instruction {
  dir: string;
  num: number;
}

function getInput(): Array<Instruction> {
  return fs
    .readFileSync("./02.txt", "utf8")
    .split("\n")
    .filter((item: string) => item.length)
    .map((item: string) => {
      const parts = item.split(" ");
      return {
        dir: parts[0].trim(),
        num: Number(parts[1]),
      };
    });
}

function part1() {
  const instructions = getInput();
  const horizontal = getTotal(
    instructions.filter((item) => item.dir === "forward")
  );
  let depthNegative = getTotal(
    instructions.filter((item) => item.dir === "up")
  );
  let depthPositive = getTotal(
    instructions.filter((item) => item.dir === "down")
  );

  return horizontal * (depthPositive - depthNegative);
}

function getTotal(instructions: Array<Instruction>) {
  return instructions
    .map((item) => item.num)
    .reduce((acc: number, cur: number) => cur + acc, 0);
}

function part2() {
  const instructions = getInput();
  let depth = 0;
  let horizontal = 0;
  let aim = 0;

  for (let i = 0; i < instructions.length; i++) {
    if (instructions[i].dir === "forward") {
      horizontal += instructions[i].num;
      depth = depth + aim * instructions[i].num;
    } else {
      aim =
        instructions[i].dir === "down"
          ? aim + instructions[i].num
          : aim - instructions[i].num;
    }
  }

  return horizontal * depth;
}

console.log("Part 1", part1());
console.log("Part 2", part2());
