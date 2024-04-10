#ifndef BUTTON_HPP
#define BUTTON_HPP

#include "../settings.hpp"

class Button {
    sf::RectangleShape m_shape;
    std::function<void(void)> m_on_click;
    //TODO: add font

public:
    explicit Button(std::function<void(void)> on_click,
           sf::Vector2<float> size = sf::Vector2f(200, 100),
           sf::Vector2<float> position = sf::Vector2f(100, 100),
           sf::Color color = sf::Color::Cyan
           );
    void click() const;
    sf::IntRect get_bounds() const;
    sf::RectangleShape get_shape() const;
    void set_random_color(){//TODO: save_to_file func
        auto red = static_cast<sf::Uint8>(rand() % 255);
        auto green = static_cast<sf::Uint8>(rand() % 255);
        auto blue = static_cast<sf::Uint8>(rand() % 255);

        m_shape.setFillColor(sf::Color(red, green, blue));
    };
};

#endif // BUTTON_HPP