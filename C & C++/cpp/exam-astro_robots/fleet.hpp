#include "robots.hpp"

class Fleet {
    static std::vector<std::unique_ptr<Robot>> m_robot_set;

public:
    static std::vector<std::unique_ptr<Robot>>& get_robot_list();
    static std::unique_ptr<Robot>& select_robot();
    static void add_to_fleet(std::unique_ptr<Robot> robot);
    static void remove_from_fleet(std::unique_ptr<Robot>& robot);
};