
var margin = {top: 60, right: 20, bottom: 30, left: 50},
    width = 700 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

T = 500
var x = d3.scaleLinear()
  .range([0, width]);

var y = d3.scaleLinear()
    .range([height, 0]);

var xAxis = d3.axisBottom()
    .scale(x);

var yAxis = d3.axisLeft()
    .scale(y);

var line1 = d3.line()
    .x(function(d) { return x(d.Time); })
    .y(function(d) { return y(d.Celer); });


var line2 = d3.line()
    .x(function(d) { return x(d.Time); })
    .y(function(d) { return y(d.Lightning); });

var svg = d3.select("#area3").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.csv("throughput.csv", function(data) {
  
  console.log(data[0]);

  // var tx_celer;
  data.forEach(function(d) {
    d.Time = +d.Time
    d.Celer = +d.Celer;
    d.Lightning = +d.Lightning
  });

  
  x.domain([0,T]);
  y.domain([0,7000]);

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Payment Throughput");


  var path1 = svg.append("path")
      .attr("class", "line")
      .attr("d", line1(data))
      .style("stroke", "red")

  var totalLength = path1.node().getTotalLength();


  path1
    .attr("stroke-dasharray", totalLength + " " + totalLength)
    .attr("stroke-dashoffset", totalLength)
   .transition() // Call Transition Method
    .duration(T*500) // Set Duration timing (ms)
    .ease(d3.easeLinear) // Set Easing option
    .attr("stroke-dashoffset", 0); // Set final value of dash-offset for transition


  var path2 = svg.append("path")
      .attr("class", "line")
      .attr("d", line2(data))
      .style("stroke", "blue")

  var totalLength2 = path2.node().getTotalLength();

  path2
    .attr("stroke-dasharray", totalLength2 + " " + totalLength2)
    .attr("stroke-dashoffset", totalLength2)
   .transition() // Call Transition Method
    .duration(T*500) // Set Duration timing (ms)
    .ease(d3.easeLinear) // Set Easing option
    .attr("stroke-dashoffset", 0); // Set final value of dash-offset for transition

});