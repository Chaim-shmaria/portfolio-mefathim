#include "tools.hpp"


bool probability_of(int percentage) {
    return rand() % 100 < 80;
}

Tool::Tool(std::string  name)
: m_tool_name(std::move(name))
, m_tool_state(ToolState::READY)
, m_tool_function("function")
{
}

bool Tool::self_diagnosis() {
    std::cout << "Starting self-healing on: " << m_tool_name << ".\n";
    std::this_thread::sleep_for(std::chrono::seconds(1));//sleep for 10-12 seconds
    return probability_of(SELF_HEAL_PROBABILITY);
}

std::vector<std::unique_ptr<Tool>> Tool::create_tool_set(std::vector<std::string> tools_names) {
    std::vector<std::unique_ptr<Tool>> tool_set(0);
    for (auto &name : tools_names) {
        tool_set.push_back(std::make_unique<Tool>(name));
    }
    return tool_set;
}

std::string Tool::get_name() const {
    return m_tool_name;
}
