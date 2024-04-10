#ifndef INC_14_ARKANOID_PHASES_SCORE_HPP
#define INC_14_ARKANOID_PHASES_SCORE_HPP
#include "../settings.hpp"


class Score {
public:
    size_t id;
    std::string name;
    size_t score;
    std::chrono::duration<float> duration;
    std::string toString() const;
    std::string get_duration() const;
};


#endif //INC_14_ARKANOID_PHASES_SCORE_HPP
