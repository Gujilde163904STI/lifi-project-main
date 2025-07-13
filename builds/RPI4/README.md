# RPI4 Build - Data Aggregation & Analytics Node

This directory contains the build artifacts for the Raspberry Pi 4, the central aggregation and analytics node of the Li-Fi network.

- **firmware/**: The core firmware responsible for data processing, analysis, and plugin execution.
- **config/**: Device-specific configurations, including network settings and dashboard port.
- **libs/**: Shared utility libraries.
- **plugins/**: Advanced analytics plugins, such as predictive maintenance.
- **dashboard/**: A self-contained, real-time web dashboard for network monitoring.
- **bin/**: Executable scripts for diagnostics.

## Running the Firmware

To simulate the RPI4 node's core functions, run the main firmware script:

```sh
node builds/RPI4/firmware/main.js
```

## Running the Dashboard

To launch the real-time monitoring dashboard, run its dedicated server:

```sh
node builds/RPI4/dashboard/server.js
```

Then, open a web browser to `http://localhost:3000`.

## Running Diagnostics

To run the health check script for the RPI4 node:

```sh
node builds/RPI4/bin/diagnostics.js
```
