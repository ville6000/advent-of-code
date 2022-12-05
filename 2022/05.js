const fs = require("fs");

function getInput() {
  const lines = fs
    .readFileSync("05.txt", "utf8")
    .split("\n")
    .filter((item) => item.length);

  const crates = lines.slice(0, 9).map((line) => {
    const parts = line.split("");
    const rows = [];

    while (parts.length) {
      rows.push(
        parts
          .splice(0, 3)
          .map((char) => {
            char = char.replace("[", "");
            return char.replace("]", "");
          })
          .join("")
          .trim()
      );

      if (parts.length > 3) {
        parts.splice(0, 1);
      }
    }

    return rows;
  });

  const columns = [];

  for (let col = 0; col < 9; col++) {
    const columnRow = [];

    for (let row = 0; row < 8; row++) {
      columnRow.push(crates[row][col]);
    }

    columns.push(columnRow);
  }

  const instructions = lines.slice(9).map((line) => {
    const parts = line.split(" ");

    return {
      amount: Number(parts[1]),
      from: Number(parts[3]) - 1,
      to: Number(parts[5]) - 1,
    };
  });

  return {
    columns,
    instructions,
  };
}

function part1() {
  const { columns, instructions } = getInput();

  instructions.forEach((move) => {
    for (let i = 0; i < move.amount; i++) {
      for (let x = 0; x < columns[move.from].length; x++) {
        if (columns[move.from][x].length) {
          const crate = columns[move.from].splice(x, 1)[0];
          columns[move.to] = addToColumn(columns[move.to], crate);
          break;
        }
      }
    }
  });

  function addToColumn(column, crate) {
    if (column[0] !== "") {
      column.unshift(crate);

      return column;
    }

    for (let i = 0; i < column.length; i++) {
      if (column[i + 1] && column[i + 1].length) {
        column[i] = crate;
        break;
      }

      if (i === column.length - 1) {
        column[i] = crate;
        break;
      }
    }

    return column;
  }

  const firsts = [];

  for (let i = 0; i < columns.length; i++) {
    for (let x = 0; x < columns[i].length; x++) {
      if (columns[i][x].length) {
        firsts.push(columns[i][x]);
        break;
      }
    }
  }

  return firsts.join("");
}

console.log("Part 1:", part1());
