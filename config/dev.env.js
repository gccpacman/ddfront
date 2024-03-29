'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  ROOT_API: '"http://127.0.0.1:8000/api"'
  // ROOT_API: '"http://api.datadude.xyz/api"'
})
