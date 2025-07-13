/**
 * Main firmware for the Raspberry Pi 3 Li-Fi Node.
 * This script simulates the core operations of a master node in the network.
 */
const fs = require('fs');
const path = require('path');
const { formatLog, isValidPacket } = require('../libs/utils');

// --- Configuration Loading ---
const configPath = path.join(__dirname, '..', 'config', 'settings.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

// --- Plugin Loading ---
const plugins = {};
if (config.enabledPlugins && config.enabledPlugins.length > 0) {
    console.log(formatLog('INFO', `Loading ${config.enabledPlugins.length} plugin(s)...`));
    config.enabledPlugins.forEach(pluginName => {
        try {
            const pluginPath = path.join(__dirname, '..', 'plugins', `${pluginName}.js`);
            plugins[pluginName] = require(pluginPath);
            console.log(formatLog('INFO', `Plugin "${pluginName}" loaded successfully.`));
        } catch (error) {
            console.error(formatLog('ERROR', `Failed to load plugin "${pluginName}": ${error.message}`));
        }
    });
}


// --- Mock Data Generation ---
let packetCounter = 0;
function generateMockPacket() {
    packetCounter++;
    const isAnomaly = packetCounter % 10 === 0; // Create an anomaly every 10 packets
    return {
        id: `pkt-${Date.now()}-${packetCounter}`,
        source: 'ESP8266-NODE-017',
        timestamp: Date.now(),
        payload: isAnomaly ? 'critical system error detected' : `data chunk ${packetCounter}`
    };
}

// --- Main Application Logic ---
function main() {
    console.log(formatLog('INFO', `--- RPI3 Li-Fi Node Firmware Initializing ---`));
    console.log(formatLog('INFO', `Device ID: ${config.deviceId} (${config.deviceName})`));
    console.log(formatLog('INFO', `Network Mode: ${config.network.mode} on Channel ${config.network.channel}`));
    console.log(formatLog('INFO', `Log Level: ${config.logLevel}`));
    console.log(formatLog('INFO', `--- Initialization Complete. Starting Operations ---`));

    // Simulation loop
    const interval = setInterval(() => {
        const packet = generateMockPacket();
        console.log(formatLog('INFO', `Received packet ${packet.id} from ${packet.source}.`));

        if (!isValidPacket(packet)) {
            console.log(formatLog('WARN', `Invalid packet structure for ${packet.id}. Discarding.`));
            return;
        }

        // Use the packet-analyzer plugin if it's loaded
        if (plugins['packet-analyzer']) {
            const analysisResult = plugins['packet-analyzer'].analyze(packet);
            console.log(formatLog('DEBUG', `Analysis for ${packet.id}: Quality=${analysisResult.signalQuality}%, Priority=${analysisResult.priority}`));
            if (analysisResult.threatDetected) {
                console.log(formatLog('CRITICAL', `Threat detected in ${packet.id}! Escalating.`));
            }
        }

        // Simulate forwarding the packet
        console.log(formatLog('INFO', `Packet ${packet.id} processed and forwarded.`));

    }, config.simulation.packetIntervalMs);

    // Graceful shutdown
    process.on('SIGINT', () => {
        console.log(formatLog('INFO', '--- Shutting down firmware ---'));
        clearInterval(interval);
        process.exit(0);
    });
}

main();
