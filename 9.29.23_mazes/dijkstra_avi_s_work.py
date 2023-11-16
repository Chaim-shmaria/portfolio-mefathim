import cv2
import matplotlib.pyplot as plt
import numpy as np
import heapq
import tqdm

# file = '/home/mefathim-tech-25/Downloads/maze.png'
file =  'C:\\Users\\User\\Downloads\\mazes\\maze5.jpg'

img = cv2.imread(file)  # read an image from a file using
sx, sy = 320,5
ex, ey = 320, 301

cv2.circle(img, (sy, sx), 3, (255, 0, 0), -1)  # add a circle at (5, 220)
cv2.circle(img, (ey, ex), 3, (0, 0, 255), -1)  # add a circle at (5,5)

# plt.figure(figsize=(7, 7))
# plt.imshow(img)  # show the image
# plt.show()
img = cv2.imread(file)
img = img[:, :, 0]
print(img.shape)


def get_neighbors(current, img):
    x, y = current
    h, w = img.shape
    neighbors = []
    for dx in range(-1, 2):
        for dy in range(-1, 2):
            i, j = x + dx, y + dy
            if 0 <= i < h and 0 <= j < w and img[i, j] > 200:
                neighbors.append((i, j))
    return neighbors


def calc_dist(current, neighbor):
    x1, y1 = current
    x2, y2 = neighbor
    return ((x1 - x2) ** 2 + (y1 - y2) ** 2) ** .5

def manhattan_distance(node, dest):
    x1, y1 = node
    x2, y2 = dest
    return abs(x1-x2) + abs(y1-y2)

def dijkstra_path(img, sx, sy, ex, ey):
    """return list of tuples representing the path from start to end"""
    heap = []
    node_cost = {(sx, sy): 0}
    node_parent = {}
    visited = set()
    current = (sx, sy)

    h, w = img.shape
    progress = tqdm.tqdm(total=h * w)
    while (ex, ey) not in visited:
        progress.update(1)
        visited.add(current)
        for neighbor in get_neighbors(current, img):
            if neighbor in visited:
                continue
            dest_dist = manhattan_distance(neighbor, (ex, ey))
            # dest_dist = 0
            new_cost = node_cost[current] + calc_dist(current, neighbor)
            if neighbor not in node_cost or new_cost < node_cost[neighbor]:
                node_cost[neighbor] = new_cost
                node_parent[neighbor] = current
                heapq.heappush(heap, (20*dest_dist + new_cost, neighbor))

        while current in visited:
            _, current = heapq.heappop(heap)

    path = []
    node = (ex, ey)
    while node != (sx, sy):
        path.append(node)
        node = node_parent[node]

    return path[::-1], visited


def drawPath(img, path, thickness=1):
    '''path is a list of (x,y) tuples'''
    x0, y0 = path[0]
    for vertex in path[1:]:
        x1, y1 = vertex
        cv2.line(img, (y0, x0), (y1, x1), (255, 0, 0), thickness)
        x0, y0 = vertex

def mark_visited(img, nodes):
    for i,j in nodes:
        img[i,j] = (238, 240, 163)

path, visited = dijkstra_path(img, sx, sy, ex, ey)

img = cv2.imread(file)
mark_visited(img, visited)
drawPath(img, path, 3)

plt.figure(figsize=(14, 14))
plt.imshow(img)  # show the image
plt.show()
