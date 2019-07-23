figma.showUI(__html__);
var SQUARE_SPACING = 150;
var VERTICAL_THEME_SPACING = 200;
var themes = [
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
];
figma.ui.onmessage = function (msg) {
    console.log('start');
    if (msg.type === 'create-styles') {
        themes.reverse().forEach(function (theme, themeI) {
            var themeColors = theme.colors;
            var colorTheme = theme.name.toLowerCase();
            // sort object
            var sortedObject = Object.keys(themeColors).sort();
            // map sorted array to object
            var sortedColors = sortedObject.map(function (k) {
                return [k, themeColors[k]];
            });
            // iterate on each color
            var rects = [];
            sortedColors.forEach(function (_a, i) {
                var colorName = _a[0], colorValue = _a[1];
                if (!colorValue || colorValue === '') {
                    colorValue = '#ffffff';
                }
                var rect = createRect(colorTheme, colorName, i * SQUARE_SPACING, themeI * VERTICAL_THEME_SPACING);
                rect.fillStyleId = createStyle(colorTheme, colorName, colorValue);
                rects.push(rect);
            });
            var group = figma.group(rects, figma.currentPage);
            group.name = "--" + colorTheme;
        });
        figma.closePlugin();
        return;
    }
    if (msg.type === 'switch-styles') {
        if (figma.currentPage.selection.length <= 0) {
            return;
        }
        var themeNodes = figma.currentPage.findAll(function (node) {
            return node.name.startsWith('--') && node.type === 'GROUP';
        });
        var themes_1 = {};
        themeNodes.forEach(function (t) {
            themes_1[t.name.slice(2)] = {};
            t.children.forEach(function (tc) {
                themes_1[t.name.slice(2)][tc.name] = String(tc.fillStyleId);
            });
        });
        console.log(themes_1);
        var selection = figma.currentPage.selection[0];
        if (selection.type !== 'GROUP' && selection.type !== 'FRAME') {
            return;
        }
        var objectsToUpdate_1 = [];
        function addToUpdateQueue(node) {
            if (node.children) {
                node.children.forEach(function (c) {
                    addToUpdateQueue(c);
                    objectsToUpdate_1.push(c);
                });
            }
        }
        addToUpdateQueue(selection);
        objectsToUpdate_1.forEach(function (c) {
            var cStyle = figma.getStyleById(String(c.fillStyleId));
            if (cStyle) {
                var _a = cStyle.name.split(' / '), themeName = _a[0], colorName = _a[1];
                var newColorName = [msg.newThemeName, colorName].join(' / ');
                var newStyleId = themes_1[msg.newThemeName][newColorName];
                if (newStyleId) {
                    c.fillStyleId = newStyleId;
                }
            }
        });
        figma.closePlugin();
        return;
    }
    if (msg.type === 'create-rectangles') {
        if (figma.currentPage.selection.length <= 0) {
            return;
        }
        var themeNodes = figma.currentPage.findAll(function (node) {
            return node.name.startsWith('--') && node.type === 'GROUP';
        });
        var themes_2 = {};
        themeNodes.forEach(function (t) {
            themes_2[t.name.slice(2)] = {};
            t.children.forEach(function (tc) {
                themes_2[t.name.slice(2)][tc.name] = String(tc.fillStyleId);
            });
        });
        console.log(themes_2);
        var selection = figma.currentPage.selection[0];
        if (selection.type !== 'GROUP') {
            return;
        }
        var objectsToUpdate = selection.children;
        objectsToUpdate.forEach(function (c) {
            var cStyle = figma.getStyleById(String(c.fillStyleId));
            var newStyleId = cStyle.name.startsWith('dark')
                ? themes_2['light'][cStyle.name.replace('dark', 'light')]
                : themes_2['dark'][cStyle.name.replace('light', 'dark')];
            c.fillStyleId = newStyleId;
        });
    }
    // Make sure to close the plugin when you're done. Otherwise the plugin will
    // keep running, which shows the cancel button at the bottom of the screen.
    figma.closePlugin();
};
function createRect(colorTheme, colorName, xOffset, yOffset) {
    var layerName = colorTheme + ' / ' + colorName;
    var rect = figma.createRectangle();
    rect.x = xOffset;
    rect.y = yOffset;
    rect.name = layerName;
    figma.currentPage.appendChild(rect);
    return rect;
}
function createStyle(colorTheme, colorName, colorValue) {
    // convert color from hex => rgb
    var color = convertHexToRGBA(colorValue);
    // create new style
    var style = figma.createPaintStyle();
    style.name = colorTheme + ' / ' + colorName;
    var solidPaint = {
        type: 'SOLID',
        color: {
            r: color[0] / 255,
            g: color[1] / 255,
            b: color[2] / 255
        },
        opacity: color[3] ? color[3] / 255 : 1
    };
    style.paints = [solidPaint];
    return style.id;
}
function convertHexToRGBA(hex) {
    'use strict';
    if (hex.charAt(0) === '#') {
        hex = hex.substr(1);
    }
    if (hex.length < 2 || hex.length > 8) {
        return false;
    }
    var values = hex.split(''), r, g, b, a;
    if (hex.length === 2) {
        r = parseInt(values[0].toString() + values[1].toString(), 16);
        g = r;
        b = r;
    }
    else if (hex.length === 3) {
        r = parseInt(values[0].toString() + values[0].toString(), 16);
        g = parseInt(values[1].toString() + values[1].toString(), 16);
        b = parseInt(values[2].toString() + values[2].toString(), 16);
    }
    else if (hex.length === 6) {
        r = parseInt(values[0].toString() + values[1].toString(), 16);
        g = parseInt(values[2].toString() + values[3].toString(), 16);
        b = parseInt(values[4].toString() + values[5].toString(), 16);
    }
    else if (hex.length === 8) {
        r = parseInt(values[0].toString() + values[1].toString(), 16);
        g = parseInt(values[2].toString() + values[3].toString(), 16);
        b = parseInt(values[4].toString() + values[5].toString(), 16);
        a = parseInt(values[6].toString() + values[7].toString(), 16);
    }
    else {
        return false;
    }
    return [r, g, b, a];
}
