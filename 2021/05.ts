import fs = require("fs");

interface ICoordinate {
  from: {
    x: number;
    y: number;
  };
  to: {
    x: number;
    y: number;
  };
}

function getNumbers() {
  return fs
    .readFileSync("./05.txt", "utf8")
    .split("\n")
    .filter((item: string) => item.length)
    .map((item: string) => {
      const pairs = item.split("->").map((item) => {
        const coordinates = item.split(",").map(Number);
        return {
          x: coordinates[0],
          y: coordinates[1],
        };
      });

      return {
        from: pairs[0],
        to: pairs[1],
      };
    });
}

function getSize(lines: Array<ICoordinate>) {
  const maxX = Math.max(
    ...lines
      .map(({ from, to }) => {
        return [from.x, to.x];
      })
      .flat()
  );

  const maxY = Math.max(
    ...lines
      .map(({ from, to }) => {
        return [from.y, to.y];
      })
      .flat()
  );

  return {
    maxX,
    maxY,
  };
}

function part1() {
  const lines = getNumbers().filter(({ from, to }) => {
    return from.x === to.x || from.y === to.y;
  });
  const size = getSize(lines);
  const coordinates = Array(size.maxX + 1)
    .fill(null)
    .map(() => Array(size.maxY + 1).fill(0));

  lines.forEach(({ from, to }: ICoordinate) => {
    if (from.x === to.x) {
      const start = from.y < to.y ? from.y : to.y;
      const end = from.y < to.y ? to.y : from.y;

      for (let i = start; i <= end; i++) {
        coordinates[from.x][i]++;
      }
    } else {
      const start = from.x < to.x ? from.x : to.x;
      const end = from.x < to.x ? to.x : from.x;

      for (let i = start; i <= end; i++) {
        coordinates[i][from.y]++;
      }
    }
  });

  return coordinates
    .map((item: Array<number>) => {
      return item
        .filter((i) => i > 1)
        .map((i) => 1)
        .reduce((acc: number, num: number) => acc + num, 0);
    })
    .reduce((acc: number, num: number) => acc + num, 0);
}

console.log("Part 1", part1());
