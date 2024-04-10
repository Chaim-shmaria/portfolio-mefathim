#ifndef DRAWABLE_HPP
#define DRAWABLE_HPP

#include "button.hpp"


class Drawables {
public:
    sf::Sprite m_paddle;
    sf::Sprite m_ball;//TODO: need to change to circle-shape and check collision be center point and radius
    std::vector<std::unique_ptr<sf::RectangleShape>> m_bricks;
    sf::Vector2f m_ball_speed;
    sf::Vector2f m_paddle_speed;
    sf::Text m_score_text;
    sf::Text m_duration_text;

    Drawables();
    static sf::Sprite new_sprite(const std::string& img, sf::Vector2f position);
    static sf::RectangleShape new_rectangle(sf::Vector2f position, const std::string& img = "", sf::Vector2f size = sf::Vector2f(80.f, 40.f));
    void set_bricks_table_layout();
    bool ball_move();
    void paddle_move(int direction);
    bool check_colision();
    static sf::Text new_text(const std::string &font_src, unsigned int size, sf::Vector2f position, sf::Color color,
                             const std::string &text);
};

#endif // DRAWABLE_HPP