def part1():
    instructions = list(open('./input.txt', 'r').readline())
    floor = 0

    for instruction in instructions:
        floor = floor + 1 if instruction == '(' else floor - 1

    return floor


def part2():
    instructions = list(open('./input.txt', 'r').readline())
    floor = idx = 0

    for instruction in instructions:
        floor = floor + 1 if instruction == '(' else floor - 1

        idx += 1

        if floor < 0:
            return idx

    return idx


print("Part 1:", part1())
print("Part 2:", part2())