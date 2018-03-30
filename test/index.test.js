beforeEach(jest.resetModules);

/* TODO: Test document.documentElement.style.scrollBehavior updates */

import scroll from "../index";

// Remove line breaks and consecutive spaces to make it easier to compare markup
function minify(string) {
  return string.replace(/\s{2,}/g,'').trim();
}

const body = `<div style="height: 1000px"></div>`;


test('At top of page', () => {
  document.body.innerHTML = body;

  scroll.freeze();

  expect(document.documentElement.classList.contains('js-no-scroll')).toBe(true);

  expect(minify(document.getElementsByTagName('style')[0].innerHTML)).toBe(minify(`
    html.js-no-scroll { height: 100% !important; }
      .js-no-scroll body {
        height: 100%;
        overflow: hidden !important;
        position: fixed !important;
        width: 100% !important;
      }`
  ));

  scroll.unfreeze();

  expect(document.documentElement.classList.contains('js-no-scroll')).toBe(false);
});


test('Scrolled down', () => {
  global.window.pageYOffset = 100;

  document.body.innerHTML = body;

  scroll.freeze();

  expect(document.body.style.top).toBe("-100px");

  scroll.unfreeze();

  expect(document.body.style.top).toBe("");
});
