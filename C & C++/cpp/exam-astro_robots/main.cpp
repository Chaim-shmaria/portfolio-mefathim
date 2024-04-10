#include "operating.hpp"

int main()
{
    Fleet::add_to_fleet(std::make_unique<HAL9000>("Example", "DF578HHG5"));
    int choice;
    while (true) {
        std::cout << "\n--------------------------------\n--------------------------------\n"
                     "Main menu:\n"
                     "What do you want to do?\n"
                     "      1. Add new robot to fleet\n"
                     "      2. Issue commands to a robot\n"
                     "      3. Quit"
                     "\n>>>";
        std::cin >> choice;

        switch (choice) {
            case 1:
                RobotOperator::Provision_new_robot();
                break;

            case 2: {
                RobotOperator::issue_commands_to_robot();
                break;
            }

            case 3:
                std::cout << "Bye!\n";
                std::this_thread::sleep_for(std::chrono::seconds(1));
                return 0;

            default:
                std::cout << "Invalid choice\n";
                std::this_thread::sleep_for(std::chrono::seconds(1));
                break;
        }
    }
}