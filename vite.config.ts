import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [tailwindcss(), sveltekit()],
	server: {
		proxy: {
			'/api': {
				target: 'http://3.109.250.92:8090',
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/api/, ''),
				//  Add headers for /api requests
				headers: {
					'Access-Control-Allow-Origin': 'http://localhost:3000',
					'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
					'Access-Control-Allow-Headers': 'Authorization, Content-Type',
                    'Access-Control-Allow-Credentials': 'true'
				}
			}
		}
	},

});
