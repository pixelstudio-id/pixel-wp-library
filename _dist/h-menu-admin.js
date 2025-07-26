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

/***/ "./menu/src/h-menu-admin.js":
/*!**********************************!*\
  !*** ./menu/src/h-menu-admin.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _h_menu_admin_sass__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./h-menu-admin.sass */ \"./menu/src/h-menu-admin.sass\");\n/* harmony import */ var _h_menu_admin_sass__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_h_menu_admin_sass__WEBPACK_IMPORTED_MODULE_0__);\n\r\n\r\nconst myMenu = {\r\n  init() {\r\n    if (!window.wpNavMenu) { return; }\r\n\r\n    this.styleListener();\r\n    this.depthChangeListener();\r\n\r\n    // limit nav menu depth to 3rd level\r\n    window.wpNavMenu.options.globalMaxDepth = 2;\r\n  },\r\n\r\n  /**\r\n   * When megamenu columns is selected, add/remove class from it's children accordingly\r\n   */\r\n  styleListener() {\r\n    const $toggles = document.querySelectorAll('.acf-field[data-name=\"dropdown_style\"] input[type=\"radio\"]');\r\n\r\n    // add listener\r\n    $toggles.forEach(($t) => {\r\n      $t.addEventListener('click', (e) => {\r\n        const $wrapper = e.currentTarget.closest('.menu-item');\r\n\r\n        // need timeout to wait for ACF listener\r\n        setTimeout(() => {\r\n          this.megamenuAddClasses($wrapper);\r\n        });\r\n      });\r\n    });\r\n\r\n    // activate mega menu classes on load\r\n    const $parentItems = document.querySelectorAll('.menu-item.menu-item-depth-0');\r\n    $parentItems.forEach(($i) => {\r\n      this.megamenuAddClasses($i);\r\n    });\r\n  },\r\n\r\n  /**\r\n   * When depth changed, check if it's under mega menu and add/remove class accordingly\r\n   */\r\n  depthChangeListener() {\r\n    const $menu = document.querySelector('.menu');\r\n    $menu.addEventListener('mouseup', (e) => {\r\n      const $target = e.target.classList.contains('menu-item') ? e.target : e.target.closest('.menu-item');\r\n      if (!$target) { return; }\r\n\r\n      // wait until the class is changed\r\n      setTimeout(() => {\r\n        const $prevItem = $target.previousElementSibling;\r\n        const isUnderMegaMenu = $prevItem.classList.contains('px-megamenu__child') || $prevItem.classList.contains('px-megamenu');\r\n        if (this.isChildItem($target) && isUnderMegaMenu) {\r\n          $target.classList.add('px-megamenu__child');\r\n        } else {\r\n          $target.classList.remove('px-megamenu__child');\r\n        }\r\n      });\r\n    });\r\n  },\r\n\r\n  /**\r\n   * Check whether current item and all its children need mega menu classes\r\n   *\r\n   * @param $item - `.menu-item` DOM object in the Appearance > Menu page.\r\n   */\r\n  megamenuAddClasses($item) {\r\n    const $checkedOption = $item.querySelector('[data-name=\"dropdown_style\"] input[type=\"radio\"]:checked');\r\n    const $children = [];\r\n\r\n    let $currentItem = $item;\r\n\r\n    // loop to get all children\r\n    while (true) {\r\n      const $nextItem = $currentItem.nextElementSibling;\r\n\r\n      // Abort if no more next element\r\n      if (!$nextItem) { break; }\r\n\r\n      const isChildItem = this.isChildItem($nextItem);\r\n\r\n      if (isChildItem) {\r\n        $children.push($nextItem);\r\n      } else {\r\n        break; // abort if no more child item\r\n      }\r\n\r\n      $currentItem = $nextItem;\r\n    }\r\n\r\n    // if have checked option, add mega menu classes\r\n    if ($checkedOption.value === 'mega-menu') {\r\n      $item.classList.add('px-megamenu');\r\n\r\n      $children.forEach(($c) => {\r\n        $c.classList.add('px-megamenu__child');\r\n      });\r\n    } else { // if unchecked, remove mega menu classes\r\n      $item.classList.remove('px-megamenu');\r\n\r\n      $children.forEach(($c) => {\r\n        $c.classList.remove('px-megamenu__child');\r\n      });\r\n    }\r\n  },\r\n\r\n  /**\r\n   * Check if a DOM object is a child menu item\r\n   */\r\n  isChildItem($item) {\r\n    return $item.classList.contains('menu-item-depth-1') || $item.classList.contains('menu-item-depth-2');\r\n  },\r\n};\r\n\r\nfunction onReady() {\r\n  myMenu.init();\r\n}\r\n\r\nfunction onLoad() {\r\n  // script that runs when everything is loaded\r\n}\r\n\r\ndocument.addEventListener('DOMContentLoaded', onReady);\r\nwindow.addEventListener('load', onLoad);\r\n\n\n//# sourceURL=webpack://pixel-wp-library/./menu/src/h-menu-admin.js?");

/***/ }),

/***/ "./menu/src/h-menu-admin.sass":
/*!************************************!*\
  !*** ./menu/src/h-menu-admin.sass ***!
  \************************************/
/***/ (() => {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack://pixel-wp-library/./menu/src/h-menu-admin.sass?");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./menu/src/h-menu-admin.js");
/******/ 	
/******/ })()
;