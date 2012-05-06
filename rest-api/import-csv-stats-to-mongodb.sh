#!/bin/sh

mongoimport \
  --db bom \
  --collection rainfall_radar \
  --type csv \
  --file radar_stats.csv \
  --drop \
  --headerline


