import { createColorGuide, createStyle } from "./color-guide";

figma.showUI(__html__, { width: 260, height: 200 })

const SQUARE_SPACING = 150
const VERTICAL_THEME_SPACING = 200
const themeIndicator = '--'
const styleIndicator = '---'

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

let styleThemes = []

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

		if (msg.createTheme === "all") {
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

		themes.reverse()

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

	if(msg.type === 'load-themes'){
		figma.currentPage.children.forEach(c => {
			if (c.name.startsWith('--') && c.name.charAt(2) != "-") {
				let themeName = c.name.substr(2)
				styleThemes.push(themeName)
			}
		})

		// send event to HTML page
		figma.ui.postMessage({ type: 'loadThemes', themeNames: [styleThemes] });
	}

	if (msg.type === 'switch-styles') {

		if (figma.currentPage.selection.length <= 0) {
			figma.ui.postMessage({ type: 'switchStyles', selectionEmpty: true });
			return
		}


		const themeNodes = figma.currentPage.findAll(node => {
			return node.name.startsWith(styleIndicator) && node.type === 'FRAME'
		}) as FrameNode[]

		const themes = {}

		themeNodes.forEach(t => {
			let themeColorName = t.parent.parent.name
			if(themeColorName.startsWith(themeIndicator)){
				themeColorName = themeColorName.substr(2)
			}
			const fullColorName = themeColorName + ' / ' + t.name.slice(3)

			if (!themes[themeColorName]) {
				
				themes[themeColorName] = {}
			}
			

			if (!themes[themeColorName][fullColorName]) {
				themes[themeColorName][fullColorName] = {}
			}
			themes[themeColorName][fullColorName] = (t.children[0] as RectangleNode).fillStyleId
		})


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

	if (msg.type === 'relink-styles') {

		if (figma.currentPage.selection.length <= 0) {
			figma.ui.postMessage({ type: 'relinkStyles', selectionEmpty: true });
			return
		}

		const objectsToRelink = []
		function addToRelinkQueue(node: FrameNode) {
			if (node.children) {
				node.children.forEach(c => {
					addToRelinkQueue(c as any)
					if (c.name.startsWith(styleIndicator)) {
						objectsToRelink.push(c)
					}
				})
			}
		}
		addToRelinkQueue(figma.currentPage.selection[0] as FrameNode)

		objectsToRelink.forEach(node => {
			if (node.name.startsWith(styleIndicator)) {
				const fullColorName = node.name.slice(3)
				const matchNodes = figma.currentPage.findAll(n => n.name === styleIndicator + fullColorName && n.parent.parent.name === themeIndicator + msg.newThemeName)
				const styleId = ((matchNodes[0] as FrameNode).children[0] as RectangleNode).fillStyleId;
				if ('fillStyleId' in node) {
					node.fillStyleId = styleId
				}
			}
		})

		figma.ui.postMessage({ type: 'relinkStyles', complete: true });
		return
	}

	if (msg.type === 'create-custom') {
		const newTheme = JSON.parse(msg.newThemeCode)
		themes.push(newTheme)
		themes.reverse().forEach((theme, themeI) => {
			const themeColors = theme.colors
			const colorTheme = theme.name.replace(/\s+/g, '-').toLowerCase()

			// sort object
			let sortedObject = Object.keys(themeColors).sort()

			// map sorted array to object
			let sortedColors = sortedObject.map(k => {
				return [k, themeColors[k]]
			})

			createColorGuide(colorTheme, sortedColors, themeI)

		})

		figma.closePlugin()
		return
	}

	// if (msg.type === 'update-size') {
	// 	switch (msg.page) {
	// 		case "create": {
	// 			console.log("update custom");
	// 			figma.ui.resize(260, 230)
	// 			break;
	// 		}
	// 		case "theme": {
	// 			console.log("Update theme");
	// 			figma.ui.resize(260, 230)
	// 			break;
	// 		}
	// 		case "generate": {
	// 			console.log("Update create");
	// 			figma.ui.resize(260, 230)
	// 			break;
	// 		}
	// 	}
	// }
}