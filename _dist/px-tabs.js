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

/***/ "./block-tabs/px-tabs.js":
/*!*******************************!*\
  !*** ./block-tabs/px-tabs.js ***!
  \*******************************/
/***/ (() => {

eval("\r\nfunction onReady() {\r\n  const pxTabs = (tabsWrapper) => {\r\n    const tabLabels = tabsWrapper.querySelectorAll('[role=\"tab\"]');\r\n\r\n    for (let x = 0; x < tabLabels.length; x++) {\r\n      tabLabels[x].addEventListener('click', focusEventHandler);\r\n    }\r\n\r\n    const keys = {\r\n      end: 35,\r\n      home: 36,\r\n      left: 37,\r\n      up: 38,\r\n      right: 39,\r\n      down: 40,\r\n    };\r\n\r\n    // Add or subtract depending on key pressed\r\n    const direction = {\r\n      37: -1,\r\n      38: -1,\r\n      39: 1,\r\n      40: 1,\r\n    };\r\n\r\n    let activeIndex = 0;\r\n\r\n    const init = () => {\r\n      activeIndex = tabsWrapper.getAttribute('data-default-tab') || 0;\r\n      setActiveTab(activeIndex);\r\n    };\r\n\r\n    const initEvents = () => {\r\n      tabLabels.forEach((tabLabel) => {\r\n        tabLabel.addEventListener('click', () => {\r\n          setActiveTab(tabLabel.getAttribute('tabid'));\r\n        });\r\n\r\n        tabLabel.addEventListener('keydown', (e) => {\r\n          const key = e.keyCode;\r\n          switch (key) {\r\n            case keys.up:\r\n            case keys.down:\r\n              determineOrientation(e);\r\n              break;\r\n          }\r\n        });\r\n\r\n        tabLabel.addEventListener('keyup', (e) => {\r\n          if (e.key === 'Enter') {\r\n            setActiveTab(tabLabel.getAttribute('tabid'));\r\n            return;\r\n          }\r\n\r\n          const key = e.keyCode;\r\n\r\n          switch (key) {\r\n            case keys.left:\r\n            case keys.right:\r\n              determineOrientation(e);\r\n              break;\r\n          }\r\n        });\r\n      });\r\n    };\r\n\r\n    const setActiveTab = (id) => {\r\n      tabsWrapper\r\n        .querySelectorAll('dd[tabid]')\r\n        .forEach((tab) => {\r\n          tab.style.display = 'none';\r\n          tab.classList.remove('active');\r\n        });\r\n\r\n      tabLabels.forEach((label) => {\r\n        label.classList.remove('active');\r\n        label.setAttribute('aria-selected', 'false');\r\n      });\r\n\r\n      activeIndex = parseInt(id);\r\n\r\n      const currentTabLabel = tabsWrapper.querySelector(\r\n        'dt[tabid=\"' + activeIndex + '\"]'\r\n      );\r\n\r\n      currentTabLabel.classList.add('active');\r\n      currentTabLabel.setAttribute('aria-selected', 'true');\r\n\r\n      tabsWrapper.querySelector('dd[tabid=\"' + activeIndex + '\"]').style.display = 'block';\r\n      tabsWrapper.querySelector('dd[tabid=\"' + activeIndex + '\"]').classList.add('active');\r\n\r\n      const event = new CustomEvent('tabChanged', {\r\n        detail: currentTabLabel,\r\n      });\r\n\r\n      window.dispatchEvent(event);\r\n    };\r\n\r\n    const determineOrientation = (event) => {\r\n      const key = event.keyCode;\r\n      const vertical = tabsWrapper.classList.contains('is-vertical');\r\n      let proceed = false;\r\n\r\n      if (vertical) {\r\n        if (key === keys.up || key === keys.down) {\r\n          event.preventDefault();\r\n          proceed = true;\r\n        }\r\n      } else if (key === keys.left || key === keys.right) {\r\n        proceed = true;\r\n      }\r\n\r\n      if (proceed) {\r\n        switchTabOnArrowPress(event);\r\n      }\r\n    };\r\n\r\n    function switchTabOnArrowPress(event) {\r\n      const pressed = event.keyCode;\r\n\r\n      if (direction[pressed]) {\r\n        const desiredIndex = activeIndex + direction[pressed];\r\n\r\n        if (typeof tabLabels[desiredIndex] !== 'undefined') {\r\n          tabLabels[desiredIndex].focus();\r\n        } else if (pressed === keys.left || pressed === keys.up) {\r\n          tabLabels[ tabLabels.length - 1 ].focus();\r\n        } else if (pressed === keys.right || pressed == keys.down) {\r\n          tabLabels[0].focus();\r\n        }\r\n      }\r\n    }\r\n\r\n    function focusEventHandler(event) {\r\n      const target = event.target;\r\n      setTimeout(checkTabFocus, 0, target);\r\n    }\r\n\r\n    // Only activate tab on focus if it still has focus after the delay\r\n    function checkTabFocus(target) {\r\n      const focused = document.activeElement; // eslint-disable-line\r\n      if (target === focused) {\r\n        setActiveTab(target.getAttribute('tabid'));\r\n      }\r\n    }\r\n\r\n    init();\r\n    initEvents();\r\n  };\r\n\r\n  const tabsWrappers = document.querySelectorAll('.wp-block-px-tabs');\r\n  tabsWrappers.forEach((tabsWrapper) => {\r\n    pxTabs(tabsWrapper);\r\n  });\r\n}\r\n\r\ndocument.addEventListener('DOMContentLoaded', onReady);\r\n\r\n\n\n//# sourceURL=webpack://pixel-wp-library/./block-tabs/px-tabs.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./block-tabs/px-tabs.js"]();
/******/ 	
/******/ })()
;