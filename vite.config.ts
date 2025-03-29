import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import {fileURLToPath, URL} from "node:url";
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
        proxy: {
            '/api': {
                target: 'http://94.141.122.224:9000',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, '')
            }
        }
    },
    devServer: {
        https: true
    }
})
