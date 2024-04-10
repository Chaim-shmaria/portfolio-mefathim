#include "ostream"

class Stack {
public:
    Stack(int size);
    ~Stack();
    void push(int);
    int pop();
    int peek() const;
    bool is_empty() const;
    bool is_full() const;
    int size() const;
    void drain(Stack &other);
    friend std::ostream& operator<<(std::ostream&, const Stack&);

private:
    int m_top;
    int m_maxSize;
    int* m_array;

};

