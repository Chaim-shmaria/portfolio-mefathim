#include "../../inc/game_states.hpp"


GamePlay::GamePlay()
: m_start_time(std::chrono::high_resolution_clock::now())
{
    for (size_t i = 0; i < 3; ++i) {
        m_vars->m_lives.push_back(Drawables::new_sprite(PADDLE_IMG,
                                                 sf::Vector2f(static_cast<float>(i) * 45 + 10,
                                                              static_cast<float>(WINDOW_SIZE.height) - 20)));
        m_vars->m_lives[i].scale(0.4f, 0.4f);
    }
}

//void GamePlay::pause() {
//}TODO: Implement pause
//
//void GamePlay::resume() {
//}TODO: Implement resume

void GamePlay::handle_event(sf::Event &event, sf::RenderWindow &window, Drawables &drawables) {
    if (sf::Keyboard::isKeyPressed(sf::Keyboard::Space) && drawables.m_ball_speed == sf::Vector2f(0, 0))
        drawables.m_ball_speed = {2, -4};

    if (sf::Keyboard::isKeyPressed(sf::Keyboard::Right) &&
        drawables.m_paddle.getPosition().x < static_cast<float>(WINDOW_SIZE.width) - drawables.m_paddle.getGlobalBounds().width) {
        //TODO: paddle movement not smooth!
        drawables.paddle_move(1);
    }
    if (sf::Keyboard::isKeyPressed(sf::Keyboard::Left) &&
        drawables.m_paddle.getPosition().x > 0) {
        drawables.paddle_move(-1);
    }

    if (drawables.m_ball_speed.x == 0)
        drawables.m_ball.setPosition(
                drawables.m_paddle.getPosition().x +
                (INIT_BALL_POS.x - INIT_PADDLE_POS.x),
                drawables.m_ball.getPosition().y);
}

void GamePlay::update(sf::RenderWindow &window, Drawables &drawables) {
    m_vars->m_player_score.duration = std::chrono::high_resolution_clock::now() - m_start_time;
    bool fail = drawables.ball_move();
    bool intersection = drawables.check_colision();
    if (intersection) { m_vars->m_player_score.score += 40; }

    if (m_vars->m_drawables.m_bricks.empty()) {
        m_vars->m_current_screen = std::make_unique<GameWin>();
    }
    if (fail) {
        if (m_vars->m_lives.empty()) {
            m_vars->m_current_screen = std::make_unique<GameOver>();
        } else {
            m_vars->m_lives.pop_back();
            drawables.m_ball_speed = {0, 0};
            drawables.m_paddle.setPosition(INIT_PADDLE_POS);
            drawables.m_ball.setPosition(INIT_BALL_POS);
        }
    }
}

void GamePlay::draw(sf::RenderWindow &window, Drawables &drawables) {
    for (auto& brick : drawables.m_bricks) {
        window.draw(*brick);
    }
    window.draw(drawables.m_paddle);
    window.draw(drawables.m_ball);
    for (auto& life : m_vars->m_lives) {
        window.draw(life);
    }
    m_vars->m_drawables.m_score_text.setString("Score: " + std::to_string(m_vars->m_player_score.score));
    m_vars->m_drawables.m_duration_text.setString("Time: " + m_vars->m_player_score.get_duration());
    window.draw(m_vars->m_drawables.m_score_text);
    window.draw(m_vars->m_drawables.m_duration_text);
}
