#ifndef GAME_STATE_HPP
#define GAME_STATE_HPP

#include "drawables.hpp"
#include "initializer.hpp"
#include "score.hpp"


class Screen {
public:
    static std::unique_ptr<Initializer>& m_vars;

    virtual ~Screen() = default;
    virtual void handle_event(sf::Event &event, sf::RenderWindow &window, Drawables &drawables) = 0;
    virtual void update(sf::RenderWindow &window, Drawables &drawables) = 0;
    virtual void draw(sf::RenderWindow &window, Drawables &drawables) = 0;
};


class MainMenu : public Screen {
    sf::Sprite m_background;
    sf::Text m_text;

public:
//    explicit MainMenu(Drawables& sprites, sf::RenderWindow& window);
    explicit MainMenu();
    ~MainMenu() override = default;
    void handle_event(sf::Event &event, sf::RenderWindow &window, Drawables &drawables) override;
    void update(sf::RenderWindow &window, Drawables &drawables) override;
    void draw(sf::RenderWindow &window, Drawables &drawables) override;
};


class GamePlay : public Screen {
    std::chrono::time_point<std::chrono::high_resolution_clock> m_start_time;
public:
    GamePlay();
//    explicit GamePlay(Drawables& sprites, sf::RenderWindow& window);
    ~GamePlay() override = default;
    static auto game_duration();
    void handle_event(sf::Event &event, sf::RenderWindow &window, Drawables &drawables) override;
    void update(sf::RenderWindow &window, Drawables &drawables) override;
    void draw(sf::RenderWindow &window, Drawables &drawables) override;
};


class GameOver : public Screen {
public:
    sf::Text m_text;
    GameOver();
    ~GameOver() override = default;
    void handle_event(sf::Event &event, sf::RenderWindow &window, Drawables &drawables) override;
    void update(sf::RenderWindow &window, Drawables &drawables) override;
    void draw(sf::RenderWindow &window, Drawables &drawables) override;
};

class GameWin : public Screen {
    std::vector<std::unique_ptr<Score>> m_top10;

public:
    GameWin();
    ~GameWin() override = default;
    void handle_event(sf::Event &event, sf::RenderWindow &window, Drawables &drawables) override;
    void update(sf::RenderWindow &window, Drawables &drawables) override;
    void draw(sf::RenderWindow &window, Drawables &drawables) override;
    void save_to_file();
    void save_score();
    void load_top10();
};


class Settings : public Screen {
public:
    Settings() = default;
    ~Settings() = default;
    void handle_event(sf::Event &event, sf::RenderWindow &window, Drawables &drawables) override;
    void update(sf::RenderWindow &window, Drawables &drawables) override;
    void draw(sf::RenderWindow &window, Drawables &drawables) override;
};

#endif //GAME_STATE_HPP
