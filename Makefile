all :
	./rainfall_stats/report-using-file-glob.sh radar_stats.csv
	./rest-api/import-csv-stats-to-mongodb.sh radar_stats.csv
