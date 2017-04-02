import pandas as pd
tablas = pd.read_html(io = "https://web-beta.archive.org/web/20150920073507/https://es.wikipedia.org/wiki/Anexo:Pa%C3%ADses_por_poblaci%C3%B3n_pasada,_actual_y_futura", match = u'País o territorio', thousands = '.', index_col=1, header=0)

if (len(tablas) != 3):
	print("Error, el número de tablas esperadas es 3.")
	print(len(tablas))
	exit(-1)

joined = tablas[0] + tablas[1] + tablas[2]

print(joined)

