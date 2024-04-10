#include "../inc/score.hpp"


std::string Score::toString() const {
    std::ostringstream oss;
    oss  << std::left << std::setw(3) << id;
    oss  << std::left << std::setw(static_cast<int>(7 + name.size()/2)) << name;
    oss  << std::left << std::setw(6)  <<  score;
    oss << std::fixed << std::setprecision(2) << get_duration();
    return oss.str();
}

std::string Score::get_duration() const {
    int minutes = static_cast<int>(std::chrono::duration_cast<std::chrono::minutes>(duration).count());
    int seconds = static_cast<int>(std::chrono::duration_cast<std::chrono::seconds>(duration).count() % 60);
    int milliseconds = static_cast<int>(std::chrono::duration_cast<std::chrono::milliseconds>(duration).count() % 1000 / 10);

    std::stringstream ss;
    ss << std::setfill('0') << std::setw(2) << minutes << ":"
       << std::setfill('0') << std::setw(2) << seconds << ":"
       << std::setfill('0') << std::setw(2) << milliseconds;

    return ss.str();
}
