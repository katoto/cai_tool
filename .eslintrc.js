const lintConfig = require('@hll/lint-config');

module.exports = Object.assign(lintConfig.vue(), {
    "globals": {
        "wx": "readonly",
        "uni": "readonly",
        "App": true,
        "getApp": true,
        "Page": true,
        "getCurrentPages": true,
        "Component": true,
        "Behavior": true
    },
    "rules": {
        "unicorn/no-null": "off",
        "unicorn/filename-case": "off",
        "unicorn/prevent-abbreviations": "off",
        "unicorn/prefer-spread": "off"
    }
});