#include <vector>
#include <algorithm>
#include <iostream>

using namespace std;

template<typename T>
class SortedVector : private std::vector<T> {
    std::vector<T> m_data;
public:
    auto begin()  {return std::vector<T>::begin();}
    auto end()  {return std::vector<T>::end();}
    void add(T const& value) {

        std::vector<T>::push_back(value);


        std::sort(begin(), end());
    }

    auto begin() const { return std::vector<T>::begin(); }
    auto end() const  { return std::vector<T>::end(); }
};

int main()
{
    SortedVector<int> sv;
    sv.add(1);
    sv.add(2);
    sv.add(3);
    sv.add(4);
    sv.add(5);
    sv.add(6);
    sv.add(7);
    sv.add(8);
    sv.add(9);
    sv.add(10);

    for (int coef: sv) {
        std::cout << coef << ", ";
    }
    std::cout << '\n';
    return 0;
}