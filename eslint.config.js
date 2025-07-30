const js = require('@eslint/js');
const typescript = require('@typescript-eslint/eslint-plugin');
const typescriptParser = require('@typescript-eslint/parser');
const react = require('eslint-plugin-react');
const reactNative = require('eslint-plugin-react-native');
const prettier = require('eslint-plugin-prettier');
const prettierConfig = require('eslint-config-prettier');

module.exports = [
    js.configs.recommended,
    {
        files: ['**/*.{js,jsx,ts,tsx}'],
        languageOptions: {
            parser: typescriptParser,
            ecmaVersion: 'latest',
            sourceType: 'module',
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
            },
            globals: {
                console: 'readonly',
                process: 'readonly',
                __dirname: 'readonly',
                module: 'readonly',
                require: 'readonly',
                exports: 'readonly',
                global: 'readonly',
                Buffer: 'readonly',
            },
        },
        plugins: {
            '@typescript-eslint': typescript,
            react,
            'react-native': reactNative,
            prettier,
        },
        rules: {
            ...prettierConfig.rules,
            'prettier/prettier': 'error',
            'react/react-in-jsx-scope': 'off',
            'react/prop-types': 'off',
            '@typescript-eslint/no-unused-vars': 'warn',
            '@typescript-eslint/no-explicit-any': 'off',
            'react-native/no-inline-styles': 'warn',
        },
        settings: {
            react: {
                version: 'detect',
            },
        },
    },
    {
        ignores: [
            'node_modules',
            'dist',
            'build',
            '*.log',
            '.expo',
            '.next',
            '.DS_Store',
            '*.tsbuildinfo',
        ],
    },
];
