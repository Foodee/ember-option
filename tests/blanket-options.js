/* globals blanket, module */

var options = {
  modulePrefix: 'ember-option',
  filter: '//.*ember-option/.*/',
  antifilter: '//.*(tests|template).*/',
  loaderExclusions: [],
  enableCoverage: true,
  cliOptions: {
    reporters: ['json'],
    autostart: true
  }
};
if (typeof exports === 'undefined') {
  blanket.options(options);
} else {
  module.exports = options;
}
