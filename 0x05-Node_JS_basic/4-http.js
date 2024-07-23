const http = require('http');

const app = http.createServer((req, resp) => {
  resp.writeHead(200, { 'Content-Type': 'text/plain' });
  resp.end('Hello Holberton School!');
});

app.listen(1245, () => {
  console.log('Server is running on http://localhost:1245');
});

module.exports = app;
