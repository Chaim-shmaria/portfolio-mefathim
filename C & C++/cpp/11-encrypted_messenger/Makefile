CXX = g++
CC = $(CXX)

CXXFLAGS = -std=c++17 -pedantic -Wall -Wconversion -Werror

OUTPUT_FILE = messenger

$(OUTPUT_FILE): main.cpp
	$(CXX) $(CXXFLAGS) -o $(OUTPUT_FILE) main.cpp encrypted_messenger.cpp

check: $(OUTPUT_FILE)

clean:
	rm -f  *.o $(OUTPUT_FILE)
