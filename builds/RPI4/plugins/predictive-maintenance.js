/**
 * @module predictive-maintenance
 * An advanced plugin that analyzes packet streams to predict potential
 * device failures in the network.
 */
const { formatLog } = require('../libs/utils');

// In-memory state to track device health over time.
const deviceHealth = new Map();

const ERROR_THRESHOLD = 3; // Number of errors before risk becomes 'high'
const WARNING_THRESHOLD = 1; // Number of errors before risk becomes 'medium'

/**
 * Analyzes a data packet to update the health status of its source device.
 * @param {object} packet - The data packet to analyze.
 * @returns {object} A predictive maintenance report for the source device.
 */
function analyze(packet) {
  const { source, payload } = packet;

  if (!deviceHealth.has(source)) {
    deviceHealth.set(source, { errorCount: 0, lastSeen: Date.now() });
  }

  const stats = deviceHealth.get(source);
  stats.lastSeen = Date.now();

  // Check for keywords indicating a problem.
  if (payload && (payload.includes('error') || payload.includes('fail') || payload.includes('timeout'))) {
    stats.errorCount++;
    console.log(formatLog('DEBUG', `[Predictive] Error detected from ${source}. Total errors: ${stats.errorCount}.`));
  }

  let failureRisk = 'low';
  let recommendation = 'Monitor';

  if (stats.errorCount >= ERROR_THRESHOLD) {
    failureRisk = 'high';
    recommendation = 'Immediate inspection required. Device may fail soon.';
  } else if (stats.errorCount >= WARNING_THRESHOLD) {
    failureRisk = 'medium';
    recommendation = 'Device is reporting non-critical errors. Schedule maintenance.';
  }

  return {
    deviceId: source,
    failureRisk,
    recommendation,
    errorCount: stats.errorCount,
    lastSeen: new Date(stats.lastSeen).toLocaleTimeString(),
  };
}

/**
 * Retrieves the current health status of all monitored devices.
 * @returns {Array<object>} An array of device health reports.
 */
function getNetworkHealth() {
    const healthReport = [];
    for (const [deviceId, stats] of deviceHealth.entries()) {
        // Re-run analysis logic to get current risk level
        let failureRisk = 'low';
        if (stats.errorCount >= ERROR_THRESHOLD) failureRisk = 'high';
        else if (stats.errorCount >= WARNING_THRESHOLD) failureRisk = 'medium';

        healthReport.push({
            deviceId,
            failureRisk,
            errorCount: stats.errorCount,
            lastSeen: new Date(stats.lastSeen).toLocaleTimeString(),
        });
    }
    return healthReport;
}


module.exports = {
  analyze,
  getNetworkHealth,
};
