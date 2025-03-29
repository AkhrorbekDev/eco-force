import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import {fileURLToPath, URL} from "node:url";
import * as fs from "node:fs";
import * as path from "node:path";
// https://vite.dev/config/
export default defineConfig({
    css: {
        preprocessorOptions: {
            scss: {
                api: "modern-compiler", // or "modern"
            },
        },
    },
    plugins: [vue()],
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url)),
        },
    },
    build: {
        target: 'esnext' // This enables top-level await
    },
    server: {
        // https: {
        //     key: fs.readFileSync(path.resolve(import.meta.dirname, 'cert/privateKey.key')),
        //     cert: fs.readFileSync(path.resolve(import.meta.dirname, 'cert/cert.pem')),
        // },

        proxy: {
            '/api': {
                target: 'http://94.141.122.224:9000',
                changeOrigin: true,
                secure: false, // Set to true if your target uses HTTPS
                rewrite: (path) => path.replace(/^\/api/, '')
            }
        }
    }
})
