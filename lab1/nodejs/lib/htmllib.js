(function(module){
	'use strict';
	const assert = require('assert'),
		cheerio = require('cheerio'),
		extend = require('util')._extend;

	function htmltableToObject(tablehtml){
		const $ = cheerio.load(tablehtml);

		const headers = [];
		$("thead > tr > th").each(function(){
			headers.push($(this).text().trim());
		});

		const rows = [];
		$("tbody > tr").each(function(){
			const children = $(this).children();
			const row = headers.reduce(function(prev, header, i){
				prev[header] = $(children[i]).text().replace(/\./g, '').trim();
				if (/^\d+$/.test(prev[header])){
					prev[header] = parseInt(prev[header], 10);
				} else if (/^\d\.\d+$/.test(prev[header])){
					prev[header] = parseInt(prev[header].replace(',', '.'), 10);
				}

				return prev;
			}, {});

			rows.push(row);
		});

		return rows;
	}

	function fixBadFormatTables($, tables){
		$(tables).each(function(){
			const trs = $(this).find('tr');
			$('<thead>').append(trs[0]).prependTo($(this));
			const tbody = $('<tbody>');
			for (let i =1, j = trs.length; i < j; i++){
				tbody.append(trs[i]);
			}
			tbody.prependTo($(this));
		});
	}

	module.exports.process = function(body, config){
		const $ = cheerio.load(body);
		const tablasConCabeceraALocalizar = [];

		if ($("table.wikitable > thead").length === 0){
			fixBadFormatTables($, $("table.wikitable"));
		}

		$('table.wikitable > thead > tr > th').each(function(){
			if ($(this).text().trim() === config.th_content){
				tablasConCabeceraALocalizar.push($(this).parent().parent().parent());
			}
		});

		assert.equal(tablasConCabeceraALocalizar.length, 3, 'Se deberían encontrar 3 tablas con el formato seleccionado');

		return tablasConCabeceraALocalizar.map(function(table){
			return $(table).html();
		}).map(htmltableToObject).reduce(function(p, table){

			return table.map(function(obj, i){
				return (p[i]) ? extend(obj, p[i]) : obj;
			});

		}, []);
	};

})(module);
