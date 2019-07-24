import { createColorGuide, createStyle } from "./color-guide";

figma.showUI(__html__, { width: 300, height: 200 })

const SQUARE_SPACING = 150
const VERTICAL_THEME_SPACING = 200

const themes = [
	// require('../themes/dark.json5'),
	// require('../themes/light.json5'),
	// require('../themes/nord.json5'),
	// require('../themes/material-palenight.json5')
	// require('../themes/material-light.json5'),
	// require('../themes/material-ocean.json5'),
	// require('../themes/material.json5'),
	// require('../themes/monokai.json5'),
	// require('../themes/solarized-dark.json5'),
	// require('../themes/solarized-light.json5')
]

const themeDark = require('../themes/dark.json5')
const themeLight = require('../themes/light.json5')
const themeAyuLight = require('../themes/ayu-light.json5')
const themeDracula = require('../themes/dracula.json5')
const themeNord = require('../themes/nord.json5')

figma.ui.onmessage = async msg => {
	const fonts = [
		{ family: 'Roboto', style: 'Regular' },
		{ family: 'Roboto', style: 'Medium' },
		{ family: 'Roboto Mono', style: 'Regular' },
		{ family: 'Roboto Mono', style: 'Bold' }
	]

	for (let f of fonts) {
		await figma.loadFontAsync(f)
	}

	if (msg.type === 'create-styles') {

		if(msg.createTheme === "all") {
			themes.push(themeDark, themeLight, themeAyuLight, themeDracula, themeNord)
		} else if (msg.createTheme === "dark-plus") {
			themes.push(themeDark)
		} else if (msg.createTheme === "light-plus") {
			themes.push(themeLight)
		} else if (msg.createTheme === "ayu-light") {
			themes.push(themeAyuLight)
		} else if (msg.createTheme === "dracula") {
			themes.push(themeDracula)
		} else if (msg.createTheme === "nord") {
			themes.push(themeNord)
		}

		themes.reverse().forEach((theme, themeI) => {
			const themeColors = theme.colors
			const colorThemeName = theme.name.toLowerCase()

			// sort object
			let sortedObject = Object.keys(themeColors).sort()

			// map sorted array to object
			let sortedColors = sortedObject.map(k => {
				return [k, themeColors[k]]
			})

			createColorGuide(colorThemeName, sortedColors, themeI)
		})

		figma.closePlugin()
		return
	}

	if (msg.type === 'switch-styles') {

		if (figma.currentPage.selection.length <= 0) {
			return
		}

		const themeNodes = figma.currentPage.findAll(node => {
			return node.name.startsWith('--') && node.type === 'FRAME'
		}) as FrameNode[]

		console.log(themeNodes)
		const themes = {}

		themeNodes.forEach(t => {
			const themeColorName = t.parent.parent.name
			const fullColorName = themeColorName + ' / ' + t.name.slice(2)
			if (!themes[themeColorName]) {
				themes[themeColorName] = {}
			}

			if (!themes[themeColorName][fullColorName]) {
				themes[themeColorName][fullColorName] = {}
			}

			themes[themeColorName][fullColorName] = (t.children[0] as RectangleNode).fillStyleId
		})

		console.log(themes)

		const selection = figma.currentPage.selection[0]
		if (selection.type !== 'GROUP' && selection.type !== 'FRAME') {
			return
		}

		const objectsToUpdate = []

		function addToUpdateQueue(node: FrameNode) {
			if (node.children) {
				node.children.forEach(c => {
					addToUpdateQueue(c as any)
					objectsToUpdate.push(c)
				})
			}
		}
		addToUpdateQueue(selection)

		objectsToUpdate.forEach((c: RectangleNode) => {
			const cStyle = figma.getStyleById(String(c.fillStyleId))

			if (cStyle) {
				const [themeName, colorName] = cStyle.name.split(' / ')
				const newColorName = [msg.newThemeName, colorName].join(' / ')
				const newStyleId = themes[msg.newThemeName][newColorName]

				if (newStyleId) {
					c.fillStyleId = newStyleId
				}
			}
		})

		return
	}

	if (msg.type === 'create-rectangles') {
		if (figma.currentPage.selection.length <= 0) {
			return
		}

		const themeNodes = figma.currentPage.findAll(node => {
			return node.name.startsWith('--') && node.type === 'GROUP'
		}) as FrameNode[]

		const themes = {}

		themeNodes.forEach(t => {
			themes[t.name.slice(2)] = {}
			t.children.forEach((tc: RectangleNode) => {
				themes[t.name.slice(2)][tc.name] = String(tc.fillStyleId)
			})
		})

		console.log(themes)

		const selection = figma.currentPage.selection[0]
		if (selection.type !== 'GROUP') {
			return
		}
		const objectsToUpdate = selection.children
		objectsToUpdate.forEach((c: RectangleNode) => {
			const cStyle = figma.getStyleById(String(c.fillStyleId))

			const newStyleId = cStyle.name.startsWith('dark')
				? themes['light'][cStyle.name.replace('dark', 'light')]
				: themes['dark'][cStyle.name.replace('light', 'dark')]

			c.fillStyleId = newStyleId
		})
	}

	if (msg.type === 'create-custom') {
		const newTheme = JSON.parse(msg.newThemeCode)
		themes.push(newTheme)
		themes.reverse().forEach((theme, themeI) => {
			const themeColors = theme.colors
			console.log(themeColors)
			const colorTheme = theme.name.toLowerCase()

			// sort object
			let sortedObject = Object.keys(themeColors).sort()

			// map sorted array to object
			let sortedColors = sortedObject.map(k => {
				return [k, themeColors[k]]
			})

			// iterate on each color
			const rects = []
			sortedColors.forEach(([colorName, colorValue], i) => {
				if (!colorValue || colorValue === '') {
					colorValue = '#ffffff'
				}
				const rect = createRect(
					colorTheme,
					colorName,
					i * SQUARE_SPACING,
					themeI * VERTICAL_THEME_SPACING
				)
				rect.fillStyleId = createStyle(colorTheme, colorName, colorValue)
				rects.push(rect)
			})

			const group = figma.group(rects, figma.currentPage)
			group.name = `--${colorTheme}`
		})

		figma.closePlugin()
		return
	}

	// Make sure to close the plugin when you're done. Otherwise the plugin will
	// keep running, which shows the cancel button at the bottom of the screen.
	// figma.closePlugin()
}

function createRect(colorTheme: string, colorName: string, xOffset: number, yOffset: number) {
	const layerName = colorTheme + ' / ' + colorName

	const rect = figma.createRectangle()
	rect.x = xOffset
	rect.y = yOffset
	rect.name = layerName
	figma.currentPage.appendChild(rect)

	return rect
}

