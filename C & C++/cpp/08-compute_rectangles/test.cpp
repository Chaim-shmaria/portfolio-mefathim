#include <vector>
#include <cassert>
#include <array>
#include <list>
#include "compute_rectangles.hpp"

using namespace std;

void compute_rectangles_test()
{
    {
        vector<int> container = {1, 2, 3, 4, 5, 6, 7, 1, 8, 9, 10, 1};
        int c = 1;
        int res = compute_rectangles(container, c);
        int expected = 272;
        assert(res == expected);
    }

    {
        array<int, 10> container = {3, 4, 5, 6, 7, 1, 8, 9, 10, 2};
        int c = 1;
        int res = compute_rectangles(container, c);
        int expected = 286;
        assert(res == expected);
    }

    {
        list<double> container = {2.5, 3.2, 4.1, 1.1, 5.1, 6.3, 7.6, 8.9, 1.2, 12.5};
        double c = 1.3;
        double res = compute_rectangles(container, c);
        double expected = 168.77;
        double epsilon = 0.0001;
        assert((res - expected) < epsilon);
    }
}
