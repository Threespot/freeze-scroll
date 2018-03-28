define("freeze-scrollLink", [], function() { return /******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("//------------------------------------------------------------------------\n// Disable scrolling (e.g. when modal window is open)\n//\n// Inspired by https://benfrain.com/preventing-body-scroll-for-modals-in-ios/\n//\n// Note: Once Safari and iOS Safari support the “touch-action” CSS property,\n//       we can simply toggle a class that adds the following:\n//\n//       html,\n//       body {\n//         overflow: hidden !important;\n//         touch-action: none !important;\n//       }\n//\n//       /* Add class to elements like modal windows that still need to scroll */\n//       .allow-scroll { touch-action: auto !important; }\n//\n// https://caniuse.com/#feat=css-touch-action\n//------------------------------------------------------------------------\n\n\nmodule.exports = {\n  // Save current scroll position when scrolling is disabled so we can reset it when enabled\n  _scrollPos: 0,\n\n  // Track whether or not we have injected CSS the already\n  _hasCSS: false,\n\n  // Inject <style> tag with CSS rules (simpler than toggling a lot of inline styles)\n  _injectCSS: function _injectCSS() {\n\n    // Don’t add styles more than once\n    if (!this._hasCSS) {\n      var css = '\\n        html.js-no-scroll { height: 100% !important; }\\n        .js-no-scroll body {\\n          height: 100%;\\n          overflow: hidden !important;\\n          position: fixed !important;\\n          width: 100% !important;\\n        }';\n\n      // Note: Setting “position: fixed” on the body prevents iOS from scrolling.\n      //       However, this will cause the browser to scroll to the top, so we must\n      //       add inline “height” and “top” styles to the body to address this.\n\n      // Create <style> tag and add to <head>\n      // https://stackoverflow.com/a/524721/673457\n      var styleEl = document.createElement('style');\n      styleEl.type = 'text/css';\n      styleEl.appendChild(document.createTextNode(css));\n      document.head.appendChild(styleEl);\n\n      // Update var so we can avoid loading the CSS multiple times\n      this._hasCSS = true;\n    }\n  },\n\n  _saveScrollPos: function _saveScrollPos() {\n    this._scrollPos = window.pageYOffset || document.documentElement.scrollTop;\n  },\n\n  /**\n   * Disable scrolling\n   */\n  freeze: function freeze() {\n    // Add required inline CSS (only runs first time)\n    this._injectCSS();\n\n    this._saveScrollPos();\n\n    // Add class to prevent page scrolling (sets fixed position on body)\n    document.documentElement.classList.add(\"js-no-scroll\");\n\n    // Add inline styles if not already at top of page\n    if (this._scrollPos > 0) {\n      document.body.style.height = \"calc(100% + \" + this._scrollPos + \"px)\";\n      document.body.style.top = -this._scrollPos + \"px\";\n    }\n  },\n\n  /**\n   * Enable scrolling\n   */\n  unfreeze: function unfreeze() {\n    // Remove js-no-scroll class\n    document.documentElement.classList.remove(\"js-no-scroll\");\n\n    if (this._scrollPos > 0) {\n      // Remove inline styles on body, which causes the page to jump to the top.\n      document.body.style.height = \"\";\n      document.body.style.top = \"\";\n\n      // Disable native smooth scrolling before resetting the scroll position.\n      // Otherwise, there would be an annoying jump after scrolling is enabled.\n      if (document.documentElement.style.hasOwnProperty('scrollBehavior')) {\n        document.documentElement.style.scrollBehavior = \"auto\";\n      }\n\n      // Reset scroll position to what it was before scrolling was disabled.\n      window.scrollTo(0, this._scrollPos);\n\n      // Re-enable native smooth scrolling\n      if (document.documentElement.style.hasOwnProperty('scrollBehavior')) {\n        document.documentElement.style.scrollBehavior = \"\";\n      }\n    }\n  }\n};\n\n//# sourceURL=webpack://%5Bname%5DLink/./index.js?");

/***/ })

/******/ })});;
//# sourceMappingURL=freeze-scroll.amd.js.map