/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/ui.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/ui.ts":
/*!*******************!*\
  !*** ./src/ui.ts ***!
  \*******************/
/*! no static exports found */
/***/ (function(module, exports) {

document.getElementById('create-styles').onclick = () => {
    document.getElementById('create-styles').innerText = "Generating...";
    let themes = [];
    let themeItems = document.querySelectorAll('input[type=checkbox]:checked');
    themeItems.forEach(t => {
        themes.push(t.id);
    });
    setTimeout(function () {
        parent.postMessage({ pluginMessage: { type: 'create-styles', themes } }, '*');
    }, 100);
};
document.getElementById('switch-styles').onclick = () => {
    const newThemeName = document.getElementById('themes').value;
    document.getElementById('swap-validation').classList.add('hidden');
    parent.postMessage({ pluginMessage: { type: 'switch-styles', newThemeName } }, '*');
};
document.getElementById('relink-styles').onclick = () => {
    document.getElementById('relink-styles').innerText = "Relinking...";
    document.getElementById('swap-validation').classList.add('hidden');
    const newThemeName = document.getElementById('themes').value;
    setTimeout(function () {
        parent.postMessage({ pluginMessage: { type: 'relink-styles', newThemeName } }, '*');
    }, 100);
};
document.getElementById('create-custom').onclick = () => {
    document.getElementById('create-custom').innerText = "Creating...";
    const newTheme = (document.getElementById('custom-theme'));
    const newThemeCode = newTheme.value;
    setTimeout(function () {
        parent.postMessage({ pluginMessage: { type: 'create-custom', newThemeCode } }, '*');
    }, 100);
};
document.getElementById('load-themes').onclick = () => {
    parent.postMessage({ pluginMessage: { type: 'load-themes' } }, '*');
};
document.getElementById('all').onclick = () => {
    toggleCheckboxes();
};
const tabButtonGenerate = document.getElementById('tab-button-generate');
const tabButtonTheme = document.getElementById('tab-button-theme');
const tabButtonCreate = document.getElementById('tab-button-create');
const tabButtonGuide = document.getElementById('tab-button-guide');
const tabContentGenerate = document.getElementById('contentGenerate');
const tabContentTheme = document.getElementById('contentTheme');
const tabContentCreate = document.getElementById('contentCreate');
const tabContentGuide = document.getElementById('contentGuide');
function addActive(button, content) {
    button.classList.add('active');
    content.classList.add('active');
    // let page = button.id
    // page = page.substr(11)
    // parent.postMessage({ pluginMessage: { type: 'update-size', page } }, '*')
}
function removeActive() {
    var activeItems = document.querySelectorAll('.active');
    [].forEach.call(activeItems, function (el) {
        el.classList.remove('active');
    });
}
tabButtonGenerate.onclick = function () {
    removeActive();
    addActive(tabButtonGenerate, tabContentGenerate);
};
tabButtonTheme.onclick = function () {
    removeActive();
    addActive(tabButtonTheme, tabContentTheme);
};
tabButtonCreate.onclick = function () {
    removeActive();
    addActive(tabButtonCreate, tabContentCreate);
};
tabButtonGenerate.click();
document.getElementById('load-themes').click();
let dropdown = document.getElementById('themes');
let validation = document.getElementById('swap-validation');
onmessage = (event) => {
    const pluginMessage = event.data.pluginMessage;
    if (pluginMessage.type == 'loadThemes') {
        let themeNames = pluginMessage.themeNames[0];
        if (themeNames.length > 0) {
            // Remove placeholder item
            dropdown.options[0] = null;
            document.getElementById('switch-styles').classList.remove('disabled');
            document.getElementById('relink-styles').classList.remove('disabled');
            themeNames.forEach((t, index) => {
                // add options to select dropdown
                let option = document.createElement('option');
                let name = t;
                name = name.replace(/-+/g, ' ');
                name = name.replace(/\b\w/g, (l) => l.toUpperCase());
                option.text = name;
                option.value = t;
                dropdown.add(option, index);
            });
        }
    }
    if (pluginMessage.type === 'switchStyles' && pluginMessage.selectionEmpty == true) {
        validation.classList.remove('hidden');
        validation.innerText = "Error: Please select an item to swap";
        document.getElementById('switch-styles').innerText = "Swap Theme";
    }
    if (pluginMessage.type === 'relinkStyles' && pluginMessage.complete == true) {
        document.getElementById('relink-styles').innerText = "Relink Styles";
    }
    if (pluginMessage.type === 'relinkStyles' && pluginMessage.selectionEmpty == true) {
        validation.classList.remove('hidden');
        validation.innerText = "Error: Please select an item to swap";
        document.getElementById('relink-styles').innerText = "Relink Styles";
    }
};
function toggleCheckboxes() {
    let checkboxes = document.getElementsByName('checkbox');
    let toggleButton = document.getElementById('all');
    if (toggleButton.checked) {
        console.log('Check everything');
        checkboxes.forEach(c => {
            let check = document.getElementById(c.id);
            check.checked = true;
        });
    }
    else {
        console.log('Uncheck everything');
        checkboxes.forEach(c => {
            let check = document.getElementById(c.id);
            check.checked = false;
        });
    }
}


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL3VpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRUFBd0Qsa0JBQWtCO0FBQzFFO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUF5QyxpQ0FBaUM7QUFDMUUsd0hBQWdILG1CQUFtQixFQUFFO0FBQ3JJO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7OztBQUdBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ2xGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSw0QkFBNEIsaUJBQWlCLGdDQUFnQyxFQUFFO0FBQy9FLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixpQkFBaUIsc0NBQXNDLEVBQUU7QUFDakY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLGlCQUFpQixzQ0FBc0MsRUFBRTtBQUNyRixLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLGlCQUFpQixzQ0FBc0MsRUFBRTtBQUNyRixLQUFLO0FBQ0w7QUFDQTtBQUNBLHdCQUF3QixpQkFBaUIsc0JBQXNCLEVBQUU7QUFDakU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQixpQkFBaUIsNEJBQTRCLEVBQUU7QUFDMUU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSIsImZpbGUiOiJ1aS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL3VpLnRzXCIpO1xuIiwiZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NyZWF0ZS1zdHlsZXMnKS5vbmNsaWNrID0gKCkgPT4ge1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjcmVhdGUtc3R5bGVzJykuaW5uZXJUZXh0ID0gXCJHZW5lcmF0aW5nLi4uXCI7XG4gICAgbGV0IHRoZW1lcyA9IFtdO1xuICAgIGxldCB0aGVtZUl0ZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnaW5wdXRbdHlwZT1jaGVja2JveF06Y2hlY2tlZCcpO1xuICAgIHRoZW1lSXRlbXMuZm9yRWFjaCh0ID0+IHtcbiAgICAgICAgdGhlbWVzLnB1c2godC5pZCk7XG4gICAgfSk7XG4gICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHBhcmVudC5wb3N0TWVzc2FnZSh7IHBsdWdpbk1lc3NhZ2U6IHsgdHlwZTogJ2NyZWF0ZS1zdHlsZXMnLCB0aGVtZXMgfSB9LCAnKicpO1xuICAgIH0sIDEwMCk7XG59O1xuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N3aXRjaC1zdHlsZXMnKS5vbmNsaWNrID0gKCkgPT4ge1xuICAgIGNvbnN0IG5ld1RoZW1lTmFtZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0aGVtZXMnKS52YWx1ZTtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3dhcC12YWxpZGF0aW9uJykuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7XG4gICAgcGFyZW50LnBvc3RNZXNzYWdlKHsgcGx1Z2luTWVzc2FnZTogeyB0eXBlOiAnc3dpdGNoLXN0eWxlcycsIG5ld1RoZW1lTmFtZSB9IH0sICcqJyk7XG59O1xuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3JlbGluay1zdHlsZXMnKS5vbmNsaWNrID0gKCkgPT4ge1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZWxpbmstc3R5bGVzJykuaW5uZXJUZXh0ID0gXCJSZWxpbmtpbmcuLi5cIjtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3dhcC12YWxpZGF0aW9uJykuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7XG4gICAgY29uc3QgbmV3VGhlbWVOYW1lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RoZW1lcycpLnZhbHVlO1xuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICBwYXJlbnQucG9zdE1lc3NhZ2UoeyBwbHVnaW5NZXNzYWdlOiB7IHR5cGU6ICdyZWxpbmstc3R5bGVzJywgbmV3VGhlbWVOYW1lIH0gfSwgJyonKTtcbiAgICB9LCAxMDApO1xufTtcbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjcmVhdGUtY3VzdG9tJykub25jbGljayA9ICgpID0+IHtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY3JlYXRlLWN1c3RvbScpLmlubmVyVGV4dCA9IFwiQ3JlYXRpbmcuLi5cIjtcbiAgICBjb25zdCBuZXdUaGVtZSA9IChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY3VzdG9tLXRoZW1lJykpO1xuICAgIGNvbnN0IG5ld1RoZW1lQ29kZSA9IG5ld1RoZW1lLnZhbHVlO1xuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICBwYXJlbnQucG9zdE1lc3NhZ2UoeyBwbHVnaW5NZXNzYWdlOiB7IHR5cGU6ICdjcmVhdGUtY3VzdG9tJywgbmV3VGhlbWVDb2RlIH0gfSwgJyonKTtcbiAgICB9LCAxMDApO1xufTtcbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsb2FkLXRoZW1lcycpLm9uY2xpY2sgPSAoKSA9PiB7XG4gICAgcGFyZW50LnBvc3RNZXNzYWdlKHsgcGx1Z2luTWVzc2FnZTogeyB0eXBlOiAnbG9hZC10aGVtZXMnIH0gfSwgJyonKTtcbn07XG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWxsJykub25jbGljayA9ICgpID0+IHtcbiAgICB0b2dnbGVDaGVja2JveGVzKCk7XG59O1xuY29uc3QgdGFiQnV0dG9uR2VuZXJhdGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGFiLWJ1dHRvbi1nZW5lcmF0ZScpO1xuY29uc3QgdGFiQnV0dG9uVGhlbWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGFiLWJ1dHRvbi10aGVtZScpO1xuY29uc3QgdGFiQnV0dG9uQ3JlYXRlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RhYi1idXR0b24tY3JlYXRlJyk7XG5jb25zdCB0YWJCdXR0b25HdWlkZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0YWItYnV0dG9uLWd1aWRlJyk7XG5jb25zdCB0YWJDb250ZW50R2VuZXJhdGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29udGVudEdlbmVyYXRlJyk7XG5jb25zdCB0YWJDb250ZW50VGhlbWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29udGVudFRoZW1lJyk7XG5jb25zdCB0YWJDb250ZW50Q3JlYXRlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnRlbnRDcmVhdGUnKTtcbmNvbnN0IHRhYkNvbnRlbnRHdWlkZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250ZW50R3VpZGUnKTtcbmZ1bmN0aW9uIGFkZEFjdGl2ZShidXR0b24sIGNvbnRlbnQpIHtcbiAgICBidXR0b24uY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG4gICAgY29udGVudC5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcbiAgICAvLyBsZXQgcGFnZSA9IGJ1dHRvbi5pZFxuICAgIC8vIHBhZ2UgPSBwYWdlLnN1YnN0cigxMSlcbiAgICAvLyBwYXJlbnQucG9zdE1lc3NhZ2UoeyBwbHVnaW5NZXNzYWdlOiB7IHR5cGU6ICd1cGRhdGUtc2l6ZScsIHBhZ2UgfSB9LCAnKicpXG59XG5mdW5jdGlvbiByZW1vdmVBY3RpdmUoKSB7XG4gICAgdmFyIGFjdGl2ZUl0ZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmFjdGl2ZScpO1xuICAgIFtdLmZvckVhY2guY2FsbChhY3RpdmVJdGVtcywgZnVuY3Rpb24gKGVsKSB7XG4gICAgICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xuICAgIH0pO1xufVxudGFiQnV0dG9uR2VuZXJhdGUub25jbGljayA9IGZ1bmN0aW9uICgpIHtcbiAgICByZW1vdmVBY3RpdmUoKTtcbiAgICBhZGRBY3RpdmUodGFiQnV0dG9uR2VuZXJhdGUsIHRhYkNvbnRlbnRHZW5lcmF0ZSk7XG59O1xudGFiQnV0dG9uVGhlbWUub25jbGljayA9IGZ1bmN0aW9uICgpIHtcbiAgICByZW1vdmVBY3RpdmUoKTtcbiAgICBhZGRBY3RpdmUodGFiQnV0dG9uVGhlbWUsIHRhYkNvbnRlbnRUaGVtZSk7XG59O1xudGFiQnV0dG9uQ3JlYXRlLm9uY2xpY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmVtb3ZlQWN0aXZlKCk7XG4gICAgYWRkQWN0aXZlKHRhYkJ1dHRvbkNyZWF0ZSwgdGFiQ29udGVudENyZWF0ZSk7XG59O1xudGFiQnV0dG9uR2VuZXJhdGUuY2xpY2soKTtcbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsb2FkLXRoZW1lcycpLmNsaWNrKCk7XG5sZXQgZHJvcGRvd24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGhlbWVzJyk7XG5sZXQgdmFsaWRhdGlvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzd2FwLXZhbGlkYXRpb24nKTtcbm9ubWVzc2FnZSA9IChldmVudCkgPT4ge1xuICAgIGNvbnN0IHBsdWdpbk1lc3NhZ2UgPSBldmVudC5kYXRhLnBsdWdpbk1lc3NhZ2U7XG4gICAgaWYgKHBsdWdpbk1lc3NhZ2UudHlwZSA9PSAnbG9hZFRoZW1lcycpIHtcbiAgICAgICAgbGV0IHRoZW1lTmFtZXMgPSBwbHVnaW5NZXNzYWdlLnRoZW1lTmFtZXNbMF07XG4gICAgICAgIGlmICh0aGVtZU5hbWVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIC8vIFJlbW92ZSBwbGFjZWhvbGRlciBpdGVtXG4gICAgICAgICAgICBkcm9wZG93bi5vcHRpb25zWzBdID0gbnVsbDtcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzd2l0Y2gtc3R5bGVzJykuY2xhc3NMaXN0LnJlbW92ZSgnZGlzYWJsZWQnKTtcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZWxpbmstc3R5bGVzJykuY2xhc3NMaXN0LnJlbW92ZSgnZGlzYWJsZWQnKTtcbiAgICAgICAgICAgIHRoZW1lTmFtZXMuZm9yRWFjaCgodCwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICAvLyBhZGQgb3B0aW9ucyB0byBzZWxlY3QgZHJvcGRvd25cbiAgICAgICAgICAgICAgICBsZXQgb3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnb3B0aW9uJyk7XG4gICAgICAgICAgICAgICAgbGV0IG5hbWUgPSB0O1xuICAgICAgICAgICAgICAgIG5hbWUgPSBuYW1lLnJlcGxhY2UoLy0rL2csICcgJyk7XG4gICAgICAgICAgICAgICAgbmFtZSA9IG5hbWUucmVwbGFjZSgvXFxiXFx3L2csIChsKSA9PiBsLnRvVXBwZXJDYXNlKCkpO1xuICAgICAgICAgICAgICAgIG9wdGlvbi50ZXh0ID0gbmFtZTtcbiAgICAgICAgICAgICAgICBvcHRpb24udmFsdWUgPSB0O1xuICAgICAgICAgICAgICAgIGRyb3Bkb3duLmFkZChvcHRpb24sIGluZGV4KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIGlmIChwbHVnaW5NZXNzYWdlLnR5cGUgPT09ICdzd2l0Y2hTdHlsZXMnICYmIHBsdWdpbk1lc3NhZ2Uuc2VsZWN0aW9uRW1wdHkgPT0gdHJ1ZSkge1xuICAgICAgICB2YWxpZGF0aW9uLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpO1xuICAgICAgICB2YWxpZGF0aW9uLmlubmVyVGV4dCA9IFwiRXJyb3I6IFBsZWFzZSBzZWxlY3QgYW4gaXRlbSB0byBzd2FwXCI7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzd2l0Y2gtc3R5bGVzJykuaW5uZXJUZXh0ID0gXCJTd2FwIFRoZW1lXCI7XG4gICAgfVxuICAgIGlmIChwbHVnaW5NZXNzYWdlLnR5cGUgPT09ICdyZWxpbmtTdHlsZXMnICYmIHBsdWdpbk1lc3NhZ2UuY29tcGxldGUgPT0gdHJ1ZSkge1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmVsaW5rLXN0eWxlcycpLmlubmVyVGV4dCA9IFwiUmVsaW5rIFN0eWxlc1wiO1xuICAgIH1cbiAgICBpZiAocGx1Z2luTWVzc2FnZS50eXBlID09PSAncmVsaW5rU3R5bGVzJyAmJiBwbHVnaW5NZXNzYWdlLnNlbGVjdGlvbkVtcHR5ID09IHRydWUpIHtcbiAgICAgICAgdmFsaWRhdGlvbi5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTtcbiAgICAgICAgdmFsaWRhdGlvbi5pbm5lclRleHQgPSBcIkVycm9yOiBQbGVhc2Ugc2VsZWN0IGFuIGl0ZW0gdG8gc3dhcFwiO1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmVsaW5rLXN0eWxlcycpLmlubmVyVGV4dCA9IFwiUmVsaW5rIFN0eWxlc1wiO1xuICAgIH1cbn07XG5mdW5jdGlvbiB0b2dnbGVDaGVja2JveGVzKCkge1xuICAgIGxldCBjaGVja2JveGVzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeU5hbWUoJ2NoZWNrYm94Jyk7XG4gICAgbGV0IHRvZ2dsZUJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhbGwnKTtcbiAgICBpZiAodG9nZ2xlQnV0dG9uLmNoZWNrZWQpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ0NoZWNrIGV2ZXJ5dGhpbmcnKTtcbiAgICAgICAgY2hlY2tib3hlcy5mb3JFYWNoKGMgPT4ge1xuICAgICAgICAgICAgbGV0IGNoZWNrID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYy5pZCk7XG4gICAgICAgICAgICBjaGVjay5jaGVja2VkID0gdHJ1ZTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBjb25zb2xlLmxvZygnVW5jaGVjayBldmVyeXRoaW5nJyk7XG4gICAgICAgIGNoZWNrYm94ZXMuZm9yRWFjaChjID0+IHtcbiAgICAgICAgICAgIGxldCBjaGVjayA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGMuaWQpO1xuICAgICAgICAgICAgY2hlY2suY2hlY2tlZCA9IGZhbHNlO1xuICAgICAgICB9KTtcbiAgICB9XG59XG4iXSwic291cmNlUm9vdCI6IiJ9