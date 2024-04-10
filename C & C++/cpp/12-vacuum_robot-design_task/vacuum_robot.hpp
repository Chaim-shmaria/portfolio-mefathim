#include <iostream>
#include <thread>
#include <string>
#include <vector>
#include <memory>


class VacuumRobot {
    std::string robot_id;

public:
    explicit VacuumRobot(const std::string& name = "");
    virtual ~VacuumRobot() = default;
    void set_id(const std::string& name);
    std::string get_id() const;
    static void clean(std::unique_ptr<VacuumRobot>& robot);
    static void reboot(std::unique_ptr<VacuumRobot>& robot);
    static std::vector<std::string> get_supported_models();
};

class RoombaRobot : public VacuumRobot {
public:
    explicit RoombaRobot(const std::string& name);
    ~RoombaRobot() override = default;
};

class NeatoRobot : public VacuumRobot {
public:
    explicit NeatoRobot(const std::string& name);
    ~NeatoRobot() override = default;
};

class EufyRobot : public VacuumRobot {
public:
    explicit EufyRobot(const std::string& name);
    ~EufyRobot() override = default;
};

class Fleet : public VacuumRobot {
    static std::vector<std::unique_ptr<VacuumRobot>> m_collection;//maybe it should be stored in a hash table

public:
    Fleet();
    static void add_to_fleet(std::unique_ptr<VacuumRobot> robot);
    static void remove_from_fleet(std::unique_ptr<VacuumRobot>& robot);
    static std::vector<std::unique_ptr<VacuumRobot>>& get_robot_list() ;
};

class VacuumRobotOperator : public VacuumRobot {
public:
    static void add_new_robot();
    static std::unique_ptr<VacuumRobot> select_robot();
    static void operate_robot(std::unique_ptr<VacuumRobot> robot);
};


// TODO; not sure about abstruction (virtual or not) of clean, boot, delete, functions.