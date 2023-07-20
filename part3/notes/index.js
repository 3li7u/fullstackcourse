const http = require("http");

const app = http.createServer((req, res) => {
  res.writeHead(200, {
    "Content-Type": "text/plain",
    "Access-Control-Allow-Origin": "http://localhost:5173/",
  });
  res.end("Hello World!");
});

const PORT = 3000;

app.listen(PORT);
console.log(`Server is running on: http://localhost:${PORT}`);
