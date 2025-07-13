/**
 * Diagnostics script for the RPI4 Li-Fi Node.
 * Checks configuration, directories, and simulates system health checks.
 */
const fs = require('fs');
const path = require('path');

function runDiagnostics() {
    console.log('--- Running RPI4 Analytics Node Diagnostics ---');
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
            console.log(`       - Dashboard Port: ${config.dashboard.port}`);
        } else {
            throw new Error('settings.json not found');
        }
    } catch (error) {
        console.log(`[FAIL] Configuration file check failed: ${error.message}`);
        failures++;
    }

    // 2. Check for required directories
    const dirs = ['firmware', 'libs', 'plugins', 'bin', 'dashboard'];
    dirs.forEach(dir => {
        const dirPath = path.join(__dirname, '..', dir);
        if (fs.existsSync(dirPath)) {
            console.log(`[ OK ] Directory '${dir}' exists.`);
            success++;
        } else {
            console.log(`[FAIL] Directory '${dir}' is missing.`);
            failures++;
        }
    });

    // 3. Simulate network connectivity check
    console.log('[INFO] Simulating analytics API endpoint check...');
    setTimeout(() => {
        const isConnected = Math.random() > 0.05; // 95% success rate
        if (isConnected) {
            console.log('[ OK ] Analytics API endpoint connectivity is nominal.');
            success++;
        } else {
            console.log('[FAIL] Could not reach analytics API endpoints.');
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
