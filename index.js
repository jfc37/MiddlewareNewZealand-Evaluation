const http = require("http");
const PORT = process.env.PORT || 3001;

const server = http.createServer(async (req, res) => {});

server.listen(PORT, () => {
  console.log(`server started on port: ${PORT}`);
});
