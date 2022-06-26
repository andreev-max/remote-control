import { httpServer } from "./src/http_server/index";
import { createWebSocketStream, WebSocketServer } from "ws";
import { handler } from "./src/handler";

const HTTP_PORT = 3000;

process.stdout.write(`Start static http server on the ${HTTP_PORT} port\n`);
httpServer.listen(HTTP_PORT);

const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", (ws) => {
  const duplex = createWebSocketStream(ws, { encoding: "utf-8" });
  duplex.on("data", async (command) => {
    const result = await handler(command);
    ws.send(result);
  });
  console.log("Connection accepted!");
  ws.send("You have already been connected to the server");
});

process.on("SIGINT", () => {
  process.stdout.write("Closing websocket...\n");
  wss.close();
  process.exit(0);
});
