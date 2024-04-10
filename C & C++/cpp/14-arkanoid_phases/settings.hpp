#include <string>
#include <iostream>
#include <SFML/System/Vector2.hpp>
#include <SFML/Graphics.hpp>
#include <SFML/Graphics/Color.hpp>
#include <functional>
#include <memory>
#include <fstream>
#include <sstream>
#include <iomanip>
#include <chrono>
#include <filesystem>


#define P std::cout << "yes\n";
#define PP std::cout << "\n" <<
#define BRICKS_AMOUNT 15
#define BRICKS_COLUMNS 5
#define INIT_PADDLE_POS sf::Vector2f(360.0f, 540.0f)
#define INIT_BALL_POS sf::Vector2f(392.0f, 510.0f)
#define WINDOW_SIZE sf::VideoMode(800.f, 600.f)
//remove all '../' from paths before compiling in terminal
#define ARKANOID_LOGO "../assets/ArkanoidLogo.png"
#define PADDLE_IMG "../assets/paddle.png"
#define BALL_IMG "../assets/ball.png"
#define ARCADE_FONT "../assets/ARCADECLASSIC.ttf"
#define ARCADE_FONT2 "../assets/Arcade Classic.ttf" //TODO: no dots in that ttf and no spaces.
#define TEXT_SIZE 24
#define DAT_FILE "../assets/top10.dat"
#define ILLUSTRATE_TOP10 "../assets/illustrate_top10.dat"
#define TOP_10_TEXT_POS sf::Vector2f(150.f, 80.f)
