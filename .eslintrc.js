module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: ['plugin:@typescript-eslint/recommended', 'prettier/@typescript-eslint'],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    'no-shadow': ['error', { builtinGlobals: true }], // disallow variable declarations from shadowing variables declared in the outer scope
    'no-duplicate-imports': ['error', { includeExports: true }], // disallow duplicate module imports
    curly: ['error', 'all'], // enforce consistent brace style for all control statements
    eqeqeq: 'error', // equire the use of === and !==
    'no-alert': 'warn', // disallow the use of alert, confirm, and prompt
    'no-console': 'warn', // disallow the use of console
    'no-lone-blocks': 'error', // disallow unnecessary nested blocks
    'no-multi-spaces': 'error', // disallow multiple spaces
    'no-new': 'error', // disallow new operators outside of assignments or comparisons
    'no-new-func': 'error', // disallow new operators with the Function object
    'no-new-wrappers': 'error', // disallow new operators with the String, Number, and Boolean objects
    'no-return-await': 'error', // disallow unnecessary return await
    'no-self-compare': 'error', // disallow comparisons where both sides are exactly the same
    'no-sequences': 'error', // disallow comma operators
    'no-throw-literal': 'error', // disallow throwing literals as exceptions
    'no-unused-expressions': 'error', // disallow unused expressions
    'no-useless-call': 'error', // disallow unnecessary calls to .call() and .apply()
    'no-useless-concat': 'error', // disallow unnecessary concatenation of literals or template literals
    'no-useless-return': 'error', // disallow redundant return statements
    'no-useless-escape': 'off',
    'prefer-promise-reject-errors': 'error', // require using Error objects as Promise rejection reasons
    radix: 'error', // enforce the consistent use of the radix argument when using parseInt()
    'comma-dangle': ['error', 'always-multiline'], // require or disallow trailing commas
    'comma-style': 'error', // enforce consistent comma style
    'eol-last': 'error', // require or disallow newline at the end of files
    'key-spacing': 'error', // enforce consistent spacing between keys and values in object literal properties
    'keyword-spacing': 'error', // enforce consistent spacing before and after keywords
    'new-parens': 'error', // enforce or disallow parentheses when invoking a constructor with no arguments
    'no-bitwise': 'warn', // disallow bitwise operators
    'no-multiple-empty-lines': 'error', // disallow multiple empty lines
    'no-nested-ternary': 'error', // disallow nested ternary expressions
    'no-new-object': 'error', // disallow Object constructors
    'no-tabs': ['error', { allowIndentationTabs: true }],
    'no-trailing-spaces': 'error', // disallow trailing whitespace at the end of lines
    'object-curly-newline': 'error', // enforce consistent line breaks inside braces
    'object-curly-spacing': ['error', 'always'], // enforce consistent spacing inside braces
    'prefer-spread': 'off',
    'semi-spacing': 'error', // enforce consistent spacing before and after semicolons
    'space-before-blocks': 'error', // enforce consistent spacing before blocks
    'space-in-parens': 'error', // enforce consistent spacing inside parentheses
    'space-infix-ops': 'error', // require spacing around infix operators
    'space-unary-ops': 'error', // enforce consistent spacing before or after unary operators
    'spaced-comment': ['error', 'always', { exceptions: ['*'] }], // enforce consistent spacing after the // or /* in a comment
    'switch-colon-spacing': 'error', // enforce spacing around colons of switch statements
    'arrow-body-style': 'off', // require braces around arrow function bodies
    'arrow-parens': ['error', 'as-needed'], // require parentheses around arrow function arguments
    'arrow-spacing': 'error', // enforce consistent spacing before and after the arrow in arrow functions
    'generator-star-spacing': ['error', 'after'], // enforce consistent spacing around * operators in generator functions
    'no-confusing-arrow': 'off', // disallow arrow functions where they could be confused with comparisons
    'prefer-arrow-callback': 'warn', // require using arrow functions for callbacks
    'prefer-destructuring': [
      'error',
      {
        VariableDeclarator: {
          array: false,
          object: false,
        },
        AssignmentExpression: {
          array: false,
          object: false,
        },
      },
    ], // require destructuring from arrays and/or objects
    'rest-spread-spacing': ['error', 'never'], // enforce spacing between rest and spread operators and their expressions
    'no-underscore-dangle': 'error', // disallow dangling underscores in identifiers
    'quote-props': ['error', 'as-needed'], // disallows quotes around object literal property names that are not strictly required
    '@typescript-eslint/semi': ['error', 'always'], // Require or disallow semicolons instead of ASI
    '@typescript-eslint/no-magic-numbers': 'off', // Disallows magic numbers
    '@typescript-eslint/no-unused-vars': [
      'error',
      { argsIgnorePattern: '^_', ignoreRestSiblings: true },
    ],
    '@typescript-eslint/brace-style': ['error', '1tbs'], // Enforce consistent brace style for blocks
    '@typescript-eslint/quotes': [
      'error',
      'single',
      { avoidEscape: true, allowTemplateLiterals: true },
    ], // Enforce the consistent use of either backticks, double, or single quotes
    '@typescript-eslint/no-inferrable-types': 'off', // disallows explicit type declarations on parameters, variables and properties where the type can be easily inferred from its value.
    '@typescript-eslint/no-parameter-properties': 'off', // Disallow the use of parameter properties in class constructors
    '@typescript-eslint/explicit-function-return-type': ['error', { allowExpressions: true }], // This rule aims to ensure that the values returned from functions are of the expected type
    '@typescript-eslint/restrict-plus-operands': 'off', // When adding two variables, operands must both be of type number or of type string
    '@typescript-eslint/array-type': [
      'error',
      {
        default: 'array',
        readonly: 'array',
      },
    ], // This rule aims to standardise usage of array types within your codebase
    '@typescript-eslint/no-explicit-any': 'warn', // Disallow usage of the any type
    '@typescript-eslint/explicit-member-accessibility': [
      'error',
      {
        accessibility: 'explicit',
        overrides: {
          constructors: 'no-public',
        },
      },
    ], // Require explicit accessibility modifiers on class properties and methods
    '@typescript-eslint/typedef': [
      'warn',
      {
        arrayDestructuring: false,
        arrowParameter: false,
        memberVariableDeclaration: true,
        objectDestructuring: false,
        parameter: true,
        variableDeclaration: true,
      },
    ], // Require type annotations to exist
    '@typescript-eslint/no-use-before-define': ['error', { functions: false, classes: false }], // Disallow the use of variables before they are defined
    '@typescript-eslint/ban-types': 'off',
  },
};
