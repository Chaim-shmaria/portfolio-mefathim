#include <cstring>
#include <iostream>
#include <string>
#include <fstream>
#include "encrypted_messenger.hpp"


//insert (in terminal) up to 14 encryption types and then the m_message file path.
int main(int argc, char* argv[])
{
    std::ifstream inputFile(argv[argc - 1]);
    string message, line;

    if (!inputFile.is_open()) {
        std::cerr << "Error: Unable to open file: " << argv[argc-1] << std::endl;
        return -1;
    }

    while (std::getline(inputFile, line)) {
        message += line + "\n";
    }

    inputFile.close();
    Messenger::set(message);

    if (argc > 16) {
        cout << "too many arguments.\n";
    }

    if (argc < 2) {
        cout << "too few arguments.\n";
        return -1;
    }

    if (argc == 2) {
        cout << "Choose kind of encoding: \n"
                "Enter 'Rot13' for: Rot13 encryption.\n"
                "Enter 'Atbash' for: At bash encryption.\n"
                "Enter 'UpperCase' for: Upper Case encryption.\n"
                "Enter 'VigenereCipher' for: Vigenere Cipher encryption.\n"
                "For the Editors' Choice to encryption combination, enter 'EditorsChoice'.\n";

        argc++;
        cin >> argv[1];
        argv[2] = nullptr;
    }

    Rot13Encryption rot13;
    VigenereCipher vigenere_Cipher;
    AtBashEncryption at_bash;
    UpperCaseEncryption upper_case;
    EditorsChoice editors_choice;

    for (int i = 1; i < argc - 1; i++) {
        if (strcmp(argv[i], "Rot13") == 0) {
            rot13.encrypt();
        } else if (strcmp(argv[i], "VigenereCipher") == 0) {
            vigenere_Cipher.set_vigenere_key();
            vigenere_Cipher.encrypt();
        } else if (strcmp(argv[i], "Atbash") == 0) {
            at_bash.encrypt();
        } else if (strcmp(argv[i], "UpperCase") == 0) {
            upper_case.encrypt();
        } else if (strcmp(argv[i], "EditorsChoice") == 0) {
            editors_choice.combinations_encryption();
        } else {
            cout << "Unallowed encryption type: " << argv[i] << "\nOnly: \"Rot13\" or \"At_bash\" or \"Upper_Case\"\n";
        }
    }
    vigenere_Cipher.m_key_set = false;
    cout << "Desierd Encryption is:\n";
    Messenger::send();
    return 0;
}
