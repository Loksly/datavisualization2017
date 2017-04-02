/*
Run this way: node index.js > output.txt
*/
(function(){
	'use strict';

	const request = require('request'),
		//fs = require('fs'),
		htmllib = require('./lib/htmllib'),
		ejercicios = require('./ejercicios'),
		config = require('./config.json');

	request.get(config.url, function(err, response, content){
	//fs.readFile('source.html', 'utf8', function(err, content){
		if (err){
			throw Error('An error happened when downloading the web page');
		}
		const data = htmllib.process(content, config);

		data.forEach(function(obj){
			Reflect.deleteProperty(obj, '#');
			Reflect.deleteProperty(obj, '%');
		});
		const attrs = Object.keys(data[0]);

		ejercicios.ejercicio1(data, attrs);
		ejercicios.ejercicio2(data, attrs);
		ejercicios.ejercicio3(data, attrs);
		ejercicios.ejercicio4(data, attrs);
		ejercicios.ejercicio5(data, attrs);
		ejercicios.ejercicio6(data, attrs);
		ejercicios.ejercicio7(data, attrs);
		ejercicios.ejercicio8(data, attrs);
		ejercicios.ejercicio9(data, attrs);
		ejercicios.ejercicio10(data, attrs);

	});
})();
