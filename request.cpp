#include "request.h"

Request::Request(std::string requestName, Modbus::FunctionCode functionCode, uint16_t address) : 
m_name(requestName), m_value(0), m_functionCode(functionCode), m_token(0), m_wordsNumber(1), m_address(address)
{}
