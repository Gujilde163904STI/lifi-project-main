# NodeMCU ESP8266 — Pinout, Features, and Datasheet

This document provides a comprehensive reference for the NodeMCU ESP8266 development board, consolidating pinout details, key features, and specification highlights. Use this file as a standard during hardware interfacing, firmware development, and for AI-driven build systems to ensure correct pin mapping and safe operation.

---

## Overview

- **Board:** NodeMCU ESP8266 (ESP-12E Module)
- **Microcontroller:** ESP8266 (Tensilica L106 32-bit, 80/160 MHz)
- **Flash Memory:** 4 MB
- **Operating Voltage:** 3.3V (logic and I/O)
- **Power Input:** 5V via Micro USB (regulated onboard to 3.3V)
- **I/O Pins:** 16 (11 digital I/O, 1 analog input)
- **WiFi:** 802.11 b/g/n, integrated antenna
- **Programming:** Arduino IDE, Lua, MicroPython, PlatformIO

---

## Pinout Diagram

### NodeMCU Pin Labels to ESP8266 GPIO Mapping

| NodeMCU Pin | ESP8266 Pin | Special Function / Notes                |
|-------------|-------------|-----------------------------------------|
| D0          | GPIO16      | Deep sleep wake, no I2C/PWM             |
| D1          | GPIO5       | I2C SCL                                 |
| D2          | GPIO4       | I2C SDA                                 |
| D3          | GPIO0       | Boot mode select, pull-up required      |
| D4          | GPIO2       | TXD1, LED_BUILTIN, boot mode, pull-up   |
| D5          | GPIO14      | SPI SCK                                 |
| D6          | GPIO12      | SPI MISO                                |
| D7          | GPIO13      | SPI MOSI                                |
| D8          | GPIO15      | SPI CS, boot mode, pull-down required   |
| D9 (SD2)    | GPIO9       | SD card (usually not used for GPIO)     |
| D10 (SD3)   | GPIO10      | SD card (usually not used for GPIO)     |
| RX          | GPIO3       | UART RX (Serial)                        |
| TX          | GPIO1       | UART TX (Serial)                        |
| A0          | ADC0        | Analog input (0–1V max)                 |
| 3V3         | 3.3V out    | Power output (do not use as GPIO)       |
| GND         | GND         | Ground                                  |
| VIN         | 5V in       | USB 5V input                            |

> **Note:**  
> - All digital I/O pins are 3.3V logic. Applying >3.3V can damage the board.
> - Boot mode pins (D3/GPIO0, D4/GPIO2, D8/GPIO15) affect startup—see Boot Notes below.
> - Onboard blue LED is connected to D4 (GPIO2, active LOW).

---

## Features

- Integrated 802.11 b/g/n WiFi with TCP/IP stack
- 16MB flash memory (4MB usable)
- USB-to-serial interface (CP2102 or CH340G)
- Breadboard-compatible, compact design
- Supports SPI, I2C, UART, PWM, ADC, and 1-Wire protocols
- Low power consumption, deep sleep support
- Open-source firmware (NodeMCU Lua, Arduino, MicroPython, etc.)
- Onboard reset and flash buttons

---

## Electrical Characteristics

- **Operating Voltage:** 3.3V
- **Input Voltage (USB/VIN):** 4.5–10V (recommended 5V)
- **Digital I/O Voltage:** 3.3V (max. 15mA per pin)
- **Analog Input:** 0–1V (do not apply >1V to A0)

---

## Boot Mode Notes

- **GPIO0 (D3):** LOW at reset = Flash mode; HIGH = Normal boot
- **GPIO2 (D4):** Must be HIGH at boot
- **GPIO15 (D8):** Must be LOW at boot

Incorrect boot pin states may prevent startup or uploading code.

---

## Example: Blink Onboard LED (D4/GPIO2)

```cpp
void setup() {
  pinMode(D4, OUTPUT); // D4 → GPIO2
}

void loop() {
  digitalWrite(D4, LOW);  // LED ON (active LOW)
  delay(500);
  digitalWrite(D4, HIGH); // LED OFF
  delay(500);
}
```

---

## Reference Links

- [Components101: NodeMCU ESP8266 Pinout, Features, Datasheet](https://components101.com/development-boards/nodemcu-esp8266-pinout-features-and-datasheet)
- [ESP8266 Arduino Core Documentation](https://arduino-esp8266.readthedocs.io/en/latest/)
- [NodeMCU Documentation](https://nodemcu.readthedocs.io/en/master/)

---

## Integration Checklist

- [ ] Use only 3.3V logic for all GPIO and analog pins.
- [ ] Avoid using boot mode pins (D3, D4, D8) for outputs unless aware of boot constraints.
- [ ] Document pin mapping and all peripheral usage in code and build artifacts.
- [ ] Reference this document for safe pin assignments and electrical limits.
- [ ] Prevent firmware builds which assign >3.3V or conflicting boot roles to any GPIO.

---

*This file is auto-generated from trusted component documentation and should be checked against your board's silkscreen for critical projects.*