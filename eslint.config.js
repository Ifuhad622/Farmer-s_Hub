/** @type {import('eslint').Linter.FlatConfig} */
const config = [
    {
        languageOptions: {
            globals: {
                // Define global variables here
                window: 'readonly',
                document: 'readonly',
                // Add other globals as needed
            },
        },
        files: ['**/*.js', '**/*.jsx'], // Specify the files to lint
        plugins: {
            react: require('eslint-plugin-react'),
        },
        rules: {
            // Add your custom rules here
        },
    },
];

module.exports = config;
