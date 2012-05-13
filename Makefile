all :
	# generate value counts from the radar images
	./rainfall_stats/report-using-file-glob.sh radar_value_counts.csv
	# import counts into mongodb
	./rest-api/import-csv-stats-to-mongodb.sh radar_value_counts.csv

sample-export :
	./rest-api/stats-rest-api-server.pl 'radar=IDR032&datetime_start=201204170000&datetime_end=201204192350' | tail -n +3 > d3-rainfall-graph/rainfall-sample.json
	./csv2dygraphs.pl < radar_value_counts.csv > dygraphs-rainfall-graph/rainfall-sample.csv
