import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import { resolve } from 'path';
// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), svgr()],
    resolve: {
        alias: {
            '@': resolve(__dirname, './src'),
        },
    },
    css: {
        /**
         * https://github.com/madyankin/postcss-modules
         */
        modules: {
            localsConvention: 'camelCaseOnly',
        },
        preprocessorOptions: {
            less: {
                javascriptEnabled: true,
                modifyVars: {},
            },
        },
    },
    server: {
        // https: true,
        host: '0.0.0.0',
        port: 3002,
        open: true,
        proxy: {
            '/api': {
                target: 'http://192.168.50.130:9097',
                changeOrigin: true,
                secure: false,
                // rewrite: path => path.replace(/^\/api/, ''),
                // bypass(req, res, options: ProxyOptions) {
                //   const proxyUrl = new URL(
                //     options.rewrite?.(req?.url || '') || '',
                //     options?.target?.toString() || ''
                //   );
                //   res?.setHeader('x-res-proxyUrl', proxyUrl.href);
                // },
            },
        },
    },
});
