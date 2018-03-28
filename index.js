//------------------------------------------------------------------------
// Disable scrolling (e.g. when modal window is open)
//
// Inspired by https://benfrain.com/preventing-body-scroll-for-modals-in-ios/
//
// Note: Once Safari and iOS Safari support the “touch-action” CSS property,
//       we can simply toggle a class that adds the following:
//
//       html,
//       body {
//         overflow: hidden !important;
//         touch-action: none !important;
//       }
//
//       /* Add class to elements like modal windows that still need to scroll */
//       .allow-scroll { touch-action: auto !important; }
//
// https://caniuse.com/#feat=css-touch-action
//------------------------------------------------------------------------
"use strict";

module.exports = {
  // Save current scroll position when scrolling is disabled so we can reset it when enabled
  _scrollPos: 0,

  // Track whether or not we have injected CSS the already
  _hasCSS: false,

  // Inject <style> tag with CSS rules (simpler than toggling a lot of inline styles)
  _injectCSS: function() {

    // Don’t add styles more than once
    if (!this._hasCSS) {
      var css = `
        html.js-no-scroll { height: 100% !important; }
        .js-no-scroll body {
          height: 100%;
          overflow: hidden !important;
          position: fixed !important;
          width: 100% !important;
        }`;

      // Note: Setting “position: fixed” on the body prevents iOS from scrolling.
      //       However, this will cause the browser to scroll to the top, so we must
      //       add inline “height” and “top” styles to the body to address this.

      // Create <style> tag and add to <head>
      // https://stackoverflow.com/a/524721/673457
      var styleEl = document.createElement('style');
      styleEl.type = 'text/css';
      styleEl.appendChild(document.createTextNode(css));
      document.head.appendChild(styleEl);

      // Update var so we can avoid loading the CSS multiple times
      this._hasCSS = true;
    }
  },

  _saveScrollPos: function() {
    this._scrollPos = window.pageYOffset || document.documentElement.scrollTop;
  },

  /**
   * Disable scrolling
   */
  freeze: function() {
    // Add required inline CSS (only runs first time)
    this._injectCSS();

    this._saveScrollPos();

    // Add class to prevent page scrolling (sets fixed position on body)
    document.documentElement.classList.add("js-no-scroll");

    // Add inline styles if not already at top of page
    if (this._scrollPos > 0) {
      document.body.style.height = "calc(100% + " + this._scrollPos + "px)";
      document.body.style.top = -this._scrollPos + "px";
    }
  },

  /**
   * Enable scrolling
   */
  unfreeze: function() {
    // Remove js-no-scroll class
    document.documentElement.classList.remove("js-no-scroll");

    if (this._scrollPos > 0) {
      // Remove inline styles on body, which causes the page to jump to the top.
      document.body.style.height = "";
      document.body.style.top = "";

      // Disable native smooth scrolling before resetting the scroll position.
      // Otherwise, there would be an annoying jump after scrolling is enabled.
      if (document.documentElement.style.hasOwnProperty('scrollBehavior')) {
        document.documentElement.style.scrollBehavior = "auto";
      }

      // Reset scroll position to what it was before scrolling was disabled.
      window.scrollTo(0, this._scrollPos);

      // Re-enable native smooth scrolling
      if (document.documentElement.style.hasOwnProperty('scrollBehavior')) {
        document.documentElement.style.scrollBehavior = "";
      }
    }
  }
};
