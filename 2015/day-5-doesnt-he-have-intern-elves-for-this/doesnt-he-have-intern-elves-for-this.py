def valid_string(string):
    vowels = ['a', 'e', 'i', 'o', 'u']
    count = 0
    prev = prev_match = False

    for char in list(string):
        if char in vowels:
            count += 1

        if char == prev:
            prev_match = True

        prev = char

    return count >= 3 and prev_match


def contains_strings(string, forbidden):
    for needle in forbidden:
        if needle in string:
            return True

    return False


def part1():
    lines = open('./input.txt', 'r')
    forbidden = ['ab', 'cd', 'pq', 'xy']
    nice_count = 0

    for line in lines:
        if valid_string(line) and contains_strings(line, forbidden) is False:
            nice_count += 1

    return nice_count


print("Part 1:", part1())
