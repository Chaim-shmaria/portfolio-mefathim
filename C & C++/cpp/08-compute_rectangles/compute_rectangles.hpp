#include <algorithm>
#include <numeric>
#include <vector>
#include <iostream>

using namespace std;

template<typename Container>
auto compute_rectangles(Container container, typename Container::value_type c)
{
    using T = typename Container::value_type;

    vector<T> result(container.size() + 1, T(0));//fix
    transform(
            container.begin(), container.end(),
            next(container.begin()),
            next(result.begin()),
            [c] (T a, T b)
            {
                if (a > c && b > c) { return a * b; } else { return T(0); }
            }
    );
    T res = accumulate(result.begin(), prev(result.end()), T(0));

    return res;
}

using namespace std;

template<typename Container>
auto compute_rectangles_2(Container container, typename Container::value_type c)
{
    using T = typename Container::value_type;

    vector<T> result(container.size() + 1, T(0));

    transform_reduce(
            container.begin(), container.end(),
            next(container.begin()),
            T(0),
            [c] (T a, T b)
            {
                (a > c && b > c) ? a * b : T(0);
            }
    );

    return result.back();
}
