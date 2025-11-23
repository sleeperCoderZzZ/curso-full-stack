import { WebSocketClient } from './src/websocket-client.js';

// Cliente WebSocket conectando ao servidor
const client = new WebSocketClient('ws://localhost:4000');

client.on('open', () => {
    console.log('✅ Cliente conectado ao servidor WebSocket');
});

client.on('message', (message) => {
    console.log('⏰ Horário recebido:', message);
});

client.on('close', () => {
    console.log('❌ Conexão fechada');
});

client.on('error', (err) => {
    console.error('❌ Erro de conexão:', err.message);
    // Tentar reconectar em 2 segundos
    setTimeout(() => {
        client.connect().catch(err => console.error('Erro ao reconectar:', err));
    }, 2000);
});

// Conectar ao servidor
client.connect().catch(err => console.error('Erro na conexão inicial:', err));