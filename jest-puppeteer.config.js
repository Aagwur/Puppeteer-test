module.exports = {
  launch: {
    headless: true,
    product: 'chrome',
    args: ['--start-maximized'],
    defaultViewport: { width: 1280, height: 720 },

  },
  browserContext: 'default',
};
