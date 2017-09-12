/*
 * Things to learn, when actually learning D3
 * - some data science
 * - SVG
 * - D3 api
 */
 /* globals d3 */

 var svg = d3.select("svg"),
 margin = {top: 20, right: 20, bottom: 30, left: 40},
 width = +svg.attr("width") - margin.left - margin.right,
 height = +svg.attr("height") - margin.top - margin.bottom,
 frames = 6;

 var x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
 y = d3.scaleLinear().rangeRound([height, 0]);

 d3.csv("./js/data/rotating.csv", function(error, dataR) {
  d3.csv("./js/data/consecutive.csv", function(error, dataC) {
    dataR = dataR.map( type );
    dataC = dataC.map( type );

    // console.log(dataR);
    console.log(dataC);

    if (error) throw error;

    x.domain(dataR.map(function(d) { return d.name; }));
    x.domain(dataC.map(function(d) { return d.name; }));
    y.domain([0, dataR.length]);


    var gr = svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var gc = svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    gr.append("g")
    .attr("class", "axis axis--x")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

    gr.append("g")
    .attr("class", "axis axis--y")
    .call(d3.axisLeft(y).ticks(frames))
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", "0.71em")
    .attr("text-anchor", "end")
    .text("Total");

    gr.selectAll(".bar")
    .data(dataR)
    .enter().append("rect")
    .attr("class", "bar")
    .attr("x", function(d) { return x(d.name); })
    .attr("y", function(d) { return y(d.total); })
    .attr("width", x.bandwidth()/2)
    .attr("height", function(d) { return height - y(d.total); });

    gc.append("g")
    .attr("class", "axis axis--x")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

    gc.append("g")
    .attr("class", "axis axis--y")
    .call(d3.axisLeft(y).ticks(frames))
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", "0.71em")
    .attr("text-anchor", "end")
    .text("Total");


    gc.selectAll(".bar")
    .data(dataC)
    .enter().append("rect")
    .attr("class", "bar consec")
    .attr("x", function(d) { return x(d.name) + x.bandwidth()/2})
    .attr("y", function(d) { return y(d.total); })
    .attr("width", x.bandwidth()/2)
    .attr("height", function(d) { return height - y(d.total); });
  });
});
// mapping function
function type(d) {
  d.f1 = parseInt(d.f1);
  d.f2 = parseInt(d.f2);
  d.f3 = parseInt(d.f3);
  d.f4 = parseInt(d.f4);
  d.f5 = parseInt(d.f5);
  d.f6 = parseInt(d.f6);
  d.f7 = parseInt(d.f7);
  d.f8 = parseInt(d.f8);
  d.f9 = parseInt(d.f9);
  d.f10 = parseInt(d.f10);
  d.total = [d.f1, d.f2, d.f3, d.f4, d.f5, d.f6, d.f7, d.f8, d.f9, d.f10].reduce((a, b) => a+b);
  d.shoes = parseInt(d.shoes) === 1; // from "1" to true
  return d;
}