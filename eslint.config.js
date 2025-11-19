// eslint.config.js
import next from "eslint-config-next";
import globals from "globals";

export default [
    {
        ignores: ["**/dist/**", "**/.next/**"],
    },
    {
        files: ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx"],
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node,
            },
        },
        extends: [
            "eslint:recommended",
            ...next(),
        ],
        rules: {
            // Tus reglas personalizadas acá
        },
    },
];
