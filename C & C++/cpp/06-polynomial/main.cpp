#include "polynomial.hpp"

using namespace std;

void add_test();
void sub_test();
void mult_test();
void evaluate_test();
void derivative_test();
void composition_test();

int main() {
    cout << '\n';

    add_test();
    cout << "Add test complete!" << endl << endl;

    sub_test();
    cout << "Subtraction test complete!" << endl << endl;

    mult_test();
    cout << "Multiplication test complete!" << endl << endl;

    evaluate_test();
    cout << "Evaluation test complete!" << endl << endl;

    derivative_test();
    cout << "Derivative test complete!" << endl << endl;

    composition_test();
    cout << "Composition test complete!" << endl << endl;

    return 0;
}