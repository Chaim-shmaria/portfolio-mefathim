#include "fleet.hpp"

std::vector<std::unique_ptr<Robot>> Fleet::m_robot_set;

std::vector<std::unique_ptr<Robot>>& Fleet::get_robot_list()
{
    return m_robot_set;
}

void Fleet::add_to_fleet(std::unique_ptr<Robot> robot) {
    m_robot_set.push_back(std::move(robot));
}

void Fleet::remove_from_fleet(std::unique_ptr<Robot> &robot) {
    std::cout << "Removing...\n" << std::flush;
    auto it = std::find(m_robot_set.begin(), m_robot_set.end(), robot);
    m_robot_set.erase(it);

    std::this_thread::sleep_for(std::chrono::seconds(1));
    std::cout << "Robot successfully removed.\n" << std::endl;
    std::this_thread::sleep_for(std::chrono::seconds(1));
}

std::unique_ptr<Robot>& Fleet::select_robot() {
    std::vector<std::unique_ptr<Robot>>& existing_robots = Fleet::get_robot_list();

    std::cout << "Which one of the existing robots below, would you like to operate?\n";
    size_t selected_id;
    std::unique_ptr<Robot> selected_robot;

    for (size_t i = 0; i < existing_robots.size(); i++) {
        std::cout << i + 1 << ". " << existing_robots[i]->get_name() << std::endl;
    }
    std::cout << "\n\n>>>";
    std::cin >> selected_id;

    while (selected_id > get_robot_list().size()) {
        std::cout << "\nWrong number.";
        std::cout << "\n\n>>>";
        std::cin >> selected_id;
    }
    std::cout << "Robot " << existing_robots[selected_id - 1]->get_name() << " loaded.\n\n";
    return existing_robots[selected_id - 1];
}
