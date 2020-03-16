//%%javascript
require.undef('cache_baseop');

define('cache_baseop', ["@jupyter-widgets/base",'d3'], function(widgets,d3) {
    var CacheBaseOpView = widgets.DOMWidgetView.extend({

        // Render the view.
        render: function() {
            //var d3 = require('./d3.js');
            this.svgContainer = d3.select(this.el).append("svg")
                                    .attr("width",'15.7cm')
                                    .attr("height",'8cm')
                                    .style("border","1px solid black");
            
            this.jsonRects = [{"x":0,"y":0,"w":'15.7cm',"h":'8cm'},   //bg
                              {"x":60,"y":10,"w":50,"h":20},            // 1
                              {"x":38,"y":50,"w":95,"h":30},     
                              {"x":38,"y":150,"w":95,"h":30},
                              {"x":320,"y":100,"w":119,"h":30},
                              {"x":320,"y":150,"w":117,"h":30},
                              {"x":221,"y":210,"w":107,"h":30},
                              {"x":430,"y":210,"w":107,"h":30},
                              {"x":60,"y":265,"w":50,"h":20}];
            this.rects = this.svgContainer.selectAll("rect")
                .data(this.jsonRects)
                .enter()
                .append("rect")
                .attr("x",function(d){return d.x;})
                .attr("y",function(d){return d.y;})
                .attr("rx",function(d,i){
                    if(i == 1 || i == 8){return 10;}
                    else{return 0;}
                })
                .attr("ry",function(d,i){
                    if(i == 1 || i == 8){return 10;}
                    else{return 0;}
                })
                .attr("width",function(d){return d.w;})
                .attr("height",function(d){return d.h;})
                .style("fill",function(d,i){
                    if (i == 0){return "#FAFAD2";}
                    else {return "white";}
                })
                .style("stroke",function(d,i){
                    if(i != 0){return "black";}
                })
                .style("stroke-width",function(d,i){
                    if(i != 0){return 2;}
                });
            
            this.polygon = this.svgContainer
                .append("polygon")
                .attr("points","43,100 128,100 138,115 128,130 43,130 35,115")
                .style("fill","white")
                .style("stroke","black")
                .style("stroke-width",2);
            
            this.jsonRTexts = [{"x":68,"y":24,"text":"START"},
                              {"x":44,"y":60,"text":"Receive address"},
                              {"x":44,"y":75,"text":"RA from CPU"},
                              {"x":44,"y":110,"text":"Is block contain"},
                              {"x":44,"y":125,"text":"-ing RA in cache£¿"}, 
                              {"x":44,"y":160,"text":"Fetch RA word &"},
                              {"x":44,"y":175,"text":"deliver into CPU"},
                              {"x":324,"y":110,"text":"Access main memory"},
                              {"x":324,"y":125,"text":"for block containing RA"},
                              {"x":324,"y":160,"text":"Allocate cache slot for"},
                              {"x":324,"y":175,"text":"main memory block"},
                              {"x":225,"y":221,"text":"Load main memory"},
                              {"x":225,"y":236,"text":"block into cache slot"},
                              {"x":444,"y":221,"text":"Deliver RA word"},
                              {"x":444,"y":236,"text":"to CPU"},
                              {"x":70,"y":279,"text":"DONE"},
                              {"x":200,"y":108,"text":"No£¨È±Ê§£©"},
                              {"x":95,"y":143,"text":"Yes£¨ÃüÖÐ£©"}];
            this.rects_text = this.svgContainer.selectAll("text")
                        .data(this.jsonRTexts)
                        .enter()
                        .append("text")
                        .attr("x",function(d){return d.x;})
                        .attr("y",function(d){return d.y;})
                        .attr("font-size",11)
                        .text(function(d){return d.text;})
                        .style("stroke","black");
            
            this.jsonLines = [{"x1":85,"y1":30,"x2":85,"y2":50},
                             {"x1":85,"y1":80,"x2":85,"y2":100},
                             {"x1":85,"y1":130,"x2":85,"y2":150},
                             {"x1":85,"y1":180,"x2":85,"y2":265},
                             {"x1":137,"y1":115,"x2":320,"y2":115},
                             {"x1":375,"y1":130,"x2":375,"y2":150},
                             {"x1":375,"y1":180,"x2":375,"y2":195}]
            this.lines = this.svgContainer.selectAll("line")
                .data(this.jsonLines)
                .enter()
                .append("line")
                .attr("x1",function(d){return d.x1;})
                .attr("y1",function(d){return d.y1;})
                .attr("x2",function(d){return d.x2;})
                .attr("y2",function(d){return d.y2;})
                .style("stroke","black")
                .style("stroke-width",2);
            
            this.jsonPolyLines = [{"points":"271,210 271,195 480,195 480,210"},
                                 {"points":"271,240 271,255 480,255 480,240"},
                                 {"points":"375,255 375,275 110,275"}];
            this.polylines = this.svgContainer.selectAll("polyline")
                .data(this.jsonPolyLines)
                .enter()
                .append("polyline")
                .attr("points",function(d){return d.points;})
                .style("fill","none")
                .style("stroke","black")
                .style("stroke-width",2);
            
            this.jsonPaths = [{"d":"M 80 45 L 85 50 L 90 45"},
                             {"d":"M 80 95 L 85 100 L 90 95"},
                             {"d":"M 80 145 L 85 150 L 90 145"},
                             {"d":"M 80 260 L 85 265 L 90 260"},
                             {"d":"M 315 110 L 320 115 L 315 120"},
                             {"d":"M 370 145 L 375 150 L 380 145"},
                             {"d":"M 266 205 L 271 210 L 276 205"},
                             {"d":"M 475 205 L 480 210 L 485 205"},
                             {"d":"M 115 270 L 110 275 L 115 280"}]
            this.paths = this.svgContainer.selectAll("path")
                .data(this.jsonPaths)
                .enter()
                .append("path")
                .attr("d",function(d){return d.d;});
            
            this.xplines = this.svgContainer.append("polyline")
                .attr("points","191,90 560,90 560,265 191,265 191,90")
                .attr("visibility","hidden")
                .style("fill","none")
                .style("stroke","red")
                .style("stroke-width",2)
                .style("stroke-dasharray","5,5");
            
            this.warning = this.svgContainer.append("text")
                        .attr("x",330)
                        .attr("y",60)
                        .attr("font-size",11)
                        .attr("visibility","hidden")
                        .text("È±Ê§´¦Àí£¨Ìæ»»Ëã·¨£©")
                        .style("stroke","red");
            
            this.step = this.model.get('step');
            this.max_step = this.model.get('max_step');
            
            // Python -> JavaScript update
            this.model.on('change:step', this.step_changed, this);
            this.model.on('change:max_step', this.max_step_changed, this);
        },
         step_changed: function() {
            this.step = this.model.get('step');
            if(this.step == 0 || this.step == this.max_step){
                this.svgContainer.selectAll("*")
                    .style("stroke","black")
                this.paths.style("fill","black")
                this.xplines.style("stroke","red")
                this.warning.style("stroke","red")
                this.xplines.attr("visibility","hidden")
                this.warning.attr("visibility","hidden")
            }
            else if(this.step == 1){
                this.rects.style("stroke",function(d,i){
                    if (i == 1){return "red";}
                    else {return "black";}
                })
                this.rects_text.style("stroke",function(d,i){
                    if (i == 0){return "red";}
                    else {return "black";}
                })
                this.lines.style("stroke",function(d,i){
                    if (i == 0){return "red";}
                    else {return "black";}
                })
                this.paths.style("stroke",function(d,i){
                    if (i == 0){return "red";}
                    else {return "black";}
                })
                .style("fill",function(d,i){
                    if (i == 0){return "red";}
                    else {return "black";}
                })
            }
            else if(this.step == 2){
                this.rects.style("stroke",function(d,i){
                    if (i == 2){return "red";}
                    else {return "black";}
                })
                this.rects_text.style("stroke",function(d,i){
                    if (i == 1 || i == 2){return "red";}
                    else {return "black";}
                })
                this.lines.style("stroke",function(d,i){
                    if (i == 1){return "red";}
                    else {return "black";}
                })
                this.paths.style("stroke",function(d,i){
                    if (i == 1){return "red";}
                    else {return "black";}
                })
                .style("fill",function(d,i){
                    if (i == 1){return "red";}
                    else {return "black";}
                })
            }
            else if(this.step == 3){
                this.rects.style("stroke","black")
                this.polygon.style("stroke","red")
                this.rects_text.style("stroke",function(d,i){
                    if (i == 3 || i == 4 || i == 17){return "red";}
                    else {return "black";}
                })
                this.lines.style("stroke",function(d,i){
                    if (i == 2){return "red";}
                    else {return "black";}
                })
                this.paths.style("stroke",function(d,i){
                    if (i == 2){return "red";}
                    else {return "black";}
                })
                .style("fill",function(d,i){
                    if (i == 2){return "red";}
                    else {return "black";}
                })
            }
            else if(this.step == 4){
                this.polygon.style("stroke","black")
                this.rects.style("stroke",function(d,i){
                    if (i == 3){return "red";}
                    else {return "black";}
                })
                this.rects_text.style("stroke",function(d,i){
                    if (i == 5 || i == 6){return "red";}
                    else {return "black";}
                })
                this.lines.style("stroke",function(d,i){
                    if (i == 3){return "red";}
                    else {return "black";}
                })
                this.paths.style("stroke",function(d,i){
                    if (i == 3){return "red";}
                    else {return "black";}
                })
                .style("fill",function(d,i){
                    if (i == 3){return "red";}
                    else {return "black";}
                })
            }
            else if(this.step == 5){
                this.rects.style("stroke",function(d,i){
                    if (i == 8){return "red";}
                    else {return "black";}
                })
                this.rects_text.style("stroke",function(d,i){
                    if (i == 15){return "red";}
                    else {return "black";}
                })
            }
            else if(this.step == 6){
                this.rects.style("stroke",function(d,i){
                    if (i == 4){return "red";}
                    else {return "black";}
                })
                this.rects_text.style("stroke",function(d,i){
                    if (i == 7 || i == 8 || i == 16){return "red";}
                    else {return "black";}
                })
                this.lines.style("stroke",function(d,i){
                    if (i == 4){return "red";}
                    else {return "black";}
                })
                this.paths.style("stroke",function(d,i){
                    if (i == 4){return "red";}
                    else {return "black";}
                })
                .style("fill",function(d,i){
                    if (i == 4){return "red";}
                    else {return "black";}
                })
            }
            else if(this.step == 7){
                this.rects.style("stroke",function(d,i){
                    if (i == 5){return "red";}
                    else {return "black";}
                })
                this.rects_text.style("stroke",function(d,i){
                    if (i == 9 || i == 10){return "red";}
                    else {return "black";}
                })
                this.lines.style("stroke",function(d,i){
                    if (i == 5){return "red";}
                    else {return "black";}
                })
                this.paths.style("stroke",function(d,i){
                    if (i == 5){return "red";}
                    else {return "black";}
                })
                .style("fill",function(d,i){
                    if (i == 5){return "red";}
                    else {return "black";}
                })
            }  
            else if(this.step == 8){
                this.rects.style("stroke",function(d,i){
                    if (i == 7 || i == 6){return "red";}
                    else {return "black";}
                })
                this.rects_text.style("stroke",function(d,i){
                    if (i >= 11 && i <= 14){return "red";}
                    else {return "black";}
                })
                this.lines.style("stroke",function(d,i){
                    if (i == 6){return "red";}
                    else {return "black";}
                })
                this.paths.style("stroke",function(d,i){
                    if (i == 6 || i == 7){return "red";}
                    else {return "black";}
                })
                .style("fill",function(d,i){
                    if (i == 6 || i == 7){return "red";}
                    else {return "black";}
                })
                this.polylines.style("stroke",function(d,i){
                    if (i == 0){return "red";}
                    else {return "black";}
                })
            }  
            else if(this.step == 9){
                this.lines.style("stroke","black")
                this.rects.style("stroke","black")
                this.rects_text.style("stroke","black")
                this.paths.style("stroke","black")
                    .style("fill","black")
                this.polylines.style("stroke","black")
                this.xplines.attr("visibility","visible")
                this.warning.attr("visibility","visible")
            }
            else if(this.step == 10){
                this.xplines.attr("visibility","hidden")
                this.warning.attr("visibility","hidden")
                this.polylines.style("stroke",function(d,i){
                    if (i != 0){return "red";}
                    else {return "black";}
                })
                this.paths.style("stroke",function(d,i){
                    if (i == 8){return "red";}
                    else {return "black";}
                })
                .style("fill",function(d,i){
                    if (i == 8){return "red";}
                    else {return "black";}
                })
                 this.rects.style("stroke",function(d,i){
                    if (i == 8){return "red";}
                    else {return "black";}
                })
                this.rects_text.style("stroke",function(d,i){
                    if (i == 15){return "red";}
                    else {return "black";}
                })
            }  
        },
         max_step_changed: function() {
            this.max_step = this.model.get('max_step');
        },
    });
    
    return {
        CacheBaseOpView: CacheBaseOpView
    };
});