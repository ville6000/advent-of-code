const part2 = () => {
    const input = 540391;
    const recipes = [3, 7];
    let elf1 = 0;
    let elf2 = 1;
    let isFound = false;

    while (!isFound) {
        let newValues = (recipes[elf1] + recipes[elf2]).toString().split('');
        newValues.forEach(val => {
            recipes.push(parseInt(val, 10));
        });

        elf1 = (elf1 + 1 + recipes[elf1]) % recipes.length;
        elf2 = (elf2 + 1 + recipes[elf2]) % recipes.length;

        if (recipes.length % 10000 === 0) {
            if (recipes.join('').toString().includes(input.toString())) {
                isFound = true;
            }
        }
    }

    return recipes.join('').indexOf(input.toString());
};

console.log("Part 2:", part2());