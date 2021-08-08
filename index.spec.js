const {expect} = require('chai')
const { isValidLintRule, isInvalidLintRule } = require('./test_utils')
const {rules} = require('./index')

describe('Lint Rules', () => {
    describe('no-double-underscore', () => {
        describe('using the valid lint rule function', () => {
            it('should work if we use a valid identifier!', async () => {
                const result = await isValidLintRule('const name = "hello"', rules['no-double-underscore'])
                expect(result).to.have.property('data')
            })
            it('should give error if we use an invalid identifier', async () => {
                const result = await isValidLintRule('const name__age = "hello"', rules['no-double-underscore'])
                expect(result).to.have.property('error')
            })
        })
        describe('using the invalid lint rule function', () => {
            it('should give error if we use a valid identifier', async () => {
                const result = await isInvalidLintRule('const name = "hello"', rules['no-double-underscore'])
                expect(result).to.have.property('error')
            })
            it('should not work if the variable is in a file whose name includes "allow_underscore"', async () => {
                const result = await isValidLintRule('const name__age = "hello"', rules['no-double-underscore'], {filename:'allow_underscore.js'})
                expect(result).to.have.property('data')
            })
        })
    })
    describe('no-use-of-var-in-function', () => {
        describe('using the valid lint rule function', () => {
            // it('should work if we use a valid identifier!', async () => {
            //     const result = await isValidLintRule('function test() {\n let name = "hello"\n}', rules['no-use-of-var-in-function'])
            //     expect(result).to.have.property('data')
            // })
            it('should give error if we use an invalid identifier', async () => {
                const result = await isValidLintRule('function test() {\nvar name__age = "hello"\n}', rules['no-use-of-var-in-function'])
                expect(result).to.have.property('error')
            })
        })
        describe('using the invalid lint rule function', () => {
            it('should give error if we use a valid identifier', async () => {
                const result = await isInvalidLintRule('function test() {\nlet name__age = "hello"\n}', rules['no-use-of-var-in-function'])
                expect(result).to.have.property('error')
            })
            it('should give error if we use an invalid identifier', async () => {
                const result = await isInvalidLintRule('function test() {\nvar name__age = "hello"\n}', rules['no-use-of-var-in-function'])
                expect(result).to.have.property('data')
            })
        })
    })
})