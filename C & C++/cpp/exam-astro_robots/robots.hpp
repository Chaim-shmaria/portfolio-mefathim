#include "tools.hpp"

enum class RobotState {
    ACTIVE = 1,
    REBOOTING,
    WORKING,
    FAILING
};


class Robot {
protected:
    std::string const m_model;
    std::string m_name;
    std::string m_callsign;
    static std::vector<std::string> m_supported_models;
    RobotState m_state;
    std::vector<std::unique_ptr<Tool>> m_toolset;

public:
    explicit Robot(std::string name, std::string callsign, std::string model);
    virtual ~Robot() = default;
    std::string get_name();
    std::string get_callsign();
    std::string get_model();
    static std::vector<std::string> get_supported_models();
    RobotState get_state();
    void dispatch();
    void reboot();
    void self_diagnosis();
    void show_robot_properties();
};



class HAL9000 : public Robot {
public:
    HAL9000(std::string name, std::string callsign);
    ~HAL9000() override = default;
};

class Tachikomas : public Robot {
public:
    Tachikomas(std::string name, std::string callsign);
    ~Tachikomas() override = default;
};

class Johnny5 : public Robot {
public:
    Johnny5(std::string name, std::string callsign);
    ~Johnny5() override = default;
};

class Maschinenmensch : public Robot {
public:
    Maschinenmensch(std::string name, std::string callsign);
    ~Maschinenmensch() override = default;
};