/**
 * Main firmware for the ESP8266 Li-Fi Node.
 * This script simulates a client sensor node that collects data and sends it
 * to the master node.
 */
const fs = require('fs');
const path = require('path');
const { formatLog } = require('../libs/utils');

// --- Configuration Loading ---
const configPath = path.join(__dirname, '..', 'config', 'settings.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

// --- Mock Data Generation ---
let readingCounter = 0;
function generateMockSensorReading() {
    readingCounter++;
    const temperature = (20 + Math.random() * 5).toFixed(2); // Simulate temperature reading
    return {
        id: `pkt-${Date.now()}-${readingCounter}`,
        source: config.deviceId,
        timestamp: Date.now(),
        payload: `temp:${temperature}C;humidity:45%`
    };
}

// --- Main Application Logic ---
function main() {
    console.log(formatLog('INFO', `--- ESP8266 Li-Fi Node Firmware Initializing ---`));
    console.log(formatLog('INFO', `Device ID: ${config.deviceId} (${config.deviceName})`));
    console.log(formatLog('INFO', `Network Mode: ${config.network.mode}, connecting to ${config.network.masterNodeId}`));
    console.log(formatLog('INFO', `--- Initialization Complete. Starting Operations ---`));

    // Simulation loop
    const interval = setInterval(() => {
        const reading = generateMockSensorReading();
        
        // In a real device, this would be a transmission over Li-Fi
        console.log(formatLog('INFO', `Generated sensor reading ${reading.id}.`));
        console.log(formatLog('INFO', `Transmitting packet to master node...`));
        console.log(formatLog('DEBUG', `Payload: ${reading.payload}`));

    }, config.simulation.dataIntervalMs);

    // Graceful shutdown
    process.on('SIGINT', () => {
        console.log(formatLog('INFO', '--- Shutting down firmware ---'));
        clearInterval(interval);
        process.exit(0);
    });
}

main();
