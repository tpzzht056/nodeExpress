module.exports = {
    extends: [
        'eslint-config-alloy/typescript',
    ],
    env: {
        node: true,
        browser: false
    },
    globals: {
        // 这里填入你的项目需要的全局变量
        // 这里值为 false 表示这个全局变量不允许被重新赋值，比如：
        //
        // jQuery: false,
        // $: false
    },
    rules: {
        //跟js有关的eslint
        'array-callback-return': 'off',
        'no-global-assign': ['error', { 'exceptions': ['Object'] }],
        'no-new': 'off',
        'no-return-assign': 'off',
        'no-useless-call': 'off',
        'no-restricted-syntax': ['error', 'SequenceExpression'],
        'no-unused-vars': 'off',
        'no-buffer-constructor': 'off',
        'block-spacing': 'off',
        'no-trailing-spaces': ['error', { 'skipBlankLines': true, 'ignoreComments': true }],
        'one-war': 'off',
        'one-var-declaration-per-line': 'off',
        'prefer-object-spread': 'off',
        'spaced-comment': 'off',
        quotes: 'off',
        'no-var': 'off',
        'prefer-promise-reject-errors': ['error', {allowEmptyReject: true}],
        //跟ts有关的eslint
        /**
         * 必须设置类的成员的可访问性
         */
        '@typescript-eslint/explicit-member-accessibility': 'off',
        /**
         * 接口和类型别名的成员之间必须使用分号分隔
         * 
         * 改为接口必须使用逗号分隔，切最后一个不能使用逗号。
         * 类型依然只能使用分号分隔
         * @fixable
         */
        '@typescript-eslint/member-delimiter-style': ['error', {
            overrides: {
                'interface': {
                    multiline: {
                        delimiter: 'comma',
                        requireLast: false
                    },
                    singleline: {
                        delimiter: 'comma',
                        requireLast: false
                    }
                }
            }
        }],
        /**
         * 禁止给一个初始化时直接赋值为 number, string 的变量显式的指定类型
         * @fixable
         */
        '@typescript-eslint/no-inferrable-types': 'off',
        /**
         * 禁止对对象字面量进行类型断言
         */
        '@typescript-eslint/no-object-literal-type-assertion': 'off',
    }
};