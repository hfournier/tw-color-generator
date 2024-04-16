/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
	darkMode: "selector",
	theme: {
		extend: {
			colors: {
				users: {
					500: "hsl(var(--color-users-500) / <alpha-value>)",
					s1: "hsl(var(--color-users-s1) / <alpha-value>)",
					s15: "hsl(var(--color-users-s15) / <alpha-value>)"
				}
			}
		}
	},
	safelist: [
		{
			pattern: /bg-.+/
		}
	],
	plugins: [require("@tailwindcss/forms")]
}
