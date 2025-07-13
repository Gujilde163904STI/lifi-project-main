/**
 * Main firmware for the RPI4 Li-Fi Aggregation & Analytics Node.
 * This script simulates the core operations of the primary analytics node.
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
const mockSources = ['ESP8266-NODE-007', 'ESP8266-NODE-015', 'NODEMCU-RPT-004', 'RPI3-NODE-001'];
function generateMockPacket() {
    packetCounter++;
    const source = mockSources[packetCounter % mockSources.length];
    // Introduce occasional, repeating errors from one source to test predictive maintenance
    const isAnomaly = source === 'ESP8266-NODE-007' && (packetCounter % 5 < 2);
    return {
        id: `pkt-${Date.now()}-${packetCounter}`,
        source,
        timestamp: Date.now(),
        payload: isAnomaly ? `critical sensor timeout` : `data chunk ${packetCounter}`
    };
}

// --- Main Application Logic ---
function main() {
    console.log(formatLog('INFO', `--- RPI4 Li-Fi Analytics Firmware Initializing ---`));
    console.log(formatLog('INFO', `Device ID: ${config.deviceId} (${config.deviceName})`));
    console.log(formatLog('INFO', `Log Level: ${config.logLevel}`));
    console.log(formatLog('INFO', `--- Initialization Complete. Starting Data Aggregation ---`));

    // Simulation loop
    const interval = setInterval(() => {
        const packet = generateMockPacket();
        console.log(formatLog('INFO', `Received packet ${packet.id} from ${packet.source}.`));

        if (!isValidPacket(packet)) {
            console.log(formatLog('WARN', `Invalid packet structure for ${packet.id}. Discarding.`));
            return;
        }

        // Use the predictive-maintenance plugin if it's loaded
        if (plugins['predictive-maintenance']) {
            const analysis = plugins['predictive-maintenance'].analyze(packet);
            if (analysis.failureRisk === 'high' || analysis.failureRisk === 'medium') {
                console.log(formatLog('CRITICAL', `[Predictive Alert] Device: ${analysis.deviceId}, Risk: ${analysis.failureRisk.toUpperCase()}, Recommendation: ${analysis.recommendation}`));
            } else {
                 console.log(formatLog('DEBUG', `[Predictive] Device: ${analysis.deviceId}, Risk: ${analysis.failureRisk.toUpperCase()}`));
            }
        }

        // Update a shared status file for the dashboard
        updateDashboardStatus();

    }, config.simulation.packetIntervalMs);

    // Graceful shutdown
    process.on('SIGINT', () => {
        console.log(formatLog('INFO', '--- Shutting down firmware ---'));
        clearInterval(interval);
        fs.unlinkSync(path.join(__dirname, '..', 'dashboard', 'status.json'));
        process.exit(0);
    });
}

function updateDashboardStatus() {
    if (!plugins['predictive-maintenance']) return;
    const status = {
        timestamp: new Date().toISOString(),
        activeDevices: plugins['predictive-maintenance'].getNetworkHealth(),
        totalPacketsProcessed: packetCounter,
        systemStatus: 'Nominal'
    };
    
    const highRiskDevices = status.activeDevices.filter(d => d.failureRisk === 'high').length;
    if (highRiskDevices > 0) {
        status.systemStatus = 'High-Risk Devices Detected';
    }

    const statusPath = path.join(__dirname, '..', 'dashboard', 'status.json');
    fs.writeFileSync(statusPath, JSON.stringify(status, null, 2));
}


main();
