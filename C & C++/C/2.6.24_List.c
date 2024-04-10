#include <stdlib.h>
#include <stdio.h>

typedef struct Node Node;

typedef struct Node {
    int data;
    Node* next;
    Node* prev;
} Node;

typedef struct DoublyLinkdList {
    unsigned int size;
    Node* head;
    Node* last;
    unsigned int max_size;
} DoublyLinkdList;

DoublyLinkdList* initList()
{
 DoublyLinkdList* newList = malloc(sizeof(DoublyLinkdList));
 newList->size = 0;
 newList->head = NULL;
 newList->last = NULL;
 return newList;
}

Node* add(Node* prev, Node* next, int data)
{
    Node * newNode = malloc(sizeof(Node));
    newNode->data = data;
    newNode->prev = prev;
    if (prev) {
        prev->next = newNode;
    }
    newNode->next = next;
    if (next) {
        newNode->next->prev = newNode;
    }
    return newNode;
}

void addToHead(DoublyLinkdList* list, int value)
{
    Node* newHead = add(NULL, list->head, value);
    list->head = newHead;
    list->size ++;
}

void addToEnd(DoublyLinkdList* list, int value)
{
    Node* newNode = add(list->last, NULL, value);
    if (!list->head) {
        list->head = newNode;
    }
    list->last = newNode;
    list->size ++;
}

void add_in(DoublyLinkdList* list, int value, int position)
{
    Node* toPlace = list->head;
    for (int i = 1; i < position; i++) {
        toPlace = toPlace->next;
    }
    add(toPlace, toPlace->next, value);
    list->size ++;
}

void delete(DoublyLinkdList* list, Node* node)
{
    if (node == list->head) {
        list->head = list->head->next;
        node->next->prev = NULL;
    } else {
        node->prev->next = node->next;
    }
    if ( node == list->last) {
        list->last = list->last->prev;
        node->prev->next = NULL;
    } else {
        node->next->prev = node->prev;
    }
    free(node);
    list->size --;
}

void deleteHead(DoublyLinkdList* list)
{
    delete(list, list->head);
}

Node* find(Node* head, int x)
{
    while (head->next) {
        if (head->data == x){
            return head;
        } else {
            head = head->next;
        }
    }
    return NULL;
}

void print(Node* head)
{
    while (head) {
        Node* next = head->next;
        printf("%d ", head->data);
        head = next;
    }
    printf("\n");
}

void destroy(DoublyLinkdList* list)
{
    Node* ptr = list->head;
    while (ptr) {
        Node* next = ptr->next;
        free(ptr);
        ptr = next;
    }
    free(list);
}

int main()
{
    DoublyLinkdList * list = initList();
    int to_list[10] = {678, 456, 234, 765, 5, 6, 0, 21, 22, 318};
    for (int i = 0; i < 10; ++i) {
        addToEnd(list, to_list[i]);
    }
    printf("%d\n", list->head->data);
    print(list->head);
    Node* ptr = find(list->head, 0);
    ptr->data = 148;
    ptr = find(list->head, 456);
    delete(list, ptr);
    deleteHead(list);
    print(list->head);
    destroy(list);
    return 0;
}