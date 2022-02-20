'use strict'

const { babel } = require('@rollup/plugin-babel')
const istanbul = require('rollup-plugin-istanbul')
const { nodeResolve } = require('@rollup/plugin-node-resolve')
const replace = require('@rollup/plugin-replace')

module.exports = function (config) {
    config.set({
        basePath: '..',
        frameworks: ['jasmine'],
        plugins: [
            'karma-jasmine',
            'karma-rollup-preprocessor',
            //            'karma-jasmine-html-reporter',
            'karma-chrome-launcher',
            'karma-coverage-istanbul-reporter'
        ],
        preprocessors: {
            'tests/*.spec.js': ['rollup']
        },
        rollupPreprocessor: {
            plugins: [
                replace({
                    'process.env.NODE_ENV': '"dev"',
                    preventAssignment: true
                }),
                istanbul({
                    exclude: [
                        'node_modules/**',
                        'tests/*.spec.js',
                    ]
                }),
                babel({
                    exclude: 'node_modules/**',
                    babelHelpers: 'inline'
                }),
                nodeResolve()
            ],
            output: {
                format: 'iife',
                name: 'test',
                sourcemap: 'inline',
                generatedCode: 'es2015'
            }
        },
        files: [
            'tests/**/*.spec.js'
        ],
        reporters: ['dots', 'coverage-istanbul'],
        coverageIstanbulReporter: {
            dir: 'tests/coverage/',
            reports: ['lcov', 'text-summary'],
            thresholds: {
                emitWarning: false,
                global: {
                    statements: 90,
                    branches: 90,
                    functions: 90,
                    lines: 90
                }
            }
        },
        port: 9876,
        colors: true,
        logLevel: config.LOG_ERROR,
        autoWatch: false,
        browsers: ['ChromeHeadless'],
        singleRun: true,
        concurrency: Infinity
    })
}