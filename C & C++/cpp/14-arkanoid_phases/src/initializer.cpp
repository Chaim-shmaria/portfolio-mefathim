#include "../inc/initializer.hpp"
#include "../inc/game_states.hpp"

Initializer::Initializer()
: m_drawables{}
, m_window(WINDOW_SIZE, "Arkanoid")
, m_current_screen(std::make_unique<MainMenu>())
, m_player_score{}
{
    m_player_score.id = 11;
    m_drawables.set_bricks_table_layout();
}

void Initializer::reset() {
    m_drawables = Drawables{};
    m_current_screen = std::make_unique<MainMenu>();
    m_player_score = Score{};
    m_player_score.id = 11;
    m_drawables.set_bricks_table_layout();
}
