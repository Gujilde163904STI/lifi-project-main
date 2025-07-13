/**
 * A simple Node.js HTTP server for the RPI4 monitoring dashboard.
 * It serves the static index.html file and a JSON API endpoint for status.
 */
const http = require('http');
const fs = require('fs');
const path = require('path');

const configPath = path.join(__dirname, '..', 'config', 'settings.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
const PORT = config.dashboard.port || 3000;

const server = http.createServer((req, res) => {
    // Serve the main dashboard page
    if (req.url === '/' || req.url === '/index.html') {
        const filePath = path.join(__dirname, 'index.html');
        fs.readFile(filePath, (err, content) => {
            if (err) {
                res.writeHead(500);
                res.end('Error loading dashboard.');
                return;
            }
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(content);
        });
    } 
    // Serve the status API endpoint
    else if (req.url === '/api/status') {
        const statusPath = path.join(__dirname, 'status.json');
        fs.readFile(statusPath, (err, content) => {
            if (err) {
                res.writeHead(404);
                res.end(JSON.stringify({ error: 'Status file not found. Is the firmware running?' }));
                return;
            }
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(content);
        });
    } 
    // Handle 404
    else {
        res.writeHead(404);
        res.end('Not Found');
    }
});

server.listen(PORT, () => {
    console.log(`--- RPI4 Dashboard Server ---`);
    console.log(`Server running at http://localhost:${PORT}`);
    console.log(`Serving dashboard and status API.`);
    console.log(`-----------------------------`);
});
