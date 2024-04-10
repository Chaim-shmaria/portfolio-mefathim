#include <algorithm>
#include "encrypted_messenger.hpp"

std::string Messenger::m_message;


void Messenger::set(string& message)
{
    m_message = message;
}

void Messenger::encrypt() {
    std::transform(m_message.begin(), m_message.end(), m_message.begin(),
                   [this](char c) -> char { return encryption_method(c); });
}

void Messenger::send()
{
    cout << m_message << endl;
};

char RotationEncryptions::encryption_method(char c)
{
    if (std::isalpha(c)) {
        char base = std::islower(c) ? 'a' : 'A';
        size_t rotation_gap = m_key[loops_counter % m_key.size()] - 'A';
        c = static_cast<char>(base + ((c - base + rotation_gap) % 26));
    }
    loops_counter = (loops_counter + 1) % (m_message.size());
    return c;
}

void RotationEncryptions::set_key(const std::string& key) {
    m_key = key;
}

Rot13Encryption::Rot13Encryption() {
    m_key = "N";
}

void VigenereCipher::set_vigenere_key() {
    if (!m_key_set) {
        cout << "Please enter encryption key for VigenereCipher:\n";
        cin >> m_key;
    }
    m_key_set = true;
}

char AtBashEncryption::encryption_method(char c)
{
    if (std::isalpha(c)) {
        char limit = islower(c) ? 'z' : 'Z';
        c = static_cast<char>('a' + (limit - c));
    }
    return c;
}

char UpperCaseEncryption::encryption_method(char c)
{
    return static_cast<char>(toupper(c));
}

void EditorsChoice::combinations_encryption() {
    std::vector<string> encryptions{"Rot13", "Atbash", "Rot13", "VigenereCipher", "Atbash"};
    by_vector(encryptions);
}

void EditorsChoice::by_vector(std::vector<string> &encryptions)
{
    Rot13Encryption rot13;
    VigenereCipher vigenere;
    AtBashEncryption atbash;
    UpperCaseEncryption uppercase;

    for (string & enc: encryptions) {
        if (enc =="Rot13") {
            rot13.encrypt();
        } else if (enc == "VigenereCipher") {
            vigenere.set_vigenere_key();
            vigenere.encrypt();
        } else if (enc == "Atbash") {
            atbash.encrypt();
        } else if (enc == "UpperCase") {
            uppercase.encrypt();
        } else {
            cout << "Unallowed encryption type: " << enc << "\nOnly: \"Rot13\" or \"At_bash\" or \"Upper_Case\"\n";
        }
    }
}

char EditorsChoice::encryption_method(char c) {
    return 0;
}
