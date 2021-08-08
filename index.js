const path = require('path')

module.exports.rules = {
    'no-double-underscore': {
        meta: {
            type: 'problem',
            docs: {
                description:
                    'Disallow the use of variable name that includes "__" in the codebase. The only use case allowed is in any file whose name contains "allow_underscore", and also disallow the use of "var" inside a function',
                category: 'Possible Errors'
            },
            fixable: 'code',
            schema: []
        },
        create(context) {
            return {
                Identifier(node) {
                    console.log(
                        'h'+` Unexpected variable "${node.name}" found - Do not use ${node.name} in a file except if the filename includes "allow_underscore" `+'h'
                    )
                    if (node.name.includes('__')) {
                        const filePath = context.getFilename()
                        if (path.basename(filePath).includes('allow_underscore')) {
                            return
                        }
                        context.report({
                            node,
                            message: ` Unexpected variable "{{ identifier }}" found - Do not use {{ identifier }} in a file except if the filename includes "allow_underscore" `,
                            data: {
                                identifier: node.name
                            },
                            fix: (fixer) => {
                                return fixer.replaceText(node, node.name.replace('__', '_'))
                            }
                        })
                    }
                }
            }
        }
    },
    'no-use-of-var-in-function': {
        meta: {
            type: 'problem',
            docs: {
                description: 'Disallow the use of "var" in a function',
                category: 'Possible Errors'
            },
            fixable: 'code',
            schema: []
        },
        create(context) {
            return {
                VariableDeclaration(node) {
                    console.log(node.parent?.parent.type)
                    if (node.kind === 'var' && node.parent?.parent.type === 'FunctionDeclaration') {
                        context.report({
                            node,
                            message: 'Unexpected "var" in a function',
                            // fix: (fixer) => {
                            //     return fixer.replaceText(node.kind, 'let')
                            // }
                        })
                    }
                }
            }
        }
    }
}
