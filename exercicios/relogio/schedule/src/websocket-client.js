import net from 'net';
import crypto from 'crypto';

// Cliente WebSocket puro
export class WebSocketClient {
    constructor(url) {
        this.url = new URL(url);
        this.socket = null;
        this.listeners = {};
        this.connected = false;
    }

    connect() {
        return new Promise((resolve, reject) => {
            this.socket = net.createConnection(
                {
                    host: this.url.hostname,
                    port: this.url.port || 80
                },
                () => {
                    const key = crypto.randomBytes(16).toString('base64');
                    const path = this.url.pathname || '/';

                    const request = [
                        `GET ${path} HTTP/1.1`,
                        `Host: ${this.url.hostname}:${this.url.port || 80}`,
                        'Upgrade: websocket',
                        'Connection: Upgrade',
                        `Sec-WebSocket-Key: ${key}`,
                        'Sec-WebSocket-Version: 13',
                        '',
                        ''
                    ].join('\r\n');

                    this.socket.write(request);
                }
            );

            this.socket.on('data', (chunk) => {
                if (!this.connected) {
                    // Parse handshake response
                    const response = chunk.toString();
                    if (response.includes('101')) {
                        this.connected = true;
                        this.emit('open');
                        resolve();
                    } else {
                        reject(new Error('Handshake failed'));
                    }
                } else {
                    // Parse WebSocket frames
                    this.handleData(chunk);
                }
            });

            this.socket.on('close', () => {
                this.connected = false;
                this.emit('close');
            });

            this.socket.on('error', (err) => {
                reject(err);
                this.emit('error', err);
            });
        });
    }

    handleData(chunk) {
        const frame = this.parseFrame(chunk);
        
        if (!frame) return;

        if (frame.opcode === 0x1) { // Text frame
            this.emit('message', frame.payload.toString());
        } else if (frame.opcode === 0x8) { // Close frame
            this.close();
        } else if (frame.opcode === 0xa) { // Pong
            this.emit('pong');
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
        if (!this.connected) {
            throw new Error('WebSocket not connected');
        }

        const payload = typeof message === 'string' ? Buffer.from(message) : message;
        const frame = this.createFrame(payload);
        this.socket.write(frame);
    }

    createFrame(payload) {
        const payloadLength = payload.length;
        
        // Gerar máscara (os clientes devem mascarar)
        const maskKey = crypto.randomBytes(4);
        
        // Mascarar payload
        const maskedPayload = Buffer.alloc(payloadLength);
        for (let i = 0; i < payloadLength; i++) {
            maskedPayload[i] = payload[i] ^ maskKey[i % 4];
        }

        let frameSize = 2 + 4 + payloadLength; // 2 + mask key + payload
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
            frame[1] = 0x80 | payloadLength; // MASK + length
        } else if (payloadLength <= 65535) {
            frame[1] = 0x80 | 126; // MASK + extended 16-bit length
            frame.writeUInt16BE(payloadLength, 2);
        } else {
            frame[1] = 0x80 | 127; // MASK + extended 64-bit length
            frame.writeBigUInt64BE(BigInt(payloadLength), 2);
        }

        const maskOffset = offset;
        maskKey.copy(frame, maskOffset);
        maskedPayload.copy(frame, maskOffset + 4);

        return frame;
    }

    close() {
        if (this.socket) {
            this.socket.end();
        }
        this.connected = false;
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
