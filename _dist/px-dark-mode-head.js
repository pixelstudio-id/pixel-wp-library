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

/***/ "./widgets-dark-mode/src/script-head.js":
/*!**********************************************!*\
  !*** ./widgets-dark-mode/src/script-head.js ***!
  \**********************************************/
/***/ (() => {

eval("// Script that needs to be at <head> so it runs first\r\n\r\nconst darkMode = localStorage.pxDarkMode === 'true';\r\n\r\nif (darkMode) {\r\n  document.querySelector('html').classList.add('px-is-dark');\r\n\r\n  // activate the toggle\r\n  document.addEventListener('DOMContentLoaded', () => {\r\n    const $toggles = document.querySelectorAll('.px-dark-toggle input[type=\"checkbox\"]');\r\n    $toggles.forEach(($t) => {\r\n      $t.checked = true;\r\n    });\r\n  });\r\n}\r\n\n\n//# sourceURL=webpack://pixel-wp-library/./widgets-dark-mode/src/script-head.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./widgets-dark-mode/src/script-head.js"]();
/******/ 	
/******/ })()
;