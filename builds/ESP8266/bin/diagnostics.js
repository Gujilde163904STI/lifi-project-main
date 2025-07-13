/**
 * Diagnostics script for the ESP8266 Li-Fi Node.
 * Checks configuration and simulates a connection test to the master node.
 */
const fs = require('fs');
const path = require('path');

function runDiagnostics() {
    console.log('--- Running ESP8266 Node Diagnostics ---');
    let success = 0;
    let failures = 0;

    // 1. Check for configuration file
    try {
        const configPath = path.join(__dirname, '..', 'config', 'settings.json');
        if (fs.existsSync(configPath)) {
            console.log('[ OK ] Configuration file (settings.json) found.');
            success++;
            const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
            console.log(`       - Device ID: ${config.deviceId}`);
            console.log(`       - Master Node: ${config.network.masterNodeId}`);
        } else {
            throw new Error('settings.json not found');
        }
    } catch (error) {
        console.log(`[FAIL] Configuration file check failed: ${error.message}`);
        failures++;
    }

    // 2. Simulate ping to master node
    console.log('[INFO] Simulating connection to master node...');
    setTimeout(() => {
        const isConnected = Math.random() > 0.15; // 85% success rate
        if (isConnected) {
            console.log('[ OK ] Master node is reachable.');
            success++;
        } else {
            console.log('[FAIL] Could not establish connection to master node.');
            failures++;
        }

        // --- Summary ---
        console.log('\n--- Diagnostics Complete ---');
        console.log(`Result: ${failures === 0 ? 'PASS' : 'FAIL'}`);
        console.log(`Checks Passed: ${success}`);
        console.log(`Checks Failed: ${failures}`);
        console.log('----------------------------');
        process.exit(failures > 0 ? 1 : 0);
    }, 500);
}

runDiagnostics();
