# About
The Australian Bureau of Meteorology publishes rainfall radar images of various
sites around Australia. e.g. [http://www.bom.gov.au/products/IDR713.loop.shtml](http://www.bom.gov.au/products/IDR713.loop.shtml)

This repository is focused on presenting that data in alternate forms of display.

As such it is broken up into several parts as follows.

## rainfall_stats
This program will inspect a given radar image and generate a simple CSV report
on the occurrences of the different rainfall intensity values present in the
image.

To make it easier to produce results over many radar images the
report-using-file-glob.sh program is designed to generate a single CSV report
of all the radar images present in the IDR directory.

To populate an IDR directory with radar images you may like to use the scripts
at [https://gist.github.com/1340891](https://gist.github.com/1340891).

## rest-api
Once you have CSV reports produced from rainfall_stats you may use the scripts
in rest-api to load this data into MongoDB and run an API server serving out
this data from MongoDB in JSON format.

`import-csv-stats-to-mongodb.sh` will do the initial import into MongoDB and
`stats-rest-api-server.pl` will sit and listen for requests for a specific radar
code between two datetimes.

## d3-rainfall-graph
One you have the API server running or a sample JSON file generated from the API
server (try `make sample-export`) you can open up rainfall-graph.html which
(once you have configured it to find the d3 library) produce a graph of the
different rainfall intensity occurrences over time.

## dygraphs-rainfall-graph
Like `d3-rainfall-graph`, the code in `dygraphs-rainfall-graph` produces a graph,
but using the Dygraphs library instead of D3. Dygraphs requires less code and
already supports interactivity. Rather than consuming a JSON file it consumes a
CSV file as produced by `csv2dygraphs.pl`. A sample will be produced using
`make sample-export`.

# TODO
* Try to get the BOM to release the radar images under CC-BY as per the [Intellectual Property Principles for Australian Government Agencies](http://www.ag.gov.au/Copyright/Pages/StatementofIntellectualPropertyPrinciplesforAustralianGovernmentAgencies.aspx) so I can release a public demo.
* Allow the whole process to run in real time
* Show source radar image for cursor location
* Allow user to select geographic region to limit results to
* Store radar image in PostGIS as a raster and possibly cut out rainfall_stats and
  rest-api as a result

# License
All the files within this repository are released under the
[CC0](http://creativecommons.org/publicdomain/zero/1.0/) license by
Andrew Harvey <andrew.harvey4@gmail.com>. Although not required, I would prefer
you give Attribution and release derived works or modifications under the same
CC0 license.

    To the extent possible under law, the person who associated CC0
    with this work has waived all copyright and related or neighboring
    rights to this work.
    http://creativecommons.org/publicdomain/zero/1.0/
