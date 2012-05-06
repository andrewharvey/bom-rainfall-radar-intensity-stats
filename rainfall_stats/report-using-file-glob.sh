#!/bin/sh

# Uses a shell glob to run the rainfall_stats program over many radar images,
# appending the results to a single file.

# This file is licensed CC0 by Andrew Harvey <andrew.harvey4@gmail.com>

# To the extent possible under law, the person who associated CC0
# with this work has waived all copyright and related or neighboring
# rights to this work.
# http://creativecommons.org/publicdomain/zero/1.0/

report=$1

# we need this to prepend to file references where those files are in the same
# directory as this script
cwd=`dirname $0`

echo "radar,datetime,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15" > $report

for f in IDR/IDR*.T.*.png
do
  r=`echo "$f" | grep -oE 'IDR[0-9]+\.' | sed 's/\.$//'`
  if [ "$r" != "" ] ; then # don't get stats of radar images which are IDR\d\d[^\d]\.
    d=`echo "$f" | grep -oE 'T\.[0-9]+\.png' | sed 's/T\.//' | sed 's/\.png//'`
    echo "$r_$d"
    echo -n "$r,$d," >> $report
    $cwd/rainfall_stats $f >> $report
  fi
done
