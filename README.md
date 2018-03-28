# Freeze Scroll

[![npm](https://badge.fury.io/js/%40threespot%2Ffreeze-scroll.svg)](https://www.npmjs.com/package/@threespot/freeze-scroll)
[![Build Status](https://travis-ci.org/Threespot/freeze-scroll.svg?branch=master)](https://travis-ci.org/Threespot/freeze-scroll)
[![Coverage Status](https://coveralls.io/repos/github/Threespot/freeze-scroll/badge.svg)](https://coveralls.io/github/Threespot/freeze-scroll)

This script provides a cross-browser way of preventing scroll on the body element. A common use case for this is when a modal window is open. Without this script, it’s easy for users to unknowingly scroll the page behind the modal and be disoriented when it’s closed.

Inspired by https://benfrain.com/preventing-body-scroll-for-modals-in-ios/

Note: Once Safari and iOS Safari support the “touch-action” CSS property ([caniuse.com](https://caniuse.com/#feat=css-touch-action)), we can simply toggle a class that adds the following:
```css
  .js-no-scroll,
  .js-no-scroll body {
    overflow: hidden;
    touch-action: none;
  }

  /* Create class to allow scrolling on certain elements, like modal windows */
  .allow-scroll { touch-action: auto !important; }
```

## Install

```bash
yarn add @threespot/freeze-scroll
```

## Usage

```js
import scroll from "@threespot/freeze-scroll";

// Disable scrolling
scroll.freeze();

// Enable scrolling
scroll.unfreeze();
```

## License

This is free software and may be redistributed under the terms of the [MIT license](https://github.com/Threespot/freeze-scroll/blob/master/LICENSE.md).

## About Threespot

Threespot is an independent digital agency hell-bent on helping those, and only those, who are committed to helping others. Find out more at [https://www.threespot.com](https://www.threespot.com).

[![Threespot](https://avatars3.githubusercontent.com/u/370822?v=3&s=100)](https://www.threespot.com)
