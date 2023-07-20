const http = require("http");

const notes = [
  {
    id: 1,
    content: "HTML is easy",
    important: true,
  },
  {
    id: 2,
    content: "Browser can execute only JavaScript",
    important: false,
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true,
  },
];

const app = http.createServer((req, res) => {
  res.writeHead(200, {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "http://localhost:5173/",
  });
  res.end(JSON.stringify(notes));
});

const PORT = 3000;

app.listen(PORT);
console.log(`Server is running on: http://localhost:${PORT}`);
