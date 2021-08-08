const { RuleTester, Rule } = require('eslint')

const Tester = RuleTester
Tester.describe = function (text, method) {
    return method.call(this)
}
Tester.it = function (text, method) {
    return method.call(this)
}

/**
 * Tests whether or not "code" produces an lint error when passed to "rule".
 */
async function isInvalidLintRule(
    code,
    rule,
    options = {}
) {
    const tester = new RuleTester({ parserOptions: { ecmaVersion: 2015 } })

    try {
        await tester.run('', rule, {
            valid: [],
            invalid: [
                {
                    code,
                    errors: [{ message: options.message || '' }],
                    filename: options.filename
                }
            ]
        })
        return {
            data: {}
        }
    } catch (e) {
        return {
            error: e.message
        }
    }
}

/**
 * Tests whether or not "code" produces no lint error when passed to "rule".
 */
async function isValidLintRule(
    code,
    rule,
    options = {}
){
    const tester = new RuleTester({ parserOptions: { ecmaVersion: 2015 } })

    try {
        await tester.run('', rule, {
            valid: [
                {
                    code,
                    filename: options.filename
                }
            ],
            invalid: []
        })

        return {
            data: {}
        }
    } catch (e) {
        return {
            error: e.message
        }
    }
}

module.exports = {
    isValidLintRule, isInvalidLintRule
}