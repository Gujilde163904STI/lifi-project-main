# Raspberry Pi 4 Model B — Specifications & GPIO Reference

This document provides a comprehensive overview of the hardware specifications for the Raspberry Pi 4 Model B. It should be referenced during firmware development, hardware interfacing, and automated build processes to ensure compatibility and optimal performance.

---

## General Specifications

- **Model:** Raspberry Pi 4 Model B
- **Processor:** Broadcom BCM2711, Quad core Cortex-A72 (ARM v8) 64-bit SoC @ 1.5GHz
- **Memory:** 2GB, 4GB, or 8GB LPDDR4-3200 SDRAM (depending on model)
- **Networking:**
  - Gigabit Ethernet
  - 2.4 GHz and 5.0 GHz IEEE 802.11ac wireless
  - Bluetooth 5.0, BLE
- **Storage:** microSD card slot for loading operating system and data storage
- **Video & Sound:**
  - 2 × micro-HDMI ports (up to 4Kp60 supported)
  - MIPI DSI display port, MIPI CSI camera port
  - 4-pole stereo audio and composite video port
- **USB:**
  - 2 × USB 3.0 ports
  - 2 × USB 2.0 ports
- **GPIO:** 40-pin GPIO header, fully backward-compatible with previous models
- **Power:** 5V DC via USB-C connector (minimum 3A), or GPIO header
- **Operating temperature:** 0°C to +50°C ambient

---

## 40-Pin GPIO Header Pinout

The Raspberry Pi 4 features the same 40-pin GPIO header as previous models. This ensures backward compatibility for HATs and accessories. The pinout is as follows (as viewed from above):

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
- (3V3) / (5V): Power supply pins
- GND: Ground
- GPIOxx: General Purpose Input/Output (all 3.3V logic)
- Pins also support I2C, SPI, UART, PWM functions

---

## Important Notes for Developers

- **Electrical Levels:** All GPIOs are 3.3V; do not expose to voltages above this level.
- **Current Limits:** Max recommended current per GPIO pin is 16mA; total max for all GPIOs is ~50mA.
- **Power Supply:** Use a high-quality 5V/3A USB-C power supply, especially when using peripherals.
- **Backward Compatibility:** The 40-pin header is compatible with Raspberry Pi 3 and most previous models.

---

## Peripheral Interfaces

- **I2C:** GPIO2 (SDA, Pin 3), GPIO3 (SCL, Pin 5)
- **SPI:** GPIO10 (MOSI, Pin 19), GPIO9 (MISO, Pin 21), GPIO11 (SCLK, Pin 23), GPIO8 (CE0, Pin 24), GPIO7 (CE1, Pin 26)
- **UART:** GPIO14 (TXD, Pin 8), GPIO15 (RXD, Pin 10)
- **PWM:** GPIO12 (Pin 32), GPIO13 (Pin 33), GPIO18 (Pin 12), GPIO19 (Pin 35)

---

## Example Usage in Python (BCM Numbering)

```python
import RPi.GPIO as GPIO

GPIO.setmode(GPIO.BCM)
GPIO.setup(18, GPIO.OUT)    # Set GPIO18 (Pin 12) as output
GPIO.output(18, GPIO.HIGH)  # Set GPIO18 high
```

---

## Reference Links

- [Official Raspberry Pi 4 Model B Specifications](https://www.raspberrypi.com/products/raspberry-pi-4-model-b/specifications/)
- [Raspberry Pi Documentation — GPIO](https://www.raspberrypi.com/documentation/computers/raspberry-pi.html#gpio-and-the-40-pin-header)

---

## Integration Checklist

- [ ] Confirm correct GPIO pin assignments for your application.
- [ ] Avoid using power pins (3V3, 5V, GND) as GPIO in firmware.
- [ ] Verify that peripheral interfaces (I2C, SPI, UART, PWM) are not in conflict.
- [ ] Ensure firmware and hardware are configured for 3.3V logic.
- [ ] Document all pin usage in your build artifacts.

---

*This specification is auto-sourced from the official Raspberry Pi documentation and should be used as a reference for all development and build tasks targeting the Raspberry Pi 4 Model B.*