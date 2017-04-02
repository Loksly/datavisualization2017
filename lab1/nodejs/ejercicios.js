(function(module, logger){
	'use strict';

	const table = require('./lib/table'),
		graph = require('./lib/graph');

	function toTable(objects, attrs){
		const rows = objects.map(function(obj){
			return attrs.map(function(attr){
				return obj[attr];
			});
		});
		table.printtable(rows, attrs);
	}

	module.exports.ejercicio1 = function(data, attrs){
		logger.log("### Ejercicio 1\n",	"Imprimir la tabla correspondiente a las poblaciones de Alemania, Andorra y Angola desde 2015 a 2025.");

		const paises = ['Alemania', 'Andorra', 'Angola'];
		const objsPaises = data.filter(function(obj){
			return paises.indexOf(obj['País o territorio']) >= 0;
		});

		const ej1attrs = attrs.filter(function(attr){
			return (parseInt(attr, 10) >= 2015 && parseInt(attr, 10) <= 2025);
		}).sort(function(a, b){ return a - b; });

		ej1attrs.unshift('País o territorio');


		toTable(objsPaises, ej1attrs);
	};

	module.exports.ejercicio2 = function(data, attrs){
		logger.log("### Ejercicio 2\n",	"Imprimir la subtabla que va desde las filas 3 a 8 y desde las columnas 5 a 9.");


		const ej2attrs = attrs.slice(4, 9);
		const rows = data.slice(2, 8);

		ej2attrs.unshift('País o territorio');

		toTable(rows, ej2attrs);
	};

	module.exports.ejercicio3 = function(data){
		logger.log("### Ejercicio 3\n", "Imprimir la columna correspondiente al año 1955.");
		toTable(data, ['País o territorio', '1955']);
	};

	module.exports.ejercicio4 = function(data, attrs){
		logger.log("### Ejercicio 4\n", "Imprimir los datos de la fila número 15.");

		toTable([data[14]], attrs);
	};

	module.exports.ejercicio5 = function(data){
		logger.log("### Ejercicio 5\n", "Imprimir la población de Barbados en 1995.");
		toTable(data.filter(function(obj){ return obj['País o territorio'] === 'Barbados'; }), ['1995']);
	};

	module.exports.ejercicio6 = function(data){
		logger.log("### Ejercicio 6\n", "Imprimir el valor máximo de las poblaciones de 1975 e identificar el país correspondiente.");

		const maxvalues = data.reduce(function(prev, datospais){
			if (datospais['1975'] > prev.Value){
				prev.Name = datospais['País o territorio'];
				prev.Value = datospais['1975'];
			}

			return prev;
		}, {'Name': '', 'Value': 0});

		toTable([maxvalues], ['Name', 'Value']);
	};

	module.exports.ejercicio7 = function(data){
		logger.log("### Ejercicio 7\n", "Imprimir los nombres de las filas.");
		toTable(data, ['País o territorio']);
	};

	module.exports.ejercicio8 = function(data){
		logger.log("## Dibujar la población de 4 países en un año\n",
			"Dibujar mediante un diagrama de barras la población de Argentina, Suecia, Polonia y Libia en 1995, ordenadas de menor a mayor, utilizando las librerías matplotlib.");

		const paises = ['Argentina', 'Suecia', 'Polonia', 'Libia'];

		const datospaises = data.filter(function(datospais){
			return paises.indexOf(datospais['País o territorio']) >= 0;
		}).sort(function(a, b){
			return a['1995'] - b['1995'];
		});

		toTable(datospaises, ['País o territorio', '1995']);
		const params = {
			'title': 'Población por países',
			'ylabel': 'Población (miles)',
			'xlabel': 'Año',
			'xattr': 'País o territorio',
			'yattr': function(obj){
				return obj['1995'];
			}
		};
		graph.barChart(datospaises, params);
	};

	module.exports.ejercicio9 = function(data, attrs){
		logger.log("## Dibujar la evolución de la población de 4 países\n",
			"Dibujar la evolución de la población en todo el periodo para los siguientes países: Alemania, España, Estados Unidos e Italia.");

		const paises = ['Alemania', 'España', 'Estados Unidos', 'Italia'];
		const datospaises = data.filter(function(datospais){
			return paises.indexOf(datospais['País o territorio']) >= 0;
		});

		const years = attrs.filter(function(attr){
			return (/^\d+$/).test(attr);
		}).sort(function(a, b){
			return a - b;
		});

		toTable(datospaises, ['País o territorio'].concat(years));
		const params = {
			'title': 'Población por países',
			'idfield': 'País o territorio',
			'attrs': years
		};
		graph.lineChart(datospaises, params);
	};

	module.exports.ejercicio10 = function(data, attrs){
		logger.log("## Dibujar la evolución de los 5 países más populosos hasta 2010 y 2050\n",
			"Dibujar dos gráficas: una con la evolución para todo el período de los países más populosos en 2010, y otra con los países más populosos en 2050. Utilizaremos una función plot_populosos() a la que daremos como argumento el año de interés.");

		const years = attrs.filter(function(attr){
			return (/^\d+$/).test(attr);
		}).sort(function(a, b){
			return a - b;
		});

		const paisesMasPopulosos2010 = data.sort(function(a, b){
			return b['2010'] - a['2010'];
		}).slice(0, 5);

		const paisesMasPopulosos2050 = data.sort(function(a, b){
			return b['2050'] - a['2050'];
		}).slice(0, 5);

		const params = {
			'title': 'Población por países',
			'idfield': 'País o territorio',
			'attrs': years
		};

		logger.log('Países de mayor población en 2010');
		toTable(paisesMasPopulosos2010, ['País o territorio'].concat(years));
		graph.lineChart(paisesMasPopulosos2010, params);


		logger.log('Países de mayor población en 2050');
		toTable(paisesMasPopulosos2050, ['País o territorio'].concat(years));
		graph.lineChart(paisesMasPopulosos2050, params);
	};

})(module, console);
