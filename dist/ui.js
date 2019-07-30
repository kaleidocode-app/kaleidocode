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
    let icon = document.getElementById('create-styles').querySelector('.icon-loader');
    let text = document.getElementById('create-styles').querySelector('.text');
    icon.style.display = "block";
    text.style.display = "none";
    let themes = [];
    let themeItems = document.querySelectorAll('input[type=checkbox]:checked');
    themeItems.forEach(t => {
        themes.push(t.id);
    });
    setTimeout(function () {
        parent.postMessage({ pluginMessage: { type: 'create-styles', themes } }, '*');
    }, 100);
};
document.getElementById('swap-theme').onclick = () => {
    let icon = document.getElementById('swap-theme').querySelector('.icon-loader');
    let text = document.getElementById('swap-theme').querySelector('.text');
    icon.style.display = "block";
    text.style.display = "none";
    document.getElementById('swap-validation').classList.add('hidden');
    const newThemeName = document.getElementById('themes').value;
    setTimeout(function () {
        parent.postMessage({ pluginMessage: { type: 'swap-theme', newThemeName } }, '*');
    }, 100);
};
document.getElementById('create-custom').onclick = () => {
    let icon = document.getElementById('create-custom').querySelector('.icon-loader');
    let text = document.getElementById('create-custom').querySelector('.text');
    icon.style.display = "block";
    text.style.display = "none";
    const newTheme = (document.getElementById('custom-theme'));
    const newThemeCode = newTheme.value;
    setTimeout(function () {
        parent.postMessage({ pluginMessage: { type: 'create-custom', newThemeCode } }, '*');
    }, 100);
};
document.getElementById('load-themes').onclick = () => {
    parent.postMessage({ pluginMessage: { type: 'load-themes' } }, '*');
};
document.getElementById('select-all').onclick = () => {
    toggleCheckboxes();
};
const tabButtonGenerate = document.getElementById('tab-button-generate');
const tabButtonTheme = document.getElementById('tab-button-theme');
const tabButtonCreate = document.getElementById('tab-button-create');
const tabContentGenerate = document.getElementById('contentGenerate');
const tabContentTheme = document.getElementById('contentTheme');
const tabContentCreate = document.getElementById('contentCreate');
function addActive(button, content) {
    button.classList.add('active');
    content.classList.add('active');
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
    // load themes
    if (pluginMessage.type == 'loadThemes') {
        let themeNames = pluginMessage.themeNames[0];
        if (themeNames.length > 0) {
            // Remove placeholder item
            dropdown.options[0] = null;
            document.getElementById('swap-theme').classList.remove('disabled');
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
    // when swap is complete
    if (pluginMessage.type === 'relinkStyles' && pluginMessage.complete == true) {
        let icon = document.getElementById('swap-theme').querySelector('.icon-loader');
        let text = document.getElementById('swap-theme').querySelector('.text');
        icon.style.display = "none";
        text.style.display = "block";
    }
    // when swap is missing selection
    if (pluginMessage.type === 'relinkStyles' && pluginMessage.selectionEmpty == true) {
        validation.classList.remove('hidden');
        let icon = document.getElementById('swap-theme').querySelector('.icon-loader');
        let text = document.getElementById('swap-theme').querySelector('.text');
        icon.style.display = "none";
        text.style.display = "block";
    }
};
function toggleCheckboxes() {
    let checkboxes = document.getElementsByName('checkbox');
    let toggleButton = document.getElementById('select-all');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL3VpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRUFBd0Qsa0JBQWtCO0FBQzFFO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUF5QyxpQ0FBaUM7QUFDMUUsd0hBQWdILG1CQUFtQixFQUFFO0FBQ3JJO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7OztBQUdBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ2xGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSw0QkFBNEIsaUJBQWlCLGdDQUFnQyxFQUFFO0FBQy9FLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsaUJBQWlCLG1DQUFtQyxFQUFFO0FBQ2xGLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsaUJBQWlCLHNDQUFzQyxFQUFFO0FBQ3JGLEtBQUs7QUFDTDtBQUNBO0FBQ0Esd0JBQXdCLGlCQUFpQixzQkFBc0IsRUFBRTtBQUNqRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBIiwiZmlsZSI6InVpLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvdWkudHNcIik7XG4iLCJkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY3JlYXRlLXN0eWxlcycpLm9uY2xpY2sgPSAoKSA9PiB7XG4gICAgbGV0IGljb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY3JlYXRlLXN0eWxlcycpLnF1ZXJ5U2VsZWN0b3IoJy5pY29uLWxvYWRlcicpO1xuICAgIGxldCB0ZXh0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NyZWF0ZS1zdHlsZXMnKS5xdWVyeVNlbGVjdG9yKCcudGV4dCcpO1xuICAgIGljb24uc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICB0ZXh0LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICBsZXQgdGhlbWVzID0gW107XG4gICAgbGV0IHRoZW1lSXRlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdpbnB1dFt0eXBlPWNoZWNrYm94XTpjaGVja2VkJyk7XG4gICAgdGhlbWVJdGVtcy5mb3JFYWNoKHQgPT4ge1xuICAgICAgICB0aGVtZXMucHVzaCh0LmlkKTtcbiAgICB9KTtcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcGFyZW50LnBvc3RNZXNzYWdlKHsgcGx1Z2luTWVzc2FnZTogeyB0eXBlOiAnY3JlYXRlLXN0eWxlcycsIHRoZW1lcyB9IH0sICcqJyk7XG4gICAgfSwgMTAwKTtcbn07XG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3dhcC10aGVtZScpLm9uY2xpY2sgPSAoKSA9PiB7XG4gICAgbGV0IGljb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3dhcC10aGVtZScpLnF1ZXJ5U2VsZWN0b3IoJy5pY29uLWxvYWRlcicpO1xuICAgIGxldCB0ZXh0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N3YXAtdGhlbWUnKS5xdWVyeVNlbGVjdG9yKCcudGV4dCcpO1xuICAgIGljb24uc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICB0ZXh0LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3dhcC12YWxpZGF0aW9uJykuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7XG4gICAgY29uc3QgbmV3VGhlbWVOYW1lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RoZW1lcycpLnZhbHVlO1xuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICBwYXJlbnQucG9zdE1lc3NhZ2UoeyBwbHVnaW5NZXNzYWdlOiB7IHR5cGU6ICdzd2FwLXRoZW1lJywgbmV3VGhlbWVOYW1lIH0gfSwgJyonKTtcbiAgICB9LCAxMDApO1xufTtcbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjcmVhdGUtY3VzdG9tJykub25jbGljayA9ICgpID0+IHtcbiAgICBsZXQgaWNvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjcmVhdGUtY3VzdG9tJykucXVlcnlTZWxlY3RvcignLmljb24tbG9hZGVyJyk7XG4gICAgbGV0IHRleHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY3JlYXRlLWN1c3RvbScpLnF1ZXJ5U2VsZWN0b3IoJy50ZXh0Jyk7XG4gICAgaWNvbi5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgIHRleHQuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgIGNvbnN0IG5ld1RoZW1lID0gKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjdXN0b20tdGhlbWUnKSk7XG4gICAgY29uc3QgbmV3VGhlbWVDb2RlID0gbmV3VGhlbWUudmFsdWU7XG4gICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHBhcmVudC5wb3N0TWVzc2FnZSh7IHBsdWdpbk1lc3NhZ2U6IHsgdHlwZTogJ2NyZWF0ZS1jdXN0b20nLCBuZXdUaGVtZUNvZGUgfSB9LCAnKicpO1xuICAgIH0sIDEwMCk7XG59O1xuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xvYWQtdGhlbWVzJykub25jbGljayA9ICgpID0+IHtcbiAgICBwYXJlbnQucG9zdE1lc3NhZ2UoeyBwbHVnaW5NZXNzYWdlOiB7IHR5cGU6ICdsb2FkLXRoZW1lcycgfSB9LCAnKicpO1xufTtcbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzZWxlY3QtYWxsJykub25jbGljayA9ICgpID0+IHtcbiAgICB0b2dnbGVDaGVja2JveGVzKCk7XG59O1xuY29uc3QgdGFiQnV0dG9uR2VuZXJhdGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGFiLWJ1dHRvbi1nZW5lcmF0ZScpO1xuY29uc3QgdGFiQnV0dG9uVGhlbWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGFiLWJ1dHRvbi10aGVtZScpO1xuY29uc3QgdGFiQnV0dG9uQ3JlYXRlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RhYi1idXR0b24tY3JlYXRlJyk7XG5jb25zdCB0YWJDb250ZW50R2VuZXJhdGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29udGVudEdlbmVyYXRlJyk7XG5jb25zdCB0YWJDb250ZW50VGhlbWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29udGVudFRoZW1lJyk7XG5jb25zdCB0YWJDb250ZW50Q3JlYXRlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnRlbnRDcmVhdGUnKTtcbmZ1bmN0aW9uIGFkZEFjdGl2ZShidXR0b24sIGNvbnRlbnQpIHtcbiAgICBidXR0b24uY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG4gICAgY29udGVudC5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcbn1cbmZ1bmN0aW9uIHJlbW92ZUFjdGl2ZSgpIHtcbiAgICB2YXIgYWN0aXZlSXRlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuYWN0aXZlJyk7XG4gICAgW10uZm9yRWFjaC5jYWxsKGFjdGl2ZUl0ZW1zLCBmdW5jdGlvbiAoZWwpIHtcbiAgICAgICAgZWwuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XG4gICAgfSk7XG59XG50YWJCdXR0b25HZW5lcmF0ZS5vbmNsaWNrID0gZnVuY3Rpb24gKCkge1xuICAgIHJlbW92ZUFjdGl2ZSgpO1xuICAgIGFkZEFjdGl2ZSh0YWJCdXR0b25HZW5lcmF0ZSwgdGFiQ29udGVudEdlbmVyYXRlKTtcbn07XG50YWJCdXR0b25UaGVtZS5vbmNsaWNrID0gZnVuY3Rpb24gKCkge1xuICAgIHJlbW92ZUFjdGl2ZSgpO1xuICAgIGFkZEFjdGl2ZSh0YWJCdXR0b25UaGVtZSwgdGFiQ29udGVudFRoZW1lKTtcbn07XG50YWJCdXR0b25DcmVhdGUub25jbGljayA9IGZ1bmN0aW9uICgpIHtcbiAgICByZW1vdmVBY3RpdmUoKTtcbiAgICBhZGRBY3RpdmUodGFiQnV0dG9uQ3JlYXRlLCB0YWJDb250ZW50Q3JlYXRlKTtcbn07XG50YWJCdXR0b25HZW5lcmF0ZS5jbGljaygpO1xuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xvYWQtdGhlbWVzJykuY2xpY2soKTtcbmxldCBkcm9wZG93biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0aGVtZXMnKTtcbmxldCB2YWxpZGF0aW9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N3YXAtdmFsaWRhdGlvbicpO1xub25tZXNzYWdlID0gKGV2ZW50KSA9PiB7XG4gICAgY29uc3QgcGx1Z2luTWVzc2FnZSA9IGV2ZW50LmRhdGEucGx1Z2luTWVzc2FnZTtcbiAgICAvLyBsb2FkIHRoZW1lc1xuICAgIGlmIChwbHVnaW5NZXNzYWdlLnR5cGUgPT0gJ2xvYWRUaGVtZXMnKSB7XG4gICAgICAgIGxldCB0aGVtZU5hbWVzID0gcGx1Z2luTWVzc2FnZS50aGVtZU5hbWVzWzBdO1xuICAgICAgICBpZiAodGhlbWVOYW1lcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAvLyBSZW1vdmUgcGxhY2Vob2xkZXIgaXRlbVxuICAgICAgICAgICAgZHJvcGRvd24ub3B0aW9uc1swXSA9IG51bGw7XG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3dhcC10aGVtZScpLmNsYXNzTGlzdC5yZW1vdmUoJ2Rpc2FibGVkJyk7XG4gICAgICAgICAgICB0aGVtZU5hbWVzLmZvckVhY2goKHQsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gYWRkIG9wdGlvbnMgdG8gc2VsZWN0IGRyb3Bkb3duXG4gICAgICAgICAgICAgICAgbGV0IG9wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ29wdGlvbicpO1xuICAgICAgICAgICAgICAgIGxldCBuYW1lID0gdDtcbiAgICAgICAgICAgICAgICBuYW1lID0gbmFtZS5yZXBsYWNlKC8tKy9nLCAnICcpO1xuICAgICAgICAgICAgICAgIG5hbWUgPSBuYW1lLnJlcGxhY2UoL1xcYlxcdy9nLCAobCkgPT4gbC50b1VwcGVyQ2FzZSgpKTtcbiAgICAgICAgICAgICAgICBvcHRpb24udGV4dCA9IG5hbWU7XG4gICAgICAgICAgICAgICAgb3B0aW9uLnZhbHVlID0gdDtcbiAgICAgICAgICAgICAgICBkcm9wZG93bi5hZGQob3B0aW9uLCBpbmRleCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvLyB3aGVuIHN3YXAgaXMgY29tcGxldGVcbiAgICBpZiAocGx1Z2luTWVzc2FnZS50eXBlID09PSAncmVsaW5rU3R5bGVzJyAmJiBwbHVnaW5NZXNzYWdlLmNvbXBsZXRlID09IHRydWUpIHtcbiAgICAgICAgbGV0IGljb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3dhcC10aGVtZScpLnF1ZXJ5U2VsZWN0b3IoJy5pY29uLWxvYWRlcicpO1xuICAgICAgICBsZXQgdGV4dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzd2FwLXRoZW1lJykucXVlcnlTZWxlY3RvcignLnRleHQnKTtcbiAgICAgICAgaWNvbi5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgIHRleHQuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICB9XG4gICAgLy8gd2hlbiBzd2FwIGlzIG1pc3Npbmcgc2VsZWN0aW9uXG4gICAgaWYgKHBsdWdpbk1lc3NhZ2UudHlwZSA9PT0gJ3JlbGlua1N0eWxlcycgJiYgcGx1Z2luTWVzc2FnZS5zZWxlY3Rpb25FbXB0eSA9PSB0cnVlKSB7XG4gICAgICAgIHZhbGlkYXRpb24uY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJyk7XG4gICAgICAgIGxldCBpY29uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N3YXAtdGhlbWUnKS5xdWVyeVNlbGVjdG9yKCcuaWNvbi1sb2FkZXInKTtcbiAgICAgICAgbGV0IHRleHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3dhcC10aGVtZScpLnF1ZXJ5U2VsZWN0b3IoJy50ZXh0Jyk7XG4gICAgICAgIGljb24uc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICB0ZXh0LnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgfVxufTtcbmZ1bmN0aW9uIHRvZ2dsZUNoZWNrYm94ZXMoKSB7XG4gICAgbGV0IGNoZWNrYm94ZXMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5TmFtZSgnY2hlY2tib3gnKTtcbiAgICBsZXQgdG9nZ2xlQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NlbGVjdC1hbGwnKTtcbiAgICBpZiAodG9nZ2xlQnV0dG9uLmNoZWNrZWQpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ0NoZWNrIGV2ZXJ5dGhpbmcnKTtcbiAgICAgICAgY2hlY2tib3hlcy5mb3JFYWNoKGMgPT4ge1xuICAgICAgICAgICAgbGV0IGNoZWNrID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYy5pZCk7XG4gICAgICAgICAgICBjaGVjay5jaGVja2VkID0gdHJ1ZTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBjb25zb2xlLmxvZygnVW5jaGVjayBldmVyeXRoaW5nJyk7XG4gICAgICAgIGNoZWNrYm94ZXMuZm9yRWFjaChjID0+IHtcbiAgICAgICAgICAgIGxldCBjaGVjayA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGMuaWQpO1xuICAgICAgICAgICAgY2hlY2suY2hlY2tlZCA9IGZhbHNlO1xuICAgICAgICB9KTtcbiAgICB9XG59XG4iXSwic291cmNlUm9vdCI6IiJ9