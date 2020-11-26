const { generateApi } = require('swagger-typescript-api')
const axios = require('axios').default
const fs = require('fs')
const mustache = require('mustache')
const { resolve } = require("path");

const templatesDir =resolve(__dirname, './templates')

const generate = async({baseURL, outputDir}) => {
  var view = {
    Api: [],
  }
  try {
    res = await axios.get(baseURL+'/abis')
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir)
    }
    for (abi of res.data){
      res = await generateApi({
        name: abi.name+'.ts',
        url: abi.openapi,
        output: outputDir,
        templates: templatesDir,
        generateClient: true,
      });
      temp = {
        id: abi.id,
        name: abi.name,
        apiname: abi.name+'api',
        baseURL: baseURL
      } 
      view.Api.push(temp)
    }

    const data = fs.readFileSync(resolve(templatesDir, './index.mustache'), 'utf8')
    rendered = mustache.render(data, view);
    fs.writeFileSync(outputDir+'/index.ts', rendered)
    
  } catch(e) {
    console.error(e)
  }
}

module.exports = {
  generate
}