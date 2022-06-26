// import Jimp from "jimp";
import { httpServer } from "./src/http_server/index";
import robot from "robotjs";
import { createWebSocketStream, WebSocketServer } from "ws";
import { handler } from "./src/handler";

const HTTP_PORT = 3000;

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);

const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", (ws) => {
  const writeStream = createWebSocketStream(ws, { encoding: "utf-8" });
  // console.log(writeStream);
  console.log("Connection accepted!");
  ws.on("message", (data) => {
    console.log(data.toString());
    const result = handler(data.toString());
    console.log(result);
    ws.send(result);
  });
  ws.send("You have already been connected to the server");
});

process.on("SIGINT", () => {
  process.stdout.write("Closing websocket...\n");
  wss.close();
  process.exit(0);
});
