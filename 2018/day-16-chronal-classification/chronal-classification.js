const operations = [
    (r, a, b, c) => {
        r[c] = r[a] + r[b];
        return r;
    },
    (r, a, b, c) => {
        r[c] = r[a] + b;
        return r;
    },
    (r, a, b, c) => {
        r[c] = r[a] * r[b];
        return r;
    },
    (r, a, b, c) => {
        r[c] = r[a] * b;
        return r;
    },
    (r, a, b, c) => {
        r[c] = r[a] & r[b];
        return r;
    },
    (r, a, b, c) => {
        r[c] = r[a] & b;
        return r;
    },
    (r, a, b, c) => {
        r[c] = r[a] | r[b];
        return r;
    },
    (r, a, b, c) => {
        r[c] = r[a] | b;
        return r;
    },
    (r, a, b, c) => {
        r[c] = r[a];
        return r;
    },
    (r, a, b, c) => {
        r[c] = a;
        return r;
    },
    (r, a, b, c) => {
        r[c] = a > r[b] ? 1 : 0;
        return r;
    },
    (r, a, b, c) => {
        r[c] = r[a] > b ? 1 : 0;
        return r;
    },
    (r, a, b, c) => {
        r[c] = r[a] > r[b] ? 1 : 0;
        return r;
    },
    (r, a, b, c) => {
        r[c] = a === r[b] ? 1 : 0;
        return r;
    },
    (r, a, b, c) => {
        r[c] = r[a] === b ? 1 : 0;
        return r;
    },
    (r, a, b, c) => {
        r[c] = r[a] === r[b] ? 1 : 0;
        return r;
    }
];

const getPossibleOperations = (before, after, instr) => {
   return operations.filter(op => {
        return JSON.stringify(op(before.slice(0), instr.A, instr.B, instr.C)) === JSON.stringify(after);
    }).length;
};

const part1 = () => {
    const fs = require('fs');
    const lines = fs.readFileSync('./input.txt', 'utf8').trim().split("\n");
    let idx = 0;
    const regexBefore = /Before: \[(\d+), (\d+), (\d+), (\d+)\]/;
    const regexAfter = /After:  \[(\d+), (\d+), (\d+), (\d+)\]/;
    const regexInstr = /(\d+) (\d+) (\d+) (\d+)/;
    let answer = 0;

    while (lines[idx] !== "" && typeof lines[idx] !== 'undefined') {
        const beforeMatch = regexBefore.exec(lines[idx]);
        const before = [beforeMatch[1], beforeMatch[2], beforeMatch[3], beforeMatch[4]].map(Number);
        idx++;

        const instrMatch = regexInstr.exec(lines[idx]);
        const instr = {A: Number(instrMatch[2]), B: Number(instrMatch[3]), C: Number(instrMatch[4])};
        idx++;

        const afterMatch = regexAfter.exec(lines[idx]);
        const after = [afterMatch[1], afterMatch[2], afterMatch[3], afterMatch[4]].map(Number);
        idx += 2;

        if (getPossibleOperations(before, after, instr) >= 3) {
            answer++;
        }
    }

    return answer;
};

console.log("Part 1:", part1());