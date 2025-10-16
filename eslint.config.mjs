import globals from "globals";
import pluginJs from "@eslint/js";

export default [
    {
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node,
            },
        },
        rules: {
            indent: ["error", 4],
            "linebreak-style": 0,
            quotes: ["error", "double"],
            semi: ["error", "always"],
        },
    },
    pluginJs.configs.recommended,
];