const fs = require("fs");
const values = fs.readFileSync("../inputs/day-4.txt", "utf8").split(/\n\s*\n/);

const valuesToPassports = (values) => {
  const passports = [];

  values.forEach((item) => {
    let passport = {};
    let parts = item.replace(/\n/g, " ").split(" ");

    parts.forEach((part) => {
      let keyParts = part.split(":");

      if (keyParts[0].length && keyParts[1].length) {
        passport[keyParts[0]] = keyParts[1];
      }
    });

    passports.push(passport);
  });

  return passports;
};

const part1 = (passports) => {
  const mandatoryKeys = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];

  return passports.filter((passport) => {
    let hasKeys = true;

    mandatoryKeys.forEach((key) => {
      if (passport[key] === undefined) {
        hasKeys = false;
      }
    });

    return hasKeys;
  }).length;
};

console.time("Part 1 duration");
console.log("Part 1:", part1(valuesToPassports(values)));
console.timeEnd("Part 1 duration");
