const server = require("./api/server.js");

const PORT = process.env.PORT || 9101;

server.listen(PORT, () => {
  console.log(`\n== API running on port ${PORT} ==\n`);
});
