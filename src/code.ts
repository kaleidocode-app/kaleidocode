figma.showUI(__html__)

const SQUARE_SPACING = 150
const VERTICAL_THEME_SPACING = 200

const themes = [
	require('../themes/dark.json5'),
	require('../themes/light.json5'),
	require('../themes/nord.json5'),
	require('../themes/material-palenight.json5')

	// require('../themes/material-light.json5'),
	// require('../themes/material-ocean.json5'),
	// require('../themes/material.json5'),
	// require('../themes/monokai.json5'),
	// require('../themes/solarized-dark.json5'),
	// require('../themes/solarized-light.json5')
]

figma.ui.onmessage = msg => {
	console.log('start')

	if (msg.type === 'create-styles') {
		themes.reverse().forEach((theme, themeI) => {
			const themeColors = theme.colors
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

	if (msg.type === 'switch-styles') {
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

		figma.closePlugin()
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

	// Make sure to close the plugin when you're done. Otherwise the plugin will
	// keep running, which shows the cancel button at the bottom of the screen.
	figma.closePlugin()
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

function createStyle(
	colorTheme: string,
	colorName: string,
	colorValue: string
) {
	// convert color from hex => rgb
	const color = convertHexToRGBA(colorValue)
	// create new style
	const style = figma.createPaintStyle()
	style.name = colorTheme + ' / ' + colorName

	const solidPaint: SolidPaint = {
		type: 'SOLID',
		color: {
			r: color[0] / 255,
			g: color[1] / 255,
			b: color[2] / 255
		},
		opacity: color[3] ? color[3] / 255 : 1
	}
	style.paints = [solidPaint]

	return style.id
}

function convertHexToRGBA(hex: any) {
	'use strict'
	if (hex.charAt(0) === '#') {
		hex = hex.substr(1)
	}
	if (hex.length < 2 || hex.length > 8) {
		return false
	}
	var values = hex.split(''),
		r: any,
		g: any,
		b: any,
		a: any

	if (hex.length === 2) {
		r = parseInt(values[0].toString() + values[1].toString(), 16)
		g = r
		b = r
	} else if (hex.length === 3) {
		r = parseInt(values[0].toString() + values[0].toString(), 16)
		g = parseInt(values[1].toString() + values[1].toString(), 16)
		b = parseInt(values[2].toString() + values[2].toString(), 16)
	} else if (hex.length === 6) {
		r = parseInt(values[0].toString() + values[1].toString(), 16)
		g = parseInt(values[2].toString() + values[3].toString(), 16)
		b = parseInt(values[4].toString() + values[5].toString(), 16)
	} else if (hex.length === 8) {
		r = parseInt(values[0].toString() + values[1].toString(), 16)
		g = parseInt(values[2].toString() + values[3].toString(), 16)
		b = parseInt(values[4].toString() + values[5].toString(), 16)
		a = parseInt(values[6].toString() + values[7].toString(), 16)
	} else {
		return false
	}
	return [r, g, b, a]
}
