#!/usr/bin/env node
let xlsx2json = require('./xlsx2json');
let fs = require('fs');
let stripJsonComments = require('strip-json-comments');
let commandLineArgs = require('command-line-args');
let commandLineUsage = require('command-line-usage');

let optionDefinitions = [
    {name:'input', alias:'i', type:String, defaultOption: true, defaultValue:'input.xlsx',description:'XLSX file to be processed'},
    {name:'output', alias:'o', type:String, defaultValue:'out',description:'Output folder'},
    {name:'template', alias:'t', type: String, description: 'File to describe the worksheets'},
    {name:'help', alias:'h', type:Boolean, defaultValue:false, description:'This help.'}
]

const sections = [
    {
        header:'XLSX converter',
        content: 'Generates json from xlsx files'
    },
    {
        header: 'Options',
        optionList: optionDefinitions
      }
]

const options =commandLineArgs(optionDefinitions);

if(options.help === true) {
    const usage = commandLineUsage(sections);
    console.log(usage);
}
else {
    let templateFile = fs.readFileSync(options.template).toString();
    let template = JSON.parse(stripJsonComments(templateFile));
    xlsx2json.xlsx2json(options.input, options.output, template);
}