// Cliente WebSocket para o Frontend (navegador)
class FrontendWebSocketClient {
    constructor(url = 'ws://localhost:4000') {
        this.url = url;
        this.ws = null;
        this.listeners = {};
    }

    connect() {
        return new Promise((resolve, reject) => {
            try {
                this.ws = new WebSocket(this.url);

                this.ws.onopen = () => {
                    console.log('✅ Conectado ao servidor WebSocket');
                    this.emit('open');
                    resolve();
                };

                this.ws.onmessage = (event) => {
                    console.log('⏰ Mensagem recebida:', event.data);
                    this.emit('message', event.data);
                };

                this.ws.onclose = () => {
                    console.log('❌ Desconectado do servidor');
                    this.emit('close');
                };

                this.ws.onerror = (error) => {
                    console.error('❌ Erro WebSocket:', error);
                    this.emit('error', error);
                    reject(error);
                };
            } catch (err) {
                reject(err);
            }
        });
    }

    send(message) {
        if (this.ws && this.ws.readyState === WebSocket.OPEN) {
            this.ws.send(message);
        } else {
            console.warn('WebSocket não está conectado');
        }
    }

    close() {
        if (this.ws) {
            this.ws.close();
        }
    }

    on(event, callback) {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }
        this.listeners[event].push(callback);
    }

    emit(event, data) {
        if (this.listeners[event]) {
            this.listeners[event].forEach(cb => cb(data));
        }
    }
}

// Instanciar e conectar
const wsClient = new FrontendWebSocketClient('ws://localhost:4000');

wsClient.on('open', () => {
    console.log('🌐 Frontend conectado ao servidor');
});

wsClient.on('message', (time) => {
    // Atualizar o elemento com o horário
    const relogioDiv = document.getElementById('relogio');
    if (relogioDiv) {
        relogioDiv.innerText = time;
    }
});

wsClient.on('close', () => {
    console.log('Tentando reconectar...');
    // Reconectar em 2 segundos
    setTimeout(() => {
        wsClient.connect().catch(err => console.error('Erro ao reconectar:', err));
    }, 2000);
});

wsClient.on('error', (error) => {
    console.error('Erro de conexão:', error.message);
});

// Conectar ao servidor
wsClient.connect().catch(err => console.error('Erro na conexão inicial:', err));
