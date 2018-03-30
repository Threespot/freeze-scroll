// Jest doesn’t support window.scrollTo so we have to mock it
global.scrollTo = jest.fn();
