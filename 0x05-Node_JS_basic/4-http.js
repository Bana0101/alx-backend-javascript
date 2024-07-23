const http = require('http');

const PORT = 1245;
const HOST = 'localhost';

// Create HTTP server
const app = http.createServer((req, res) => {
  const responseText = 'Hello Holberton School!';

  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Content-Length', responseText.length);
  res.statusCode = 200;
  
  // Send the response
  res.write(responseText);
  res.end(); // End the response
});

// Start the server
app.listen(PORT, HOST, () => {
  process.stdout.write(`Server listening at -> http://${HOST}:${PORT}\n`);
});

module.exports = app;

