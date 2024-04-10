// Created by Haim on 28/02/24.
#include "generic_stack.hpp"


int main()
{
    Stack<int> int_S(10);
    for (int i = 0; i < 10; i++) {
        int_S.push(i);
    }
    Stack<double> double_S(20);
    for (int i = 0; i < 10; i++) {
        double_S.push(static_cast<double>(i) / 2);
    }
    Stack<char> char_S(10);
    for (int i = 0; i < 10; i++) {
        char_S.push(static_cast<char>(i + 48));
    }
    double_S.push(1.2);
    std::cout << int_S;
    std::cout << double_S;
    std::cout << "double_S size: " << double_S.size() << std::endl;
    std::cout << char_S;
    double_S.pop();
    Stack<double> double_S2(20);
    for (int i = 0; i < 10; i++) {
        double_S2.push(static_cast<double>(i) / 2);
    }
    double_S.pop();
    double_S2.drain(double_S);
    std::cout << double_S2;


    return 0;
}
