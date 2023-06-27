module.exports = {
  launch: {
    headless: true,
    product: 'chrome',
    args: ['--start-maximized'],
    defaultViewport: { width: 1700, height: 800 },

  },
  browserContext: 'default',
};
