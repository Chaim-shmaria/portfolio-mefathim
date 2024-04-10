#include <cassert>
#include "encrypted_messenger.hpp"


void messenger_test()
{
    string message = "AbCdEfGhIjKlMnOpQrStUvWxYz";
    Messenger::set(message)  ;
    Rot13Encryption rot13;
    AtBashEncryption at_bash;
    UpperCaseEncryption upper_case;


    {
        rot13.encrypt();
        assert(Messenger::m_message == "NoPqRsTuVwXyAaCcEeGgIiKkMm");
    }

    {
        assert(Messenger::m_message == "ZyXwVuTsRqPoNmLkJiHgFeDcBa");
    }

    {
        upper_case.encrypt();
        assert(Messenger::m_message == "ABCDEFGHIJKLMNOPQRSTUVWXYZ");
    }

    cout << "Encryption test passed!";
}
