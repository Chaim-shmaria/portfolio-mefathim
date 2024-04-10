#include <iostream>
#include <cassert>
#include "stack.hpp"

Stack::Stack(int size)
:m_array(new int[size])
, m_maxSize(size)
, m_top(-1)
{
}

Stack::~Stack()
{
    delete[] this->m_array;
}

void Stack::push(int value)
{
    assert(m_top < m_maxSize && "Stack overflow");
        m_top++;
        m_array[m_top] = value;
}

int Stack::pop()
{
    assert(m_top > -1 && "Stack underflow");
        m_top--;
        return m_array[m_top + 1];
}

int Stack::peek() const
{
    return m_array[m_top];
}

int Stack::size() const
{
    return m_top + 1;
}

bool Stack::is_empty() const
{
    return m_top == -1;
}

bool Stack::is_full() const
{
    return m_top == m_maxSize - 1;
}

std::ostream& operator<<(std::ostream& os, const Stack& stack)
{
    os << "Stack contains: ";
    for (int i = 0; i <= stack.m_top; i++) {
        os << stack.m_array[i] << " ";
    }
    os << std::endl;
    return os;
}

void Stack::drain(Stack &other)
{
    for (int i = 0; i <= other.m_top; i++) {
        push(other.m_array[i]);
    }
}
