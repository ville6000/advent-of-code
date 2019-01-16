def part1():
    directions = list(open('./input.txt', 'r').readline())
    grid = {"0,0": 1}
    x = y = 0

    for direction in directions:
        x = x - 1 if direction == '<' else x
        x = x + 1 if direction == '>' else x
        y = y - 1 if direction == '^' else y
        y = y + 1 if direction == 'v' else y

        grid[f"{x},{y}"] = 1

    return len(grid)


def part2():
    directions = list(open('./input.txt', 'r').readline())
    grid = {"0,0": 2}
    turn = 0
    santas = {0: {'x': 0, 'y': 0}, 1: {'x': 0, 'y': 0}}

    for direction in directions:
        santas[turn]['x'] = santas[turn]['x'] - 1 if direction == '<' else santas[turn]['x']
        santas[turn]['x'] = santas[turn]['x'] + 1 if direction == '>' else santas[turn]['x']
        santas[turn]['y'] = santas[turn]['y'] - 1 if direction == '^' else santas[turn]['y']
        santas[turn]['y'] = santas[turn]['y'] + 1 if direction == 'v' else santas[turn]['y']

        grid[f"{santas[turn]['x']},{santas[turn]['y']}"] = 1
        turn = 0 if turn else 1

    return len(grid)


print("Part 1:", part1())
print("Part 2:", part2())
