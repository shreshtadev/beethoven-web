import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [tailwindcss(), sveltekit()],
	server: {
		proxy: {
			'/api': {
				target: 'http://127.0.0.1:8090',
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/api/, ''),
				//  Add headers for /api requests
				headers: {
					'Access-Control-Allow-Origin': '*',
					'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
					'Access-Control-Allow-Headers': 'Authorization, Content-Type'
				}
			}
		}
	},
	build: {
		rollupOptions: {
			external: ['pocketbase'] //  Important:  Prevent PocketBase from being included in the client-side bundle.
		}
	}
});
