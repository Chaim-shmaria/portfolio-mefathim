#include <cassert>
#include <algorithm>
#include "linked_list.hpp"

void LinkedList_test()
{
    LinkedList<int> list(10);
    list = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};
    LinkedList<int> list2 = list;
    assert(list == list2);
    list2.remove_head();
    assert(list2.head_value() == 9);

    list2.insert(10);
    LinkedList<int> res(10);
    res = {0, 0, 0, 0, 0, 0, 0, 0, 0, 0};
    std::transform(list.begin(), list.end(),
              list2.begin(), res.begin(),
              [](int a, int b) { return a + b; });
    LinkedList<int> expected(10);
    expected = {2, 4, 6, 8, 10, 12, 14, 16, 18, 20};
    assert(res == expected);


    auto a =  std::find_if(list.begin(), list.end(), [](int x) { return x == 1; });
    assert(a != list.end());
    auto b =  std::find_if(list.begin(), list.end(), [](int x) { return x == -5; });
    assert(!(b != list.end()));
}
