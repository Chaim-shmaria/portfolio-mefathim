#include <string>
#include <iostream>
#include <vector>

using namespace std;

class Messenger {
public:
    Messenger() = default;
    static void set(string& message);
    virtual char encryption_method(char c) = 0;
    void encrypt();
    static void send();
    friend void messenger_test();

protected:
    static string m_message;
};

class RotationEncryptions : public Messenger {
protected:
    string m_key;
    size_t loops_counter = 0;
    char encryption_method(char c) override;
public:

    void set_key(const string& key);
};

class Rot13Encryption : public RotationEncryptions {
public:
    Rot13Encryption();
};

class VigenereCipher : public RotationEncryptions {
public:
    bool m_key_set;

public:
    void set_vigenere_key();
};

class AtBashEncryption : public Messenger {
    char encryption_method(char c) override;
};

class UpperCaseEncryption : public Messenger {
    char encryption_method(char c) override;
};

class EditorsChoice : public Messenger {
    char encryption_method(char c) override;

public:
    void combinations_encryption();
    void by_vector(std::vector<string>& encryptions);
};
