# ESP8266 Build

This directory contains the build artifacts for the ESP8266, a client node in the Li-Fi mesh network.

- **firmware/**: Core application logic for the sensor unit.
- **config/**: Device-specific configurations.
- **libs/**: Shared utility libraries.
- **bin/**: Executable scripts for diagnostics.

## Running the Firmware

To simulate the ESP8266 node, run the main firmware script:

```sh
node builds/ESP8266/firmware/main.js
```

## Running Diagnostics

To run the health check script:

```sh
node builds/ESP8266/bin/diagnostics.js
```
