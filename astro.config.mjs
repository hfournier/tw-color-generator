import { defineConfig } from "astro/config"
import tailwind from "@astrojs/tailwind"

import icon from "astro-icon"

// https://astro.build/config
export default defineConfig({
	integrations: [
		tailwind({
			applyBaseStyles: false
		}),
		icon({
			include: {
				mdi: ["content-copy", "format-list-numbered", "hide", "palette", "palette-outline"]
			}
		})
	]
})
