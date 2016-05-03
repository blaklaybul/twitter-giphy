
function init(date){

  d3.selectAll(".bg-rect").remove();
  d3.selectAll(".states-group").remove();
  new Map(date);

}

var Map = function(date){


  var states = [];

  d3.select("#grid").text().split("\n").forEach(function(line, i) {
    var re = /\w+/g, m;
    while (m = re.exec(line)) states.push({
      name: m[0],
      x: m.index / 3,
      y: i
    });
  });

  var svg = d3.select("svg").attr("id","chart"),
  width = +svg.attr("width"),
  height = +svg.attr("height");

  var gridWidth = d3.max(states, function(d) { return d.x; }) + 1,
  gridHeight = d3.max(states, function(d) { return d.y; }) + 1,
  cellSize = 100;

  // Black background for different size gifs
  // svg.append("rect")
  // .attr("class", "bg-rect")
  // .attr("width", "100%")
  // .attr("height", "100%")
  // // .attr("fill", "#ffffff")

  var file = "../map/" +date + ".json";

  d3.json(file, function(json){

    var defaultGif = json[json.findIndex(x=>x.stateName=="XX")].trendMapped;
    console.log(defaultGif);

    states.forEach(function(d){
      var result = json.filter(function (entry) { return entry.stateName === d.name; });

      if (result.length>0) {
        d.trendMapped = result[0]['trendMapped'];
        d.stateName = result[0]['stateName'];
      }

      else {
        d.stateName = d.name;
        d.trendMapped = defaultGif;
      }    
    })


    var state = svg.append("g")
    .attr("class", "states-group")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")
    .selectAll(".state")
    .data(states)
    .enter().append("g")
    .attr("id", function(d) { return d.name })
    .attr("class", "state")
    .attr("transform", function(d) {
      var forx = states[states.findIndex(x => x.name==d.stateName)].x;
      var fory = states[states.findIndex(x => x.name==d.stateName)].y;
      return "translate(" + (forx - gridWidth / 2) * cellSize + "," + (fory - gridHeight / 2) * cellSize + ")";
    });

    state.append("rect")
    .attr("x", -cellSize / 2)
    .attr("y", -cellSize / 2)
    .attr("width", cellSize)
    .attr("height", cellSize)
    .style("fill", "#000000")

    state.append("image")
    .attr("xlink:href", function(d, i) {
      return "../gifs/" + d.trendMapped + ".gif";
    })
    .attr("x", -cellSize/2)
    .attr("y", -cellSize/2)
    .attr("width", cellSize)
    .attr("id", function(d){return d.stateName + "-" + d.trendMapped})
    .attr("height", cellSize)


    state.append("text")
    .attr("class", "state-text")
    .attr("dy", ".35em")
    .attr("text-anchor", "middle")
    .text(function(d) { return d.stateName })
    // .text(function(d) { return d.stateName + " " + d.trendMapped; })
    
  });
}
