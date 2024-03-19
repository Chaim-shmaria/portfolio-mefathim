# no time for documentation.
# the graph printing is not %100 working.
# The script basically generates a random binary tree and uses libraries to display it. and uses functions from the
# class above. To know the largest zigzag number. (check class description for more info).
# I wanted to improve it all but must move on to next mission.
import random
import networkx as nx
import matplotlib.pyplot as plt
from TreeNode import TreeNode


def create_random_binary_tree(length):
    if length == 0:
        return None

    value = random.randint(1, 1000)
    # First You should implement the class "TreeNode"
    node = TreeNode(value)

    if length > 1:
        left_length = random.randint(0, length - 1)
        right_length = length - 1 - left_length
        node.left = create_random_binary_tree(left_length)
        node.right = create_random_binary_tree(right_length)

    return node


# Create a random binary tree
random_tree = create_random_binary_tree(9)  # Change the number as needed

tree = random_tree.get_dict_rep()

G = nx.DiGraph()

# Add nodes to the graph
G.add_nodes_from(tree.keys())

# Add edges to the graph based on the binary tree structure
for node, children in tree.items():
    left_child, right_child = children
    if left_child:
        G.add_edge(node, left_child)
    if right_child:
        G.add_edge(node, right_child)


def hierarchy_pos(G, root=None, width=1., vert_gap=0.2, vert_loc=0, xcenter=0.5):
    pos = _hierarchy_pos(G, root, width, vert_gap, vert_loc, xcenter)
    return pos


def _hierarchy_pos(G, root, width=1., vert_gap=0.2, vert_loc=0, xcenter=0.5, pos=None, parent=None, parsed=[]):
    if pos is None:
        pos = {root: (xcenter, vert_loc)}
    else:
        pos[root] = (xcenter, vert_loc)
    children = list(G.neighbors(root))
    if len(children) != 0:
        dx = width / 2
        nextx = xcenter - width / 2 - dx / 2
        for child in children:
            nextx += dx
            pos = _hierarchy_pos(G, child, width=dx, vert_gap=vert_gap, vert_loc=vert_loc - vert_gap, xcenter=nextx,
                                 pos=pos, parent=root, parsed=parsed)
    return pos


root = random_tree.value
pos = hierarchy_pos(G, root)  # Define the layout for the tree nodes starting from root 'A'

# Draw nodes
nx.draw(G, pos, with_labels=True, node_size=500, node_color='lightblue')

# Draw edges
nx.draw_networkx_edges(G, pos)

# Display the tree
plt.axis('off')  # Turn off the axis
plt.show()

print(random_tree.checking_largest_zigzag(random_tree))
