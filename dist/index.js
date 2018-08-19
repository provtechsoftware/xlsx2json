'use strict';

var _commandLineArgs = require('command-line-args');

var _commandLineArgs2 = _interopRequireDefault(_commandLineArgs);

var _commandLineUsage = require('command-line-usage');

var _commandLineUsage2 = _interopRequireDefault(_commandLineUsage);

var _XLSX2JSON = require('./XLSX2JSON');

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _stripJsonComments = require('strip-json-comments');

var _stripJsonComments2 = _interopRequireDefault(_stripJsonComments);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var optionDefinitions = [{ name: 'input', alias: 'i', type: String, defaultOption: true, defaultValue: 'input.xlsx', description: 'XLSX file to be processed' }, { name: 'output', alias: 'o', type: String, defaultValue: 'out', description: 'Output folder' }, { name: 'template', alias: 't', type: String, description: 'File to describe the worksheets' }, { name: 'help', alias: 'h', type: Boolean, defaultValue: false, description: 'This help.' }];

var sections = [{
    header: 'XLSX converter',
    content: 'Generates json from xlsx files'
}, {
    header: 'Options',
    optionList: optionDefinitions
}];

var options = (0, _commandLineArgs2.default)(optionDefinitions);

if (options.help === true) {
    var usage = (0, _commandLineUsage2.default)(sections);
    console.log(usage);
} else {
    var templateFile = _fs2.default.readFileSync(options.template).toString();
    var template = JSON.parse((0, _stripJsonComments2.default)(templateFile));
    var xlsx = new _XLSX2JSON.XLSX2JSON(options.input, options.output, template);
    xlsx.parse();
}