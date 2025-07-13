/**
 * Main firmware for the ESP8266_NODEMCU Li-Fi Repeater Node.
 * This script simulates a repeater that listens for packets, boosts their
 * signal, and relays them to the master node.
 */
const fs = require('fs');
const path = require('path');
const { formatLog } = require('../libs/utils');

// --- Configuration Loading ---
const configPath = path.join(__dirname, '..', 'config', 'settings.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

// --- Main Application Logic ---
function main() {
    console.log(formatLog('INFO', `--- NodeMCU Li-Fi Repeater Firmware Initializing ---`));
    console.log(formatLog('INFO', `Device ID: ${config.deviceId} (${config.deviceName})`));
    console.log(formatLog('INFO', `Network Mode: ${config.network.mode}, relaying to ${config.network.masterNodeId}`));
    console.log(formatLog('INFO', `--- Initialization Complete. Starting Operations ---`));

    // Simulation loop
    const interval = setInterval(() => {
        console.log(formatLog('INFO', `Awaiting incoming transmission...`));
        
        // Simulate receiving a packet from a nearby node
        const sourceNode = `ESP8266-NODE-0${Math.floor(Math.random() * 20)}`;
        console.log(formatLog('INFO', `Weak signal received from ${sourceNode}.`));
        console.log(formatLog('INFO', `Boosting signal and preparing to relay...`));
        console.log(formatLog('INFO', `Relaying packet to master node: ${config.network.masterNodeId}`));

    }, config.simulation.relayIntervalMs);

    // Graceful shutdown
    process.on('SIGINT', () => {
        console.log(formatLog('INFO', '--- Shutting down firmware ---'));
        clearInterval(interval);
        process.exit(0);
    });
}

main();
