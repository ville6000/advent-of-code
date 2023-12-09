from pprint import pprint

def part1():
    instructions = open('./1.txt', 'r').readline().split(',')
    instructions = map(lambda x: x.strip(), instructions)
    # No Time for a taxicab
    # 0 = North, 1 = East, 2 = South, 3 = West
    direction = 0
    x = 0
    y = 0
    for instruction in instructions:
        turn = instruction[0]
        distance = int(instruction[1:])
        if turn == 'R':
            direction = (direction + 1) % 4
        else:
            direction = (direction - 1) % 4
        if direction == 0:
            y += distance
        elif direction == 1:
            x += distance
        elif direction == 2:
            y -= distance
        else:
            x -= distance

    return abs(x) + abs(y)


print(part1())

