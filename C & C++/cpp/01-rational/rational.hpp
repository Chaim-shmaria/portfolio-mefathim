#include <iostream>
#include "numeric"


class Rational {
public:
    Rational(int numerator = 0, int denominator = 1);

    int numerator() const;
    int denominator() const;

    Rational operator+(Rational other) const;
    void operator+=(Rational other);
    Rational operator-(Rational other) const;
    void operator-=(Rational other);
    Rational operator*(Rational other) const;
    void operator*=(Rational other);
    Rational operator/(Rational other) const;
    void operator/=(Rational other);

    bool operator==(Rational other) const;
    bool operator!=(Rational other) const;
    bool operator<(Rational other) const;
    bool operator>(Rational other) const;
    bool operator<=(Rational other) const;
    bool operator>=(Rational other) const;

    Rational simplify();

    void print() const;

private:
    int m_numerator;
    int m_denominator;
};

std::ostream& operator<<(std::ostream& os, Rational r);
