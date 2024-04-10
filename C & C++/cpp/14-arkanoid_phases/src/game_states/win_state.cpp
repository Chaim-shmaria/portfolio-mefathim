#include "../../inc/game_states.hpp"


GameWin::GameWin()
{
    load_top10();
    for (auto& top10 : m_top10) {
        if (m_vars->m_player_score.score > top10->score ||
        (m_vars->m_player_score.score == top10->score && m_vars->m_player_score.duration > top10->duration)) {
            m_vars->m_player_score.id = top10->id;
            break;
        }
    }
    m_vars->m_drawables.m_score_text.setFillColor(sf::Color::Red);
    m_vars->m_drawables.m_duration_text.setFillColor(sf::Color::Red);
}

void GameWin::load_top10() {
//    std::ifstream file(ILLUSTRATE_TOP10);
    std::ifstream file(DAT_FILE);
    if (!file.is_open()) {
        std::cerr << "Failed to open file for writing: " << DAT_FILE << std::endl;
        return;
    }
    std::string line;
    while (std::getline(file, line)) {
        if (line.empty()) continue;
        std::stringstream ss(line);
        Score score{};
        std::string str;
        std::getline(ss, str, ',');
        score.id = std::stoul(str);
        std::getline(ss, str, ',');
        score.name = str;
        std::getline(ss, str, ',');
        score.score = std::stoul(str);
        std::getline(ss, str, ',');
        score.duration = static_cast<std::chrono::duration<float>>(std::stof(str));
        m_top10.push_back(std::make_unique<Score>(score));
    }
    file.close();
}

void GameWin::save_score() {
    if (m_top10.size() == 10) { m_top10.pop_back(); }

    m_top10.insert(m_top10.begin() + static_cast<int>(m_vars->m_player_score.id) - 1,
                   std::make_unique<Score>(m_vars->m_player_score));
    for (size_t i = m_vars->m_player_score.id; i < m_top10.size(); i++) {
        m_top10[i]->id++;
    }
    save_to_file();
}

void GameWin::save_to_file() {
    std::ofstream file(DAT_FILE, std::ios::binary | std::ios::app);

    if (!file.is_open()) {
        std::cerr << "Failed to open file for writing: " << DAT_FILE << std::endl;
        return;
    }

    std::ofstream(DAT_FILE, std::ofstream::trunc).close();
    for (auto& score : m_top10) {
        file << score->id << "," << score->name << "," << score->score << "," << score->duration.count() << std::endl;
    }
    file.close();
}

void GameWin::handle_event(sf::Event &event, sf::RenderWindow &window, Drawables &drawables) {
    static bool already_saves = false;
    if (already_saves) { return;}
    if (event.type == sf::Event::TextEntered && m_vars->m_player_score.id <= 10) {
        if (event.text.unicode < 128 && event.text.unicode != 8 &&
                m_vars->m_player_score.name.size() <= 9) {
                m_vars->m_player_score.name += static_cast<char>(event.text.unicode);
        } else if (event.text.unicode == 8 && !m_vars->m_player_score.name.empty()) {
            m_vars->m_player_score.name.pop_back();
        }
    }
    if (event.type == sf::Event::KeyPressed &&
        event.key.code == sf::Keyboard::Enter &&
        m_vars->m_player_score.id <= 10) {
            save_score();
            already_saves = true;
    }
}

void GameWin::update(sf::RenderWindow &window, Drawables &drawables) {

}

void GameWin::draw(sf::RenderWindow &window, Drawables &drawables) {
    static sf::Text text = Drawables::new_text(
            ARCADE_FONT2,
            TEXT_SIZE,
            TOP_10_TEXT_POS,
            sf::Color::Red,
            "#   Name   Score   Play-time\n");

    window.draw(text);
    auto txt = text;
    sf::Vector2f text_pos = TOP_10_TEXT_POS;
    text_pos.y += 10.f;
    for (auto &top10 : m_top10) {
        text_pos.y += 30.f;
        txt.setPosition(text_pos);
        txt.setString(top10->toString());
        window.draw(txt);
    }
    txt.setPosition(TOP_10_TEXT_POS.x, TOP_10_TEXT_POS.y + 360.f);
    txt.setString("Your score:");
    window.draw(txt);
    txt.setPosition(TOP_10_TEXT_POS.x, TOP_10_TEXT_POS.y + 400.f);
    txt.setString(m_vars->m_player_score.toString());
    window.draw(txt);
    window.draw(m_vars->m_drawables.m_score_text);
    window.draw(m_vars->m_drawables.m_duration_text);
}
