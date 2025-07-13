# Raspberry Pi 3 Model B GPIO Pinout & Specifications

This document provides a detailed GPIO pinout and hardware reference for the Raspberry Pi 3 Model B. Use this as an authoritative source during firmware development and hardware interfacing to ensure correct pin assignments and safe electrical practices.

---

## General Specifications

- **Model:** Raspberry Pi 3 Model B
- **CPU:** 1.2GHz 64-bit quad-core ARM Cortex-A53
- **RAM:** 1GB LPDDR2
- **GPIO Header:** 40-pin (2x20) male header

---

## 40-Pin GPIO Pinout Diagram

Below is a logical map of the 40-pin header as viewed from above (with USB ports at the bottom):

```
 (3V3) (1) (2) 5V
 GPIO2 (3) (4) 5V
 GPIO3 (5) (6) GND
 GPIO4 (7) (8) GPIO14
  GND  (9) (10) GPIO15
GPIO17 (11) (12) GPIO18
GPIO27 (13) (14) GND
GPIO22 (15) (16) GPIO23
 3V3  (17) (18) GPIO24
GPIO10 (19) (20) GND
 GPIO9 (21) (22) GPIO25
GPIO11 (23) (24) GPIO8
  GND (25) (26) GPIO7
GPIO0 (27) (28) GPIO1
GPIO5 (29) (30) GND
GPIO6 (31) (32) GPIO12
GPIO13 (33) (34) GND
GPIO19 (35) (36) GPIO16
GPIO26 (37) (38) GPIO20
  GND (39) (40) GPIO21
```

**Legend:**
- (3V3) / (5V): Power pins (do not use as GPIO)
- GND: Ground
- GPIOxx: General Purpose Input/Output
- Some pins have alternate functions (I2C, SPI, UART, PWM)

---

## Power Pins

- **3.3V:** Pins 1, 17
- **5V:** Pins 2, 4
- **GND:** Pins 6, 9, 14, 20, 25, 30, 34, 39

---

## I2C Pins

- **SDA (Data):** GPIO2 (Pin 3)
- **SCL (Clock):** GPIO3 (Pin 5)

## UART Pins

- **TXD:** GPIO14 (Pin 8)
- **RXD:** GPIO15 (Pin 10)

## SPI Pins

- **MOSI:** GPIO10 (Pin 19)
- **MISO:** GPIO9 (Pin 21)
- **SCLK:** GPIO11 (Pin 23)
- **CE0:** GPIO8 (Pin 24)
- **CE1:** GPIO7 (Pin 26)

## PWM Capable Pins

- **PWM0:** GPIO12 (Pin 32), GPIO18 (Pin 12)
- **PWM1:** GPIO13 (Pin 33), GPIO19 (Pin 35)

---

## Notes for Firmware Development

- **Pin Numbering:** Use BCM (Broadcom SOC Channel) numbering for all software unless otherwise required.
- **Voltage Levels:** All GPIOs operate at 3.3V logic. Do not connect 5V signals directly to GPIOs.
- **Current Limits:** Max current draw per GPIO pin is 16mA (recommended < 10mA continuous). Total max for all GPIOs: ~50mA.
- **Alternate Functions:** Many GPIOs can act as I2C, SPI, UART, or PWM. Assignments must be coordinated in firmware to avoid conflicts.
- **Physical Pin Mapping:** When referencing pins in code, clearly document whether you use physical pin numbers or BCM numbering.

---

## Example: Accessing GPIO in Python (BCM Numbering)

```python
import RPi.GPIO as GPIO

GPIO.setmode(GPIO.BCM)
GPIO.setup(17, GPIO.OUT)    # Sets GPIO17 (Pin 11) as output
GPIO.output(17, GPIO.HIGH)  # Sets GPIO17 high
```

---

## External Links

- [Official Raspberry Pi GPIO Documentation](https://www.raspberrypi.com/documentation/computers/raspberry-pi.html#gpio-and-the-40-pin-header)
- [eTechnophiles: Raspberry Pi 3 GPIO Pinout](https://www.etechnophiles.com/raspberry-pi-3-gpio-pinout-pin-diagram-and-specs-in-detail-model-b/)

---

## Integration Checklist

For firmware and AI-based build systems:
- [ ] Always reference this file to cross-verify hardware pin assignments.
- [ ] Warn or fail builds if code attempts to use reserved/power pins as GPIO.
- [ ] Check for conflicting alternate functions in pin configurations.
- [ ] Validate all voltage and current requirements in hardware interface code.
- [ ] Output clear pin diagrams in generated documentation.

---

*This file is auto-generated from trusted hardware documentation. Always double-check with physical board markings for critical deployments.*