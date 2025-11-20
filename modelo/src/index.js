import http from 'http';
import { routes } from './routes/index.js';

const server = http.createServer((request, response) => {
    const { method, url } = request;
    const route = routes.find(route => route.method === method && route.url === url);

    if (route) {
        route.handler(request, response);
    } else {
        response.writeHead(404, { 'content-type': 'text/html; charset=utf-8' });
        response.end(`Cannot ${method} ${url}`);
    }
});

const PORT = 3000;
server.listen(PORT, () => console.log(`Server está rodando na porta ${PORT}`));
