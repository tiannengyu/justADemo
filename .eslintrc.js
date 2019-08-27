module.exports = {
    parser: '@typescript-eslint/parser', // Specifies the ESLint parser
    extends: [
        'plugin:@typescript-eslint/recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
        'plugin:react/recommended',
        'plugin:jsx-control-statements/recommended',
        'prettier/@typescript-eslint', // 使得@typescript-eslint中的样式规范失效，遵循prettier中的样式规范
        'plugin:prettier/recommended', // 使用prettier中的样式规范，且如果使得ESLint会检测prettier的格式问题，同样将格式问题以error的形式抛出
        'prettier/react'
    ],
    "settings": {
        "react": {
            "version": "detect",
        }
    },
    plugins: ['@typescript-eslint', 'react', 'jsx-control-statements', 'prettier'],
    env: {
        browser: true,
        node: true,
        es6: true,
        mocha: true,
        'jsx-control-statements/jsx-control-statements': true
    },
    globals: {
        $: true
    },
    // 配置自定义规则
    rules: {
        'prettier/prettier': 0,
        '@typescript-eslint/indent': ['error', 4, { VariableDeclarator: 4, SwitchCase: 1 }],
        '@typescript-eslint/no-unused-vars': 0,
        "@typescript-eslint/interface-name-prefix": 0,
        "@typescript-eslint/explicit-member-accessibility": 0,
        'no-console': ['warn', { allow: ['warn', 'error'] }],
        "eqeqeq": ['warn', 'always'],
        // React相关校验规则
        "react/jsx-indent": [2, 4],
        "react/jsx-no-undef": [2, { allowGlobals: true }],
        "jsx-control-statements/jsx-use-if-tag": 0,
    }
};