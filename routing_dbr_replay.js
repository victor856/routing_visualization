// Set the dimensions of the canvas / graph
var margin = {top: 30, right: 20, bottom: 30, left: 50},
  width = 500 - margin.left - margin.right,
  height = 500 - margin.top - margin.bottom;


// var color = d3.scaleOrdinal(d3.schemeCategory20);
var color = d3.scaleLinear()
  .domain([100, 0])
  .range(["red", "green"]);

var t = 0;
var T = 500;

// Adds the svg canvas
var chart1 = d3.select("#area1")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var simulation1 = d3.forceSimulation()
    .force("link", d3.forceLink().id(function(d) { return d.id; }))
    .force("charge", d3.forceManyBody())
    .force("center", d3.forceCenter(width / 2, height / 2));

d3.json("topology.json", function(error, graph) {
  if (error) throw error;

  var link = chart1.append("g")
      .attr("class", "links")
    .selectAll("line")
    .data(graph.links)
    .enter().append("line")
      .attr("stroke-width", 1);

  var node = chart1.append("g")
      .attr("class", "nodes")
    .selectAll("circle")
    .data(graph.nodes)
    .enter().append("circle")
      .attr("r", 5)
      .attr("fill", function(d) { return color(2); })



  simulation1
      .nodes(graph.nodes)
      .on("tick", ticked);

  simulation1.force("link")
      .links(graph.links);

  function ticked() {
    link
        .attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

    node
        .attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; });
  }



  d3.json("DBR_routes.json", function(routes) {

  
	  function routingHighlight() {
	  	var prev;
	  	if (t > 0){
	  		prev = t - 1;
	  	} else {
	  		prev = T - 1;
	  	}
	  	reset();
	  	highlight(routes.routes[t], routes.balance[t]);
	  	t = t + 1;
	  	if (t >= T){
	  		t = 0;
	  	}
	  }

	  function highlight(currentRoute, currentBalance) {
      for (i = 0; i < currentRoute.length; i++) {
    			chart1.selectAll("line")
    			  .filter(function(d) {
    			     return (d.source.id == currentRoute[i].source) && (d.target.id == currentRoute[i].target);
    			   })
    			  .style("stroke", "green")
    			  .attr("stroke-width", 0.2+currentRoute[i].weight/50);
  		}

      for (i = 0; i < currentBalance.length; i++) {
          chart1.selectAll("circle")
            .filter(function(d) {
               return (d.id == currentBalance[i].id);
             })
            .attr("fill", color(currentBalance[i].balance));
      }
	  }

	  function reset() {
  		chart1.selectAll("line")
  		  .style("stroke", "grey")
  		  .attr("stroke-width", 0.2);
	  }

	  setInterval(routingHighlight,500);
  });
	
});


// Adds the svg canvas
var chart2 = d3.select("#area2")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var simulation2 = d3.forceSimulation()
    .force("link", d3.forceLink().id(function(d) { return d.id; }))
    .force("charge", d3.forceManyBody())
    .force("center", d3.forceCenter(width / 2, height / 2));

d3.json("topology.json", function(error, graph) {
  if (error) throw error;

  var link2 = chart2.append("g")
      .attr("class", "links")
    .selectAll("line")
    .data(graph.links)
    .enter().append("line")
      .attr("stroke-width", 1);

  var node2 = chart2.append("g")
      .attr("class", "nodes")
    .selectAll("circle")
    .data(graph.nodes)
    .enter().append("circle")
      .attr("r", 5)
      .attr("fill", function(d) { return color(2); })



  simulation2
      .nodes(graph.nodes)
      .on("tick", ticked);

  simulation2.force("link")
      .links(graph.links);

  function ticked() {
    link2
        .attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

    node2
        .attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; });
  }



  d3.json("Lightning_routes.json", function(routes) {

  
    function routingHighlight() {
      var prev;
      if (t > 0){
        prev = t - 1;
      } else {
        prev = T - 1;
      }
      reset();
      highlight(routes.routes[t], routes.balance[t]);
      t = t + 1;
      if (t >= T){
        t = 0;
      }
    }

    function highlight(currentRoute, currentBalance) {
      for (i = 0; i < currentRoute.length; i++) {
          chart2.selectAll("line")
            .filter(function(d) {
               return (d.source.id == currentRoute[i].source) && (d.target.id == currentRoute[i].target);
             })
            .style("stroke", "green")
            .attr("stroke-width", 0.2+currentRoute[i].weight/50);
      }

      for (i = 0; i < currentBalance.length; i++) {
          chart2.selectAll("circle")
            .filter(function(d) {
               return (d.id == currentBalance[i].id);
             })
            .attr("fill", color(currentBalance[i].balance));
      }
    }

    function reset() {
      chart2.selectAll("line")
        .style("stroke", "grey")
        .attr("stroke-width", 0.2);
    }

    setInterval(routingHighlight,500);
  });
  
});