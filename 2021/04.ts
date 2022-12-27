import fs = require("fs");

function getNumbers(): Array<number> {
  const input = fs
    .readFileSync("./04.txt", "utf8")
    .split("\n\n")
    .filter((item: string) => item.length)
    .map((item: string) => item.split(",").map(Number));

  return input[0];
}

function getBoards(): Board[] {
  const lines = fs
    .readFileSync("./04.txt", "utf8")
    .split("\n\n")
    .filter((item: string) => item.length);

  lines.splice(0, 1);

  return lines.map((line: string) => {
    const rows = line.split("\n").filter((item: string) => item.length);

    return new Board(
      rows.map((row: string) => {
        return row
          .split(" ")
          .filter((item: string) => item.length)
          .map(Number);
      })
    );
  });
}

class Board {
  grid: Array<Array<number>>;

  constructor(grid: number[][]) {
    this.grid = grid;
  }

  isBingo(numbers: Array<number>) {
    const bingos = this.grid.filter((row) => {
      const horizontalMatches = row.filter((item: number) =>
        numbers.includes(item)
      );

      return horizontalMatches.length === row.length;
    });

    for (let i = 0; i < this.grid[0].length; i++) {
      const values = this.grid.map((row) => row[i]);
      const matches = values.filter((item: number) => numbers.includes(item));

      if (matches.length === values.length) {
        bingos.push(matches);
      }
    }

    return bingos.length > 0;
  }

  getUnmarkedNumbers(numbers: Array<number>): Array<number> {
    return this.grid
      .map((row) => {
        return row.filter((item: number) => !numbers.includes(item));
      })
      .flat();
  }

  getScore(numbers: Array<number>) {
    const unmarkedTotal = this.getUnmarkedNumbers(numbers).reduce(
      (acc: number, num: number) => acc + num,
      0
    );

    return unmarkedTotal * numbers[numbers.length - 1];
  }
}

function part1() {
  const numbers = getNumbers();
  const boards = getBoards();
  let hasBingo;

  for (let i = 0; i < numbers.length; i++) {
    const currentNumbers = numbers.slice(0, i);

    hasBingo = boards.filter((board: Board) => {
      return board.isBingo(currentNumbers);
    });

    if (hasBingo.length > 0) {
      hasBingo = hasBingo.map((board) => {
        return board.getScore(currentNumbers);
      });

      return hasBingo[0];
    }
  }

  return null;
}

function part2() {
  const numbers = getNumbers();
  let boards = getBoards();
  const results = new Set();

  for (let i = 0; i < numbers.length; i++) {
    const currentNumbers = numbers.slice(0, i);

    const hasBingo = boards.filter((board: Board) => {
      return board.isBingo(currentNumbers);
    });

    boards = boards.filter((board: Board) => !hasBingo.includes(board));

    if (hasBingo.length > 0) {
      const roundResults = hasBingo.map((board: Board) => {
        return board.getScore(currentNumbers);
      });

      roundResults.forEach((item: number) => results.add(item));
    }
  }

  return Array.from(results).pop();
}

console.log("Part 1", part1());
console.log("Part 2", part2());
