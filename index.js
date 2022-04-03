const http = require("http");

const WebSocketServer = require("websocket").server;
const httpServer = http.createServer();
const websocketServer = new WebSocketServer({ httpServer: httpServer });

const PORT = process.argv[2] || 8080;

httpServer.listen(PORT, () => console.log(`Listening ON PORT:${PORT}`));

let connection = null;

websocketServer.on("request", (request) => {
  connection = request.accept(null, request.origin);
  connection.on("message", (data) => {
    //On Message Request

    console.log(`Hey i received a message ${data.utf8Data}`);
    //Response for the received message
    connection.send(
      `Hey client! I received your message  ${data.utf8Data} on port:${PORT}`
    );
  });
});
