module.exports = {
    plugins: [
        require("autoprefixer")({
            overrideBrowserslist: [
                "Android 4.1",
                "iOS 7.1",
                "Chrome > 31",
                "ff > 31",
                "ie >= 8"
            ],
            grid: true
        }),
        {
            postcssPlugin: "inaccurate-pseudo-where",
            Rule(rule) {
                rule.selector = rule.selector?.replace(/:where\((\.astro-\w+)\)/g, "$1");
            },
        },
    ],
};
