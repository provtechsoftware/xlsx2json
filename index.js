import xlsx from 'node-xlsx';
import commandLineArgs from 'command-line-args';
import commandLineUsage from 'command-line-usage';


let optionDefinitions = [
    {name:'input', alias:'i', type:String, defaultOption: true, defaultValue:'input.xlsx',description:'XLSX file to be processed'},
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

}