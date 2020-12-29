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

const part2 = (passports) => {
  const rules = {
    byr: (val) => {
      return val.toString().length === 4 && val >= 1920 && val <= 2002;
    },
    iyr: (val) => {
      return val.toString().length === 4 && val >= 2010 && val <= 2020;
    },
    eyr: (val) => {
      return val.toString().length === 4 && val >= 2020 && val <= 2030;
    },
    hgt: (val) => {
      val = val.toString();

      if (val.includes("cm")) {
        val = parseInt(val.replace("cm"), 10);
        return val >= 150 && val <= 193;
      } else if (val.includes("in")) {
        val = parseInt(val.replace("in"), 10);
        return val >= 59 && val <= 76;
      }

      return false;
    },
    hcl: (val) => {
      const test = new RegExp(/^#[0-9a-f]{6}$/, "i");
      return (val.match(test) || []).length === 1;
    },
    ecl: (val) => {
      return ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"].includes(val);
    },
    pid: (val) => {
      return val.toString().split("").map(Number).filter((num) => Number.isInteger(num)).length === 9;
    },
  };

  return passports.filter((passport) => {
    let isValid = true;

    Object.keys(rules).forEach((key) => {
      if (passport[key] === undefined) {
        isValid = false;
      } else {
        const ruleCheck = rules[key](passport[key]);
        console.log(key, passport[key], ruleCheck);

        if (!ruleCheck) {
          isValid = false;
        }
      }
    });

    return isValid;
  }).length;
};

console.time("Part 1 duration");
console.log("Part 1:", part1(valuesToPassports(values)));
console.timeEnd("Part 1 duration");

console.time("Part 2 duration");
console.log("Part 2:", part2(valuesToPassports(values)));
console.timeEnd("Part 2 duration");
