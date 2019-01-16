import hashlib


def part1():
    puzzle_input = 'bgvyzdsv'
    number = 0
    needle = '00000'

    while True:
        hash_input = puzzle_input + str(number)
        hash = hashlib.md5(hash_input.encode('utf-8')).hexdigest()

        if hash.startswith(needle):
            break
        else:
            number += 1

    return number


def part2():
    puzzle_input = 'bgvyzdsv'
    number = 0
    needle = '000000'

    while True:
        hash_input = puzzle_input + str(number)
        hash = hashlib.md5(hash_input.encode('utf-8')).hexdigest()

        if hash.startswith(needle):
            break
        else:
            number += 1

    return number


print("Part 1:", part1())
print("Part 2:", part2())
