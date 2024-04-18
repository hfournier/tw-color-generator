type PaletteColor = {
	name: string
	shades: { shade: string; color: string }[]
}

export const defaultTw3Config = `<span class="line"><span style="color: var(--color-code-comment)">/** </span><span style="color: var(--color-code-keyword)">@type</span><span style="color: var(--color-code-entity)"> {import('tailwindcss').Config}</span><span style="color: var(--color-code-comment)"> */</span></span>
<span class="line"><span style="color: var(--color-code-variable)">module</span><span style="color: var(--color-code-punctuation)">.</span><span style="color: var(--color-code-variable)">exports</span><span style="color: var(--color-code-keyword)"> =</span><span style="color: var(--color-code-punctuation)"> {</span></span>
<span class="line"><span style="color: var(--color-code-property)">  theme: {</span></span>
<span class="line"><span style="color: var(--color-code-property)">    extend: {</span></span>
<span class="line"><span style="color: var(--color-code-punctuation)">    },</span></span>
<span class="line"><span style="color: var(--color-code-punctuation)">  },</span></span>
<span class="line"><span style="color: var(--color-code-punctuation)">}</span></span>
<span class="line"></span>`

export const defaultTw3Css = `<span class="line"><span style="color: var(--color-code-keyword)">@tailwind</span><span style="color: var(--color-code-variable)"> base;</span></span>
<span class="line"><span style="color: var(--color-code-keyword)">@tailwind</span><span style="color: var(--color-code-variable)"> components;</span></span>
<span class="line"><span style="color: var(--color-code-keyword)">@tailwind</span><span style="color: var(--color-code-variable)"> utilities;</span></span>\n
<span class="line"><span style="color: var(--color-code-keyword)">@layer</span><span style="color: var(--color-code-variable)"> base {</span></span>
<span class="line"><span style="color: var(--color-code-entity)">  :root</span><span style="color: var(--color-code-punctuation)"> {</span></span>\n
<span class="line"><span style="color: var(--color-code-punctuation)">  }</span></span>
<span class="line"><span style="color: var(--color-code-punctuation)">}</span></span>`

/**
 * Generates Tailwind CSS 3.x code (tailwind.config.js) based on the provided palette colors.
 *
 * @param {PaletteColor[]} paletteColors - An optional array of palette colors.
 * @return {string} The generated Tailwind CSS code.
 */
export const getTw3Code = (paletteColors?: PaletteColor[]) => {
	const extend =
		typeof document !== "undefined"
			? (document.getElementById("ck_extend") as HTMLInputElement).checked
			: true
	const twCode_start = `<span class="line"><span style="color: var(--color-code-comment)">/** </span><span style="color: var(--color-code-keyword)">@type</span><span style="color: var(--color-code-entity)"> {import('tailwindcss').Config}</span><span style="color: var(--color-code-comment)"> */</span></span>\n<span class="line"><span style="color: var(--color-code-variable)">module</span><span style="color: var(--color-code-punctuation)">.</span><span style="color: var(--color-code-variable)">exports</span><span style="color: var(--color-code-keyword)"> =</span><span style="color: var(--color-code-punctuation)"> {</span></span>\n<span class="line"><span style="color: var(--color-code-property)">  theme: {</span></span>\n${extend ? '<span class="line"><span style="color: var(--color-code-property)">    extend: {</span></span>\n' : ""}<span class="line"><span style="color: var(--color-code-property)">    ${extend ? "  " : ""}colors: {</span></span>\n`
	const twCode_shades = paletteColors
		? paletteColors
				.map((paletteColor) => {
					const twCode_color_start = `<span class="line"><span style="color: var(--color-code-property)">      ${extend ? "  " : ""}${paletteColor.name}: {</span></span>\n`
					const twCode_color_shades =
						paletteColor.shades
							.map(
								(shade) =>
									`<span class="line"><span style="color: var(--color-code-property)">        ${extend ? "  " : ""}${shade.shade}</span><span style="color: var(--color-code-punctuation)">: </span><span style="color: var(--color-code-string)">'${shade.color}'</span><span style="color: var(--color-code-punctuation)">,</span></span>`
							)
							.join("\n") + "\n"
					const twCode_color_end = `<span class="line"><span style="color: var(--color-code-punctuation)">      ${extend ? "  " : ""}},</span></span>\n`

					return twCode_color_start.concat(twCode_color_shades, twCode_color_end)
				})
				.join("")
		: ""
	const twCode_end = `${extend ? '<span class="line"><span style="color: var(--color-code-punctuation)">      }</span></span>\n' : ""}<span class="line"><span style="color: var(--color-code-punctuation)">    },</span></span>\n<span class="line"><span style="color: var(--color-code-punctuation)">  },</span></span>\n<span class="line"><span style="color: var(--color-code-punctuation)">}</span></span>\n<span class="line"></span>`

	return twCode_start.concat(twCode_shades, twCode_end)
}

/**
 * Generates the Tailwind CSS 4.x code (tailwind.css) based on the provided palette colors.
 *
 * @param {PaletteColor[]} paletteColors - An array of palette colors
 * @return {string} The generated Tailwind CSS code
 */
export const getTw4CodeCss = (paletteColors?: PaletteColor[]) => {
	const extend =
		typeof document !== "undefined"
			? (document.getElementById("ck_extend") as HTMLInputElement).checked
			: true
	const twCode_start = `<span class="line"><span style="color: var(--color-code-keyword)">@import</span><span style="color: var(--color-code-string)"> "tailwindcss"</span><span style="color: var(--color-code-punctuation)">;</span></span>\n\n<span class="line"><span style="color: var(--color-code-keyword)">@theme</span><span style="color: var(--color-code-punctuation)"> {</span></span>\n`
	const twCode_extend = `<span class="line"><span style="color: var(--color-code-cssvar)">  --color-</span><span style="color: var(--color-code-char)">*</span><span style="color: var(--color-code-punctuation">: initial;</span></span>\n\n`
	const twCode_shades = paletteColors
		? paletteColors
				.map(
					(paletteColor) =>
						paletteColor.shades
							.map(
								(shade) =>
									`<span class="line"><span style="color: var(--color-code-cssvar)">  --color-${paletteColor.name}${shade.shade === "DEFAULT" ? "" : "-" + shade.shade}: </span><span style="color: var(--color-code-string);font-style:italic">${shade.color}</span><span style="color: var(--color-code-punctuation)">;</span></span>`
							)
							.join("\n") + "\n"
				)
				.join("\n")
		: ""
	const twCode_end = `<span class="line"><span style="color: var(--color-code-punctuation)">}</span></span>`

	if (extend) {
		return twCode_start.concat(twCode_shades, twCode_end)
	} else {
		return twCode_start.concat(twCode_extend, twCode_shades, twCode_end)
	}
}

export const getCodeCss = (paletteColors?: PaletteColor[]) => {
	const twCode_start = `<span class="line"><span style="color: var(--color-code-entity)">:root</span><span style="color: var(--color-code-punctuation)"> {</span></span>\n`
	const twCode_shades = paletteColors
		? paletteColors
				.map(
					(paletteColor) =>
						paletteColor.shades
							.map(
								(shade) =>
									`<span class="line"><span style="color: var(--color-code-cssvar)">  --clr-${paletteColor.name}${shade.shade === "DEFAULT" ? "" : "-" + shade.shade}: </span><span style="color: var(--color-code-string);font-style:italic">${shade.color}</span><span style="color: var(--color-code-punctuation)">;</span></span>`
							)
							.join("\n") + "\n"
				)
				.join("\n")
		: ""
	const twCode_end = `<span class="line"><span style="color: var(--color-code-punctuation)">}</span></span>`

	return twCode_start.concat(twCode_shades, twCode_end)
}

/**
 * Generate Tailwind CSS 3.x code (tailwind.css) based on palette colors.
 *
 * @param {string} cs - The color system to use (either "rgb" or "hsl").
 * @param {PaletteColor[]} paletteColors - An array of palette colors with their shades.
 * @return {string} The generated Tailwind CSS code.
 */
export const getTw3CodeCss = (cs?: string, paletteColors?: PaletteColor[]) => {
	const twCode_start = `<span class="line"><span style="color: var(--color-code-keyword)">@tailwind</span><span style="color: var(--color-code-variable)"> base;</span></span>
<span class="line"><span style="color: var(--color-code-keyword)">@tailwind</span><span style="color: var(--color-code-variable)"> components;</span></span>
<span class="line"><span style="color: var(--color-code-keyword)">@tailwind</span><span style="color: var(--color-code-variable)"> utilities;</span></span>\n
<span class="line"><span style="color: var(--color-code-keyword)">@layer</span><span style="color: var(--color-code-variable)"> base {</span></span>
<span class="line"><span style="color: var(--color-code-entity)">  :root</span><span style="color: var(--color-code-punctuation)"> {</span></span>\n`

	const twCode_shades = paletteColors
		? paletteColors
				.map((paletteColor) => {
					const twCode_color_shades =
						paletteColor.shades
							.map((shade) => {
								if (cs === "rgb") {
									const found = shade.color.match(/rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)/)
									if (found) {
										return `<span class="line"><span style="color: var(--color-code-cssvar)">    --color-${paletteColor.name}${shade.shade === "DEFAULT" ? "" : "-" + shade.shade}</span><span style="color: var(--color-code-punctuation)">: </span><span style="color: var(--color-code-number)">${found[1]} ${found[2]} ${found[3]}</span><span style="color: var(--color-code-punctuation)">;</span></span>`
									} else {
										return "oops"
									}
								} else {
									const found = shade.color.match(
										/hsl\((\d{1,3}(?:\.\d+)?),\s*(\d{1,3}(?:\.\d+)?)%,\s*(\d{1,3}(?:\.\d+)?)%\)/
									)
									if (found) {
										return `<span class="line"><span style="color: var(--color-code-cssvar)">    --color-${paletteColor.name}${shade.shade === "DEFAULT" ? "" : "-" + shade.shade}</span><span style="color: var(--color-code-punctuation)">: </span><span style="color: var(--color-code-number)">${found[1]}deg ${found[2]}% ${found[3]}%</span><span style="color: var(--color-code-punctuation)">;</span></span>`
									} else {
										return "oops"
									}
								}
							})
							.join("\n") + "\n"

					return twCode_color_shades
				})
				.join("\n")
		: ""

	const twCode_end = `<span class="line"><span style="color: var(--color-code-punctuation)">  }</span></span>\n<span class="line"><span style="color: var(--color-code-punctuation)">}</span></span>`

	return twCode_start.concat(twCode_shades, twCode_end)
}

/**
 * Generate the Tailwind CSS configuration code based on the provided palette colors.
 *
 * @param {string} cs - The color syntax to use (rgb or hsl).
 * @param {PaletteColor[]} paletteColors - An array of palette colors with their shades.
 * @return {string} The Tailwind CSS configuration code.
 */
export const getTw3CodeConfig = (cs: string, paletteColors?: PaletteColor[]) => {
	const extend =
		typeof document !== "undefined"
			? (document.getElementById("ck_extend") as HTMLInputElement).checked
			: true
	const twCode_start = `<span class="line"><span style="color: var(--color-code-comment)">/** </span><span style="color: var(--color-code-keyword)">@type</span><span style="color: var(--color-code-entity)"> {import('tailwindcss').Config}</span><span style="color: var(--color-code-comment)"> */</span></span>
<span class="line"><span style="color: var(--color-code-variable)">module</span><span style="color: var(--color-code-punctuation)">.</span><span style="color: var(--color-code-variable)">exports</span><span style="color: var(--color-code-keyword)"> =</span><span style="color: var(--color-code-punctuation)"> {</span></span>
<span class="line"><span style="color: var(--color-code-property)">  theme: {</span></span>${extend ? '\n<span class="line"><span style="color: var(--color-code-property)">    extend: {</span></span>' : ""}
<span class="line"><span style="color: var(--color-code-property">    ${extend ? "  " : ""}colors: {</span></span>\n`

	const twCode_shades = paletteColors
		? paletteColors
				.map((paletteColor) => {
					const twCode_color_start = `<span class="line"><span style="color: var(--color-code-property)">      ${extend ? "  " : ""}${paletteColor.name}: {</span></span>\n`
					const twCode_color_shades =
						paletteColor.shades
							.map((shade) => {
								if (cs === "rgb") {
									return `<span class="line"><span style="color: var(--color-code-property)">        ${extend ? "  " : ""}${shade.shade}</span><span style="color: var(--color-code-punctuation)">: </span><span style="color: var(--color-code-string)">'rgb(var(--color-${paletteColor.name}${shade.shade === "DEFAULT" ? "" : "-" + shade.shade}) / &lt;alpha-value&gt;)'</span><span style="color: var(--color-code-punctuation)">,</span></span>`
								} else {
									return `<span class="line"><span style="color: var(--color-code-property)">        ${extend ? "  " : ""}${shade.shade}</span><span style="color: var(--color-code-punctuation)">: </span><span style="color: var(--color-code-string)">'hsl(var(--color-${paletteColor.name}${shade.shade === "DEFAULT" ? "" : "-" + shade.shade}) / &lt;alpha-value&gt;)'</span><span style="color: var(--color-code-punctuation)">,</span></span>`
								}
							})
							.join("\n") + "\n"
					const twCode_color_end = `<span class="line"><span style="color: var(--color-code-property)">      ${extend ? "  " : ""}},</span></span>\n`

					return twCode_color_start.concat(twCode_color_shades, twCode_color_end)
				})
				.join("")
		: ""

	const twCode_end = `${extend ? '<span class="line"><span style="color: var(--color-code-punctuation)">      }</span></span>\n' : ""}<span class="line"><span style="color: var(--color-code-punctuation)">    }</span></span>
<span class="line"><span style="color: var(--color-code-punctuation)">  }</span></span>
<span class="line"><span style="color: var(--color-code-punctuation)">}</span></span>`

	return twCode_start.concat(twCode_shades, twCode_end)
}
