#include "../inc/drawables.hpp"


Drawables::Drawables()
: m_paddle(new_sprite(PADDLE_IMG, INIT_PADDLE_POS))
, m_ball(new_sprite(BALL_IMG, INIT_BALL_POS))
, m_bricks()
, m_ball_speed(0, 0)
, m_paddle_speed(7, 0)
, m_score_text(Drawables::new_text(
                ARCADE_FONT2,
                TEXT_SIZE,
                sf::Vector2f(10.f, 10.f),
                sf::Color::White,
                ""))
, m_duration_text(Drawables::new_text(
                ARCADE_FONT2,
                TEXT_SIZE,
                sf::Vector2f(static_cast<float>(WINDOW_SIZE.width) - 240.f, 10.f),
                sf::Color::White,
                ""))
{
    m_ball.setScale(1.f, 1.f);
    m_paddle.setScale(1.f, 1.f);
    set_bricks_table_layout();
}

sf::Sprite Drawables::new_sprite(const std::string& img, sf::Vector2f position) {
    auto* texture = new sf::Texture;
    texture->loadFromFile(img);
    sf::Sprite sprite;
    sprite.setTexture(*texture);
    sprite.setPosition(position);
    return sprite;
}

sf::RectangleShape Drawables::new_rectangle(sf::Vector2f position, const std::string& img, sf::Vector2f size) {
    sf::RectangleShape rectangle(size); // Width and height of the rectangle
    rectangle.setPosition(position);
    if (!img.empty()) {
        auto* texture = new sf::Texture;
        texture->loadFromFile(img);
        rectangle.setTexture(texture);
    } else {
        rectangle.setFillColor(sf::Color::Blue);
    }

    return rectangle;
}

void Drawables::set_bricks_table_layout() {
    std::vector<std::unique_ptr<sf::RectangleShape>> bricks;

    for (size_t i = 0; i < BRICKS_AMOUNT/BRICKS_COLUMNS; i++) {
        for (size_t j = 0; j < BRICKS_COLUMNS; j++) {
            auto y = static_cast<float>(i * 80 + 50);
            auto x = static_cast<float>(j * 122 + 100);
            bricks.push_back(std::make_unique<sf::RectangleShape>(new_rectangle(sf::Vector2f(x, y))));
        }
    }
    m_bricks = std::move(bricks);
}

bool Drawables::ball_move() {
    float x = m_ball.getPosition().x;
    float y = m_ball.getPosition().y;

    float ball_width = m_ball.getGlobalBounds().width;

    if (x <= 0 || x >= static_cast<float>(WINDOW_SIZE.width) - ball_width) {
        m_ball_speed.x *= -1;
    }
    if (y <= 0) {
        m_ball_speed.y *= -1;
    }
    if (y >= static_cast<float>(WINDOW_SIZE.height)) {
        return true;
    }
    m_ball.move(m_ball_speed);
    // duplicating its vector at -1.
    return false;
}

void Drawables::paddle_move(int direction) {
    m_paddle.move(m_paddle_speed * static_cast<float>(direction));
}

bool Drawables::check_colision() {
    auto ball_rect = m_ball.getGlobalBounds();
    auto paddle_rect = m_paddle.getGlobalBounds();

    if (ball_rect.intersects(paddle_rect)) {
        m_ball_speed.y *= -1;
    }
    if (ball_rect.height > m_bricks.back()->getPosition().x) { return false; } // used for performance. not checked yet

    for (auto it = m_bricks.begin(); it != m_bricks.end(); ++it) {
        //TODO: improve performance to iterate only in certain conditions.
        auto brick_rect = (*it)->getGlobalBounds();
        if (ball_rect.intersects(brick_rect)) {
            m_ball_speed.y *= -1;
            m_bricks.erase(it);
            return true;
        }
    }
    return false;
    //TODO: check corners collision.
}

sf::Text Drawables::new_text(const std::string &font_src,
                             unsigned int size,
                             sf::Vector2f position,
                             sf::Color color,
                             const std::string &text) {
    auto output_font = new sf::Font;
    output_font->loadFromFile(font_src);
    sf::Text output_text(text, *output_font, size);
    output_text.setFillColor(color);
    output_text.setPosition(position);
    return output_text;
}
