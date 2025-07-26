/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./widgets-dark-mode/src/style.sass":
/*!******************************************!*\
  !*** ./widgets-dark-mode/src/style.sass ***!
  \******************************************/
/***/ (() => {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack://pixel-wp-library/./widgets-dark-mode/src/style.sass?");

/***/ }),

/***/ "./widgets-dark-mode/src/script.js":
/*!*****************************************!*\
  !*** ./widgets-dark-mode/src/script.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _style_sass__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.sass */ \"./widgets-dark-mode/src/style.sass\");\n/* harmony import */ var _style_sass__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_style_sass__WEBPACK_IMPORTED_MODULE_0__);\n\r\n\r\nconst pxDarkMode = {\r\n  init() {\r\n    this.clickListener();\r\n    this.tabindexListener();\r\n  },\r\n\r\n  /**\r\n   * Click listener for dark mode toggle\r\n   */\r\n  clickListener() {\r\n    const $darkToggles = document.querySelectorAll('.px-dark-toggle input[type=\"checkbox\"]');\r\n    if ($darkToggles.length <= 0) { return; }\r\n\r\n    $darkToggles.forEach(($t) => {\r\n      $t.addEventListener('change', (e) => {\r\n        this.toggle(e.currentTarget.checked);\r\n      });\r\n    });\r\n  },\r\n\r\n  /**\r\n   * Keyboard listener for dark mode toggle\r\n   */\r\n  tabindexListener() {\r\n    const $darkSwitches = document.querySelectorAll('.px-dark-toggle__switch');\r\n\r\n    $darkSwitches.forEach(($s) => {\r\n      $s.addEventListener('keyup', (e) => {\r\n        if (e.key === 'Enter' || e.keyCode === 13) {\r\n          const $checkbox = e.currentTarget.closest('.px-dark-toggle').querySelector('input[type=\"checkbox\"]');\r\n          $checkbox.checked = !$checkbox.checked;\r\n          this.toggle($checkbox.checked);\r\n        }\r\n      });\r\n    });\r\n  },\r\n\r\n  /**\r\n   * Toggle the body class and cache the variable\r\n   */\r\n  toggle(isChecked) {\r\n    document.querySelector('html').classList.toggle('px-is-dark', isChecked);\r\n\r\n    // the checker for this is outputed into wp_body_open() by Edje WP Library\r\n    localStorage.setItem('pxDarkMode', isChecked);\r\n  },\r\n};\r\n\r\ndocument.addEventListener('DOMContentLoaded', () => {\r\n  pxDarkMode.init();\r\n});\r\n\n\n//# sourceURL=webpack://pixel-wp-library/./widgets-dark-mode/src/script.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./widgets-dark-mode/src/script.js");
/******/ 	
/******/ })()
;