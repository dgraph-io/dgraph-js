module.exports = {
    "env": {
        "node": true
    },
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "project": "tsconfig.json",
        "sourceType": "module"
    },
    "ignorePatterns": [
        "generated/**/*.d.ts" ,// Adjust the pattern as needed
        "lib/*.d.ts",
    ],
    "plugins": [
        "eslint-plugin-import",
        "eslint-plugin-security",
        "eslint-plugin-react",
        "eslint-plugin-jest",
        "eslint-plugin-unicorn",
        "eslint-plugin-jsdoc",
        "eslint-plugin-no-null",
        "eslint-plugin-prefer-arrow",
        "eslint-plugin-lodash",
        "jsx-a11y",
        "@typescript-eslint",
        "@typescript-eslint/tslint"
    ],
    "root": true,
    "rules": {
        "@typescript-eslint/adjacent-overload-signatures": "error",
        "@typescript-eslint/array-type": [
            "off",
            {
                "default": "array"
            }
        ],
        "@typescript-eslint/await-thenable": "error",
        "@typescript-eslint/ban-types": "off",
        "@typescript-eslint/consistent-type-assertions": "off",
        "@typescript-eslint/consistent-type-definitions": "off",
        "@typescript-eslint/dot-notation": "off",
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/explicit-member-accessibility": [
            "off",
            {
                "accessibility": "explicit"
            }
        ],
        "@typescript-eslint/explicit-module-boundary-types": "off",
        "@typescript-eslint/indent": [
            "off",
            4,
            {
                "CallExpression": {
                    "arguments": "first"
                },
                "FunctionDeclaration": {
                    "parameters": "first"
                },
                "FunctionExpression": {
                    "parameters": "first"
                }
            }
        ],
        "@typescript-eslint/member-delimiter-style": [
            "off",
            {
                "multiline": {
                    "delimiter": "semi",
                    "requireLast": true
                },
                "singleline": {
                    "delimiter": "semi",
                    "requireLast": false
                }
            }
        ],
        "@typescript-eslint/member-ordering": "off",
        "@typescript-eslint/naming-convention": [
            "off",
            {
                "selector": "variable",
                "format": [
                    "camelCase",
                    "UPPER_CASE"
                ],
                "leadingUnderscore": "forbid",
                "trailingUnderscore": "forbid"
            }
        ],
        "@typescript-eslint/no-array-constructor": "error",
        "@typescript-eslint/no-dynamic-delete": "error",
        "@typescript-eslint/no-empty-function": "error",
        "@typescript-eslint/no-empty-interface": "error",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-extraneous-class": "error",
        "@typescript-eslint/no-floating-promises": "error",
        "@typescript-eslint/no-for-in-array": "error",
        "@typescript-eslint/no-inferrable-types": "off",
        "@typescript-eslint/no-misused-new": "error",
        "@typescript-eslint/no-namespace": "off",
        "@typescript-eslint/no-non-null-assertion": "error",
        "@typescript-eslint/no-parameter-properties": "off",
        "@typescript-eslint/no-require-imports": "error",
        "@typescript-eslint/no-shadow": [
            "off",
            {
                "hoist": "all"
            }
        ],
        "@typescript-eslint/no-this-alias": "error",
        "@typescript-eslint/no-unnecessary-qualifier": "off",
        "@typescript-eslint/no-unnecessary-type-arguments": "error",
        "@typescript-eslint/no-unnecessary-type-assertion": "error",
        "@typescript-eslint/no-unused-expressions": "error",
        "@typescript-eslint/no-use-before-define": "off",
        "@typescript-eslint/no-var-requires": "error",
        "@typescript-eslint/prefer-for-of": "error",
        "@typescript-eslint/prefer-function-type": "error",
        "@typescript-eslint/prefer-namespace-keyword": "off",
        "@typescript-eslint/prefer-readonly": "error",
        "@typescript-eslint/promise-function-async": "off",
        "@typescript-eslint/quotes": [
            "off",
            "double",
            {
                "avoidEscape": true
            }
        ],
        "@typescript-eslint/restrict-plus-operands": "error",
        "@typescript-eslint/semi": [
            "off",
            "always"
        ],
        "@typescript-eslint/strict-boolean-expressions": "off",
        "@typescript-eslint/triple-slash-reference": [
            "error",
            {
                "path": "always",
                "types": "prefer-import",
                "lib": "always"
            }
        ],
        "@typescript-eslint/type-annotation-spacing": "off",
        "@typescript-eslint/typedef": [
            "error",
            {
                "parameter": true,
                "arrowParameter": true,
                "propertyDeclaration": true,
                "memberVariableDeclaration": true
            }
        ],
        "@typescript-eslint/unified-signatures": "error",
        "arrow-parens": [
            "off",
            "always"
        ],
        "brace-style": [
            "off",
            "1tbs"
        ],
        "comma-dangle": [
            "off",
            "always-multiline"
        ],
        "complexity": "error",
        "constructor-super": "error",
        "curly": "error",
        "default-case": "error",
        "dot-notation": "off",
        "eol-last": "error",
        "eqeqeq": [
            "error",
            "smart"
        ],
        "guard-for-in": "error",
        "id-denylist": "error",
        "id-match": "error",
        "import/no-default-export": "off",
        "import/no-deprecated": "off",
        "import/no-extraneous-dependencies": "error",
        "import/no-internal-modules": "off",
        "import/no-unassigned-import": "error",
        "import/order": [
            "error",
            {
                "alphabetize": {
                    "caseInsensitive": true,
                    "order": "asc"
                },
                "newlines-between": "ignore",
                "groups": [
                    [
                        "builtin",
                        "external",
                        "internal",
                        "unknown",
                        "object",
                        "type"
                    ],
                    "parent",
                    [
                        "sibling",
                        "index"
                    ]
                ],
                "distinctGroup": false,
                "pathGroupsExcludedImportTypes": [],
                "pathGroups": [
                    {
                        "pattern": "./",
                        "patternOptions": {
                            "nocomment": true,
                            "dot": true
                        },
                        "group": "sibling",
                        "position": "before"
                    },
                    {
                        "pattern": ".",
                        "patternOptions": {
                            "nocomment": true,
                            "dot": true
                        },
                        "group": "sibling",
                        "position": "before"
                    },
                    {
                        "pattern": "..",
                        "patternOptions": {
                            "nocomment": true,
                            "dot": true
                        },
                        "group": "parent",
                        "position": "before"
                    },
                    {
                        "pattern": "../",
                        "patternOptions": {
                            "nocomment": true,
                            "dot": true
                        },
                        "group": "parent",
                        "position": "before"
                    }
                ]
            }
        ],
        "indent": "off",
        "jest/no-focused-tests": "error",
        "jsdoc/check-alignment": "error",
        "jsdoc/check-indentation": "off",
        "jsdoc/newline-after-description": "off",
        "jsdoc/no-types": "error",
        "jsx-a11y/alt-text": "error",
        "jsx-a11y/anchor-is-valid": "error",
        "jsx-a11y/aria-props": "error",
        "jsx-a11y/aria-proptypes": "error",
        "jsx-a11y/aria-role": "error",
        "jsx-a11y/lang": "error",
        "jsx-a11y/no-static-element-interactions": "error",
        "jsx-a11y/role-has-required-aria-props": "error",
        "jsx-a11y/role-supports-aria-props": "error",
        "jsx-a11y/tabindex-no-positive": "error",
        "linebreak-style": "error",
        "lodash/chaining": [
            "error",
            "never"
        ],
        "max-classes-per-file": [
            "off",
            3
        ],
        "max-len": [
            "error",
            {
                "code": 160
            }
        ],
        "max-lines": "off",
        "max-statements": [
            "error",
            100
        ],
        "new-parens": "error",
        "newline-per-chained-call": "off",
        "no-array-constructor": "off",
        "no-bitwise": "error",
        "no-caller": "error",
        "no-cond-assign": "error",
        "no-console": [
            "error",
            {
                "allow": [
                    "warn",
                    "dir",
                    "timeLog",
                    "assert",
                    "clear",
                    "count",
                    "countReset",
                    "group",
                    "groupEnd",
                    "table",
                    "dirxml",
                    "groupCollapsed",
                    "Console",
                    "profile",
                    "profileEnd",
                    "timeStamp",
                    "context"
                ]
            }
        ],
        "no-constant-condition": "error",
        "no-control-regex": "error",
        "no-debugger": "error",
        "no-duplicate-case": "error",
        "no-duplicate-imports": "error",
        "no-empty": "error",
        "no-empty-function": "off",
        "no-eval": "error",
        "no-extra-semi": "error",
        "no-fallthrough": "error",
        "no-invalid-regexp": "error",
        "no-invalid-this": "error",
        "no-irregular-whitespace": "error",
        "no-magic-numbers": "off",
        "no-multi-str": "off",
        "no-multiple-empty-lines": "error",
        "no-new-wrappers": "off",
        "no-null/no-null": "off",
        "no-octal": "error",
        "no-octal-escape": "error",
        "no-param-reassign": "error",
        "no-redeclare": "off",
        "no-regex-spaces": "error",
        "no-restricted-imports": "off",
        "no-restricted-syntax": [
            "error",
            {
                "message": "Forbidden call to document.cookie",
                "selector": "MemberExpression[object.name=\"document\"][property.name=\"cookie\"]"
            }
        ],
        "no-return-await": "error",
        "no-sequences": "error",
        "no-shadow": "off",
        "no-sparse-arrays": "error",
        "no-template-curly-in-string": "error",
        "no-throw-literal": "error",
        "no-trailing-spaces": "error",
        "no-undef-init": "error",
        "no-underscore-dangle": "error",
        "no-unsafe-finally": "error",
        "no-unused-expressions": "error",
        "no-unused-labels": "error",
        "no-use-before-define": "off",
        "no-var": "error",
        "no-void": "off",
        "no-warning-comments": [
            "error",
            {
                "location": "anywhere",
                "terms": [
                    "BUG",
                    "HACK",
                    "FIXME",
                    "LATER",
                    "LATER2",
                    "TODO"
                ]
            }
        ],
        "no-with": "error",
        "object-shorthand": "off",
        "one-var": [
            "error",
            "never"
        ],
        "padded-blocks": [
            "off",
            {
                "blocks": "never"
            },
            {
                "allowSingleLineBlocks": true
            }
        ],
        "padding-line-between-statements": [
            "off",
            {
                "blankLine": "always",
                "prev": "*",
                "next": "return"
            }
        ],
        "prefer-arrow/prefer-arrow-functions": [
            "off",
            {}
        ],
        "prefer-const": "error",
        "prefer-object-spread": "error",
        "prefer-template": "error",
        "quote-props": [
            "error",
            "as-needed"
        ],
        "quotes": "off",
        "radix": "error",
        "react/jsx-curly-spacing": [
            "off",
            {}
        ],
        "react/no-danger": "error",
        "security/detect-non-literal-fs-filename": "error",
        "security/detect-non-literal-require": "error",
        "security/detect-possible-timing-attacks": "error",
        "semi": "off",
        "space-before-function-paren": "off",
        "space-in-parens": [
            "error",
            "never"
        ],
        "unicorn/filename-case": "off",
        "unicorn/prefer-switch": "off",
        "unicorn/prefer-ternary": "off",
        "use-isnan": "error",
        "valid-typeof": "off",
        "yoda": "error",
        "@typescript-eslint/tslint/config": [
            "error",
            {
                "rules": {
                    "completed-docs": [
                        false,
                        "classes"
                    ],
                    "encoding": true,
                    "import-spacing": true,
                    "no-unnecessary-callback-wrapper": true,
                    "no-unsafe-any": false,
                    "number-literal-format": true,
                    "prefer-method-signature": true,
                    "prefer-while": true,
                    "switch-final-break": true,
                    "whitespace": [
                        true,
                        "check-branch",
                        "check-decl",
                        "check-operator",
                        "check-separator",
                        "check-type"
                    ]
                }
            }
        ]
    }
};
