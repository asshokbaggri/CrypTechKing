import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 6001 });

wss.on("connection", (ws) => {
    ws.send(JSON.stringify({ message: "Connected to CrypTechKing WS" }));
});

export const broadcast = (data) => {
    const msg = JSON.stringify(data);
    wss.clients.forEach(client => client.send(msg));
};

export default wss;
