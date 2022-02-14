const lintConfig = require("@hll/lint-config");

module.exports = Object.assign(lintConfig.vue(), {
  globals: {
    wx: "readonly",
    uni: "readonly",
    App: true,
    getApp: true,
    Page: true,
    getCurrentPages: true,
    Component: true,
    Behavior: true
  },
  rules: {
    "unicorn/no-null": "off",
    "unicorn/filename-case": "off",
    "unicorn/prevent-abbreviations": "off",
    "unicorn/prefer-spread": "off",
    "unicorn/consistent-function-scoping": "off",
    "prettier/prettier": "off",
    "unicorn/no-object-as-default-parameter": "off",
    "unicorn/no-array-for-each": "off",
    "unicorn/no-this-assignment": "off",
    "vue/no-side-effects-in-computed-properties": "off",
    "no-unreachable": 'off',
    "no-dupe-keys": 'off'
  }
});
