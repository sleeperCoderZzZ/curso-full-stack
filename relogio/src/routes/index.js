import { type } from "os";

export const routes = [
    {
        method: 'GET',
        url: '/pegarHoras',
        handler: (req, res) => {
            const now = new Date();
            const timeString = now.toLocaleTimeString();
            return timeString;
        }
    }
]