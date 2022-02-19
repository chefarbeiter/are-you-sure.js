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
            'karma-jasmine-html-reporter',
            'karma-chrome-launcher'
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
                    // Only transpile our source code
                    exclude: 'node_modules/**',
                    // Inline the required helpers in each file
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


        // list of files / patterns to load in the browser
        files: [
            'src/*.js',
            'tests/**/*.spec.js'
        ],

        // list of files / patterns to exclude
        exclude: [
        ],


        // preprocess matching files before serving them to the browser
        // available preprocessors: https://www.npmjs.com/search?q=keywords:karma-preprocessor
        preprocessors: {
        },


        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://www.npmjs.com/search?q=keywords:karma-reporter
        reporters: ['progress'],


        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: false,
        browsers: ['ChromeHeadless'],
        singleRun: true,
        concurrency: Infinity
    })
}