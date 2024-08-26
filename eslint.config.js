import globals from "globals";
import pluginJs from "@eslint/js";
import airbnbBase from "eslint-config-airbnb-base";
import importPlugin from "eslint-plugin-import";

export default [
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node, // Node.js globals
      },
    },
  },
  pluginJs.configs.recommended, // ESLint's recommended config
  airbnbBase, // Airbnb's base config
  {
    plugins: {
      import: importPlugin, // Needed for Airbnb config
    },
  },
];
