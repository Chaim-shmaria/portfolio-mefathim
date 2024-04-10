#include "vacuum_robot.hpp"

int main()
{
    int choice;
    while (true) {
        std::cout << "\n--------------------------------\n--------------------------------\n"
                     "Main menu:\n"
                     "What do you want to do?\n"
                     "      1. Add new robot to fleet\n"
                     "      2. Select robot\n"
                     "      3. Quit"
                     "\n>>>";
        std::cin >> choice;

        switch (choice) {
            case 1:
                VacuumRobotOperator::add_new_robot();
                break;

            case 2: {
                std::unique_ptr<VacuumRobot> selected;
                selected = VacuumRobotOperator::select_robot();
                VacuumRobotOperator::operate_robot(std::move(selected));
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