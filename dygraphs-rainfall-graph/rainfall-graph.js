/*
    This file is licensed CC0 by Andrew Harvey <andrew.harvey4@gmail.com>

    To the extent possible under law, the person who associated CC0
    with this work has waived all copyright and related or neighboring
    rights to this work.
    http://creativecommons.org/publicdomain/zero/1.0/
*/

/* download and return JSON formatted data */
function get_json() {
    var request = new XMLHttpRequest();
    request.open('GET', 'rainfall-sample.csv', false);
    request.send(null);
    return request.responseText;
}

var data = get_json();

var chart = new Dygraph(
  document.getElementById("rainfall-graph"),
  data,
  {
    title: "Rainfall intensity (area of image whole)",
    showRangeSelector: true,
    fillGraph: true,
    fillAlpha: 1.0,
    colors: ['#290001', '#3C1B09', '#4B3608', '#4B4808', '#3A4B08', '#254B08', '#0D5613', '#207F5A', '#288B97', '#3380B1', '#3558BF', '#6586EB', '#98AFF8', '#BCCCFF', '#E3E9FF'],
    axisLabelFontSize: 10,
    drawYAxis: false,
    includeZero: true, /* always let the ymin as zero */
    strokeWidth: 0.0,
    drawXGrid: false,
    drawYGrid: false,
    highlightCircleSize: 0,
    showLabelsOnHighlight: false
  });

