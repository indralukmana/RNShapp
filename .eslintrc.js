module.exports = {
    root: true,
    extends: [
        '@react-native-community',
        'airbnb-typescript',
        'prettier',
        'prettier/@typescript-eslint',
        'prettier/react',
    ],
    plugins: ['react', 'react-native'],
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
    },
    env: {
        'react-native/react-native': true,
    },
    rules: {
        'react-native/no-unused-styles': 'warn',
        'react-native/split-platform-components': 'warn',
        'react-native/no-inline-styles': 'off',
        'react-native/no-color-literals': 'off',
        'react-native/no-raw-text': 'off',
        'react-native/no-single-element-style-arrays': 'warn',
        'react/jsx-props-no-spreading': 'off',
        'import/no-extraneous-dependencies': 'off',
        'no-case-declarations': 'off',
        'no-return-assign': 'off',
        'react/prop-types': 'off',
        'no-underscore-dangle': 'off',
        'react-hooks/exhaustive-deps': 'warn',
    },
}
