#include "rational.hpp"
#include <algorithm>


Rational::Rational(int numerator, int denominator)
: m_numerator(numerator)
, m_denominator(denominator)
{
}

int Rational::numerator() const
{
    return m_numerator;
}

int Rational::denominator() const
{
    return m_denominator;
}

Rational Rational::operator+(Rational other) const
{
    int num = m_numerator * other.denominator() + other.numerator() * m_denominator;
    int denom = m_denominator * other.denominator();
    return Rational(num, denom).simplify();
}

void Rational::operator+=(Rational other)
{
    *this = operator+(Rational(other));
}

Rational Rational::operator-(Rational other) const
{
    int num = m_numerator * other.denominator() - other.numerator() * m_denominator;
    int denom = m_denominator * other.denominator();
    return Rational(num, denom).simplify();
}

void Rational::operator-=(Rational other)
{
    *this = operator-(Rational(other));
}

Rational Rational::operator*(Rational other) const
{
    int num = m_numerator * other.numerator();
    int denom = m_denominator * other.denominator();
    return Rational(num, denom).simplify();
}

void Rational::operator*=(Rational other)
{
    *this = operator*(Rational(other));
}

Rational Rational::operator/(Rational other) const
{
    int num = m_numerator * other.denominator();
    int denom = m_denominator * other.numerator();
    return Rational(num, denom).simplify();
}

void Rational::operator/=(Rational other)
{
    *this = operator/(Rational(other));
}

bool Rational::operator==(Rational other) const
{
    Rational a = Rational(this->numerator(), this->denominator()).simplify();
    Rational b = Rational(other).simplify();
    return a.numerator() == b.numerator() && a.denominator() == b.denominator();
}

bool Rational::operator!=(Rational other) const
{
    return!(*this == other);
}

bool Rational::operator<(Rational other) const
{
    Rational a = Rational(this->numerator(), this->denominator()).simplify();
    Rational b = Rational(other).simplify();
    return a.numerator() * b.denominator() < b.numerator() * a.denominator();
} // need to understand this logic above

bool Rational::operator>(Rational other) const
{
    return other < *this;
}

bool Rational::operator<=(Rational other) const
{
    return *this < other || *this == other;
}

bool Rational::operator>=(Rational other) const
{
    return *this > other || *this == other;
}


Rational Rational::simplify()
{
    int gcd = std::__gcd(this->numerator(), this->denominator());
    return Rational(this->numerator() / gcd, this->denominator() / gcd);
}

void Rational::print() const
{
    std::cout << m_numerator << "/" << m_denominator << " ";
}


std::ostream& operator<<(std::ostream& os, Rational r)
{
    std::cout << r.numerator() << "/" << r.denominator();
    return os;
}

