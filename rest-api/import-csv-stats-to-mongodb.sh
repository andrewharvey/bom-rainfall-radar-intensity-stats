#!/bin/sh

mongoimport \
  --db bom \
  --collection rainfall_radar \
  --type csv \
  --file $1 \
  --drop \
  --headerline


