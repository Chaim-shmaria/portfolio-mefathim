#include "stack.hpp"
#include <iostream>

int main()
{
    Stack s(20);
//    std::cout << s.is_empty() << std::endl;
//    std::cout << s << std::endl;
    for (int i = 1; i <= 10; i++) {
        s.push(i);
    }
    std::cout << s;
//    s.pop();
//    std::cout << s.is_full() << std::endl;
//    std::cout << s.pop() << std::endl;
//    std::cout << s.peek() << std::endl;
//    std::cout << s.size() << std::endl;

    Stack s2(10);
    for (int i = -1; i >= -10; i--) {
        s2.push(i);
    }
    std::cout << s2;
    std::cout << s.is_full() << s2.is_full() << std::endl;
    s.drain(s2);
    std::cout << s;

    s2.~Stack();
    s.~Stack();
    return 0;
}
