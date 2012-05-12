/*
    This file is licensed CC0 by Andrew Harvey <andrew.harvey4@gmail.com>

    To the extent possible under law, the person who associated CC0
    with this work has waived all copyright and related or neighboring
    rights to this work.
    http://creativecommons.org/publicdomain/zero/1.0/


    This file is partially derived from the example area.html document from D3
    by Michael Bostock.

    https://github.com/mbostock/d3/blob/master/examples/area/area.html

    The original example is licensed under the 3 clause BSD license:

    Copyright (c) 2012, Michael Bostock
    All rights reserved.

    Redistribution and use in source and binary forms, with or without
    modification, are permitted provided that the following conditions are met:

    * Redistributions of source code must retain the above copyright notice, this
      list of conditions and the following disclaimer.

    * Redistributions in binary form must reproduce the above copyright notice,
      this list of conditions and the following disclaimer in the documentation
      and/or other materials provided with the distribution.

    * The name Michael Bostock may not be used to endorse or promote products
      derived from this software without specific prior written permission.

    THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
    AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
    IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
    DISCLAIMED. IN NO EVENT SHALL MICHAEL BOSTOCK BE LIABLE FOR ANY DIRECT,
    INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING,
    BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
    DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY
    OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
    NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
    EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

/* download and return JSON formatted data */
function get_json() {
    var request = new XMLHttpRequest();
    request.open('GET', 'rainfall-sample.json', false);
    request.send(null);
    return JSON.parse(request.responseText);
}

var data = get_json(),
    margin = {top: 10, right: 10, bottom: 20, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom,
    parseDate = d3.time.format("%Y-%m-%dT%H:%M:%SZ").parse;

// create x scale as a time scale with the domain determined from the domain of the source data
var x = d3.time.scale()
    .domain([parseDate(data[0].date), parseDate(data[data.length - 1].date)])
    .range([0, width]);

// create y scale
var y = d3.scale.linear()
    .domain([0, 12000])
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

// create d3 area from source JSON data
var area = function (value) {
    return d3.svg.area()
        .interpolate('basis')
        .x(function(d) { return x(parseDate(d.date)); })
        .y1(function(d) {
            var ret = 0;
            for (var v = value; v <= 15; v++) {
                switch (v) {
                    case 1:
                        ret += d.v1;
                        break;
                    case 2:
                        ret += d.v2;
                        break;
                    case 3:
                        ret += d.v3;
                        break;
                    case 4:
                        ret += d.v4;
                        break;
                    case 5:
                        ret += d.v5;
                        break;
                    case 6:
                        ret += d.v6;
                        break;
                    case 7:
                        ret += d.v7;
                        break;
                    case 8:
                        ret += d.v8;
                        break;
                    case 9:
                        ret += d.v9;
                        break;
                    case 10:
                        ret += d.v10;
                        break;
                    case 11:
                        ret += d.v11;
                        break;
                    case 12:
                        ret += d.v12;
                        break;
                    case 13:
                        ret += d.v13;
                        break;
                    case 14:
                        ret += d.v14;
                        break;
                    case 15:
                        ret += d.v15;
                        break;
                }
            }
            return y(ret);
        })
        .y0(y(0));
}

// graph
var svg = d3.select("#rainfall-graph").append("svg")
    .datum(data)
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// background
svg.append("svg:rect")
   .attr("class", "background")
   .attr("x", 0)
   .attr("y", 0)
   .attr("width", width)
   .attr("height", height);

// an area for each value
for (var i = 1; i <= 15; i++) {
    svg.append("path")
        .attr("class", "area v" + i)
        .attr("d", area(i));
}

// axis
svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

svg.append("g")
    .attr("class", "y axis")
    .call(yAxis);
