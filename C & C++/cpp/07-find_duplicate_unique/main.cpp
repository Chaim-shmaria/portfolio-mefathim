#include <iostream>

// #include "test.hpp"

void firstDuplicate_test();
void firstUnique_test();

int main()
{
    std::cout << '\n';

    firstDuplicate_test();
    std::cout << "'First Duplicate' function: Tested!" << "\n";

    firstUnique_test();
    std::cout << "'First Unique' function: Tested!" << "\n";


    return 0;
}
