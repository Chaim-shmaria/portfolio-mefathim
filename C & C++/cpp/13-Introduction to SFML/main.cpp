#include <SFML/Graphics.hpp>
#include <SFML/Window.hpp>

void adjustSpeed(sf::Vector2f const& size, sf::CircleShape& circle, sf::Vector2f& speed);


int main() {
    sf::RenderWindow window(sf::VideoMode(1200, 800), "My window");    
    window.setVerticalSyncEnabled(true);


    window.setPosition(sf::Vector2i(600, 200));
    // change the size of the window
    window.setSize(sf::Vector2u(640, 480));

           
    sf::CircleShape c1(30.f);
    c1.setFillColor(sf::Color::Blue);
    c1.move(sf::Vector2f(100,250));

    
    sf::CircleShape  c2(20.f);    
    c2.setFillColor(sf::Color::Red);
    c2.move(sf::Vector2f(40,100));
    
    
    sf::Vector2f c1speed(1, 2);
    sf::Vector2f c2speed(3, 4);
    

    
    while (window.isOpen())
    {        
        sf::Event event;                
        while (window.pollEvent(event))
        {
            switch(event.type){
                case sf::Event::Closed:
                    window.close();
                    break;
                case sf::Event::KeyPressed:
                    switch(event.key.code){
                        case sf::Keyboard::Escape:
                            window.close();
                            break;
                        case sf::Keyboard::Space:
                            c1speed.y += 2;
                            break;
                        default:
                            break;
                    }
                    break;
                default:
                    ;// no handling for now;
            }   
        }
        
        sf::Vector2f winBounds = window.getView().getSize();
        adjustSpeed(winBounds, c1, c1speed);
        adjustSpeed(winBounds, c2, c2speed);
        c1.move(c1speed);
        c2.move(c2speed);
        
        window.clear(sf::Color::Green);
        window.draw(c1);        
        window.draw(c2);    

        window.display();
    }
}

void adjustSpeed(sf::Vector2f const& size, sf::CircleShape& circle, sf::Vector2f& speed){
    sf::Vector2f pos = circle.getPosition();        
    float r = 2 * circle.getRadius();
    if(pos.x  >= size.x - r)    speed.x *= -1;
    if(pos.x  <= 0)             speed.x *= -1;
    if(pos.y  >= size.y - r)    speed.y *= -1;
    if(pos.y  <= 0)             speed.y *= -1;    
}
