# date: 9.24.23
# The TreeNode class: with a dict preparation function to match the visualization library.
# With a function that checks the depth of the tree (I did for a basis to try to write a visual display
# function myself).
# With a function that checks the largest number of zigzags - not verified yet because the visual display function is
# not perfect, so it was difficult for me to work with it.
# And the second script just generates a random binary tree and uses libraries to display it. and uses functions
# from the class above.
class TreeNode:
    def __init__(self, value=None, left=None, right=None):
        self.left = left
        self.right = right
        self.value = value

    def get_dict_rep(self):
        left = None
        right = None
        if self.left is not None:
            left = self.left.value
        if self.right is not None:
            right = self.right.value
        result = {self.value: (left, right)}
        if self.left is not None:
            result.update(self.left.get_dict_rep())
        if self.right is not None:
            result.update(self.right.get_dict_rep())
        return result

    def checking_tree_depth(self, tree_root, depth=0):
        if tree_root is None:
            return depth
        else:
            right = self.checking_tree_depth(tree_root.left, depth + 1)
            left = self.checking_tree_depth(tree_root.right, depth + 1)
        return max(right, left)

    def checking_largest_zigzag(self, root_node):
        # this code didn't verify yes completely. dua to bad visual of the tree in windows (libraries for linux).
        right = self.counting_turns(root_node.right, 'right', 0)
        left = self.counting_turns(root_node.left, 'left', 0)
        print(max(left, right))

    def counting_turns(self, node, node_type, turns, ):
        if node is None:  # Base case: stop recursion when we reach a leaf node
            return turns
        if node_type == 'right':
            right = self.counting_turns(node.right, 'right', turns)
            left = turns
            if node.left is not None:
                left = self.counting_turns(node.left, 'left', turns + 1)
            return max(right, left)
        elif node_type == 'left':
            right = turns
            if node.right is not None:
                right = self.counting_turns(node.right, 'right', turns + 1)
            left = self.counting_turns(node.left, 'left', turns)
            return max(right, left)
