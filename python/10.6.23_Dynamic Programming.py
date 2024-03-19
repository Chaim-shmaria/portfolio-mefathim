# egg dropping.
# not completed yet (see:
# https://brilliant.org/wiki/egg-dropping/#:~:text=Egg%20dropping%20refers%20to%20a,number%20of%20certain%20failure%20states.)
import math


def check_exceptional(eggs, height):
    if eggs == 1:
        print("one egg:", height)
        return True
    elif eggs == 0:
        print("there is no eggs")
        return True
    elif eggs > math.log(height, 2):
        print("binary search", math.ceil(math.log(height, 2)))
        return True
    else:
        return False


# my code:
# the recursive version.
def eggs_droppimg(eggs, height, i=1, dict={}):
    # print(eggs, height, i)
    if (eggs, height) in dict:
        # print(eggs,height,i)
        return dict[eggs, height]

    if eggs == 1 or height <= 1:
        # print(eggs, height, i)
        return height
    if i >= height:
        # print(eggs, height, i)
        return float("inf")
    if i == 0:
        # print(eggs, height, i)
        return 0

    # print(eggs, height, i)
    if height > 1 and eggs > 0 and i < height:
        minimum = min(1 + max(eggs_droppimg(eggs - 1, i - 1, 1, dict), eggs_droppimg(eggs, height - i, 1, dict)),
                      eggs_droppimg(eggs, height, i + 1, dict))
        dict[eggs, height] = minimum
        return minimum


# print(eggs_droppimg(n, h))


# the sub solving version:

def dropping(eggs, height):
    array = [[0 for _ in range(height + 1)] for _ in range(eggs + 1)]
    for i in range(height + 1):
        array[1][i] = i
    for i in range(eggs + 1):
        array[i][0] = 0
        array[i][1] = 1
    for i in range(2, eggs + 1):
        for j in range(2, height + 1):
            minimum = float("inf")
            for x in range(2, j):
                minimum = min(minimum, 1 + max(array[i][j - x], array[i - 1][x - 1]))
            array[i][j] = minimum

    # for row in array:
    #     print(row)
    return array[eggs][height]


# print(dropping(n, h))


# The code from the internet - the recursive version. I just added the dict. And so it repeats quickly.
def drops(n, h, dict={}):
    if (n == 1 or h == 0 or h == 1):
        return h
    if (n, h) in dict:
        return dict[n, h]

    minimum = float("inf")

    for x in range(1, h):
        minimum = min(minimum, 1 + max(drops(n - 1, x - 1, dict), drops(n, h - x, dict)))
        dict[n, h] = minimum

    return minimum


# print(drops(n, h))


# The code from the internet - the Dynamic Programming version:
def solvepuzzle(n, k):
    numdrops = [[0 for _ in range(k + 1)] for _ in range(n + 1)]

    for i in range(1, n):
        numdrops[i][1] = 1
        numdrops[i][0] = 0

    for i in range(1, k + 1):
        numdrops[1][i] = i

    for i in range(2, n + 1):
        for j in range(2, k + 1):

            numdrops[i][j] = float("inf")
            minimum = float("inf")

            for x in range(1, j):
                # print(minimum, numdrops[i - 1][x - 1], numdrops[i][j - x])
                minimum = min(minimum, 1 + max(numdrops[i - 1][x - 1], numdrops[i][j - x]))

            numdrops[i][j] = minimum

    # for row in numdrops:
    #     print(row)
    return numdrops[n][k]


# print(solvepuzzle(n, h))


def main():
    _eggs = 3
    _height = 300
    if check_exceptional(_eggs, _height):
        return
    else:
        print(dropping(_eggs, _height))


if __name__ == "__main__":
    main()
