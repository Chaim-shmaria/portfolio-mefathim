CXX = g++
CC = $(CXX)

CXXFLAGS = -std=c++17 -pedantic -Wall -Wconversion -Werror

SFMLS = -lsfml-graphics -lsfml-window -lsfml-system -lsfml-audio

main:  src/*.cpp src/game_states/*.cpp main.cpp
	$(CXX) $(CXXFLAGS) -o main  src/*.cpp src/game_states/*.cpp main.cpp $(SFMLS)

check: clean main
	./main


clean:
	rm -f *.o main
