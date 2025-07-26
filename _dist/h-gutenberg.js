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

/***/ "./gutenberg/_legacy/h-gutenberg.js":
/*!******************************************!*\
  !*** ./gutenberg/_legacy/h-gutenberg.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ \"@wordpress/blocks\");\n/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/hooks */ \"@wordpress/hooks\");\n/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/dom-ready */ \"@wordpress/dom-ready\");\n/* harmony import */ var _wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _h_gutenberg_sass__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./h-gutenberg.sass */ \"./gutenberg/_legacy/h-gutenberg.sass\");\n/* harmony import */ var _h_gutenberg_sass__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_h_gutenberg_sass__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _px_gutenberg_sass__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../px-gutenberg.sass */ \"./gutenberg/px-gutenberg.sass\");\n/* harmony import */ var _px_gutenberg_sass__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_px_gutenberg_sass__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _h_cover_mobile_jsx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./h-cover-mobile.jsx */ \"./gutenberg/_legacy/h-cover-mobile.jsx\");\n/* harmony import */ var _group_row_columns_editor_jsx__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../group-row-columns/editor.jsx */ \"./gutenberg/group-row-columns/editor.jsx\");\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n_wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_2___default()(() => {\r\n  window.localizeH.disallowedBlocks.forEach((name) => {\r\n    (0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.unregisterBlockType)(name);\r\n  });\r\n\r\n  // Disable useless Group variation\r\n  (0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.unregisterBlockVariation)('core/group', 'group-stack');\r\n});\r\n\r\n// Modify settings for Core blocks\r\n(0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_1__.addFilter)('blocks.registerBlockType', 'h/set_default_alignment', (settings, name) => {\r\n  switch (name) {\r\n    // Paragraph and List is allowed to use wide alignment\r\n    case 'core/paragraph':\r\n    case 'core/list':\r\n    case 'core/code':\r\n    case 'core/verse':\r\n    case 'core/preformatted':\r\n    case 'core/table':\r\n    case 'core/pullquote':\r\n    case 'core/heading':\r\n      settings.supports = {\r\n        ...settings.supports,\r\n        align: ['wide'],\r\n      };\r\n      break;\r\n\r\n    case 'core/gallery':\r\n      settings.supports = {\r\n        ...settings.supports,\r\n        align: ['wide', 'full'],\r\n      };\r\n      break;\r\n\r\n    case 'core/separator':\r\n      settings.supports = {\r\n        ...settings.supports,\r\n        align: ['wide'],\r\n      };\r\n      break;\r\n\r\n    // Remove align left and right\r\n    case 'core/file':\r\n    case 'core/audio':\r\n      settings.supports = {\r\n        ...settings.supports,\r\n        align: [],\r\n      };\r\n      break;\r\n\r\n    // only allow center\r\n    case 'core/social-links':\r\n      settings.supports = {\r\n        ...settings.supports,\r\n        align: ['center'],\r\n      };\r\n      break;\r\n\r\n    // Columns default is now wide\r\n    case 'core/columns':\r\n      settings.supports = {\r\n        ...settings.supports,\r\n        align: ['wide'],\r\n      };\r\n\r\n      settings.attributes = {\r\n        ...settings.attributes,\r\n        align: {\r\n          type: 'string',\r\n          default: 'wide',\r\n        },\r\n      };\r\n      break;\r\n\r\n    // Remove layout setting in Child Column\r\n    case 'core/column':\r\n      settings.supports = {\r\n        ...settings.supports,\r\n        __experimentalLayout: false,\r\n      };\r\n      break;\r\n\r\n    case 'core/button':\r\n      settings.supports = {\r\n        ...settings.supports,\r\n        __experimentalBorder: false,\r\n      };\r\n      break;\r\n\r\n    // Group defaults to full and remove the Justification\r\n    case 'core/group':\r\n      settings.supports = {\r\n        ...settings.supports,\r\n        // __experimentalLayout: false,\r\n      };\r\n\r\n      settings.attributes = {\r\n        ...settings.attributes,\r\n        align: {\r\n          type: 'string',\r\n          default: 'full',\r\n        },\r\n        layout: {\r\n          type: [Object],\r\n          default: { inherit: true },\r\n        },\r\n      };\r\n      break;\r\n\r\n    // Cover defaults to Full\r\n    case 'core/cover':\r\n      settings.attributes = {\r\n        ...settings.attributes,\r\n        align: {\r\n          type: 'string',\r\n          default: 'full',\r\n        },\r\n      };\r\n      break;\r\n\r\n    default:\r\n      break;\r\n  }\r\n\r\n  // SPACING SETTINGS\r\n  if (!settings.supports) {\r\n    settings.supports = {};\r\n  }\r\n\r\n  switch (name) {\r\n    // Has visible padding and margin\r\n    case 'core/group':\r\n    case 'core/columns':\r\n    case 'core/cover':\r\n      settings.supports.spacing = {\r\n        ...settings.supports.spacing,\r\n        margin: ['top', 'bottom'],\r\n        __experimentalDefaultControls: {\r\n          padding: true,\r\n          margin: true,\r\n        },\r\n      };\r\n      break;\r\n\r\n    // Has hidden margin and padding\r\n    case 'core/heading':\r\n    case 'core/paragraph':\r\n    case 'core/quote':\r\n    case 'core/list':\r\n    case 'core/gallery':\r\n    case 'core/code':\r\n    case 'core/verse':\r\n    case 'core/preformatted':\r\n    case 'core/table':\r\n      settings.supports.spacing = {\r\n        ...settings.supports.spacing,\r\n        padding: true,\r\n        margin: ['top', 'bottom'],\r\n        // __experimentalDefaultControls: {\r\n        //   margin: true,\r\n        // },\r\n      };\r\n      break;\r\n\r\n    // Only margin\r\n    case 'core/buttons':\r\n    case 'core/separator':\r\n    case 'core/image':\r\n    case 'core/media-text':\r\n    case 'core/latest-posts':\r\n      settings.supports.spacing = {\r\n        ...settings.supports.spacing,\r\n        padding: false,\r\n        margin: ['top', 'bottom'],\r\n        // __experimentalDefaultControls: {\r\n        //   margin: true,\r\n        // },\r\n      };\r\n      break;\r\n\r\n    // Has visible padding, but hidden margin\r\n    case 'core/column':\r\n      settings.supports.spacing = {\r\n        ...settings.supports.spacing,\r\n        padding: true,\r\n        margin: ['top', 'bottom'],\r\n        __experimentalDefaultControls: {\r\n          padding: true,\r\n          margin: false,\r\n        }\r\n      };\r\n      break;\r\n\r\n    default:\r\n      // do nothing\r\n      break;\r\n  }\r\n\r\n  // FONT SIZE Settings\r\n  switch (name) {\r\n    case 'core/paragraph':\r\n    case 'core/list':\r\n      settings.supports.typography = {\r\n        ...settings.supports.typography,\r\n        fontSize: true,\r\n      };\r\n      break;\r\n\r\n    default:\r\n      settings.supports.typography = false;\r\n      break;\r\n  }\r\n\r\n  return settings;\r\n});\r\n\n\n//# sourceURL=webpack://pixel-wp-library/./gutenberg/_legacy/h-gutenberg.js?");

/***/ }),

/***/ "./gutenberg/_legacy/h-gutenberg.sass":
/*!********************************************!*\
  !*** ./gutenberg/_legacy/h-gutenberg.sass ***!
  \********************************************/
/***/ (() => {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack://pixel-wp-library/./gutenberg/_legacy/h-gutenberg.sass?");

/***/ }),

/***/ "./gutenberg/group-row-columns/editor.sass":
/*!*************************************************!*\
  !*** ./gutenberg/group-row-columns/editor.sass ***!
  \*************************************************/
/***/ (() => {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack://pixel-wp-library/./gutenberg/group-row-columns/editor.sass?");

/***/ }),

/***/ "./gutenberg/px-gutenberg.sass":
/*!*************************************!*\
  !*** ./gutenberg/px-gutenberg.sass ***!
  \*************************************/
/***/ (() => {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack://pixel-wp-library/./gutenberg/px-gutenberg.sass?");

/***/ }),

/***/ "./gutenberg/_legacy/h-cover-mobile.jsx":
/*!**********************************************!*\
  !*** ./gutenberg/_legacy/h-cover-mobile.jsx ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/hooks */ \"@wordpress/hooks\");\n/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/compose */ \"@wordpress/compose\");\n/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_compose__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/element */ \"@wordpress/element\");\n/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/block-editor */ \"@wordpress/block-editor\");\n/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/components */ \"@wordpress/components\");\n/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__);\n\n\n\n\n\n\n\n/**\r\n * Add a new setting in Inspector to upload mobile image\r\n */\nconst addControl = (0,_wordpress_compose__WEBPACK_IMPORTED_MODULE_2__.createHigherOrderComponent)(BlockEdit => {\n  return props => {\n    // Do nothing if it's another block than our defined ones.\n    if (!['core/cover'].includes(props.name)) {\n      return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(BlockEdit, {\n        ...props\n      });\n    }\n    let atts = props.attributes;\n    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(BlockEdit, {\n      ...props\n    }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4__.InspectorControls, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.PanelBody, {\n      title: \"Mobile Cover\",\n      initialOpen: \"true\"\n    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.__experimentalUnitControl, {\n      id: `block-cover-mobile-height-input-${(0,_wordpress_compose__WEBPACK_IMPORTED_MODULE_2__.useInstanceId)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.__experimentalUnitControl)}`,\n      label: \"Mobile Height\",\n      value: atts.hMobileHeight,\n      onChange: newValue => {\n        props.setAttributes({\n          hMobileHeight: newValue\n        });\n      },\n      isResetValueOnUnitChange: true,\n      __unstableInputWidth: '80px'\n    }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(\"p\", null, \"\\xA0\"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(\"p\", null, \"Leave empty to use the primary image in mobile.\"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(\"div\", null, atts.hMobileMediaURL && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(\"img\", {\n      src: atts.hMobileMediaURL\n    }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4__.MediaUpload, {\n      allowedTypes: \"image\",\n      value: atts.hMobileMediaID,\n      onSelect: media => {\n        props.setAttributes({\n          hMobileMediaID: media.id,\n          hMobileMediaURL: media.url\n        });\n      },\n      render: _renderImageButton\n    })))));\n\n    /**\r\n     * Render image upload button in sidebar\r\n     */\n    function _renderImageButton(obj) {\n      return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.Button, {\n        className: \"button\",\n        onClick: obj.open\n      }, atts.hMobileMediaID ? 'Change image' : 'Upload image'), atts.hMobileMediaID && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.Button, {\n        onClick: () => {\n          props.setAttributes({\n            hMobileMediaURL: null,\n            hMobileMediaID: null\n          });\n        }\n      }, \"Remove\"));\n    }\n  };\n}, 'withInspectorControl');\n\n/**\r\n * Add extra attribute to Cover block for the mobile image\r\n */\n(0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_1__.addFilter)('blocks.registerBlockType', 'extend-cover/attributes', (settings, name) => {\n  // Do nothing if it's another block than our defined ones.\n  if (!['core/cover'].includes(name)) {\n    return settings;\n  }\n  settings.attributes = {\n    ...settings.attributes,\n    hMobileMediaID: {\n      type: 'number'\n    },\n    hMobileMediaURL: {\n      type: 'string'\n    },\n    hMobileHeight: {\n      type: 'string',\n      default: '400px'\n    }\n  };\n  return settings;\n});\n(0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_1__.addFilter)('editor.BlockEdit', 'extend-cover/edit', addControl);\n\n//# sourceURL=webpack://pixel-wp-library/./gutenberg/_legacy/h-cover-mobile.jsx?");

/***/ }),

/***/ "./gutenberg/group-row-columns/editor.jsx":
/*!************************************************!*\
  !*** ./gutenberg/group-row-columns/editor.jsx ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/hooks */ \"@wordpress/hooks\");\n/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/compose */ \"@wordpress/compose\");\n/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_compose__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/block-editor */ \"@wordpress/block-editor\");\n/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/components */ \"@wordpress/components\");\n/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _editor_sass__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./editor.sass */ \"./gutenberg/group-row-columns/editor.sass\");\n/* harmony import */ var _editor_sass__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_editor_sass__WEBPACK_IMPORTED_MODULE_5__);\n\n\n\n\n\n\n\n/**\r\n * Add extra attribute to Cover block for the mobile image\r\n */\n(0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_1__.addFilter)('blocks.registerBlockType', 'extend-group-row/attributes', (settings, name) => {\n  // Do nothing if it's another block than our defined ones.\n  if (!['core/group'].includes(name)) {\n    return settings;\n  }\n  settings.attributes = {\n    ...settings.attributes,\n    pxRowColumns: {\n      type: 'number',\n      default: 'auto'\n    }\n  };\n  return settings;\n});\n\n/**\r\n * Add a new setting in Inspector to upload mobile image\r\n */\nconst addControl = (0,_wordpress_compose__WEBPACK_IMPORTED_MODULE_2__.createHigherOrderComponent)(BlockEdit => {\n  return function (props) {\n    // Do nothing if it's another block than our defined ones.\n    if (!['core/group'].includes(props.name)) {\n      return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(BlockEdit, {\n        ...props\n      });\n    }\n    const atts = props.attributes;\n    // const wrapperProps = {\n    //   ...props.wrapperProps,\n    //   className: `has-columns-${atts.pxRowColumns} ${props.className}`,\n    // };\n\n    // propss.className = `has-columns-${atts.pxRowColumns}`;\n\n    // Do nothing if not flex group\n    if (atts.layout.type !== 'flex') {\n      return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(BlockEdit, {\n        ...props\n      });\n    }\n    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(BlockEdit, {\n      ...props\n    }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.InspectorControls, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.PanelBody, {\n      title: \"Row Columns\",\n      initialOpen: \"true\"\n    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.ButtonGroup, {\n      \"aria-label\": \"Row Columns\"\n    }, ['auto', 2, 3, 4].map(buttonValue => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.Button, {\n      key: `row-columns-${buttonValue}`,\n      variant: buttonValue === atts.pxRowColumns ? 'primary' : undefined,\n      onClick: () => {\n        const newAtts = {\n          pxRowColumns: buttonValue\n        };\n        const currentClasses = atts.className || '';\n        if (buttonValue === 'auto') {\n          newAtts.className = currentClasses.replace(/px-has-columns-\\d/, '');\n        } else {\n          newAtts.className = currentClasses.match(/px-has-columns-\\d/) ? currentClasses.replace(/px-has-columns-\\d/, `px-has-columns-${buttonValue}`) : `${currentClasses} px-has-columns-${buttonValue}`;\n        }\n        props.setAttributes(newAtts);\n      }\n    }, buttonValue))))));\n  };\n}, 'withInspectorControl');\n(0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_1__.addFilter)('editor.BlockEdit', 'extend-group-row/edit', addControl);\n\n//# sourceURL=webpack://pixel-wp-library/./gutenberg/group-row-columns/editor.jsx?");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = window["React"];

/***/ }),

/***/ "@wordpress/block-editor":
/*!*************************************!*\
  !*** external ["wp","blockEditor"] ***!
  \*************************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["blockEditor"];

/***/ }),

/***/ "@wordpress/blocks":
/*!********************************!*\
  !*** external ["wp","blocks"] ***!
  \********************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["blocks"];

/***/ }),

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["components"];

/***/ }),

/***/ "@wordpress/compose":
/*!*********************************!*\
  !*** external ["wp","compose"] ***!
  \*********************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["compose"];

/***/ }),

/***/ "@wordpress/dom-ready":
/*!**********************************!*\
  !*** external ["wp","domReady"] ***!
  \**********************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["domReady"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["element"];

/***/ }),

/***/ "@wordpress/hooks":
/*!*******************************!*\
  !*** external ["wp","hooks"] ***!
  \*******************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["hooks"];

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
/******/ 	var __webpack_exports__ = __webpack_require__("./gutenberg/_legacy/h-gutenberg.js");
/******/ 	
/******/ })()
;