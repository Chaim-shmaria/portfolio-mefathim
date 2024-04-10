#include "../inc/button.hpp"


Button::Button(std::function<void(void)> on_click,
               sf::Vector2<float> size,
               sf::Vector2<float> position,
               sf::Color color)
{
    m_shape.setSize(size);//TODO: check that list
    m_shape.setPosition(position);
    m_shape.setFillColor(color);
    m_on_click = on_click;
//    m_on_click = [this](){this->set_random_color();};//TODO: save_to_file
}

void Button::click() const
{
    m_on_click();
}

sf::IntRect Button::get_bounds() const {
    sf::FloatRect floatRect = m_shape.getGlobalBounds();

    int left = static_cast<int>(floatRect.left);
    int top = static_cast<int>(floatRect.top);
    int width = static_cast<int>(floatRect.width);
    int height = static_cast<int>(floatRect.height);

    sf::IntRect intRect(left, top, width, height);

    return intRect;
}

sf::RectangleShape Button::get_shape() const {
    return m_shape;
}
