#ifndef INITIALIZER_HPP
#define INITIALIZER_HPP
#include "drawables.hpp"
#include "score.hpp"

class Screen;

class Initializer {
public:
    Drawables m_drawables;
    sf::RenderWindow m_window;
    std::unique_ptr<Screen> m_current_screen;
    Score m_player_score;
    std::vector<sf::Sprite> m_lives;

    Initializer();
    void reset();
    void start();
    int get_score() const;
    void set_score(int score);

};

#endif // INITIALIZER_HPP