const fs = require("fs");
const input = fs
  .readFileSync("02.txt", "utf8")
  .split("\n")
  .filter((l) => l.length);

const part1 = () => {
  const cubes = {
    red: 12,
    green: 13,
    blue: 14,
  };

  return input
    .map((line) => {
      const game = parseGame(line);
      let valid = game.num;

      Object.keys(cubes).forEach((key) => {
        game.hands.forEach((hand) => {
          if (hand[key] > cubes[key]) {
            valid = 0;
          }
        });
      });

      return valid;
    })
    .reduce((a, b) => a + b, 0);
};

const part2 = () => {
  return input
    .map((line) => {
      const game = parseGame(line);
      const leastCubes = {
        red: 0,
        blue: 0,
        green: 0,
      };

      game.hands.forEach((hand) => {
        Object.keys(hand).forEach((key) => {
          if (hand[key] > leastCubes[key]) {
            leastCubes[key] = hand[key];
          }
        });
      });

      return leastCubes.red * leastCubes.green * leastCubes.blue;
    })
    .reduce((a, b) => a + b, 0);
};

const parseGame = (line) => {
  const game = line.split(":")[0].split(" ")[1].trim();
  const hands = line.split(":")[1].trim().split(";");

  return {
    num: Number(game),
    hands: hands.map((h) => parseHand(h)),
  };
};

const parseHand = (hand) => {
  const cubes = hand.split(",").map((h) => h.trim());

  return {
    green: getCubeUsages(cubes, "green"),
    red: getCubeUsages(cubes, "red"),
    blue: getCubeUsages(cubes, "blue"),
  };
};

const getCubeUsages = (cubes, color) => {
  return cubes
    .filter((p) => p.endsWith(color))
    .map((g) => Number(g.match(/\d+/g)[0]))
    .reduce((a, b) => a + b, 0);
};

console.time("part1");
console.log(part1());
console.timeEnd("part1");

console.time("part2");
console.log(part2());
console.timeEnd("part2");
