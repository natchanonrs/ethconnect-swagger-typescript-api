#!/usr/bin/env node
const { generate} = require('./src')
const program = require('commander')
const { resolve } = require('path')
const { version } = require('./package.json')

program.
  version(version, "-v, --version", "output the current version").
  description("Generate api client from ethconnect's deployed abis").
  option("-u, --base-url <baseURL>", "baseURL of ethconnect (default: http://127.0.0.1:8001)", "http://127.0.0.1:8001").
  option("-o, --outputDir <outputDir>", "output directory (default: ./generated)", './generated')

program.parse(process.argv);

const {
  baseUrl,
  outputDir
} = program

generate({  
  baseURL: baseUrl, 
  outputDir: resolve(process.cwd(), outputDir || ".")
})
