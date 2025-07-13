/**
 * @module utils
 * Shared utility functions for the ESP8266_NODEMCU firmware.
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

module.exports = {
  formatLog,
};
