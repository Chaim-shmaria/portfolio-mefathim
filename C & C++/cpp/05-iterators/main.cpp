// Created by Haim on 28/02/24.
#include <cassert>
#include <iostream>
#include <algorithm>
#include <array>
#include <vector>
#include <list>


template <typename Container>
void print_container(Container container)
{
    auto iter = container.begin();
    std::cout << "[" << *iter;
    ++iter;
    for (; iter!=container.end() ; ++iter) {
        std::cout << ", " << *iter;
    }
    std::cout << "]" << std::endl;
}

template <typename ptr>
auto product(ptr begin, ptr end)
{
    auto result = *begin / *begin;
    for (ptr iter = begin; iter!= end; ++iter) {
        result *= *iter;
    }
    return result;
}


template <typename Container>
auto RL_product(Container container)
{
    auto leftSum = product(container.begin(), container.end());
    auto rightSum = product(container.rbegin(), container.rend());
    assert(rightSum == leftSum && "Something went wrong...");
    return rightSum;
}

template <typename Container>
auto find_max(Container container)
{
    auto iter = container.begin();
    auto max = *iter;
    for (; iter!= container.end(); ++iter) {
        if (*iter > max) {
            max = *iter;
        }
    }
    return max;
}

template <typename Container>
auto search(Container container, int value)
{
    for (auto iter = container.begin(); iter!= container.end(); ++iter) {
        if (*iter == value) {
            return iter;
        }
    }
    std::cout << "Value not found" << std::endl;
    return container.end();
}

int main()
{
    std::array<int, 10> arr = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};
    print_container(arr);
    std::cout << "Product: " << RL_product(arr) << ". Max: " << find_max(arr) << std::endl;

    std::vector<int> vec = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};
    print_container(vec);
    std::cout << "Product: " << RL_product(vec) << ". Max: " << find_max(vec) << std::endl;

    std::list<int> list = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};
    print_container(list);
    std::cout << "Product: " << RL_product(list) << ". Max: " << find_max(list) << std::endl;

    std::array<double, 10> doubleArr = {0.5, 1.0, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0, 4.5, 5.0};
    print_container(doubleArr);
    std::cout << "Product: " << RL_product(doubleArr) << ". Max: " << find_max(doubleArr) << std::endl;

    std::cout << search(arr, 10) << std::endl;
    return 0;
}