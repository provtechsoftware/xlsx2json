import xlsx from 'node-xlsx';
import fs from 'fs';

export class XLSX2JSON {
    constructor(input, outputFolder, template) {
        this.inputFile = input;
        this.outputFolder = outputFolder;
        this.template = template;
    }

    getWorksheetTemplate(name) {
        for(let i = 0; i < this.template.length; i++) {
            let entry = this.template[i];
            if(entry.worksheet === name) {
                return entry;
            }
        }
        return null;
    }
    parseCellTemplate(cell, templateType) {
        switch (templateType) {
            case 'stars':
            if(cell === '-' || cell === undefined) {
                return 0;
            }
            return cell.length;

            case 'number':
            case 'string':
            default:
                return cell;
        }
    }
    parse() {
        let folder = __dirname+'/'+this.outputFolder;
        if(!fs.existsSync(folder)) {
            fs.mkdirSync(folder);
        }

        let worksheets = xlsx.parse(this.inputFile);
        for(let i = 0; i < worksheets.length; i++) {
            let worksheet = worksheets[i];
            let json = [];

            let titles = worksheet.data[0];
            let template = this.getWorksheetTemplate(worksheet.name);

            console.log('Processing:', worksheet.name);
            for(let line = 1; line < worksheet.data.length; line++) {
                let wline = worksheet.data[line];

                let data = {};
                let adds = false;
                for(let column = 0; column < wline.length; column++) {
                    let cell = wline[column];
                    if(template !== null) {
                        if(column >= template.columns.length) {
                            break;
                        }
                        try {
                            data[template.columns[column].name] = this.parseCellTemplate(cell, template.columns[column].type);                        
                        }
                        catch(error) {
                            console.log('Error on', error, line, column, cell);
                            process.exit();
                        }
                    }
                    else {
                        data[titles[column]] = cell;
                    }
                    adds = true;
                }

                if(adds === true) {
                    json.push(data);
                }
            }
            let outfile = '';
            if(template !== null) {
                outfile = folder + '/' + template.name + '.json';
            }
            else {
                outfile = folder + '/' + worksheet.name + '.json';
            }
            console.log("Writing file ", outfile)
            if(template !== null && template.append === true) {
                fs.appendFileSync(outfile, JSON.stringify(json))
            }
            else {
                fs.writeFileSync(outfile, JSON.stringify(json));
            }
        }
    }
}