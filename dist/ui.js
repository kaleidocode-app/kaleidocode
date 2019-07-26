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
    const createTheme = document.getElementById('generateThemes').value;
    setTimeout(function () {
        parent.postMessage({ pluginMessage: { type: 'create-styles', createTheme } }, '*');
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


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL3VpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRUFBd0Qsa0JBQWtCO0FBQzFFO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUF5QyxpQ0FBaUM7QUFDMUUsd0hBQWdILG1CQUFtQixFQUFFO0FBQ3JJO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7OztBQUdBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ2xGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QixpQkFBaUIscUNBQXFDLEVBQUU7QUFDcEYsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLGlCQUFpQixzQ0FBc0MsRUFBRTtBQUNqRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsaUJBQWlCLHNDQUFzQyxFQUFFO0FBQ3JGLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsaUJBQWlCLHNDQUFzQyxFQUFFO0FBQ3JGLEtBQUs7QUFDTDtBQUNBO0FBQ0Esd0JBQXdCLGlCQUFpQixzQkFBc0IsRUFBRTtBQUNqRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLGlCQUFpQiw0QkFBNEIsRUFBRTtBQUMxRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoidWkuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy91aS50c1wiKTtcbiIsImRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjcmVhdGUtc3R5bGVzJykub25jbGljayA9ICgpID0+IHtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY3JlYXRlLXN0eWxlcycpLmlubmVyVGV4dCA9IFwiR2VuZXJhdGluZy4uLlwiO1xuICAgIGNvbnN0IGNyZWF0ZVRoZW1lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dlbmVyYXRlVGhlbWVzJykudmFsdWU7XG4gICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHBhcmVudC5wb3N0TWVzc2FnZSh7IHBsdWdpbk1lc3NhZ2U6IHsgdHlwZTogJ2NyZWF0ZS1zdHlsZXMnLCBjcmVhdGVUaGVtZSB9IH0sICcqJyk7XG4gICAgfSwgMTAwKTtcbn07XG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3dpdGNoLXN0eWxlcycpLm9uY2xpY2sgPSAoKSA9PiB7XG4gICAgY29uc3QgbmV3VGhlbWVOYW1lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RoZW1lcycpLnZhbHVlO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzd2FwLXZhbGlkYXRpb24nKS5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcbiAgICBwYXJlbnQucG9zdE1lc3NhZ2UoeyBwbHVnaW5NZXNzYWdlOiB7IHR5cGU6ICdzd2l0Y2gtc3R5bGVzJywgbmV3VGhlbWVOYW1lIH0gfSwgJyonKTtcbn07XG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmVsaW5rLXN0eWxlcycpLm9uY2xpY2sgPSAoKSA9PiB7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3JlbGluay1zdHlsZXMnKS5pbm5lclRleHQgPSBcIlJlbGlua2luZy4uLlwiO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzd2FwLXZhbGlkYXRpb24nKS5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcbiAgICBjb25zdCBuZXdUaGVtZU5hbWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGhlbWVzJykudmFsdWU7XG4gICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHBhcmVudC5wb3N0TWVzc2FnZSh7IHBsdWdpbk1lc3NhZ2U6IHsgdHlwZTogJ3JlbGluay1zdHlsZXMnLCBuZXdUaGVtZU5hbWUgfSB9LCAnKicpO1xuICAgIH0sIDEwMCk7XG59O1xuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NyZWF0ZS1jdXN0b20nKS5vbmNsaWNrID0gKCkgPT4ge1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjcmVhdGUtY3VzdG9tJykuaW5uZXJUZXh0ID0gXCJDcmVhdGluZy4uLlwiO1xuICAgIGNvbnN0IG5ld1RoZW1lID0gKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjdXN0b20tdGhlbWUnKSk7XG4gICAgY29uc3QgbmV3VGhlbWVDb2RlID0gbmV3VGhlbWUudmFsdWU7XG4gICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHBhcmVudC5wb3N0TWVzc2FnZSh7IHBsdWdpbk1lc3NhZ2U6IHsgdHlwZTogJ2NyZWF0ZS1jdXN0b20nLCBuZXdUaGVtZUNvZGUgfSB9LCAnKicpO1xuICAgIH0sIDEwMCk7XG59O1xuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xvYWQtdGhlbWVzJykub25jbGljayA9ICgpID0+IHtcbiAgICBwYXJlbnQucG9zdE1lc3NhZ2UoeyBwbHVnaW5NZXNzYWdlOiB7IHR5cGU6ICdsb2FkLXRoZW1lcycgfSB9LCAnKicpO1xufTtcbmNvbnN0IHRhYkJ1dHRvbkdlbmVyYXRlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RhYi1idXR0b24tZ2VuZXJhdGUnKTtcbmNvbnN0IHRhYkJ1dHRvblRoZW1lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RhYi1idXR0b24tdGhlbWUnKTtcbmNvbnN0IHRhYkJ1dHRvbkNyZWF0ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0YWItYnV0dG9uLWNyZWF0ZScpO1xuY29uc3QgdGFiQnV0dG9uR3VpZGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGFiLWJ1dHRvbi1ndWlkZScpO1xuY29uc3QgdGFiQ29udGVudEdlbmVyYXRlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnRlbnRHZW5lcmF0ZScpO1xuY29uc3QgdGFiQ29udGVudFRoZW1lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnRlbnRUaGVtZScpO1xuY29uc3QgdGFiQ29udGVudENyZWF0ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250ZW50Q3JlYXRlJyk7XG5jb25zdCB0YWJDb250ZW50R3VpZGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29udGVudEd1aWRlJyk7XG5mdW5jdGlvbiBhZGRBY3RpdmUoYnV0dG9uLCBjb250ZW50KSB7XG4gICAgYnV0dG9uLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuICAgIGNvbnRlbnQuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG4gICAgLy8gbGV0IHBhZ2UgPSBidXR0b24uaWRcbiAgICAvLyBwYWdlID0gcGFnZS5zdWJzdHIoMTEpXG4gICAgLy8gcGFyZW50LnBvc3RNZXNzYWdlKHsgcGx1Z2luTWVzc2FnZTogeyB0eXBlOiAndXBkYXRlLXNpemUnLCBwYWdlIH0gfSwgJyonKVxufVxuZnVuY3Rpb24gcmVtb3ZlQWN0aXZlKCkge1xuICAgIHZhciBhY3RpdmVJdGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5hY3RpdmUnKTtcbiAgICBbXS5mb3JFYWNoLmNhbGwoYWN0aXZlSXRlbXMsIGZ1bmN0aW9uIChlbCkge1xuICAgICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcbiAgICB9KTtcbn1cbnRhYkJ1dHRvbkdlbmVyYXRlLm9uY2xpY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmVtb3ZlQWN0aXZlKCk7XG4gICAgYWRkQWN0aXZlKHRhYkJ1dHRvbkdlbmVyYXRlLCB0YWJDb250ZW50R2VuZXJhdGUpO1xufTtcbnRhYkJ1dHRvblRoZW1lLm9uY2xpY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmVtb3ZlQWN0aXZlKCk7XG4gICAgYWRkQWN0aXZlKHRhYkJ1dHRvblRoZW1lLCB0YWJDb250ZW50VGhlbWUpO1xufTtcbnRhYkJ1dHRvbkNyZWF0ZS5vbmNsaWNrID0gZnVuY3Rpb24gKCkge1xuICAgIHJlbW92ZUFjdGl2ZSgpO1xuICAgIGFkZEFjdGl2ZSh0YWJCdXR0b25DcmVhdGUsIHRhYkNvbnRlbnRDcmVhdGUpO1xufTtcbnRhYkJ1dHRvbkdlbmVyYXRlLmNsaWNrKCk7XG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbG9hZC10aGVtZXMnKS5jbGljaygpO1xubGV0IGRyb3Bkb3duID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RoZW1lcycpO1xubGV0IHZhbGlkYXRpb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3dhcC12YWxpZGF0aW9uJyk7XG5vbm1lc3NhZ2UgPSAoZXZlbnQpID0+IHtcbiAgICBjb25zdCBwbHVnaW5NZXNzYWdlID0gZXZlbnQuZGF0YS5wbHVnaW5NZXNzYWdlO1xuICAgIGlmIChwbHVnaW5NZXNzYWdlLnR5cGUgPT0gJ2xvYWRUaGVtZXMnKSB7XG4gICAgICAgIGxldCB0aGVtZU5hbWVzID0gcGx1Z2luTWVzc2FnZS50aGVtZU5hbWVzWzBdO1xuICAgICAgICBpZiAodGhlbWVOYW1lcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAvLyBSZW1vdmUgcGxhY2Vob2xkZXIgaXRlbVxuICAgICAgICAgICAgZHJvcGRvd24ub3B0aW9uc1swXSA9IG51bGw7XG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3dpdGNoLXN0eWxlcycpLmNsYXNzTGlzdC5yZW1vdmUoJ2Rpc2FibGVkJyk7XG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmVsaW5rLXN0eWxlcycpLmNsYXNzTGlzdC5yZW1vdmUoJ2Rpc2FibGVkJyk7XG4gICAgICAgICAgICB0aGVtZU5hbWVzLmZvckVhY2goKHQsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gYWRkIG9wdGlvbnMgdG8gc2VsZWN0IGRyb3Bkb3duXG4gICAgICAgICAgICAgICAgbGV0IG9wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ29wdGlvbicpO1xuICAgICAgICAgICAgICAgIGxldCBuYW1lID0gdDtcbiAgICAgICAgICAgICAgICBuYW1lID0gbmFtZS5yZXBsYWNlKC8tKy9nLCAnICcpO1xuICAgICAgICAgICAgICAgIG5hbWUgPSBuYW1lLnJlcGxhY2UoL1xcYlxcdy9nLCAobCkgPT4gbC50b1VwcGVyQ2FzZSgpKTtcbiAgICAgICAgICAgICAgICBvcHRpb24udGV4dCA9IG5hbWU7XG4gICAgICAgICAgICAgICAgb3B0aW9uLnZhbHVlID0gdDtcbiAgICAgICAgICAgICAgICBkcm9wZG93bi5hZGQob3B0aW9uLCBpbmRleCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAocGx1Z2luTWVzc2FnZS50eXBlID09PSAnc3dpdGNoU3R5bGVzJyAmJiBwbHVnaW5NZXNzYWdlLnNlbGVjdGlvbkVtcHR5ID09IHRydWUpIHtcbiAgICAgICAgdmFsaWRhdGlvbi5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTtcbiAgICAgICAgdmFsaWRhdGlvbi5pbm5lclRleHQgPSBcIkVycm9yOiBQbGVhc2Ugc2VsZWN0IGFuIGl0ZW0gdG8gc3dhcFwiO1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3dpdGNoLXN0eWxlcycpLmlubmVyVGV4dCA9IFwiU3dhcCBUaGVtZVwiO1xuICAgIH1cbiAgICBpZiAocGx1Z2luTWVzc2FnZS50eXBlID09PSAncmVsaW5rU3R5bGVzJyAmJiBwbHVnaW5NZXNzYWdlLmNvbXBsZXRlID09IHRydWUpIHtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3JlbGluay1zdHlsZXMnKS5pbm5lclRleHQgPSBcIlJlbGluayBTdHlsZXNcIjtcbiAgICB9XG4gICAgaWYgKHBsdWdpbk1lc3NhZ2UudHlwZSA9PT0gJ3JlbGlua1N0eWxlcycgJiYgcGx1Z2luTWVzc2FnZS5zZWxlY3Rpb25FbXB0eSA9PSB0cnVlKSB7XG4gICAgICAgIHZhbGlkYXRpb24uY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJyk7XG4gICAgICAgIHZhbGlkYXRpb24uaW5uZXJUZXh0ID0gXCJFcnJvcjogUGxlYXNlIHNlbGVjdCBhbiBpdGVtIHRvIHN3YXBcIjtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3JlbGluay1zdHlsZXMnKS5pbm5lclRleHQgPSBcIlJlbGluayBTdHlsZXNcIjtcbiAgICB9XG59O1xuIl0sInNvdXJjZVJvb3QiOiIifQ==