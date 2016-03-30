function createSoccerViz() {
  d3.csv("worldcup.csv", function(data) {
    overallTeamViz(data);
  })

  function overallTeamViz(incomingData) {

    d3.select("svg")
      .append("g")
      .attr("id", "teamG")
      .attr("transform", "translate(50,300)")
      .selectAll("g")
      .data(incomingData)
      .enter()
      .append("g")
      .attr("class", "overallG")
      .attr("transform", function(d, i) {return "translate(" + (i * 50) + ",0)"});

    var teamG = d3.selectAll("g.overallG");

    teamG.append("circle")
        .attr("r", 20)
        .style("fill", "pink")
        .style("stroke", "black")
        .style("stroke-width", "1px")

    teamG.append("text")
        .style("text-anchor", "middle")
        .attr("y", 30)
        .style("font-size", "10px")
        .text(function(d) {return d.team;});

    var dataKeys = d3.keys(incomingData[0]).filter(function(el) {
      return el != "team" && el != "region";
    });

    d3.select("#controls").selectAll("button.teams")
      .data(dataKeys).enter()
      .append("button")
      .on("click", buttonClick)
      .html(function(d) {return d;});

    function buttonClick(datapoint) {
      var maxValue = d3.max(incomingData, function(el) {
        return parseFloat(el[datapoint]);
      });
      var colorQuantize = d3.scale.quantize()
        .domain([0,maxValue]).range(colorbrewer.Reds[3]);
      var radiusScale = d3.scale.linear()
        .domain([0,maxValue]).range([2,20]);
      d3.selectAll("g.overallG").select("circle").transition().duration(1000)
        .style("fill", function(p) {
          return colorQuantize(p[datapoint]);
        })
        .attr("r", function(p) {
          return radiusScale(p[datapoint]);
        });
    };

    teamG.on("mouseover", highlightRegion2);
    function highlightRegion(d) {
         d3.selectAll("g.overallG").select("circle")
                .style("fill", function(p) {
                      return p.region == d.region ? "red" : "gray";
      });
    }

    function highlightRegion2(d,i) {
      var teamColor = d3.rgb("pink");
      d3.select(this).select("text").classed("highlight", true).attr("y", 10)
      d3.selectAll("g.overallG").select("circle")
             .style("fill", function(p) {return p.region == d.region ?
                     teamColor.darker(.75) : teamColor.brighter(.5)});
      this.parentElement.appendChild(this);
    };

    teamG.on("mouseout", unHighlight)
    function unHighlight() {
      d3.selectAll("g.overallG").select("circle").attr("class", "");
      d3.selectAll("g.overallG").select("text").classed("highlight", false).attr("y", 30);
    };


  }
}
