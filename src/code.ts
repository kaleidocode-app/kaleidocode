import { createColorGuide } from "./color-guide";

figma.showUI(__html__, { width: 260, height: 200 })

const themeIndicator = '--'
const styleIndicator = '---'

const themes = []

const themeDark = require('../themes/dark.json5')
const themeLight = require('../themes/light.json5')
const themeAyuLight = require('../themes/ayu-light.json5')
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

		if(msg.themes[0] === "all"){
			themes.push(themeDark, themeLight, themeAyuLight, themeNord)
		} else {
			delete themes[0] // remove all item
			let cThemes = msg.themes
			cThemes.forEach((c:any) => {
				if (c === "dark-plus") {
					themes.push(themeDark)	
				}
				if (c === "light-plus") {
					themes.push(themeLight)	
				}
				if (c === "ayu-light") {
					themes.push(themeAyuLight)	
				}
				if (c === "nord") {
					themes.push(themeNord)	
				}
			})
		}
		

		themes.reverse()

		themes.reverse().forEach((theme, themeI) => {
			const themeColors = theme.colors
			// console.log(themeColors)
			console.log(theme)
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

	if (msg.type === 'swap-theme') {

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

}