(function(module, logger){
	'use strict';
	const Table = require('cli-table');

	module.exports.printtable = function(rows, headers){
		const parameters = headers ? {'head': headers, 'colAligns': headers.map(function(){ return 'right'; })} : {};
		const table = new Table(parameters);
		
		rows.forEach(function(r){ table.push(r); });

		logger.log(table.toString());
		logger.log("\n\n");
	};

})(module, console);
