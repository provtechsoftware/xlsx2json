'use strict';

var _nodeXlsx = require('node-xlsx');

var _nodeXlsx2 = _interopRequireDefault(_nodeXlsx);

var _commandLineArgs = require('command-line-args');

var _commandLineArgs2 = _interopRequireDefault(_commandLineArgs);

var _commandLineUsage = require('command-line-usage');

var _commandLineUsage2 = _interopRequireDefault(_commandLineUsage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var optionDefinitions = [{ name: 'input', alias: 'i', type: String, defaultOption: true, defaultValue: 'input.xlsx', description: 'XLSX file to be processed' }, { name: 'help', alias: 'h', type: Boolean, defaultValue: false, description: 'This help.' }];

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
} else {}