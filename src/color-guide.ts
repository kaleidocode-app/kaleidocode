const COMPONENT_WRAP_COUNT = 8

const colorGuideSpacing = 540
const rectHeight = 303
const hexFrameHeight = 46
const colorFrameWidth = 328
const labelFrameHeight = 71
const colorFrameHeight = rectHeight + hexFrameHeight + labelFrameHeight
const gap = 20
const borderSize = 192
const themeIndicator = '--'
const styleIndicator = '---'

export function createColorGuide(colorThemeName: string, sortedColors, n: number) {
	const guideFrameHeight =
		Math.ceil(sortedColors.length / COMPONENT_WRAP_COUNT) * (colorFrameHeight + gap) - gap
	const guideFrameWidth = (colorFrameWidth + gap) * COMPONENT_WRAP_COUNT - gap

	let xOffset = n * guideFrameWidth + (n - 1) * colorGuideSpacing

	const colorStyle = figma.currentPage.children
	const colorStyleCounter = colorStyle.length
	let colorStylePosition = 0

	figma.currentPage.children.forEach((c, index) => {
		if (c.name.startsWith('--') && index === (colorStyleCounter - 1)) {
			colorStylePosition = (c as FrameNode).x
			xOffset = (xOffset + guideFrameWidth + colorStylePosition + colorGuideSpacing) + colorGuideSpacing
			console.log(colorStylePosition)
			console.log(guideFrameWidth)
			console.log(gap)
		}
	})

	const borderFrame = createBorderFrame(
		colorThemeName,
		guideFrameWidth,
		guideFrameHeight,
		borderSize,
		xOffset
	)
	const innerGuideFrame = createInnerGuideFrame(
		borderFrame,
		borderSize,
		guideFrameWidth,
		guideFrameHeight
	)
	
	

	let colorFrameX = 0
	let colorFrameY = 0
	let groupCount = 0

	const sortedColorsWithLeadingBlocks = []
	let prevGroupName
	sortedColors.forEach(sc => {
		const groupName = getColorNames(colorThemeName + ' /  ' + sc[0]).groupName
		if (groupName !== prevGroupName) {
			sortedColorsWithLeadingBlocks.push(groupName)
		}
		sortedColorsWithLeadingBlocks.push(sc)
		prevGroupName = groupName
	})

	sortedColorsWithLeadingBlocks.forEach((item, colorI) => {
		if (typeof item === 'string') {
      if (colorI !== 0) {
        colorFrameY += colorFrameHeight + gap * 10
		colorFrameX = 0
      }

      createGroupLeadingBlock(item, colorFrameWidth, colorFrameHeight, innerGuideFrame, 0, colorFrameY)
      colorFrameX += colorFrameWidth + gap
      groupCount = 1
		} else {
			const [fullColorName, colorValue] = item

			groupCount++
			//checking to see if we will need to change the group name. If we do and it isn't the first layer, then we add to the Y position, change the X position back to 0, and set layerCount to 0
			if ((groupCount - 1) % COMPONENT_WRAP_COUNT == 0) {
				colorFrameY += colorFrameHeight + gap
				colorFrameX = 0
			}

			const { groupName, colorName } = getColorNames(colorThemeName + ' / ' + fullColorName)

			const colorFrame = createColorFrame(
				styleIndicator + fullColorName,
				innerGuideFrame,
				colorFrameWidth,
				colorFrameHeight,
				colorFrameX,
				colorFrameY
			)

			const fillStyleId = createStyle(colorThemeName, fullColorName, colorValue)
			const solidColorRect = createSolidColorRect(
				colorFrame,
				fillStyleId,
				colorFrameWidth,
				rectHeight
			)

			const hexCodeFrame = createHEXCodeFrame(colorFrame, solidColorRect, hexFrameHeight)
			const hex = createHEXLabel(solidColorRect, hexCodeFrame)

			//label frame
			const labelFrame = createLabelFrame(
				colorFrame,
				solidColorRect,
				hexCodeFrame,
				labelFrameHeight
			)

			// The label
			const label = createLabel(labelFrame, fullColorName)

			//updating the x and y positions for next colorFrame
			colorFrameX += colorFrameWidth + gap
		}
	})

	borderFrame.resizeWithoutConstraints(
		guideFrameWidth + borderSize,
		colorFrameY + colorFrameHeight + borderSize
	)
	innerGuideFrame.resizeWithoutConstraints(guideFrameWidth, colorFrameY + colorFrameHeight)
}

// const foo = async msg => {
// 	const fonts = [
// 		{ family: 'Roboto', style: 'Regular' },
// 		{ family: 'Roboto', style: 'Medium' },
// 		{ family: 'Roboto Mono', style: 'Regular' },
// 		{ family: 'Roboto Mono', style: 'Bold' }
// 	]

// 	for (let f of fonts) {
// 		await figma.loadFontAsync(f)
// 	}

// 	if (msg.type === 'create') {
// 		const nodes = []
// 		function addToNodes(n: FrameNode | BaseNode) {
// 			if ('children' in n) {
// 				n.children.forEach(c => {
// 					nodes.push(c)
// 					addToNodes(c)
// 				})
// 			}
// 		}
// 		figma.currentPage.selection.forEach(s => {
// 			addToNodes(s)
// 		})

// 		const COMPONENT_WRAP_COUNT = 8

// 		let colorFrameX = 0
// 		let colorFrameY = 0
// 		let groupName

// 		// Create overall frame
// 		const borderFrame = createBorderFrame(guideFrameWidth, guideFrameHeight, borderSize)
// 		const innerGuideFrame = createInnerGuideFrame(
// 			borderFrame,
// 			borderSize,
// 			guideFrameWidth,
// 			guideFrameHeight
// 		)

// 		const allNodes = []
// 		let prevGroupName
// 		nodes.forEach(n => {
// 			const groupName = getColorNames(n.name).groupName
// 			if (groupName !== prevGroupName) {
// 				allNodes.push({
// 					type: 'LEAD_BLOCK',
// 					groupName
// 				})
// 			}
// 			allNodes.push(n)
// 			prevGroupName = groupName
// 		})

// 		console.log(allNodes)

// 		let groupCount = 0
// 		// iterate through each selection
// 		allNodes.forEach((node: BaseNode, nodeI) => {
// 			if ((node.type as any) === 'LEAD_BLOCK') {
// 				if (nodeI !== 0) {
// 					colorFrameY += colorFrameHeight + gap * 10
// 					colorFrameX = 0
// 				}

// 				createGroupLeadingBlock(
// 					(node as any).groupName,
// 					colorFrameWidth,
// 					colorFrameHeight,
// 					innerGuideFrame,
// 					0,
// 					colorFrameY
// 				)
// 				colorFrameX += colorFrameWidth + gap
// 				groupCount = 1
// 				console.log(nodeI, groupCount)
// 			} else if (node.type == 'RECTANGLE') {
// 				groupCount++
// 				//checking to see if we will need to change the group name. If we do and it isn't the first layer, then we add to the Y position, change the X position back to 0, and set layerCount to 0
// 				if ((groupCount - 1) % COMPONENT_WRAP_COUNT == 0) {
// 					console.log(nodeI, groupCount)
// 					colorFrameY += colorFrameHeight + gap
// 					colorFrameX = 0
// 				}
// 				groupName = getColorNames(node.name).groupName

// 				//create a frame for the color token
// 				const colorFrame = createColorFrame(
// 					node.name,
// 					innerGuideFrame,
// 					colorFrameWidth,
// 					colorFrameHeight,
// 					colorFrameX,
// 					colorFrameY
// 				)

// 				const solidColorRect = createSolidColorRect(
// 					colorFrame,
// 					String(node.fillStyleId),
// 					colorFrameWidth,
// 					rectHeight
// 				)
// 				const hexCodeFrame = createHEXCodeFrame(colorFrame, solidColorRect, hexFrameHeight)
// 				const hex = createHEXLabel(solidColorRect, hexCodeFrame)

// 				//label frame
// 				const labelFrame = createLabelFrame(
// 					colorFrame,
// 					solidColorRect,
// 					hexCodeFrame,
// 					labelFrameHeight
// 				)

// 				// The label
// 				const label = createLabel(labelFrame, getColorNames(node.name).fullColorName)

// 				//updating the x and y positions for next colorFrame
// 				colorFrameX += colorFrameWidth + gap
// 			}
// 		})

// 		borderFrame.resizeWithoutConstraints(
// 			guideFrameWidth + borderSize,
// 			colorFrameY + colorFrameHeight + borderSize
// 		)
// 		innerGuideFrame.resizeWithoutConstraints(guideFrameWidth, colorFrameY + colorFrameHeight)
// 		// close plugin
// 		figma.closePlugin()
// 	}
// }

//create border frame
function createBorderFrame(name, guideFrameWidth, guideFrameHeight, borderSize, x) {
	var borderFrame = figma.createFrame()
	borderFrame.name = themeIndicator + name
	borderFrame.resizeWithoutConstraints(guideFrameWidth + borderSize, guideFrameHeight + borderSize)
	borderFrame.backgrounds = [
		{
			blendMode: 'NORMAL',
			color: {
				r: 0.8549019608,
				g: 0.8549019608,
				b: 0.8549019608
			},
			opacity: 1,
			type: 'SOLID',
			visible: true
		}
	]
	borderFrame.x = x
	return borderFrame
}

//create guideFrame
function createInnerGuideFrame(borderFrame, borderSize, guideFrameWidth, guideFrameHeight) {
	var guideFrame = figma.createFrame()
	borderFrame.appendChild(guideFrame)
	guideFrame.x = borderSize / 2
	guideFrame.y = borderSize / 2
	guideFrame.resizeWithoutConstraints(guideFrameWidth, guideFrameHeight)
	// 0.8549019608
	guideFrame.backgrounds = [
		{
			blendMode: 'PASS_THROUGH',
			color: {
				r: 0.8549019608,
				g: 0.8549019608,
				b: 0.8549019608
			},
			opacity: 1,
			type: 'SOLID',
			visible: false
		}
	]
	return guideFrame
}

//create colorFrame
function createColorFrame(
	name,
	guideFrame,
	colorFrameWidth,
	colorFrameHeight,
	colorFrameX,
	colorFrameY
) {
	var colorFrame = figma.createFrame()
	colorFrame.name = name
	guideFrame.appendChild(colorFrame)
	colorFrame.resizeWithoutConstraints(colorFrameWidth, colorFrameHeight)
	colorFrame.x = colorFrameX
	colorFrame.y = colorFrameY
	return colorFrame
}

function createSolidColorRect(colorFrame, newStyleId: string, colorFrameWidth, rectHeight) {
	var rect = figma.createRectangle()
	colorFrame.appendChild(rect)
	rect.name = figma.getStyleById(newStyleId).name.toString()
	rect.x = 0
	rect.fillStyleId = newStyleId
	rect.resizeWithoutConstraints(colorFrameWidth, rectHeight)
	rect.constraints = { horizontal: 'STRETCH', vertical: 'STRETCH' }
	//checking to see if the rect has a white fill and adding a border id it does
	if (rect.fills[0].color.r == 1 && rect.fills[0].color.g == 1 && rect.fills[0].color.b == 1) {
		rect.strokes = [
			{
				color: {
					r: 0.8549019608,
					g: 0.8549019608,
					b: 0.8549019608
				},
				type: 'SOLID'
			}
		]
		rect.strokeWeight = 0.5
		rect.strokeAlign = 'INSIDE'
	}
	return rect
}

function createHEXCodeFrame(colorFrame, rect, hexFrameHeight) {
	var hexFrame = figma.createFrame()
	colorFrame.appendChild(hexFrame)
	hexFrame.name = 'HEX code'
	hexFrame.x = 0
	hexFrame.y = rect.height + 1
	hexFrame.resizeWithoutConstraints(colorFrame.width, hexFrameHeight)

	return hexFrame
}

function createHEXLabel(rect, hexFrame) {
	var hex = findTheHEX(rect.fills[0].color.r, rect.fills[0].color.g, rect.fills[0].color.b)
	hex = hex.toUpperCase()
	const hexCode = figma.createText()
	hexFrame.appendChild(hexCode)
	hexCode.fontSize = 16
	hexCode.textAlignHorizontal = 'RIGHT'
	hexCode.x = hexFrame.width - 12
	hexCode.y = 15
	hexCode.characters = '#' + hex

	return hex
}

// creates the full hex code
function findTheHEX(red, green, blue) {
	var redHEX = rgbToHex(red)
	var greenHEX = rgbToHex(green)
	var blueHEX = rgbToHex(blue)

	return redHEX + greenHEX + blueHEX
}

//finds the HEX value for red, green, or blue
var rgbToHex = function(rgb) {
	rgb = Math.floor(rgb * 255)
	var hex = Number(rgb).toString(16)
	if (hex.length < 2) {
		hex = '0' + hex
	}
	return hex
}

//create labelFrame
function createLabelFrame(colorFrame, rect, hexFrame, labelFrameHeight) {
	var labelFrame = figma.createFrame()
	colorFrame.appendChild(labelFrame)
	labelFrame.name = 'Color Name'
	labelFrame.x = 0
	labelFrame.y = rect.height + hexFrame.height + 1
	labelFrame.resizeWithoutConstraints(colorFrame.width, labelFrameHeight)
	labelFrame.backgrounds = [
		{
			blendMode: 'NORMAL',
			color: {
				r: 0.9529411765,
				g: 0.9529411765,
				b: 0.9529411765
			},
			type: 'SOLID'
		}
	]
	return labelFrame
}

function createLabel(labelFrame, fullColorName: string) {
	let colorGroup: string, colorName: string
	if (!fullColorName.includes('.')) {
		colorGroup = styleIndicator
		colorName = fullColorName
	} else {
		;[colorGroup, colorName] = fullColorName.split('.')
	}

	const colorGroupLabel = figma.createText()
	labelFrame.appendChild(colorGroupLabel)
	colorGroupLabel.fontSize = 14
	colorGroupLabel.y = 14
	colorGroupLabel.x = 12
	colorGroupLabel.fills = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 } }]
	colorGroupLabel.characters = colorGroup
	colorGroupLabel.fontName = { family: 'Roboto Mono', style: 'Regular' }

	const colorNameLabel = figma.createText()
	labelFrame.appendChild(colorNameLabel)
	colorNameLabel.fontSize = 14
	colorNameLabel.y = 35
	colorNameLabel.x = 12
	colorNameLabel.fills = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 } }]
	colorNameLabel.characters = colorName
	colorNameLabel.fontName = { family: 'Roboto Mono', style: 'Bold' }

	return colorGroupLabel
}

function createGroupLeadingBlock(
	groupName,
	colorFrameWidth,
	colorFrameHeight,
	innerGuideFrame,
	x,
	y
) {
	var groupTitleFrame = figma.createFrame()
	innerGuideFrame.appendChild(groupTitleFrame)
	groupTitleFrame.resizeWithoutConstraints(colorFrameWidth, colorFrameHeight)
	groupTitleFrame.backgrounds = [
		{
			blendMode: 'PASS_THROUGH',
			color: {
				r: 0.9529411765,
				g: 0.9529411765,
				b: 0.9529411765
			},
			opacity: 1,
			type: 'SOLID',
			visible: true
		}
	]

	groupTitleFrame.x = x
	groupTitleFrame.y = y

	var groupTitle = figma.createText()
	groupTitleFrame.appendChild(groupTitle)
	groupTitle.characters = groupName
	groupTitle.fontName = { family: 'Roboto Mono', style: 'Regular' }
	groupTitle.fontSize = 24
	groupTitle.x = (groupTitleFrame.width - groupTitle.width) / 2
	groupTitle.y = (groupTitleFrame.height - groupTitle.height) / 2
}

function getColorNames(fullName: string) {
	const [themeName, fullColorName] = fullName.split(' / ')

	let groupName: string, colorName: string
	if (!fullColorName.includes('.')) {
		groupName = styleIndicator
		colorName = fullColorName
	} else {
		;[groupName, colorName] = fullColorName.split('.')
	}

	return {
		themeName,
		groupName,
		colorName,
		fullColorName
	}
}

export function createStyle(colorThemeName: string, fullColorName: string, colorValue: string) {
	// convert color from hex => rgb
	const color = convertHexToRGBA(colorValue)
	// create new style
	const style = figma.createPaintStyle()
	style.name = colorThemeName + ' / ' + fullColorName

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
