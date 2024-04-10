#include "rational.hpp"
#include <iostream>

int main()
{
    Rational r1(1, 2);
    Rational r2(3, 4);

//    std::cout << r1 << '\n';
//    std::cout << r1.numerator() << "/" << r1.denominator() << '\n';


//    std::cout << r1 << "  " << r2 << '\n';

    Rational r3;
    r3 *= r1;
    r3.print();
    std::cout << " " << (r3 < r1) << " " << (r3 > r1) << " " << (r3 <= r1) << " " << (r3 >= r1) << " " << (r3 == r1) << " " << (r3!= r1) << '\n';;

//    std::cout << r3 << '\n';

//     std::cout << r1 + r2 << std::endl;
//     std::cout << r1 - r2 << std::endl;
//     std::cout << r1 * r2 << std::endl;
//     std::cout << r1 / r2 << std::endl;

    return 0;
}
