//#include "initializer.hpp"
#include "game_states.hpp"


class RunGame {
public:
    static std::unique_ptr<Initializer> m_variables;
    static void run();
    static bool FPS_limit();
};
