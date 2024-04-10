
#include <stdio.h>
#include <malloc.h>

typedef enum operator {
    ADD = '+',
    SUB = '-',
    MUL = 'X',
    DIV = '/'
} operator;

typedef enum NodeType {
    OPERATOR,
    NUMBER
} NodeType;

typedef struct NumberNode {
    double value;
} NumberNode;

typedef struct OperatorNode {
    char operator;
    struct Node * left;
    struct Node * right;
} OperatorNode;

typedef struct Node {
    NodeType type;
    union {
        NumberNode numberNode;
        OperatorNode operatorNode;
    };
} Node;

Node * make_int(double value) {
    Node * newNode = malloc(sizeof(Node));
    newNode -> type = NUMBER;
    newNode -> numberNode.value = value;
    return newNode;
}

Node* make_op(char sign, Node * left_child, Node * right_child) {
    Node* newNode = malloc(sizeof(Node));
    newNode->type = OPERATOR;
    newNode->operatorNode.operator = sign;
    newNode->operatorNode.left = left_child;
    newNode->operatorNode.right = right_child;
    return newNode;
}

void print(Node* root, int depth) {
    if (root == NULL) { return;};
    if (root -> type == NUMBER){
        printf("%f", root->numberNode.value);
        return;
    }
    if (depth != 0) {printf("(");};
    print(root->operatorNode.left, depth + 1);
    printf(" %c ", root->operatorNode.operator);
    print(root->operatorNode.right, depth + 1);
    if (depth != 0) {printf(")");};
}
double result;
double evaluate(Node* node) {
    double sum = 0;
    if (node == NULL) {
        printf("Error");
        return 0;
    }
    if (node->type == NUMBER) {
        sum = node->numberNode.value;
    } else {
        double left;
        double right;
        left = evaluate(node->operatorNode.left);
        right = evaluate(node->operatorNode.right);

        switch (node->operatorNode.operator) {
            case '+':
                sum =  left + right;
                break;
            case '-':
                sum =  left - right;
                break;
            case 'X':
                sum =  left * right;
                break;
            case '/':
                sum =  left / right;
                break;
        }
    }

    return sum;
}

int main()
{

    Node* v4 = make_int(4);
    Node* v5 = make_int(5);

    Node* e1 = make_op(ADD, v5, v4);

    Node* v7 = make_int(7);
    Node* v3 = make_int(3);

    Node* e2 = make_op(SUB, v7, v3);

    Node* e3 = make_op(MUL, e1, e2);

    int recursion = 0;
    print(e3, recursion); // (4+5)*(7-3)
    int r = evaluate(e3);
    printf(" = %d", r); // 36

    free(v4);
    free(v5);
    free(e1);
    free(v7);
    free(v3);
    free(e2);
    free(e3);
    return 0;
}