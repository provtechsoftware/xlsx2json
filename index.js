import commandLineArgs from 'command-line-args';
import commandLineUsage from 'command-line-usage';
import { XLSX2JSON } from './XLSX2JSON';
import fs from 'fs';
import stripJsonComments from 'strip-json-comments';


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
    let xlsx = new XLSX2JSON(options.input, options.output, template);
    xlsx.parse();
}