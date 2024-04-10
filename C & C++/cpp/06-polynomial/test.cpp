#include "polynomial.hpp"

using namespace std;

void add_test()
{
    Polynomial<int> p{1, 2, 3, 4};
    Polynomial<int> p2{9, 4, 3, 2, 1, 0};
    p2 += p;
    Polynomial<int> expected{9, 4, 4, 4, 4, 4};
    assert(p2 == expected);

    Polynomial<double> d{1.5, 2.5};
    Polynomial<double> d2{3.5, 4.5};
    d2 += d;
    Polynomial<double> expected2{5.0, 7.0};
    assert(d2 == expected2);
}

void sub_test()
{
    Polynomial<int> p{1, 2, 3, 4};
    Polynomial<int> p2{9, 4, 3, 2, 1, 0};
    p2 -= p;
    Polynomial<int> expected{9, 4, 2, 0, -2, -4};
    assert(p2 == expected);

    Polynomial<double> d{1.5, 2.5};
    Polynomial<double> d2{3.5, 4.5};
    d2 -= d;
    Polynomial<double> expected2{2.0, 2.0};
    assert(d2 == expected2);
}

void mult_test()
{
    Polynomial<int> p{1, 2, 3, 4};
    Polynomial<int> p2{9, 4, 3, 2, 1, 0};
    p2 *= p;
    Polynomial<int> expected{9, 22, 38, 56, 30, 20, 11, 4, 0};
    assert(p2 == expected);
}

void evaluate_test()
{
    Polynomial<int> p{9, 8, 7, 6, 5, 4, 3, 2, 1, 0};
    assert(evaluate(p, 2) == 8194);
}

void derivative_test()
{
    Polynomial<int> p{9, 8, 7, 6, 5, 4, 3, 2, 1, 0};
    Polynomial<int> expected{81, 64, 49, 36, 25, 16, 9, 4, 1};
    assert(derivative(p) == expected);
}

void composition_test()
{
    Polynomial<int> p{4, 3, 0, 0, 0};
    Polynomial<int> q{1, 6, 0, 0, 0, 0};
    Polynomial<int> expected = compose(p, q);
    long expected_at2 = evaluate(expected, 2);
    assert(expected_at2 == 1080033280);
}

//TODO:
// double expected.
//    {
//        Polynomial<double> d{1.5, 2.5};
//        Polynomial<double> d2{3.5, 4.5};
//        d2 *= d;
//        Polynomial<double> expected2{5.0, 10.0};
//        std::cout << d << d2 << expected2;
//        assert(d2 == expected2);
//    }