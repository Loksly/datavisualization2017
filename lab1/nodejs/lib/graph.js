(function(module, logger){
	'use strict';
	const Quiche = require('quiche'),
		COLORS = ['3366cc', 'dc3912', 'ff9900', '109618', '990099', '0099c6', 'dd4477', '66aa00', 'b82e2e', '316395', '994499', '22aa99', 'aaaa11', '6633cc', 'e67300', '8b0707', '651067', '329262', '5574a6', '3b3eac'];

	/*
		example of parameters = {
			'title': 'Población por países',
			'ylabel': 'Población (miles)',
			'xlabel': 'Año',
			'xattr': 'País o territorio',
			'yattr': function(obj){	return obj['1995'];	}
		}
	*/
	module.exports.barChart = function(x, parameters){
		const bar = new Quiche('bar');
		bar.setWidth(720);
		bar.setHeight(400);
		bar.setTitle(parameters.title);
		bar.setBarStacked();
		bar.setBarWidth(0);
		bar.setBarSpacing(10);
		bar.setLegendBottom();
		bar.setTransparentBackground();

		const values = x.map(parameters.yattr);
		const labels = x.map(function(r){
			return (r[parameters.xattr]);
		});

		bar.addData(values, 'valores', 'FF0000');
		
		bar.setAutoScaling();
		bar.setLegendHidden();
		bar.addAxisLabels('x', labels);
		
		logger.log(bar.getUrl(true), "\n\n");
	};


	module.exports.lineChart = function(x, parameters){
		const chart = new Quiche('line');
		chart.setTitle(parameters.title);
		x.forEach(function(row, i){
			chart.addData(parameters.attrs.map(function(attr){ return row[attr]; }), row[parameters.idfield], COLORS[i]);
		});

		chart.setWidth(720);
		chart.setHeight(400);

		chart.addAxisLabels('x', parameters.attrs);
		chart.setAutoScaling();
		chart.setTransparentBackground();

		logger.log(chart.getUrl(true), "\n\n");
	};

})(module, console);
