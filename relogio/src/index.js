import http from 'http';
import { WebSocketServer } from './websocket-server.js';

const server = http.createServer((request, response) => {
    // Responde a requisições HTTP simples
    response.writeHead(200, { 'Content-Type': 'text/plain' });
    response.end('WebSocket Server - Connect to ws://localhost:4000\n');
});

const wsServer = new WebSocketServer(server);

server.listen(4000, () => {
    console.log(`🕐 Servidor WebSocket rodando na porta 4000`);
    console.log(`📡 Conecte em: ws://localhost:4000`);
});

// Enviar horário para todos os clientes a cada segundo
setInterval(() => {
    const timeString = new Date().toLocaleTimeString('pt-BR');
    wsServer.broadcast(timeString);
}, 1000);
