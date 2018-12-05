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

const part1 = () => {
    const fs = require('fs');

    const contents = fs.readFileSync('./input.txt', 'utf8');
    let parts = contents.split('');
    let nextKey = 0;

    while (nextKey !== false) {
        parts = doReact(parts, nextKey);
        nextKey = hasReactingUnits(parts, 0 === nextKey ? nextKey : --nextKey);
    }

    return parts.length;

};

console.log("Part 1: ", part1());