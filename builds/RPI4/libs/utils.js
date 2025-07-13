/**
 * @module utils
 * Shared utility functions for the RPI4 firmware.
 */

/**
 * Formats a log message with a timestamp and level.
 * @param {string} level - The log level (e.g., 'INFO', 'ERROR').
 * @param {string} message - The log message.
 * @returns {string} The formatted log string.
 */
function formatLog(level, message) {
  const timestamp = new Date().toISOString();
  return `[${timestamp}] [${level.toUpperCase()}] ${message}`;
}

/**
 * Validates the structure of a simulated Li-Fi data packet.
 * @param {object} packet - The data packet.
 * @returns {boolean} - True if the packet is valid, false otherwise.
 */
function isValidPacket(packet) {
  return packet &&
    typeof packet.id === 'string' &&
    typeof packet.source === 'string' &&
    typeof packet.payload !== 'undefined' &&
    typeof packet.timestamp === 'number';
}

module.exports = {
  formatLog,
  isValidPacket,
};
