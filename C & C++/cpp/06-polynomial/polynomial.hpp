#include <vector>
#include <cassert>
#include <ostream>

template <typename T>
class Polynomial {
public:
    Polynomial(size_t degree);
    Polynomial(std::initializer_list<T> coefficients);
    size_t get_degree() const;
    T& operator[](size_t index);
    const T& operator[](size_t index) const;
    void print() const;

private:
    size_t m_degree;
    std::vector<T> m_coefficients;
};

#include <iostream>
#include <algorithm>


template<typename T>
Polynomial<T>::Polynomial(size_t degree)
: m_degree(degree)
, m_coefficients(degree + 1)
{
}

template<typename T>
Polynomial<T>::Polynomial(std::initializer_list<T> coefficients)
: m_degree(coefficients.size() - 1)
, m_coefficients(coefficients)
{
    std::reverse(m_coefficients.begin(), m_coefficients.end());
}

template<typename T>
size_t Polynomial<T>::get_degree() const
{
    return m_degree;
}

template<typename T>
Polynomial<T> operator+(const Polynomial<T>& left, const Polynomial<T> &right)
{
    size_t maxDegree = std::max(left.get_degree(), right.get_degree());
    Polynomial<T> result(maxDegree), min(maxDegree);
    if (left.get_degree() > right.get_degree()){
        result = left;
        min = right;
    } else {
        result = right;
        min = left;
    }
    for (size_t i = 0; i <= min.get_degree(); i++) {
        result[i] += min[i];
    }
    return result;
}

template<typename T>
Polynomial<T> operator-(const Polynomial<T>& left, const Polynomial<T>& right)
{
    size_t maxDegree = std::max(left.get_degree(), right.get_degree());
    Polynomial<T> result(maxDegree);

    for (size_t i = 0; i <= maxDegree; i++) {
        T currentLeft = (i <= left.get_degree()) ? left[i] : 0;
        T currentRight = (i <= right.get_degree()) ? right[i] : 0;
        result[i] = currentLeft - currentRight;
    }

    return result;
}

template<typename T>
Polynomial<T> operator*(const Polynomial<T> &left, const Polynomial<T> &right)
{
    size_t deg = left.get_degree() + right.get_degree();
    Polynomial<T> result(deg);
    for (size_t i = 0; i <= left.get_degree(); ++i) {
        for (size_t j = 0; j <= right.get_degree(); ++j) {
            result[i + j] +=left[i] *right[j];
        }
    }
    return result;
}

template<typename T>
void operator+=(Polynomial<T> &left, const Polynomial<T> &right)
{
    left = left + right;
}

template<typename T>
void operator-=(Polynomial<T> &left, const Polynomial<T> &right)
{
    left = left - right;
}

template<typename T>
void operator*=(Polynomial<T> &left, const Polynomial<T> &right)
{
    left = left * right;
}

template<typename T>
Polynomial<T> operator*(const Polynomial<T>& polynomial, T scalar)
{
    Polynomial<T> current = polynomial, result(polynomial.get_degree());
    for (size_t i = 0; i <= polynomial.get_degree(); ++i) {
        result[i] = current[i] * scalar;
    }
    return result;
}

template<typename T>
void operator*=(const Polynomial<T>& polynomial, T scalar)
{
    polynomial = polynomial * scalar;
}

template<typename T>
T& Polynomial<T>::operator[](size_t index)
{
    return m_coefficients.at(index);
}

template<typename T>
const T& Polynomial<T>::operator[](size_t index) const
{
    return m_coefficients.at(index);
}

template<typename T>
bool operator==(const Polynomial<T>& left, const Polynomial<T>& right)
{
    for (size_t i = 0; i <= left.get_degree(); i++) {
        if (left[i]!=right[i]) {
            return false;
        }
    }

    return true;
}

template<typename T>
T evaluate(const Polynomial<T>& poly, T x)
{
    T result = 0, x_pow = 1;
    for (size_t i = 0; i <= poly.get_degree(); ++i) {
        result += poly[i] * x_pow;
        x_pow *= x;
    }
    return result;
}

template<typename T>
Polynomial<T> derivative(const Polynomial<T>& poly)
{
    Polynomial<T> result(poly.get_degree() - 1);
    for (size_t i = 1; i <= poly.get_degree(); ++i) {
        result[i - 1] = poly[i] * static_cast<int>(i);
    }
    return result;
}

template<typename T>
Polynomial<T> compose(const Polynomial<T>& left, const Polynomial<T> &right)
{
    size_t deg = left.get_degree() * right.get_degree();
    Polynomial<T> result(deg), currentPower(0);
    currentPower[0] = 1;

    for (size_t i = 0; i <= left.get_degree(); ++i) {
        result += currentPower *left[i];
        if (i < left.get_degree()) {
            currentPower *= right;
        }
    }
    return result;
}

template<typename T>
Polynomial<T> find_root(const Polynomial<T>& poly)
{
}

template<typename T>
void Polynomial<T>::print() const
{
    size_t i = m_degree;
    std::cout << "Polynomial: ";
    for (; i != SIZE_MAX; --i) {
        if (m_coefficients[i]!= 0) {
            if (i == 1) {
                std::cout << m_coefficients[i] << "x";
                --i;
                break;
            } else if (i == 0) {
                std::cout << m_coefficients[i] << std::endl;
                return;
            } else {
                std::cout << m_coefficients[i] << "x^" << i;
                --i;
                break;
            }
        }
        if (i == 0) {
            std::cout << "0\n";
        }
    }
    for (; i != SIZE_MAX; --i) {
        T coef = m_coefficients[i];
        if (i > 1 && coef != 0) {
            std::cout << " + " << coef << "x^" << i;
        } else if (i == 1 && coef!= 0) {
            std::cout << " + " << coef << "x";
        } else if (i == 0 && coef!= 0) {
            std::cout << " + " << coef;
        }
    }
    std::cout << std::endl;
}

template<typename T>
void operator<<(std::ostream& , const Polynomial<T> &poly)
{
    poly.print();
}

//TODO:
// implement findRoot() function
// implement FFT in multiplication
