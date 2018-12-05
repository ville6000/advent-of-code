const isReactivePair = (a, b) => {
    return a !== b && a.toUpperCase() === b.toUpperCase();
};

const hasReactingUnits = (parts, i) => {
    for (; i < parts.length; i++) {
        let next = parts[i + 1];
        if (typeof next !== 'undefined') {
            let a = parts[i];
            let b = parts[i + 1];

            if (isReactivePair(a, b)) {
                return i;
            }
        }
    }

    return false;
};

const doReact = (parts, i) => {
    for (; i < parts.length; i++) {
        let next = parts[i + 1];

        if (typeof next !== 'undefined') {
            if (isReactivePair(parts[i], next)) {
                parts.splice(i, 2);

                return parts;
            }
        }
    }

    return false;
};

const findUniqueReactingUnits = (parts) => {
    const unique = [];

    for (let i = 0; i < parts.length; i++) {
        let next = parts[i + 1];
        if (typeof next !== 'undefined') {
            let a = parts[i];
            let b = parts[i + 1];

            if (isReactivePair(a, b)) {
                if (typeof next !== 'undefined') {
                    parts.splice(i, 2);
                    unique.push(a.toLowerCase());
                }
            }
        }
    }

    return Array.from(new Set(unique));
};

const findLength = (string) => {
    let parts = string.split('');
    let nextKey = 0;

    while (nextKey !== false) {
        parts = doReact(parts, nextKey);
        nextKey = hasReactingUnits(parts, 0 === nextKey ? nextKey : --nextKey);
    }

    return parts.length;
};

const part1 = () => {
    const fs = require('fs');
    const contents = fs.readFileSync('./input.txt', 'utf8');

    return findLength(contents);
};

const part2 = () => {
    const fs = require('fs');
    const contents = fs.readFileSync('./input.txt', 'utf8');
    const unique = findUniqueReactingUnits(contents.split(''));
    let shortest = false;

    unique.forEach(letter => {
        const string = contents.replace(new RegExp(letter, 'gi'), '');
        const length = findLength(string);

        if (shortest === false) {
            shortest = length;
        } else if (shortest > length) {
            shortest = length;
        }
    });

    return shortest;
};

console.log("Part 1: ", part1());
console.log("Part 2: ", part2());