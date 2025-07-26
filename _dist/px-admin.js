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

/***/ "./head-footer/admin.js":
/*!******************************!*\
  !*** ./head-footer/admin.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _admin_sass__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./admin.sass */ \"./head-footer/admin.sass\");\n/* harmony import */ var _admin_sass__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_admin_sass__WEBPACK_IMPORTED_MODULE_0__);\n\r\n\r\nfunction onReady() {\r\n  const $fields = document.querySelectorAll('.acf-field[data-name=\"head_code\"] textarea, .acf-field[data-name=\"footer_code\"] textarea');\r\n  if (!$fields) { return; }\r\n\r\n  $fields.forEach(($field) => {\r\n    window.wp.codeEditor.initialize($field, window.pxCodemirrorSettings);\r\n  });\r\n\r\n}\r\n\r\ndocument.addEventListener('DOMContentLoaded', onReady);\r\n\n\n//# sourceURL=webpack://pixel-wp-library/./head-footer/admin.js?");

/***/ }),

/***/ "./head-footer/admin.sass":
/*!********************************!*\
  !*** ./head-footer/admin.sass ***!
  \********************************/
/***/ (() => {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack://pixel-wp-library/./head-footer/admin.sass?");

/***/ }),

/***/ "./modify-core/src/h-admin.sass":
/*!**************************************!*\
  !*** ./modify-core/src/h-admin.sass ***!
  \**************************************/
/***/ (() => {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack://pixel-wp-library/./modify-core/src/h-admin.sass?");

/***/ }),

/***/ "./px-admin.js":
/*!*********************!*\
  !*** ./px-admin.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _modify_core_src_h_admin_sass__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modify-core/src/h-admin.sass */ \"./modify-core/src/h-admin.sass\");\n/* harmony import */ var _modify_core_src_h_admin_sass__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_modify_core_src_h_admin_sass__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _head_footer_admin__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./head-footer/admin */ \"./head-footer/admin.js\");\n\r\n\n\n//# sourceURL=webpack://pixel-wp-library/./px-admin.js?");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./px-admin.js");
/******/ 	
/******/ })()
;