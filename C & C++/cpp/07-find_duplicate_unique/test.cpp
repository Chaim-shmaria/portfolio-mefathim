#include <cassert>

#include "duplicate_unique.hpp"

void firstDuplicate_test()
{
    {
        std::vector<int> v = {1, 2, 3, 4, 5, 6, 7, 8, 9, 1};
        int expected = *v.begin();
        auto result = first_duplicate<int>(v.begin(), v.end());
        assert(*result == expected);
    }

    {
        std::vector<int> v = {1, 2, 3, 4, 5, 4, 6, 7, 8, 3, 9};
        int expected = 3;
        auto result = first_duplicate<int>(v.begin(), v.end());
        assert(*result == expected);
    }

    std::vector<int> v2 = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};
    auto expected2 = v2.end();
    auto result2 = first_duplicate<int>(v2.begin(), v2.end());
    assert(result2 == expected2);

    std::string myName[15] = {"Haim", "Yair", "Yehuda", "Nachman", "Menachem", "Eliahu", "Kalmen", "Eliezer", "Eliezer"};
    auto expected3 = "Eliezer";
    auto result3 = first_duplicate<std::string>(myName, myName + 15);
    assert(*result3 == expected3);

    std::string a = {"1234567890"};
    auto expected5 = a.end();
    auto result5 = first_duplicate<char>(a.begin(), a.end());
    assert(result5 == expected5);

    std::string b = {"11223344556677889900"};
    auto expected6 = b.begin();
    auto result6 = first_duplicate<char>(b.begin(), b.end());
    assert(result6 == expected6);
}


void firstUnique_test()
{
    std::vector<int> v = {1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6};
    auto expected = v.at(10);
    auto result = first_unique<int>(v.begin(), v.end());
    assert(*result == expected);

    std::vector<int> v2 = {5, 4, 3, 2, 1, 0, 0, 1, 2, 3, 4, 5};
    auto expected2 = v2.end();
    auto result2 = first_unique<int>(v2.begin(), v2.end());
    assert(result2 == expected2);

    std::string a = {"1234567890"};
    auto expected5 = a.begin();
    auto result5 = first_unique<char>(a.begin(), a.end());
    assert(result5 == expected5);

    std::string b = {"11223344556677889900"};
    auto expected6 = b.end();
    auto result6 = first_unique<char>(b.begin(), b.end());
    assert(result6 == expected6);

}

// TODO: add more tests later
//    std::string myName[9] = {"Yair", "Yair", "Yehuda", "Nachman", "Eliahu", "Eliahu", "Nachman", "Eliezer", "Eliezer"};
//    auto expected3 = myName + 9;
//    auto result3 = first_unique<std::string>(myName, myName + 9);
//    assert(result3 == expected3);
//
//    std::string myName2[9] = {"Haim", "Yair", "Yehuda", "Nachman", "Menachem", "Eliahu", "Kalmen", "Eliezer", "Eliezer"};
//    auto expected4 = "Haim";
//    auto result4 = first_unique<std::string>(std::begin(myName2), std::end(myName2));
//    std::cout << *result4 << std::endl;
//    assert(*result4 == expected4);

