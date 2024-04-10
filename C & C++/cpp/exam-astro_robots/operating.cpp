#include "operating.hpp"


void RobotOperator::Provision_new_robot() {
    std::cout << "How would you name your robot?\n\n>>>";
    std::string new_robot_id;
    std::cin >> new_robot_id;

    std::vector<std::string> supported_models;
    supported_models = Robot::get_supported_models();
    std::cout << "What model is your new robot?\n\nSupprted models: \n\n";

    for (size_t i = 1; i <= supported_models.size(); i++) {
        std::cout << i << ". " << supported_models[i - 1] << std::endl;
    }
    std::cout << "\n(Enter a number)\n>>>";

    int chosen_model;
    std::cin >> chosen_model;


    std::cout << "What is its callsign?\n\n>>>";
    std::string callsign;
    std::cin >> callsign;

    std::unique_ptr<Robot> robot;
    switch (chosen_model) {
        case 1:
            robot = std::make_unique<HAL9000>(new_robot_id, callsign);
            break;
        case 2:
            robot = std::make_unique<Tachikomas>(new_robot_id, callsign);
            break;
        case 3:
            robot = std::make_unique<Johnny5>(new_robot_id, callsign);
            break;
        case 4:
            robot = std::make_unique<Maschinenmensch>(new_robot_id, callsign);
            break;
        default:
            std::cout << "Model not supported\nReturning back...\n" << std::endl;
            std::this_thread::sleep_for(std::chrono::seconds(1));
            return;
    }
    Fleet::add_to_fleet(std::move(robot));
    std::cout << "A new " << Fleet::get_robot_list().back()->get_model()
    << " robot, named: '" << new_robot_id << "' added to fleet.\n\n";
    Fleet::get_robot_list().back()->show_robot_properties();
    std::this_thread::sleep_for(std::chrono::seconds(1));
}

void RobotOperator::issue_commands_to_robot() {
    if (Fleet::get_robot_list().empty()) {
        std::cout << "No Robots available...\n";
        std::this_thread::sleep_for(std::chrono::seconds(1));
        return;
    }
    std::unique_ptr<Robot>& robot = Fleet::select_robot();
    std::cout << robot->get_name() << " is operating...\n";
    std::cout << "what would you like to do?\n"
                 "      1. Dispatch robot.\n"
                 "      2. Reboot robot.\n"
                 "      3. Self diagnosis.\n"
                 "      4. Delete robot.\n"
                 "      5. Show robot properties.\n"
                 "      6. Back to main menu\n\n."
                 ">>>";

    while (true) {
        int choice;
        std::cin >> choice;
        switch (choice) {
            case 1:
                robot->dispatch();
                return;
            case 2:
                robot->reboot();
                return;
            case 3:
            robot->self_diagnosis();
                return;

            case 4:
                Fleet::remove_from_fleet(robot);
                return;

            case 5:
                robot->show_robot_properties();
                return;

            case 6:
                return;

            default:
                std::cout << "Invalid choice...\n\n>>>";
                break;
        }
    }
}
