def part1():
    lines = open('./input.txt', 'r')
    total_dimensions = 0

    for line in lines:
        dimensions = list(map(int, line.split('x')))
        surfaces = [
            dimensions[0] * dimensions[1],
            dimensions[1] * dimensions[2],
            dimensions[2] * dimensions[0]
        ]
        min_surface = min(surfaces)
        surfaces = list(map(lambda x: 2 * x, surfaces))
        surfaces.append(min_surface)
        total_dimensions += sum(surfaces)

    return total_dimensions


print("Part 1:", part1())
