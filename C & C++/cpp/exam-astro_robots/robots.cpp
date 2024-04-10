#include "robots.hpp"



Robot::Robot(std::string name, std::string callsign, std::string model)
: m_model(std::move(model))
, m_name(std::move(name))
, m_callsign(std::move(callsign))
, m_state(RobotState::ACTIVE)
{
    bool fail = probability_of(TOOL_FAILURE_PROBABILITY);
    if (fail) {
        m_state = RobotState::FAILING;
    }
}

std::string Robot::get_name() {
    return m_name;
}

std::string Robot::get_callsign() {
    return m_callsign;
}

std::vector<std::string> Robot::m_supported_models = {"HAL9000", "Tachikomas", "Johnny5", "Maschinenmensch"};

std::vector<std::string> Robot::get_supported_models() {
    return m_supported_models;
}

RobotState Robot::get_state() {
    return m_state;
}

void Robot::dispatch() {
    if (m_state != RobotState::ACTIVE) {
        std::cout << "Robot '" << m_name << "' is not active\n";
        return;
    }
    m_state = RobotState::WORKING;
    std::cout << "Robot '" << m_name << "' is in active duty <some duty>\n" << std::flush;
    std::this_thread::sleep_for(std::chrono::seconds(1));// sleep for 30-180 seconds

    for (auto& tool : m_toolset) {
        if (probability_of(ROBOT_FAILURE_PROBABILITY)) {
            tool->m_tool_state = ToolState::MALFUNCTION;
        }
    }
    m_state = RobotState::ACTIVE;
}

void Robot::reboot() {
    m_state = RobotState::REBOOTING;
    std::cout << "Robot '" << m_name << "' is rebooting...\n" << std::flush;
    std::this_thread::sleep_for(std::chrono::seconds(1));//sleep for 1-5 seconds
    m_state = RobotState::ACTIVE;
}

void Robot::self_diagnosis() {
    if (this->m_state != RobotState::FAILING) { return; }

    std::cout << "Starting self-healing on: " << m_name << ".\n";
    std::this_thread::sleep_for(std::chrono::seconds(1));


    for (auto& tool : m_toolset) {
        if (tool->m_tool_state == ToolState::MALFUNCTION) {
            bool success = tool->self_diagnosis();
            if (!success) {
                std::cout << "Could not heal\n";
                return;
            }
        }
    }
    std::cout << "Healed.\n";
    std::this_thread::sleep_for(std::chrono::seconds(1));
    m_state = RobotState::ACTIVE;
}

void Robot::show_robot_properties() {
    std::cout << "Rbot properties:\n";
    std::cout << "Name: " << m_name << "\n";
    std::cout << "Callsign: " << m_callsign << "\n";
    std::cout << "Model: " << this->m_model << "\n";
    std::cout << "Tools: ";
    for (auto& tool : m_toolset) {
        std::cout << tool->get_name() << " ";
    }
    std::cout << "\nState: ";
    switch (m_state) {
        case RobotState::ACTIVE:
            std::cout << "ACTIVE\n";
            break;
        case RobotState::FAILING:
            std::cout << "FAILING\n";
            break;
        case RobotState::REBOOTING:
            std::cout << "REBOOTING\n";
            break;
        case RobotState::WORKING:
            std::cout << "WORKING\n";
            break;
        default:
            std::cout << "UNKNOWN\n";
            break;
    }
    std::cout << "\n";
    std::this_thread::sleep_for(std::chrono::seconds(1));
}

std::string Robot::get_model() {
    return m_model;
}


HAL9000::HAL9000(std::string name, std::string callsign)
: Robot(std::move(name), std::move(callsign), "HAL9000")
{
    m_toolset = Tool::create_tool_set({"Laser_cutter", "Replicator", "Disruptor"});
}

Tachikomas::Tachikomas(std::string name, std::string callsign)
: Robot(std::move(name), std::move(callsign), "Tachikomas")
{
    m_toolset = Tool::create_tool_set({"Laser_cutter", "Disruptor"});
}

Johnny5::Johnny5(std::string name, std::string callsign)
: Robot(std::move(name), std::move(callsign), "Johnny5")
{
    m_toolset = Tool::create_tool_set({"Laser_cutter", "Static Brush"});
}

Maschinenmensch::Maschinenmensch(std::string name, std::string callsign)
: Robot(std::move(name), std::move(callsign), "Maschinenmensch")
{
    m_toolset = Tool::create_tool_set({"Replicator", "Disruptor"});
}
