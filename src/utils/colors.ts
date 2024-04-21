import {
	formatHex,
	hsl,
	hwb,
	lab,
	lch,
	oklab,
	oklch,
	rgb,
	type Hsl,
	type Hwb,
	type Lab,
	type Lch,
	type Oklab,
	type Oklch,
	round,
	formatCss,
	wcagContrast
} from "culori"
import defaultColorMixOptions from "@data/color-mix-options.json"
import defaultShadeOptions from "@data/shade-options.json"
import {
	DEFAULT_COLOR,
	DEFAULT_COLOR_SPACE_1,
	DEFAULT_COLOR_SPACE_2,
	DEFAULT_POLAR_COLOR_SPACE_1,
	DEFAULT_POLAR_COLOR_SPACE_2,
	DEFAULT_RECTANGLE_COLOR_SPACE_1,
	DEFAULT_RECTANGLE_COLOR_SPACE_2
} from "../consts"

const defaultColorHsl = hsl(DEFAULT_COLOR) as Hsl // default color is tailwindcss orange-500 #f97316
defaultColorHsl.l = 0.5

export const colorShades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]
export const LightnessColorSpaces = ["hsl", "hwb", "lab", "lch", "oklab", "oklch"] as const
export type LightnessColorSpaceTypes = (typeof LightnessColorSpaces)[number]
export const PolarColorSpaces = ["hsl", "hwb", "lch", "oklch"] as const
export type PolarColorSpaceTypes = (typeof PolarColorSpaces)[number]
export const HueInterpolationMethods = ["shorter", "longer", "decreasing", "increasing"] as const
export type HueInterpolationMethodTypes = (typeof HueInterpolationMethods)[number]
export const RectangularColorSpaces = [
	"lab",
	"oklab",
	"srgb",
	"srgb-linear",
	"xyz",
	"xyz-d50",
	"xyz-d65"
] as const
export type RectangularColorSpaceTypes = (typeof RectangularColorSpaces)[number]
export type ColorSpaceTypes = PolarColorSpaceTypes | RectangularColorSpaceTypes

export type cssColorSpaceTypes =
	| "hsl"
	| "hwb"
	| "lab"
	| "lch"
	| "lrgb"
	| "oklab"
	| "oklch"
	| "rgb"
	| "srgb"
	| "srgb-linear"
	| "xyz"
	| "xyz50"
	| "xyz65"

export const defaultColors = {
	tw_color: "orange",
	cs_1: DEFAULT_COLOR_SPACE_1 as LightnessColorSpaceTypes,
	cs_2: DEFAULT_COLOR_SPACE_2 as LightnessColorSpaceTypes,
	pcs_1: DEFAULT_POLAR_COLOR_SPACE_1 as PolarColorSpaceTypes,
	pcs_2: DEFAULT_POLAR_COLOR_SPACE_2 as PolarColorSpaceTypes,
	rcs_1: DEFAULT_RECTANGLE_COLOR_SPACE_1 as RectangularColorSpaceTypes,
	rcs_2: DEFAULT_RECTANGLE_COLOR_SPACE_2 as RectangularColorSpaceTypes,
	hsl: defaultColorHsl,
	hex: formatHex(defaultColorHsl),
	rgb: rgb(defaultColorHsl)
}

export type ShadeOptions = {
	neutral: number
	light: { min: number; max: number; step: number }
	dark: { min: number; max: number; step: number }
}

export const twColors = [
	{ name: "amber", hue: 34 },
	{ name: "blue", hue: 216 },
	{ name: "cyan", hue: 188 },
	{ name: "emerald", hue: 163 },
	{ name: "fuchsia", hue: 294 },
	{ name: "green", hue: 151 },
	{ name: "indigo", hue: 239 },
	{ name: "lime", hue: 90 },
	{ name: "orange", hue: 21 },
	{ name: "pink", hue: 333 },
	{ name: "purple", hue: 272 },
	{ name: "red", hue: 1 },
	{ name: "rose", hue: 352 },
	{ name: "sky", hue: 197 },
	{ name: "teal", hue: 175 },
	{ name: "violet", hue: 259 },
	{ name: "yellow", hue: 42 }
]

export const colorSchemes = [
	"none",
	"complimentary",
	"split-complimentary",
	"analogous",
	"triadic",
	"tetradic",
	"square"
] as const
export type ColorSchemeTypes = (typeof colorSchemes)[number]

const round0 = round(0)
const round2 = round(2)

/**
 * Function to format a color based on its color space.
 *
 * @param {Hsl | Hwb | Lab | Oklab | Lch | Oklch} color - the color object to format
 * @return {string} the formatted color string
 */
export const formatColor = (color: Hsl | Hwb | Lab | Oklab | Lch | Oklch) => {
	let formattedColor
	switch (color.mode) {
		case "hsl":
			formattedColor = `hsl(${round0(color.h)}deg ${round0(color.s * 100)}% ${round0(color.l * 100)}%)`
			break

		case "hwb":
			formattedColor = `hwb(${round0(color.h)}deg ${round0(color.w * 100)}% ${round0(color.b * 100)}%)`
			break

		case "lab":
			formattedColor = `lab(${round0(color.l)}% ${round0(color.a)} ${round0(color.b)})`
			break

		case "oklab":
			formattedColor = `oklab(${round0(color.l * 100)}% ${round0(color.a * 100)} ${round0(color.b * 100)})`
			break

		case "lch":
			formattedColor = `lch(${round0(color.l)}% ${round0(color.c)} ${round0(color.h)}deg)`
			break

		case "oklch":
			formattedColor = `oklch(${round0(color.l * 100)}% ${round2(color.c)} ${round0(color.h)}deg)`
			break
	}
	return formattedColor
}

/**
 * Retrieves color mix options from local storage if available, otherwise returns default options.
 *
 * @return {typeof defaultColorMixOptions} The color mix options retrieved from local storage or default options.
 */
export const getColorMixOptions = () => {
	if (typeof localStorage !== "undefined") {
		const rectColorMixOptions = localStorage.getItem("cmOptions")
		const cmOptions = rectColorMixOptions
			? (JSON.parse(rectColorMixOptions) as typeof defaultColorMixOptions)
			: defaultColorMixOptions
		return cmOptions
	} else {
		return defaultColorMixOptions
	}
}

/**
 * Generate different shades of a color based on the specified color space.
 *
 * @param {string} colorHex - The hexadecimal value of the base color.
 * @param {LightnessColorSpaceTypes} colorSpace - The color space to generate the shades in.
 * @param {boolean} ofGray - Whether to generate shades of gray.
 * @param {number} bwOffset - The black or white offset for generating shades.
 * @return {Array<Object>} An array of color shades based on the specified color space.
 */
export const getColorShades = (
	colorHex: string,
	colorSpace: LightnessColorSpaceTypes,
	ofGray: boolean = false,
	bwOffset: number = 0
) => {
	const shadeOptions = getShadeOptions()
	switch (colorSpace) {
		case "hsl":
			const hslColor = hsl(colorHex)
			return getShades(shadeOptions["hsl"]).map((shade) => {
				hslColor!.l = shade.l
				return { ...shade, color: Object.assign({}, hslColor) }
			})

			break

		case "hwb":
			const hwbColor = hwb(colorHex)
			return getShades(shadeOptions["hwb"], ofGray, bwOffset).map((shade) => {
				hwbColor!.w = shade.w < 0 ? 0 : shade.w > 100 ? 100 : shade.w
				hwbColor!.b = shade.b < 0 ? 0 : shade.b > 100 ? 100 : shade.b
				return { ...shade, color: Object.assign({}, hwbColor) }
			})

			break

		case "lab":
			const labColor = lab(colorHex)
			return getShades(shadeOptions["lab"]).map((shade) => {
				labColor!.l = shade.l * 100
				return { ...shade, color: Object.assign({}, labColor) }
			})

			break

		case "oklab":
			const oklabColor = oklab(colorHex)
			return getShades(shadeOptions["oklab"]).map((shade) => {
				oklabColor!.l = shade.l
				return { ...shade, color: Object.assign({}, oklabColor) }
			})

			break

		case "lch":
			const lchColor = lch(colorHex)
			return getShades(shadeOptions["lch"]).map((shade) => {
				lchColor!.l = shade.l * 100
				return { ...shade, color: Object.assign({}, lchColor) }
			})

			break

		case "oklch":
			const oklchColor = oklch(colorHex)
			return getShades(shadeOptions["oklch"]).map((shade) => {
				oklchColor!.l = shade.l
				return { ...shade, color: Object.assign({}, oklchColor) }
			})

			break
	}
}

/**
 * Get the current color based on the selected color space.
 *
 * @param {LightnessColorSpaceTypes | "hex"} cs - optional, the color space to use
 * @return {string} the current color
 */
export const getCurrentColor = (cs?: LightnessColorSpaceTypes | "hex") => {
	const input_colorPicker = document.getElementById("input_colorPicker") as HTMLInputElement

	switch (cs) {
		case "hsl":
			return hsl(input_colorPicker.value)

		case "hwb":
			return hwb(input_colorPicker.value)

		case "lab":
			return lab(input_colorPicker.value)

		case "lch":
			return lch(input_colorPicker.value)

		case "oklab":
			return oklab(input_colorPicker.value)

		case "oklch":
			return oklch(input_colorPicker.value)

		case "hex":
			input_colorPicker.value
		default:
			return input_colorPicker.value
	}
}

/**
 * A function that retrieves the current color and modifies its lightness to 0.5 before returning it as a formatted hexadecimal string.
 *
 * @return {string} The formatted hexadecimal color string.
 */
export const getCurrentColor500 = () => {
	const input_colorPicker = document.getElementById("input_colorPicker") as HTMLInputElement
	const hslColor = hsl(input_colorPicker.value)
	if (hslColor) {
		hslColor.l = 0.5
	}
	return formatHex(hslColor) as string
}

/**
 * Finds the nearest twColor in the twColors array based on the given hue value.
 *
 * @param {number} hue - The hue value to find the nearest twColor for.
 * @return {object} The nearest twColor object.
 */
export const getNearestTwHue = (hue: number) => {
	const normalizedHue = ((hue % 360) + 360) % 360
	let nearestHue = twColors[0]
	let minDiff = Math.abs(normalizedHue - nearestHue.hue)

	for (let i = 1; i < twColors.length; i++) {
		const diff = Math.abs(normalizedHue - twColors[i].hue)
		if (diff < minDiff) {
			minDiff = diff
			nearestHue = twColors[i]
		} else {
			let adjDiff
			if (normalizedHue > twColors[i].hue) {
				adjDiff = Math.abs(twColors[i].hue + 360 - normalizedHue)
			} else {
				adjDiff = Math.abs(normalizedHue + 360 - twColors[i].hue)
			}
			if (adjDiff < minDiff) {
				minDiff = adjDiff
				nearestHue = twColors[i]
			}
		}
	}

	return nearestHue
}

/**
 * Retrieves the shade options from local storage if available, otherwise returns the default shade options.
 *
 * @return {typeof defaultShadeOptions} The shade options retrieved from local storage or the default shade options.
 */
export const getShadeOptions = () => {
	if (typeof localStorage !== "undefined") {
		const lsShadeOptions = localStorage.getItem("shadeOptions")
		const shadeOptions = lsShadeOptions
			? (JSON.parse(lsShadeOptions) as typeof defaultShadeOptions)
			: defaultShadeOptions
		return shadeOptions
	} else {
		return defaultShadeOptions
	}
}

/**
 * Generate an array of shades based on the shade options provided.
 *
 * @param {ShadeOptions} shadeOptions - The options for generating shades.
 * @param {boolean} ofGray - Flag indicating if the shades are for a gray color.
 * @param {number} bwOffset - The black and white offset value for generating shades.
 * @return {Array} An array of shades based on the provided options.
 */
export const getShades = (
	shadeOptions: ShadeOptions,
	ofGray: boolean = false,
	bwOffset: number = 0
) => {
	const twShades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]
	const grayishNeutral = 0.5 - bwOffset
	return twShades.map((twShade) => {
		if (twShade < 500) {
			return {
				shade: twShade,
				l: shadeOptions.neutral + shadeOptions.light.step * ((500 - twShade) / 100),
				w: ofGray
					? grayishNeutral + (shadeOptions.light.step / 2) * ((500 - twShade) / 100)
					: shadeOptions.neutral + shadeOptions.light.step * ((500 - twShade) / 100),
				b: ofGray ? grayishNeutral - (shadeOptions.light.step / 2) * ((500 - twShade) / 100) : 0
			}
		} else if (twShade === 500) {
			return {
				shade: twShade,
				l: shadeOptions.neutral,
				w: ofGray ? grayishNeutral : 0,
				b: ofGray ? grayishNeutral : 0
			}
		} else {
			return {
				shade: twShade,
				l: shadeOptions.neutral - shadeOptions.dark.step * ((twShade - 500) / 100),
				w: ofGray ? grayishNeutral - (shadeOptions.dark.step / 2) * ((twShade - 500) / 100) : 0,
				b: ofGray
					? grayishNeutral + (shadeOptions.dark.step / 2) * ((twShade - 500) / 100)
					: shadeOptions.neutral + shadeOptions.dark.step * ((twShade - 500) / 100)
			}
		}
	})
}

/**
 * Updates color mix options for a given color space type.
 *
 * @param {ColorSpaceTypes} cs - the color space type
 * @param {HTMLInputElement} inputLight - the input element for light shades
 * @param {HTMLInputElement} inputDark - the input element for dark shades
 */
export const updateColorMixOptions = (
	cs: ColorSpaceTypes,
	inputLight: HTMLInputElement,
	inputDark: HTMLInputElement
) => {
	const cmo = getColorMixOptions()
	inputLight.title = "Whiten each shade incrementally from 500 to 50"
	inputLight.min = cmo[cs].light.min.toString()
	inputLight.max = cmo[cs].light.max.toString()
	inputLight.value = cmo[cs].light.step.toString()
	inputDark.title = "Blacken each shade incrementally from 500 to 950"
	inputDark.min = cmo[cs].dark.min.toString()
	inputDark.max = cmo[cs].dark.max.toString()
	inputDark.value = cmo[cs].dark.step.toString()
}

/**
 * Updates all the color-mix() shades based on the provided color, color space, and optional hue interpolation method.
 *
 * @param {string} color - The base color to mix with shades.
 * @param {HTMLUListElement} ul - The \<ul\> element to update with \<li\> elements representing the color shades from 50 - 950
 * @param {ColorSpaceTypes} selectedCS - The selected color space type.
 * @param {HueInterpolationMethodTypes} [selectedHim] - Optional: The selected hue interpolation method type.
 */
export const updateMixes = (
	color: string,
	ul: HTMLUListElement,
	selectedCS: ColorSpaceTypes,
	selectedHim?: HueInterpolationMethodTypes
) => {
	getShades(getColorMixOptions()[selectedCS]).map((colorShade, i) => {
		const li = ul.children[i] as HTMLLIElement
		if (selectedHim) {
			li.style.setProperty(
				"background-color",
				`color-mix(in ${selectedCS} ${selectedHim} hue, ${color}, ${colorShade.shade <= 500 ? "white" : "black"} ${colorShade.shade <= 500 ? colorShade.w * 100 : colorShade.b * 100}%)`
			)
			li.title = `color-mix(in ${selectedCS} ${selectedHim} hue, ${color}, ${colorShade.shade <= 500 ? "white" : "black"} ${colorShade.shade <= 500 ? round0(colorShade.w * 100) : round0(colorShade.b * 100)}%)`
		} else {
			li.style.setProperty(
				"background-color",
				`color-mix(in ${selectedCS}, ${color}, ${colorShade.shade <= 500 ? "white" : "black"} ${colorShade.shade <= 500 ? colorShade.w * 100 : colorShade.b * 100}%)`
			)
			li.title = `color-mix(in ${selectedCS}, ${color}, ${colorShade.shade <= 500 ? "white" : "black"} ${colorShade.shade <= 500 ? round0(colorShade.w * 100) : round0(colorShade.b * 100)}%)`
		}
		updateTextColor(li)
	})
}

/**
 * Updates the shade options for the given color space.
 *
 * @param {LightnessColorSpaceTypes} cs - the lightness color space type
 * @param {HTMLInputElement} inputLight - the input element for light shades
 * @param {HTMLInputElement} inputDark - the input element for dark shades
 */
export const updateShadeOptions = (
	cs: LightnessColorSpaceTypes,
	inputLight: HTMLInputElement,
	inputDark: HTMLInputElement
) => {
	const so = getShadeOptions()
	inputLight.title = `${cs === "hwb" ? "Whiten" : "Lighten"} each shade incrementally from 500 to 50`
	inputLight.min = so[cs].light.min.toString()
	inputLight.max = so[cs].light.max.toString()
	inputLight.value = so[cs].light.step.toString()

	inputDark.title = `${cs === "hwb" ? "Blacken" : "Darken"} each shade incrementally from 500 to 950`
	inputDark.min = so[cs].dark.min.toString()
	inputDark.max = so[cs].dark.max.toString()
	inputDark.value = so[cs].dark.step.toString()
}

/**
 * Updates the shades of a given color in a \<ul\> based on the selected color space.
 *
 * @param {string} color - The base color to generate shades from
 * @param {HTMLUListElement} ul - The \<ul\> element to update with \<li\> elements representing the color shades from 50 - 950
 * @param {LightnessColorSpaceTypes} selectedCS - The selected color space for generating shades
 */
export const updateShades = (
	color: string,
	ul: HTMLUListElement,
	selectedCS: LightnessColorSpaceTypes
) => {
	getColorShades(color, selectedCS).map((colorShade, i) => {
		const li = ul.children[i] as HTMLLIElement
		li.title = formatColor(colorShade.color!)
		li.style.setProperty("background-color", formatCss(colorShade.color!))
		updateTextColor(li)
	})
}

/**
 * Updates the text color of an HTML list item element based on the contrast ratio between the background color and white or black.
 *
 * @param {HTMLLIElement} li - The HTML list item element to update the text color of.
 */
export const updateTextColor = (li: HTMLLIElement) => {
	const bgColor = window.getComputedStyle(li).getPropertyValue("background-color")
	const contrastRatioWhite = wcagContrast(bgColor, "white")
	const contrastRatioBlack = wcagContrast(bgColor, "black")
	if (contrastRatioBlack > contrastRatioWhite) {
		li.classList.remove("text-white")
		li.classList.add("text-black")
	} else {
		li.classList.remove("text-black")
		li.classList.add("text-white")
	}
}

/**
 * Updates the colors in the "select_tw_1" select element and the corresponding list items in the "ul_tw_1" unordered list.
 *
 * @return {void} This function does not return anything.
 */
export const updateTwColors = () => {
	const select_tw_colors = document.getElementById("select_tw_1") as HTMLSelectElement
	const previousColor = select_tw_colors.dataset.color
	const ul_tw_colors = document.getElementById("ul_tw_1") as HTMLUListElement
	colorShades.map((colorShade, i) => {
		const li = ul_tw_colors.children[i] as HTMLLIElement
		li.classList.remove(`bg-${previousColor}-${colorShade}`)
		li.classList.add(
			`bg-${select_tw_colors.options[select_tw_colors.selectedIndex].value}-${colorShade}`
		)
		updateTextColor(li)
	})
	select_tw_colors.dataset.color = select_tw_colors.options[select_tw_colors.selectedIndex].value
}
