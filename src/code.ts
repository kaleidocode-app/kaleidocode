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

		if (msg.themes[0] === "all") {
			themes.push(themeDark, themeLight, themeAyuLight, themeNord)
		} else {
			delete themes[0] // remove all item
			let cThemes = msg.themes
			cThemes.forEach((c: any) => {
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

		let nodes = figma.currentPage.findAll(node => node.name.startsWith(themeIndicator))
		figma.viewport.scrollAndZoomIntoView(nodes);
		figma.closePlugin()
		return
	}

	if (msg.type === 'load-themes') {
		figma.currentPage.children.forEach(c => {
			if (c.name.startsWith(themeIndicator) && c.name.charAt(2) != "-") {
				let themeName = c.name.substr(2)
				styleThemes.push(themeName)
			}
		})

		// send event to HTML page
		figma.ui.postMessage({ type: 'loadThemes', themeNames: [styleThemes] });
	}

	if (msg.type === 'swap-theme') {

		// stop if there is no slection
		if (figma.currentPage.selection.length <= 0) {
			figma.ui.postMessage({ type: 'relinkStyles', selectionEmpty: true });
			return
		}

		// add current selection to relink que
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

		// save current theme info
		const theme = msg.newThemeName
		let themeId = ''
		let themeRef = []

		for (let parent of figma.currentPage.children) {
			let parentName = parent.name.slice(2)

			if (parentName === theme) {
				themeId = parent.id
			}

		}

		// if nodes have a style name in the layer, add to theme reference
		let parent = (figma.getNodeById(themeId) as FrameNode)
		let children = (parent.children[0] as FrameNode).findAll()
		children.forEach(c => {
			if ((c.name.startsWith(styleIndicator) && c.type === "FRAME")) {
				(c as FrameNode).findAll().forEach(c => {
					if (c.name.startsWith(theme)) {
						let cName = c.name
						let cStyle = (c as RectangleNode).fillStyleId
						themeRef[cName] = cStyle;
					}
				})
			}
		})

		// iterate through each item to be linked and match them with theme reference items
		objectsToRelink.forEach(node => {
			const unlinkedColorName = theme + ' / ' + node.name.slice(3)

			// if objects to be relinked exist in theme reference
			if (unlinkedColorName in themeRef) {

				if (node.type === "RECTANGLE") {
					let nodeToSwap = (node as RectangleNode)
					nodeToSwap.fillStyleId = themeRef[unlinkedColorName]
				} else if (node.type === "FRAME") {
					let nodeToSwap = (node as FrameNode)
					let childItems = nodeToSwap.children
					childItems.forEach(c => {
						if (c.type === "VECTOR") {
							let nodeToSwap = (c as VectorNode)
							nodeToSwap.fillStyleId = themeRef[unlinkedColorName]
						} else if (c.type === "BOOLEAN_OPERATION") {
							let nodeToSwap = (c as BooleanOperationNode)
							nodeToSwap.fillStyleId = themeRef[unlinkedColorName]
						} else if (c.type === "GROUP") {
							let nodeToSwap = (c as FrameNode)
							nodeToSwap.children.forEach(c => {
								if (c.type === "VECTOR") {
									let nodeToSwap = (c as VectorNode)
									nodeToSwap.fillStyleId = themeRef[unlinkedColorName]
								} else if (c.type === "BOOLEAN_OPERATION") {
									let nodeToSwap = (c as BooleanOperationNode)
									nodeToSwap.fillStyleId = themeRef[unlinkedColorName]
								} else if (c.type === "RECTANGLE") {
									let nodeToSwap = (c as RectangleNode)
									nodeToSwap.fillStyleId = themeRef[unlinkedColorName]
								}
							})

						}
					})
				} else if (node.type === "VECTOR") {
					let nodeToSwap = (node as VectorNode)
					nodeToSwap.fillStyleId = themeRef[unlinkedColorName]
				} else if (node.type === "BOOLEAN_OPERATION") {
					let nodeToSwap = (node as BooleanOperationNode)
					nodeToSwap.fillStyleId = themeRef[unlinkedColorName]
				} else if (node.type === "TEXT") {
					let nodeToSwap = (node as TextNode)
					nodeToSwap.fillStyleId = themeRef[unlinkedColorName]
				} else if (node.type === "ELLIPSE") {
					let nodeToSwap = (node as EllipseNode)
					nodeToSwap.fillStyleId = themeRef[unlinkedColorName]
				} else {
					console.log(node.type)
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