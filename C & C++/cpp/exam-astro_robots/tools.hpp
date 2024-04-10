#include "necessary_libraries.hpp"

enum class ToolState {
    READY = true,
    MALFUNCTION = false,
};


class Tool {
    std::string m_tool_name;

public:
    ToolState m_tool_state;
    std::string m_tool_function;
    explicit Tool(std::string  name);
    std::string get_name() const;
    bool self_diagnosis();
    static std::vector<std::unique_ptr<Tool>> create_tool_set(std::vector<std::string> tools_names);
};

