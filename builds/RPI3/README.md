# Raspberry Pi 3 (RPI3) Build

This directory contains the build artifacts for the Raspberry Pi 3, the first node in the Li-Fi mesh network.

- **firmware/**: Core application logic.
- **config/**: Device-specific configurations.
- **libs/**: Shared utility libraries.
- **bin/**: Executable scripts for diagnostics and maintenance.
- **plugins/**: AI-driven modules for enhanced functionality.

## Running the Firmware

To simulate the RPI3 node, run the main firmware script:

```sh
node builds/RPI3/firmware/main.js
```

## Running Diagnostics

To run the health check script:

```sh
node builds/RPI3/bin/diagnostics.js
```
