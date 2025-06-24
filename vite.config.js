import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
export default defineConfig({
    server: {
        // host: '127.0.0.1', // force IPv4
        // port: 3000,
    },
    plugins: [tailwindcss()],
});
