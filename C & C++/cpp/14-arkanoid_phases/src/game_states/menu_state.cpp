#include "../../inc/game_states.hpp"


MainMenu::MainMenu()
        : m_background(Drawables::new_sprite(ARKANOID_LOGO,
                                             sf::Vector2f(static_cast<float>(WINDOW_SIZE.height)/4.f,
                                                          static_cast<float>(WINDOW_SIZE.width)/5.f)))
        , m_text(Drawables::new_text(
                ARCADE_FONT,
                TEXT_SIZE,
                sf::Vector2f(static_cast<float>(WINDOW_SIZE.width) / 3.f,
                             2.f * static_cast<float>(WINDOW_SIZE.width) / 3.f),
                sf::Color::Red,
                "Press  any  key  to  start\nPress  Escape  to  exit"))
{
    m_background.scale(0.4f, 0.4f);
}

void MainMenu::handle_event(sf::Event &event, sf::RenderWindow &window, Drawables &drawables) {
    if (event.type == sf::Event::KeyPressed) {
        if (event.key.code == sf::Keyboard::Space) {
            while (sf::Keyboard::isKeyPressed(sf::Keyboard::Space)) {}
        }
        m_vars->m_current_screen = std::make_unique<GamePlay>();
    }
}


void MainMenu::update(sf::RenderWindow &window, Drawables &drawables) {
}

void MainMenu::draw(sf::RenderWindow &window, Drawables &drawables) {
    window.draw(m_background);
    window.draw(m_text);
}

