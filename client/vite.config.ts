import path from 'path'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'
import { defineConfig, loadEnv } from 'vite'
// import mkcert from 'vite-plugin-mkcert'


const resolve = (p: string) => path.resolve(__dirname, p)

// https://vitejs.dev/config/
export default ({ mode }) => {
	const env = loadEnv(mode, process.cwd(), '');

	// dotenv.config({ path: `./.env.${mode}` })
	console.log(2, env.VITE_API_URL)

	return defineConfig({
		plugins: [
			react(),
			// mkcert()
		],
		resolve: {
			alias: {
				'@app': 		resolve('./src/1-app/'),
				'@pages': 		resolve('./src/2-pages/'),
				'@widgets': 	resolve('./src/3-widgets/'),
				'@features': 	resolve('./src/4-features/'),
				'@entities': 	resolve('./src/5-entities/'),
				'@shared': 		resolve('./src/6-shared/'),
				"@public": 		resolve("./public/"),
			}
		},
	})
}
