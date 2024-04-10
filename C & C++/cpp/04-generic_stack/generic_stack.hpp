// Created by Haim on 28/02/24.
#include <iostream>
#include <cassert>


template <typename T>
class Stack {
public:
    Stack(int size);
    ~Stack();
    void push(T);
    T pop();
    T peek() const;
    bool is_empty() const;
    bool is_full() const;
    int size() const;
    void drain(Stack &other);

    template<typename U>
    friend std::ostream& operator<<(std::ostream&, const Stack<U>&);

private:
    T* m_array;
    int m_maxSize;
    int m_top;
};

template <typename T>
Stack<T>::Stack(int size)
:m_array(new T[size])
, m_maxSize(size)
, m_top(-1)
{
}

template <typename T>
Stack<T>::~Stack()
{
    delete[] m_array;
}

template <typename T>
void Stack<T>::push(T value)
{
    assert(m_top < m_maxSize && "Stack overflow");
    m_top++;
    m_array[m_top] = value;
}

template <typename T>
T Stack<T>::pop()
{
    assert(m_top > -1 && "Stack underflow");
        m_top--;
        return m_array[m_top + 1];
}

template <typename T>
T Stack<T>::peek() const
{
    return m_array[m_top];
}

template <typename T>
int Stack<T>::size() const
{
    return m_top + 1;
}

template <typename T>
bool Stack<T>::is_empty() const
{
    return m_top == -1;
}

template <typename T>
bool Stack<T>::is_full() const
{
    return m_top == m_maxSize - 1;
}

template <typename T>
void Stack<T>::drain(Stack<T> &other)
{
    for (int i = 0; i <= other.m_top; i++) {
        push(other.m_array[i]);
    }
}

template <typename U>
std::ostream& operator<<(std::ostream& os, const Stack<U>& stack)
{
    os << "Stack contains: ";
    for (int i = 0; i <= stack.m_top; i++) {
        os << stack.m_array[i] << ", ";
    }
    os << std::endl;
    return os;
}
