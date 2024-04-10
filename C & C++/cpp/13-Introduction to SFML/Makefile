CXX = g++
CC = $(CXX)

CXXFLAGS = -std=c++17 -pedantic -Wall -Wconversion -Werror

main: *.cpp -lsfml-graphics -lsfml-window -lsfml-system -lsfml-audio

check: clean main
	./main


clean:
	rm -f *.o main
