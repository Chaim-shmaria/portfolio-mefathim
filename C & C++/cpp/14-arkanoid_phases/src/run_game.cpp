#include "../inc/run_game.hpp"


std::unique_ptr<Initializer> RunGame::m_variables = std::make_unique<Initializer>();

void RunGame::run() {

    auto& screen = m_variables->m_current_screen;
    auto& window = m_variables->m_window;
    auto& drawables = m_variables->m_drawables;

    while (window.isOpen()) {
        sf::Event event{};

        while (window.pollEvent(event)) {
            if (event.type == sf::Event::Closed || event.key.code == sf::Keyboard::Escape) {
                window.close();
            }
            screen->handle_event(event, window, drawables);

        }
        if (!FPS_limit()) { continue;}
        window.clear();
        screen->update(window, drawables);
        screen->draw(window, drawables);
        window.display();
    }
}

bool RunGame::FPS_limit() {
    static sf::Clock clock;
    const static int FPS_LIMIT = 60;
    const sf::Time timePerFrame = sf::seconds(1.0f / FPS_LIMIT);
    if (clock.getElapsedTime() >= timePerFrame) {
        clock.restart();
        return true;
    }
    return false;
}
