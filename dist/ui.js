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
    document.getElementById('relink-styles').innerText = "Swapping...";
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
        document.getElementById('relink-styles').innerText = "Swap Theme";
    }
    if (pluginMessage.type === 'relinkStyles' && pluginMessage.selectionEmpty == true) {
        validation.classList.remove('hidden');
        validation.innerText = "Error: Please select an item to swap";
        document.getElementById('relink-styles').innerText = "Swap Theme";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL3VpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRUFBd0Qsa0JBQWtCO0FBQzFFO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUF5QyxpQ0FBaUM7QUFDMUUsd0hBQWdILG1CQUFtQixFQUFFO0FBQ3JJO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7OztBQUdBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ2xGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSw0QkFBNEIsaUJBQWlCLGdDQUFnQyxFQUFFO0FBQy9FLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixpQkFBaUIsc0NBQXNDLEVBQUU7QUFDakY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLGlCQUFpQixzQ0FBc0MsRUFBRTtBQUNyRixLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLGlCQUFpQixzQ0FBc0MsRUFBRTtBQUNyRixLQUFLO0FBQ0w7QUFDQTtBQUNBLHdCQUF3QixpQkFBaUIsc0JBQXNCLEVBQUU7QUFDakU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQixpQkFBaUIsNEJBQTRCLEVBQUU7QUFDMUU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSIsImZpbGUiOiJ1aS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL3VpLnRzXCIpO1xuIiwiZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NyZWF0ZS1zdHlsZXMnKS5vbmNsaWNrID0gKCkgPT4ge1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjcmVhdGUtc3R5bGVzJykuaW5uZXJUZXh0ID0gXCJHZW5lcmF0aW5nLi4uXCI7XG4gICAgbGV0IHRoZW1lcyA9IFtdO1xuICAgIGxldCB0aGVtZUl0ZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnaW5wdXRbdHlwZT1jaGVja2JveF06Y2hlY2tlZCcpO1xuICAgIHRoZW1lSXRlbXMuZm9yRWFjaCh0ID0+IHtcbiAgICAgICAgdGhlbWVzLnB1c2godC5pZCk7XG4gICAgfSk7XG4gICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHBhcmVudC5wb3N0TWVzc2FnZSh7IHBsdWdpbk1lc3NhZ2U6IHsgdHlwZTogJ2NyZWF0ZS1zdHlsZXMnLCB0aGVtZXMgfSB9LCAnKicpO1xuICAgIH0sIDEwMCk7XG59O1xuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N3aXRjaC1zdHlsZXMnKS5vbmNsaWNrID0gKCkgPT4ge1xuICAgIGNvbnN0IG5ld1RoZW1lTmFtZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0aGVtZXMnKS52YWx1ZTtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3dhcC12YWxpZGF0aW9uJykuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7XG4gICAgcGFyZW50LnBvc3RNZXNzYWdlKHsgcGx1Z2luTWVzc2FnZTogeyB0eXBlOiAnc3dpdGNoLXN0eWxlcycsIG5ld1RoZW1lTmFtZSB9IH0sICcqJyk7XG59O1xuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3JlbGluay1zdHlsZXMnKS5vbmNsaWNrID0gKCkgPT4ge1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZWxpbmstc3R5bGVzJykuaW5uZXJUZXh0ID0gXCJTd2FwcGluZy4uLlwiO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzd2FwLXZhbGlkYXRpb24nKS5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcbiAgICBjb25zdCBuZXdUaGVtZU5hbWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGhlbWVzJykudmFsdWU7XG4gICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHBhcmVudC5wb3N0TWVzc2FnZSh7IHBsdWdpbk1lc3NhZ2U6IHsgdHlwZTogJ3JlbGluay1zdHlsZXMnLCBuZXdUaGVtZU5hbWUgfSB9LCAnKicpO1xuICAgIH0sIDEwMCk7XG59O1xuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NyZWF0ZS1jdXN0b20nKS5vbmNsaWNrID0gKCkgPT4ge1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjcmVhdGUtY3VzdG9tJykuaW5uZXJUZXh0ID0gXCJDcmVhdGluZy4uLlwiO1xuICAgIGNvbnN0IG5ld1RoZW1lID0gKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjdXN0b20tdGhlbWUnKSk7XG4gICAgY29uc3QgbmV3VGhlbWVDb2RlID0gbmV3VGhlbWUudmFsdWU7XG4gICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHBhcmVudC5wb3N0TWVzc2FnZSh7IHBsdWdpbk1lc3NhZ2U6IHsgdHlwZTogJ2NyZWF0ZS1jdXN0b20nLCBuZXdUaGVtZUNvZGUgfSB9LCAnKicpO1xuICAgIH0sIDEwMCk7XG59O1xuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xvYWQtdGhlbWVzJykub25jbGljayA9ICgpID0+IHtcbiAgICBwYXJlbnQucG9zdE1lc3NhZ2UoeyBwbHVnaW5NZXNzYWdlOiB7IHR5cGU6ICdsb2FkLXRoZW1lcycgfSB9LCAnKicpO1xufTtcbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhbGwnKS5vbmNsaWNrID0gKCkgPT4ge1xuICAgIHRvZ2dsZUNoZWNrYm94ZXMoKTtcbn07XG5jb25zdCB0YWJCdXR0b25HZW5lcmF0ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0YWItYnV0dG9uLWdlbmVyYXRlJyk7XG5jb25zdCB0YWJCdXR0b25UaGVtZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0YWItYnV0dG9uLXRoZW1lJyk7XG5jb25zdCB0YWJCdXR0b25DcmVhdGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGFiLWJ1dHRvbi1jcmVhdGUnKTtcbmNvbnN0IHRhYkJ1dHRvbkd1aWRlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RhYi1idXR0b24tZ3VpZGUnKTtcbmNvbnN0IHRhYkNvbnRlbnRHZW5lcmF0ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250ZW50R2VuZXJhdGUnKTtcbmNvbnN0IHRhYkNvbnRlbnRUaGVtZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250ZW50VGhlbWUnKTtcbmNvbnN0IHRhYkNvbnRlbnRDcmVhdGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29udGVudENyZWF0ZScpO1xuY29uc3QgdGFiQ29udGVudEd1aWRlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnRlbnRHdWlkZScpO1xuZnVuY3Rpb24gYWRkQWN0aXZlKGJ1dHRvbiwgY29udGVudCkge1xuICAgIGJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcbiAgICBjb250ZW50LmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuICAgIC8vIGxldCBwYWdlID0gYnV0dG9uLmlkXG4gICAgLy8gcGFnZSA9IHBhZ2Uuc3Vic3RyKDExKVxuICAgIC8vIHBhcmVudC5wb3N0TWVzc2FnZSh7IHBsdWdpbk1lc3NhZ2U6IHsgdHlwZTogJ3VwZGF0ZS1zaXplJywgcGFnZSB9IH0sICcqJylcbn1cbmZ1bmN0aW9uIHJlbW92ZUFjdGl2ZSgpIHtcbiAgICB2YXIgYWN0aXZlSXRlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuYWN0aXZlJyk7XG4gICAgW10uZm9yRWFjaC5jYWxsKGFjdGl2ZUl0ZW1zLCBmdW5jdGlvbiAoZWwpIHtcbiAgICAgICAgZWwuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XG4gICAgfSk7XG59XG50YWJCdXR0b25HZW5lcmF0ZS5vbmNsaWNrID0gZnVuY3Rpb24gKCkge1xuICAgIHJlbW92ZUFjdGl2ZSgpO1xuICAgIGFkZEFjdGl2ZSh0YWJCdXR0b25HZW5lcmF0ZSwgdGFiQ29udGVudEdlbmVyYXRlKTtcbn07XG50YWJCdXR0b25UaGVtZS5vbmNsaWNrID0gZnVuY3Rpb24gKCkge1xuICAgIHJlbW92ZUFjdGl2ZSgpO1xuICAgIGFkZEFjdGl2ZSh0YWJCdXR0b25UaGVtZSwgdGFiQ29udGVudFRoZW1lKTtcbn07XG50YWJCdXR0b25DcmVhdGUub25jbGljayA9IGZ1bmN0aW9uICgpIHtcbiAgICByZW1vdmVBY3RpdmUoKTtcbiAgICBhZGRBY3RpdmUodGFiQnV0dG9uQ3JlYXRlLCB0YWJDb250ZW50Q3JlYXRlKTtcbn07XG50YWJCdXR0b25HZW5lcmF0ZS5jbGljaygpO1xuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xvYWQtdGhlbWVzJykuY2xpY2soKTtcbmxldCBkcm9wZG93biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0aGVtZXMnKTtcbmxldCB2YWxpZGF0aW9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N3YXAtdmFsaWRhdGlvbicpO1xub25tZXNzYWdlID0gKGV2ZW50KSA9PiB7XG4gICAgY29uc3QgcGx1Z2luTWVzc2FnZSA9IGV2ZW50LmRhdGEucGx1Z2luTWVzc2FnZTtcbiAgICBpZiAocGx1Z2luTWVzc2FnZS50eXBlID09ICdsb2FkVGhlbWVzJykge1xuICAgICAgICBsZXQgdGhlbWVOYW1lcyA9IHBsdWdpbk1lc3NhZ2UudGhlbWVOYW1lc1swXTtcbiAgICAgICAgaWYgKHRoZW1lTmFtZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgLy8gUmVtb3ZlIHBsYWNlaG9sZGVyIGl0ZW1cbiAgICAgICAgICAgIGRyb3Bkb3duLm9wdGlvbnNbMF0gPSBudWxsO1xuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N3aXRjaC1zdHlsZXMnKS5jbGFzc0xpc3QucmVtb3ZlKCdkaXNhYmxlZCcpO1xuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3JlbGluay1zdHlsZXMnKS5jbGFzc0xpc3QucmVtb3ZlKCdkaXNhYmxlZCcpO1xuICAgICAgICAgICAgdGhlbWVOYW1lcy5mb3JFYWNoKCh0LCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgIC8vIGFkZCBvcHRpb25zIHRvIHNlbGVjdCBkcm9wZG93blxuICAgICAgICAgICAgICAgIGxldCBvcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdvcHRpb24nKTtcbiAgICAgICAgICAgICAgICBsZXQgbmFtZSA9IHQ7XG4gICAgICAgICAgICAgICAgbmFtZSA9IG5hbWUucmVwbGFjZSgvLSsvZywgJyAnKTtcbiAgICAgICAgICAgICAgICBuYW1lID0gbmFtZS5yZXBsYWNlKC9cXGJcXHcvZywgKGwpID0+IGwudG9VcHBlckNhc2UoKSk7XG4gICAgICAgICAgICAgICAgb3B0aW9uLnRleHQgPSBuYW1lO1xuICAgICAgICAgICAgICAgIG9wdGlvbi52YWx1ZSA9IHQ7XG4gICAgICAgICAgICAgICAgZHJvcGRvd24uYWRkKG9wdGlvbiwgaW5kZXgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKHBsdWdpbk1lc3NhZ2UudHlwZSA9PT0gJ3N3aXRjaFN0eWxlcycgJiYgcGx1Z2luTWVzc2FnZS5zZWxlY3Rpb25FbXB0eSA9PSB0cnVlKSB7XG4gICAgICAgIHZhbGlkYXRpb24uY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJyk7XG4gICAgICAgIHZhbGlkYXRpb24uaW5uZXJUZXh0ID0gXCJFcnJvcjogUGxlYXNlIHNlbGVjdCBhbiBpdGVtIHRvIHN3YXBcIjtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N3aXRjaC1zdHlsZXMnKS5pbm5lclRleHQgPSBcIlN3YXAgVGhlbWVcIjtcbiAgICB9XG4gICAgaWYgKHBsdWdpbk1lc3NhZ2UudHlwZSA9PT0gJ3JlbGlua1N0eWxlcycgJiYgcGx1Z2luTWVzc2FnZS5jb21wbGV0ZSA9PSB0cnVlKSB7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZWxpbmstc3R5bGVzJykuaW5uZXJUZXh0ID0gXCJTd2FwIFRoZW1lXCI7XG4gICAgfVxuICAgIGlmIChwbHVnaW5NZXNzYWdlLnR5cGUgPT09ICdyZWxpbmtTdHlsZXMnICYmIHBsdWdpbk1lc3NhZ2Uuc2VsZWN0aW9uRW1wdHkgPT0gdHJ1ZSkge1xuICAgICAgICB2YWxpZGF0aW9uLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpO1xuICAgICAgICB2YWxpZGF0aW9uLmlubmVyVGV4dCA9IFwiRXJyb3I6IFBsZWFzZSBzZWxlY3QgYW4gaXRlbSB0byBzd2FwXCI7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZWxpbmstc3R5bGVzJykuaW5uZXJUZXh0ID0gXCJTd2FwIFRoZW1lXCI7XG4gICAgfVxufTtcbmZ1bmN0aW9uIHRvZ2dsZUNoZWNrYm94ZXMoKSB7XG4gICAgbGV0IGNoZWNrYm94ZXMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5TmFtZSgnY2hlY2tib3gnKTtcbiAgICBsZXQgdG9nZ2xlQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FsbCcpO1xuICAgIGlmICh0b2dnbGVCdXR0b24uY2hlY2tlZCkge1xuICAgICAgICBjb25zb2xlLmxvZygnQ2hlY2sgZXZlcnl0aGluZycpO1xuICAgICAgICBjaGVja2JveGVzLmZvckVhY2goYyA9PiB7XG4gICAgICAgICAgICBsZXQgY2hlY2sgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChjLmlkKTtcbiAgICAgICAgICAgIGNoZWNrLmNoZWNrZWQgPSB0cnVlO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdVbmNoZWNrIGV2ZXJ5dGhpbmcnKTtcbiAgICAgICAgY2hlY2tib3hlcy5mb3JFYWNoKGMgPT4ge1xuICAgICAgICAgICAgbGV0IGNoZWNrID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYy5pZCk7XG4gICAgICAgICAgICBjaGVjay5jaGVja2VkID0gZmFsc2U7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=