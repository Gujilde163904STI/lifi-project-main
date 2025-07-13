# ESP8266 NodeMCU V3 (CH340G) — Specifications & Pinout

This document provides detailed hardware specifications and pinout reference for the ESP8266 NodeMCU V3 (CH340G) development board. Use this guide during firmware development, hardware interfacing, and automated build processes to ensure correct configuration and safe operation.

---

## General Specifications

- **Microcontroller:** ESP8266 (Tensilica L106 32-bit RISC, 80/160 MHz)
- **Flash Memory:** 4 MB (external SPI)
- **RAM:** 64 KB instruction RAM, 96 KB data RAM
- **USB-to-Serial:** CH340G
- **Operating Voltage:** 3.0 – 3.3V (logic level); board can be powered via USB (5V)
- **WiFi:** 802.11 b/g/n, integrated antenna
- **I/O Voltage:** 3.3V (do not apply >3.3V to any GPIO)
- **Programming:** Lua, MicroPython, Arduino IDE, PlatformIO, etc.
- **Dimensions:** ~58mm x 31mm

---

## Board Pinout

Below is the standard NodeMCU V3 pinout as labeled on the board (physical pins on the headers):

```
  [USB]
  |------------------------------------------------|
  | [RST] [EN]                                     |
  | [VIN] [GND] [3V3] [GND] [D0] [D1] ... [D8] [RX]|
  | [TX] [SD3] [SD2] [SD1] [CMD] ... [A0] [GND]    |
  |------------------------------------------------|
```

### Pin Mapping Table (NodeMCU Label → ESP8266 GPIO)

| NodeMCU Pin | ESP8266 GPIO | Special Function             |
|-------------|--------------|------------------------------|
| D0          | GPIO16       | Wake, no PWM/I2C             |
| D1          | GPIO5        | SCL (I2C)                    |
| D2          | GPIO4        | SDA (I2C)                    |
| D3          | GPIO0        | Pull-up, boot mode           |
| D4          | GPIO2        | Pull-up, TX1, LED_BUILTIN    |
| D5          | GPIO14       | SCK (SPI)                    |
| D6          | GPIO12       | MISO (SPI)                   |
| D7          | GPIO13       | MOSI (SPI)                   |
| D8          | GPIO15       | Pull-down, CS (SPI), boot    |
| RX          | GPIO3        | UART RX                      |
| TX          | GPIO1        | UART TX                      |
| A0          | ADC0         | Analog input (0-1V max)      |
| 3V3         | 3.3V out     | Power supply (do not use as GPIO) |
| GND         | GND          | Ground                       |
| VIN         | 5V in        | Power input via USB or ext.   |

> **Note:**  
> - All GPIO pins are 3.3V logic level. Applying >3.3V may damage the chip.
> - Some pins are used during boot and flashing—refer to 'Boot/Flash Mode Notes' below.
> - The onboard LED is typically on D4 (GPIO2).

---

## Power Supply

- **Via USB:** 5V (regulated down to 3.3V onboard)
- **VIN Pin:** Accepts 5V (regulated onboard)
- **3V3 Pin:** Output only (do not feed voltage into this pin)

---

## Boot/Flash Mode Notes

- **GPIO0:** Must be LOW during reset to enter flash mode
- **GPIO2:** Must be HIGH during boot
- **GPIO15:** Must be LOW during boot

For normal operation, connect RX/TX and DTR/RTS (if flashing via UART).

---

## Key Features

- Integrated WiFi (802.11 b/g/n) with TCP/IP stack
- USB-to-serial (CH340G) for easy programming
- Breadboard-friendly layout
- Supports deep sleep and low-power modes
- Compatible with Arduino IDE, PlatformIO, NodeMCU firmware (Lua), MicroPython, etc.

---

## Example: Blinking the Onboard LED (D4/GPIO2) in Arduino

```cpp
void setup() {
  pinMode(D4, OUTPUT); // D4 maps to GPIO2
}

void loop() {
  digitalWrite(D4, HIGH); // LED off (active LOW)
  delay(500);
  digitalWrite(D4, LOW);  // LED on
  delay(500);
}
```

---

## Reference Links

- [RoboFactory — ESP8266 NodeMCU V3 CH340G Product Page](https://www.robofactory.co.za/esp-controllers/26-esp8266-ch340g-nodemcu-v3-lua-wifi-development-board.html)
- [NodeMCU Documentation](https://nodemcu.readthedocs.io/en/master/en/modules/gpio/)
- [ESP8266 Arduino Reference](https://arduino-esp8266.readthedocs.io/en/latest/)

---

## Integration Checklist

- [ ] Use only 3.3V logic for all GPIOs and ADC.
- [ ] Avoid using GPIOs 0, 2, and 15 for outputs unless fully aware of boot/flash constraints.
- [ ] Document all pin usage in firmware and board layouts.
- [ ] Reference this file during automated builds for correct pin mapping and safe usage.
- [ ] Warn or prevent builds that assign >3.3V or conflicting boot/flash roles to GPIOs.

---

*This file is auto-generated from trusted hardware documentation. Always double-check with your board's silkscreen and datasheet for critical projects.*