import crypto from 'crypto';

// Classe para gerenciar conexões WebSocket
export class WebSocketServer {
    constructor(httpServer) {
        this.httpServer = httpServer;
        this.clients = new Set();
        
        this.httpServer.on('upgrade', (request, socket, head) => {
            this.handleUpgrade(request, socket, head);
        });
    }

    handleUpgrade(request, socket, head) {
        const key = request.headers['sec-websocket-key'];
        const version = request.headers['sec-websocket-version'];

        if (!key || version !== '13') {
            socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
            return;
        }

        // Gerar a chave de aceitação (RFC 6455)
        const acceptKey = crypto
            .createHash('sha1')
            .update(key + '258EAFA5-E914-47DA-95CA-C5AB0DC85B11')
            .digest('base64');

        const responseHeaders = [
            'HTTP/1.1 101 Switching Protocols',
            'Upgrade: websocket',
            'Connection: Upgrade',
            `Sec-WebSocket-Accept: ${acceptKey}`,
            '',
            ''
        ].join('\r\n');

        socket.write(responseHeaders);

        const client = new WebSocketClient(socket);
        this.clients.add(client);

        client.on('close', () => {
            this.clients.delete(client);
        });

        client.on('message', (message) => {
            // Broadcast para todos os clientes
            this.broadcast(message);
        });
    }

    broadcast(message) {
        this.clients.forEach(client => {
            client.send(message);
        });
    }

    send(clientIndex, message) {
        const clients = Array.from(this.clients);
        if (clients[clientIndex]) {
            clients[clientIndex].send(message);
        }
    }

    getConnectedClientsCount() {
        return this.clients.size;
    }
}

// Classe para gerenciar cada cliente WebSocket
export class WebSocketClient {
    constructor(socket) {
        this.socket = socket;
        this.isAlive = true;
        this.listeners = {};

        this.socket.on('data', (chunk) => this.handleData(chunk));
        this.socket.on('close', () => this.handleClose());
        this.socket.on('error', (err) => this.handleError(err));
    }

    handleData(chunk) {
        // Parse do frame WebSocket (RFC 6455)
        const frame = this.parseFrame(chunk);
        
        if (!frame) return;

        if (frame.opcode === 0x1) { // Text frame
            this.emit('message', frame.payload.toString());
        } else if (frame.opcode === 0x8) { // Close frame
            this.handleClose();
        } else if (frame.opcode === 0x9) { // Ping
            this.sendPong();
        }
    }

    parseFrame(buffer) {
        if (buffer.length < 2) return null;

        const byte1 = buffer[0];
        const byte2 = buffer[1];

        const fin = (byte1 & 0x80) !== 0;
        const opcode = byte1 & 0x0f;
        const masked = (byte2 & 0x80) !== 0;
        let payloadLength = byte2 & 0x7f;

        let offset = 2;

        if (payloadLength === 126) {
            if (buffer.length < 4) return null;
            payloadLength = buffer.readUInt16BE(2);
            offset = 4;
        } else if (payloadLength === 127) {
            if (buffer.length < 10) return null;
            payloadLength = Number(buffer.readBigUInt64BE(2));
            offset = 10;
        }

        let maskKey = null;
        if (masked) {
            if (buffer.length < offset + 4) return null;
            maskKey = buffer.slice(offset, offset + 4);
            offset += 4;
        }

        let payload = buffer.slice(offset, offset + payloadLength);

        if (masked) {
            for (let i = 0; i < payload.length; i++) {
                payload[i] ^= maskKey[i % 4];
            }
        }

        return { fin, opcode, payload };
    }

    send(message) {
        const payload = typeof message === 'string' ? Buffer.from(message) : message;
        const frame = this.createFrame(payload);
        this.socket.write(frame);
    }

    createFrame(payload) {
        const payloadLength = payload.length;
        let frameSize = 2 + payloadLength;
        let offset = 2;

        if (payloadLength > 65535) {
            frameSize += 8;
            offset = 10;
        } else if (payloadLength > 125) {
            frameSize += 2;
            offset = 4;
        }

        const frame = Buffer.allocUnsafe(frameSize);
        frame[0] = 0x81; // FIN + opcode 1 (text)

        if (payloadLength <= 125) {
            frame[1] = payloadLength;
        } else if (payloadLength <= 65535) {
            frame[1] = 126;
            frame.writeUInt16BE(payloadLength, 2);
        } else {
            frame[1] = 127;
            frame.writeBigUInt64BE(BigInt(payloadLength), 2);
        }

        payload.copy(frame, offset);
        return frame;
    }

    sendPong() {
        const pong = Buffer.from([0x8a, 0x00]); // Pong frame
        this.socket.write(pong);
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

    handleClose() {
        this.emit('close');
        this.socket.destroy();
    }

    handleError(err) {
        this.emit('error', err);
    }
}
