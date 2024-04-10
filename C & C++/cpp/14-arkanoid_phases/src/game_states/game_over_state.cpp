#include "../../inc/game_states.hpp"


GameOver::GameOver()
: m_text(Drawables::new_text(
        ARCADE_FONT,
        WINDOW_SIZE.width / 7,
        sf::Vector2f(static_cast<float>(WINDOW_SIZE.width) / 6.f, static_cast<float>(WINDOW_SIZE.height) / 2.f),
        sf::Color::Red, "Game Over"))
{
}


void GameOver::handle_event(sf::Event &event, sf::RenderWindow &window, Drawables &drawables) {
    if (event.key.code == sf::Keyboard::Space || event.key.code == sf::Keyboard::Enter) {//TODO: front needed
        while (window.pollEvent(event)) {}
        m_vars->reset();
    }
}

void GameOver::update(sf::RenderWindow &window, Drawables &drawables) {

}

void GameOver::draw(sf::RenderWindow &window, Drawables &drawables) {
    for (auto &brick: drawables.m_bricks) {
        window.draw(*brick);
    }
    window.draw(drawables.m_paddle);
    window.draw(drawables.m_ball);
    window.draw(m_text);
    window.draw(m_vars->m_drawables.m_score_text);
    window.draw(m_vars->m_drawables.m_duration_text);
}
