
/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./index.html",
		'./node_modules/preline/dist/*.js',
		"./src/**/*.{js,ts,jsx,tsx}",
		'node_modules/flowbite-react/lib/esm/**/*.js',
	],
	theme: {
		container: {
			padding: {
				DEFAULT: '1rem',
				sm: '2rem',
				lg: '4rem',
				xl: '5rem',
				'2xl': '6rem',
			},
			screens: {
				sm: '600px',
				md: '728px',
				lg: '1024px',
				// xl: '1240px',
				// '2xl': '1496px',
			}
		},
	},
	plugins: [
		import('preline/plugin')
	// import('flowbite/plugin')
	]
}

