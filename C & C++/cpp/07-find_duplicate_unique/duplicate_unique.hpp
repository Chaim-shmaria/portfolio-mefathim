#include <unordered_map>
#include <vector>
#include <list>
#include <array>
#include <iostream>


template <typename T, typename Iter>
Iter first_duplicate(Iter begin, Iter end)
{
    std::unordered_map<T, std::pair<Iter, size_t>> dict;

    size_t counter = std::distance(begin, end);
    auto result = std::make_pair(end, counter + 1);
    counter = 0;

    for (Iter it = begin; it!= end; ++it) {
        counter++;
        if (dict.find(*it) == dict.end()) {
            dict[*it] = std::make_pair(it, counter);
        } else if (dict.find(*it)!=dict.end() && dict[*it].second < result.second) {
            result = dict[*it];
        }
    }
    return result.first;
}

template <typename T, typename Iter>
Iter first_unique(Iter begin, Iter end)
{
    std::unordered_map<T, bool> dict;

    auto result = begin;

    for (Iter it = begin; it!= end; ++it) {
        dict[*it] = dict.find(*it) != dict.end();
    }
    while (result != end && dict[*result]) {
        ++result;
    }

    return result;
}
