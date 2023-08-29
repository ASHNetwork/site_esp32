#ifndef _REQUEST_H
#define _REQUEST_H

#include <string>
#include "ModbusTypeDefs.h"

class Request
{
  public:
    Request(std::string, Modbus::FunctionCode, uint16_t);
    inline std::string getName() {return m_name;}
    inline int16_t getValue() {return m_value;}
    inline int16_t setValue(int16_t value) {m_value = value; return m_value;}
    inline Modbus::FunctionCode getFunctionCode() {return m_functionCode;}
    inline int16_t getToken() {return m_token;}
    inline int16_t setToken(uint32_t token) {m_token = token; return m_token;}
    inline int16_t getAddress() {return m_address;}
    inline int16_t setAddress(uint32_t address) {m_address = address; return m_address;}
    inline int16_t getWordsNumber() {return m_wordsNumber;}
    inline int16_t setWordsNumber(uint32_t wordsNumber) {m_wordsNumber = wordsNumber; return m_wordsNumber;}
    

  private:
   std::string m_name;
   int16_t m_value;
   Modbus::FunctionCode m_functionCode;
   uint32_t m_token;
   uint16_t m_wordsNumber;
   uint16_t m_address;
};

#endif
