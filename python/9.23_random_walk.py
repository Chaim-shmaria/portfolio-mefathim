import random
import matplotlib.pyplot as plt
from mpl_toolkits import mplot3d


def random_walk1d(steps):
    x = [i for i in range(steps)]
    y = [0] * steps
    pos = 0
    for i in range(steps):
        random_direction = random.randint(0, 1)
        direction = 2 * random_direction - 1
        pos += direction
        y[i] = pos
    plt.plot(x, y, 'r-')
    plt.title("1-D Random Walks")
    plt.show()


# random_walk1d(5000)


def random_walk2d(steps):
    x = [0] * steps
    y = [0] * steps
    last_pos = (0, 0)

    for i in range(steps):
        x[i], y[i] = last_pos
        direction = random.choice([x, y])
        direction[i] += random.choice([1, -1])
        last_pos = (x[i], y[i])

    plt.plot(x, y, 'r-')
    plt.title("1-D Random Walks")
    plt.show()


# random_walk2d(5000)


def random_walk3d(steps):
    x = [0] * steps
    y = [0] * steps
    z = [0] * steps
    last_pos = [0, 0, 0]

    for i in range(steps):
        x[i], y[i], z[i] = last_pos
        direction = random.choice([x, y, z])
        direction[i] += random.choice([1, -1])
        last_pos = [x[i], y[i], z[i]]

    plt.style.use('seaborn-v0_8-poster')
    ax = plt.axes(projection='3d')
    ax.plot3D(x, y, z)
    ax.set_title('Random Walk 3D')
    plt.show()


random_walk3d(5000)
