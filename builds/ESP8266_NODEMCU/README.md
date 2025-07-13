# ESP8266_NODEMCU Build

This directory contains the build artifacts for the ESP8266_NODEMCU, which acts as a repeater node in the Li-Fi mesh network.

- **firmware/**: Core application logic for the repeater unit.
- **config/**: Device-specific configurations.
- **libs/**: Shared utility libraries.
- **bin/**: Executable scripts for diagnostics.

## Running the Firmware

To simulate the ESP8266_NODEMCU node, run the main firmware script:

```sh
node builds/ESP8266_NODEMCU/firmware/main.js
```

## Running Diagnostics

To run the health check script:

```sh
node builds/ESP8266_NODEMCU/bin/diagnostics.js
```
