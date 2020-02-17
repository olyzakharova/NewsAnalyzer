/* eslint-disable quote-props */
/* eslint-disable no-dupe-keys */
/* eslint-disable comma-dangle */
const presets = [
  [
    '@babel/env',
    {
      targets: {
        edge: '17',
        firefox: '50',
        chrome: '64',
        safari: '11.1',
      },
      useBuiltIns: 'usage',
      corejs: '3.4.1',
      'targets': {
        'esmodules': true,
        'ie': '11',
      }
    },
  ],
];
module.exports = { presets };
