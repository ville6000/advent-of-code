def part1():
    directions = list(open('./input.txt', 'r').readline())
    grid = {"0,0": 1}
    x = y = 0

    for direction in directions:
        if direction == '<':
            x -= 1

        if direction == '>':
            x += 1

        if direction == '^':
            y -= 1

        if direction == 'v':
            y += 1

        grid = increment_grid_value(grid, x, y)

    return len(grid)


def increment_grid_value(grid, x, y):
    key = f"{x},{y}"

    if key in grid:
        grid[key] += 1
    else:
        grid[key] = 1

    return grid


def part2():
    directions = list(open('./input.txt', 'r').readline())
    grid = {"0,0": 2}
    turn = 0
    santas = {0: {'x': 0, 'y': 0}, 1: {'x': 0, 'y': 0}}

    for direction in directions:
        if direction == '<':
            santas[turn]['x'] -= 1

        if direction == '>':
            santas[turn]['x'] += 1

        if direction == '^':
            santas[turn]['y'] -= 1

        if direction == 'v':
            santas[turn]['y'] += 1

        grid = increment_grid_value(grid, santas[turn]['x'], santas[turn]['y'])

        if turn == 1:
            turn = 0
        else:
            turn = 1

    return len(grid)


print("Part 1:", part1())
print("Part 2:", part2())
