#include <cmath>
#include <algorithm>
#include "vacuum_robot.hpp"

std::vector<std::unique_ptr<VacuumRobot>> Fleet::m_collection;



VacuumRobot::VacuumRobot(const std::string& name)
: robot_id(name)
{
}

void VacuumRobot::set_id(const std::string& name) {
    this->robot_id = name;
}

std::string VacuumRobot::get_id() const {
    return robot_id;
}

void VacuumRobot::clean(std::unique_ptr<VacuumRobot>& robot) {
    std::cout << "Robot '" << robot->get_id() << "' is cleaning...\n";
}

void VacuumRobot::reboot(std::unique_ptr<VacuumRobot>& robot) {
    std::cout << "Robot '" << robot->get_id() << "' is rebooting...\n";
}

std::vector<std::string> VacuumRobot::get_supported_models() {
    std::vector<std::string> supported_models = {
            "RoombaRobot",
            "NeatoRobot",
            "EufyRobot"
    };

    return supported_models;
}

RoombaRobot::RoombaRobot(const std::string &name)
: VacuumRobot(name)
{
}

NeatoRobot::NeatoRobot(const std::string &name)
: VacuumRobot(name)
{
}

EufyRobot::EufyRobot(const std::string &name)
: VacuumRobot(name)
{
}

Fleet::Fleet() {
    m_collection = std::vector<std::unique_ptr<VacuumRobot>>();
}

void Fleet::add_to_fleet(std::unique_ptr<VacuumRobot> robot) {
    m_collection.push_back(std::move(robot));
}

void Fleet::remove_from_fleet(std::unique_ptr<VacuumRobot>& robot) {
    std::cout << "Removing...\n";
    auto it = std::find(m_collection.begin(), m_collection.end(), robot);
    m_collection.erase(it);

    std::this_thread::sleep_for(std::chrono::seconds(1));
    std::cout << "'" << robot->get_id() << "' successfully removed\n" << std::endl;
    std::this_thread::sleep_for(std::chrono::seconds(1));
}

std::vector<std::unique_ptr<VacuumRobot>>& Fleet::get_robot_list() {
    return m_collection;
}

void VacuumRobotOperator::add_new_robot() {
    std::cout << "How would you name your robot?\n\n>>>";
    std::string new_robot_id;
    std::cin >> new_robot_id;

    std::vector<std::string> supported_models;
    supported_models = get_supported_models();
    std::cout << "What model is your new robot?\n\nSupprted models: \n\n";

    for (size_t i = 1; i <= supported_models.size(); i++) {
        std::cout << i << ". " << supported_models[i - 1] << std::endl;
    }
    std::cout << "\n(Enter a number)\n>>>";

    int chosen_model;
    std::cin >> chosen_model;

    switch (chosen_model) {
        case 1:
            Fleet::add_to_fleet(std::make_unique<RoombaRobot>(new_robot_id));
            std::cout << "A Roomba Robot named: '" << new_robot_id << "' added.\n\n";
            std::this_thread::sleep_for(std::chrono::seconds(1));
            break;
        case 2:
            Fleet::add_to_fleet(std::make_unique<NeatoRobot>(new_robot_id));
            std::cout << "A Neato Robot named: '" << new_robot_id << "' added.\n\n";
            std::this_thread::sleep_for(std::chrono::seconds(1));
            break;
        case 3:
            Fleet::add_to_fleet(std::make_unique<EufyRobot>(new_robot_id));
            std::cout << "An Eufy Robot named: '" << new_robot_id << "' added.\n\n";
            std::this_thread::sleep_for(std::chrono::seconds(1));
            break;
        default:
            std::cout << "Model not supported\nReturning back...\n" << std::endl;
            std::this_thread::sleep_for(std::chrono::seconds(1));
            return;
    }
}

std::unique_ptr<VacuumRobot> VacuumRobotOperator::select_robot() {//TODO: change return type to raw ptr
    std::vector<std::unique_ptr<VacuumRobot>>& existing_robots = Fleet::get_robot_list();
    if (existing_robots.empty()) {
        std::cout << "No Robots available...\n";
        std::this_thread::sleep_for(std::chrono::seconds(1));
        return nullptr;
    }
    std::cout << "Which one of the existing robots below, would you like to operate?\n"
    "(Enter its number):\n";
    int selected_id;
    std::unique_ptr<VacuumRobot> selected_robot;

    for (size_t i = 0; i <existing_robots.size(); i++) {
        std::cout << i + 1 << ". " << existing_robots[i]->get_id() << std::endl;
    }
    std::cout << "\n\n>>>";
    std::cin >> selected_id;
    std::cout << "Robot " << existing_robots[selected_id - 1]->get_id() << " loaded.\n\n";
    return std::move(existing_robots[selected_id - 1]);
}

void VacuumRobotOperator::operate_robot(std::unique_ptr<VacuumRobot> robot) {
    if (!robot) { return;}
    std::cout << robot->get_id() << " is operating...\n";
    std::cout << "what would you like to do?\n"
    "      1. Cleaning."
    "      2. Reboot robot."
    "      3. Delete robot"
    "\n\n>>>";
    int choice;
    std::cin >> choice;

    switch (choice) {
        case 1:
            clean(robot);
            std::this_thread::sleep_for(std::chrono::seconds(1));
            break;
        case 2:
            reboot(robot);
            std::this_thread::sleep_for(std::chrono::seconds(1));
            break;
        case 3:
            Fleet::remove_from_fleet(robot);
            break;
        default:
            std::cout << "Invalid choice...\n"
            "(Enter a number)"
            "\n\n>>>" << std::endl;
            break;
    }
}
