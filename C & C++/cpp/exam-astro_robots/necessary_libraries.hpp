#include <iostream>
#include <thread>
#include <string>
#include <memory>
#include <vector>
#include <algorithm>
#include <utility>

const int SELF_HEAL_PROBABILITY = 90;
const int TOOL_FAILURE_PROBABILITY = 20;
const int ROBOT_FAILURE_PROBABILITY = 20;

bool probability_of(int percentage);
