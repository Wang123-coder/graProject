//%%javascript
require.undef('cache_mapway');

define('cache_mapway', ["@jupyter-widgets/base",'d3'], function(widgets,d3) {
    var CacheMapWayView = widgets.DOMWidgetView.extend({

        // Render the view.
        render: function() {
            //var d3 = require('./d3.js');
            this.svgContainer = d3.select(this.el).append("svg")
                                    .attr("width",'auto')
                                    .attr("height",'9cm');
            
            this.jsonRects = [{"x":0,"y":0,"w":'10cm',"h":'6.8cm'},
                              {"x":0,"y":260,"w":'10cm',"h":90},
                              {"x":95,"y":45,"w":80,"h":135},
                              {"x":255,"y":30,"w":65,"h":210},
                              {"x":70,"y":205,"w":170,"h":25}];
            this.rects = this.svgContainer.selectAll("rect")
                .data(this.jsonRects)
                .enter()
                .append("rect")
                .attr("x",function(d){return d.x;})
                .attr("y",function(d){return d.y;})
                .attr("width",function(d){return d.w;})
                .attr("height",function(d){return d.h;})
                .style("fill",function(d,i){
                    if(i == 0){return "#E6E6FA";}
                    else if(i == 1){return "#FAF0E6";}
                    else{return "white";}
                })
                .style("stroke",function(d,i){
                    if(i > 1){return "black";}
                })
            
            this.jsonTexts = [{"x":20,"y":280,"text":"Cache ： 8KB = 512B/行 × "},
                              {"x":165,"y":280,"text":"16行"},
                              {"x":20,"y":310,"text":"主存 ： 1024KB = 512B/块 × "},
                              {"x":175,"y":310,"text":"2048块"},                  //3        
                              {"x":115,"y":35,"text":"Cache"},
                              {"x":263,"y":20,"text":"主存储器"},
                              {"x":15,"y":222,"text":"主存地址"},
                              {"x":103,"y":57,"text":"Tag"},
                              {"x":141,"y":57,"text":"行号"},
                              {"x":143,"y":72,"text":"0行"},       //9
                              {"x":143,"y":87,"text":"1行"},
                              {"x":143,"y":102,"text":"2行"},
                              {"x":143,"y":117,"text":"3行"},
                              {"x":141,"y":162,"text":"14行"},
                              {"x":141,"y":177,"text":"15行"},           //14
                              {"x":275,"y":42,"text":"0块"},
                              {"x":275,"y":57,"text":"1块"},
                              {"x":267,"y":237,"text":"2047块"},
                              {"x":187,"y":222,"text":"块内地址"},
                              {"x":5,"y":120,"text":"比较两个Tag值,"},        //19
                              {"x":5,"y":135,"text":"判断是否命中"},
                              {"x":195,"y":244,"text":"9位"},
                              {"x":274,"y":87,"text":"15块"},          //22  direct start
                              {"x":274,"y":102,"text":"16块"},         
                              {"x":274,"y":117,"text":"17块"},
                              {"x":274,"y":147,"text":"31块"},
                              {"x":267,"y":192,"text":"2032块"},
                              {"x":267,"y":207,"text":"2033块"},         
                              {"x":122,"y":222,"text":"Cache行号"},//28
                              {"x":140,"y":244,"text":"4位"},
                              {"x":82,"y":244,"text":"7位"},//30
                              {"x":103,"y":195,"text":"7位"},
                              {"x":325,"y":65,"text":"0块群"},
                              {"x":325,"y":125,"text":"1块群"},
                              {"x":325,"y":212,"text":"127块群"},
                              {"x":109,"y":325,"text":" = 512B/块 × 16块/块群 × "},
                              {"x":245,"y":325,"text":"128块群"},
                              {"x":85,"y":222,"text":"Tag"},                //  37  direct end / group start
                              {"x":275,"y":87,"text":"7块"},          
                              {"x":275,"y":102,"text":"8块"},         
                              {"x":275,"y":117,"text":"9块"},
                              {"x":274,"y":147,"text":"15块"},
                              {"x":267,"y":192,"text":"2040块"},
                              {"x":267,"y":207,"text":"2041块"},         
                              {"x":122,"y":222,"text":"Cache组号"},
                              {"x":140,"y":244,"text":"3位"},
                              {"x":82,"y":244,"text":"8位"},
                              {"x":325,"y":65,"text":"0组群"},
                              {"x":325,"y":125,"text":"1组群"},
                              {"x":325,"y":212,"text":"255组群"},
                              {"x":70,"y":80,"text":"0组"},
                              {"x":70,"y":110,"text":"1组"},
                              {"x":70,"y":170,"text":"7组"},
                              {"x":99,"y":295,"text":" = 512B/行 × 2行/组 × "}, //53
                              {"x":215,"y":295,"text":"8组"},  
                              {"x":109,"y":325,"text":" = 512B/块 × 8块/组 × "},
                              {"x":225,"y":325,"text":"256组"},     //   56 group end
                              {"x":115,"y":244,"text":"11位"},     //57  full start
                              {"x":100,"y":222,"text":"标记（Tag)"},
                              {"x":5,"y":105,"text":"Tag:主存块群"},     //59
                              {"x":5,"y":105,"text":"Tag:主存组群"},
                              {"x":5,"y":105,"text":"Tag:主存块"}];
            this.texts = this.svgContainer.selectAll("text")
                .data(this.jsonTexts)
                .enter()
                .append("text")
                .attr("x",function(d){return d.x;})
                .attr("y",function(d){return d.y;})
                .attr("font-size",12)
                .attr("visibility",function(d,i){
                    if(i == 19 || i == 20 || (i >= 22 && i <= 61)){return "hidden";}
                })
                .text(function(d){return d.text;});
            
            this.jsonLines = [{"x1":95,"y1":60,"x2":175,"y2":60},    // 0 Cache横线
                             {"x1":95,"y1":75,"x2":175,"y2":75},
                             {"x1":95,"y1":90,"x2":175,"y2":90},
                             {"x1":95,"y1":105,"x2":175,"y2":105},
                             {"x1":95,"y1":120,"x2":175,"y2":120},
                             {"x1":95,"y1":150,"x2":175,"y2":150},
                             {"x1":95,"y1":165,"x2":175,"y2":165},
                             {"x1":255,"y1":45,"x2":320,"y2":45},     // 7 主存 横线
                             {"x1":255,"y1":60,"x2":320,"y2":60},
                             {"x1":255,"y1":75,"x2":320,"y2":75},
                             {"x1":255,"y1":90,"x2":320,"y2":90},
                             {"x1":255,"y1":105,"x2":320,"y2":105},
                             {"x1":255,"y1":120,"x2":320,"y2":120},
                             {"x1":255,"y1":135,"x2":320,"y2":135},
                             {"x1":255,"y1":150,"x2":320,"y2":150},
                             {"x1":255,"y1":180,"x2":320,"y2":180},
                             {"x1":255,"y1":195,"x2":320,"y2":195},
                             {"x1":255,"y1":210,"x2":320,"y2":210},
                             {"x1":255,"y1":225,"x2":320,"y2":225},  //18
                             {"x1":135,"y1":45,"x2":135,"y2":180},  //19  Cache竖线
                             {"x1":116,"y1":125,"x2":116,"y2":149},   //  20 虚线   3,3
                             {"x1":153,"y1":125,"x2":153,"y2":149},
                             {"x1":285,"y1":155,"x2":285,"y2":179},
                             {"x1":285,"y1":63,"x2":285,"y2":72},    // 23  2,2 虚线  
                             {"x1":285,"y1":123,"x2":285,"y2":132},
                             {"x1":285,"y1":212,"x2":285,"y2":221},
                             {"x1":183,"y1":205,"x2":183,"y2":230},  //  26  地址框 最后一条线
                             {"x1":118,"y1":205,"x2":118,"y2":230},  //  27  第二条   hidden
                             {"x1":175,"y1":67.5,"x2":255,"y2":37.5}, //  28  直接映射  hidden
                             {"x1":175,"y1":82.5,"x2":255,"y2":52.5},
                             {"x1":175,"y1":172.5,"x2":255,"y2":82.5},
                             {"x1":175,"y1":67.5,"x2":255,"y2":97.5}, 
                             {"x1":175,"y1":82.5,"x2":255,"y2":112.5}, 
                             {"x1":175,"y1":172.5,"x2":255,"y2":142.5},
                             {"x1":175,"y1":67.5,"x2":255,"y2":187.5}, 
                             {"x1":175,"y1":82.5,"x2":255,"y2":202.5},
                             {"x1":175,"y1":172.5,"x2":255,"y2":232.5},    // 36 
                             {"x1":320,"y1":30,"x2":330,"y2":30},      // 37  直接、组 共有
                             {"x1":320,"y1":90,"x2":330,"y2":90}, 
                             {"x1":320,"y1":150,"x2":330,"y2":150}, 
                             {"x1":320,"y1":180,"x2":330,"y2":180},
                             {"x1":320,"y1":240,"x2":330,"y2":240},     // 41
                             {"x1":175,"y1":75,"x2":255,"y2":37.5},   // 42 组
                             {"x1":175,"y1":75,"x2":255,"y2":97.5}, 
                             {"x1":175,"y1":75,"x2":255,"y2":187.5}, 
                             {"x1":175,"y1":105,"x2":255,"y2":52.5}, 
                             {"x1":175,"y1":105,"x2":255,"y2":112.5},
                             {"x1":175,"y1":105,"x2":255,"y2":202.5},
                             {"x1":175,"y1":165,"x2":255,"y2":82.5},
                             {"x1":175,"y1":165,"x2":255,"y2":142.5}, 
                             {"x1":175,"y1":165,"x2":255,"y2":232.5},  
                             {"x1":85,"y1":60,"x2":95,"y2":60},
                             {"x1":85,"y1":90,"x2":95,"y2":90},
                             {"x1":85,"y1":120,"x2":95,"y2":120},
                             {"x1":85,"y1":150,"x2":95,"y2":150},
                             {"x1":85,"y1":180,"x2":95,"y2":180},   //  55
                             {"x1":175,"y1":67.5,"x2":255,"y2":37.5},  // 56 全
                             {"x1":175,"y1":67.5,"x2":255,"y2":52.5},
                             {"x1":175,"y1":67.5,"x2":255,"y2":232.5},
                             {"x1":175,"y1":82.5,"x2":255,"y2":37.5},
                             {"x1":175,"y1":82.5,"x2":255,"y2":52.5},
                             {"x1":175,"y1":82.5,"x2":255,"y2":232.5},
                             {"x1":175,"y1":172.5,"x2":255,"y2":37.5},
                             {"x1":175,"y1":172.5,"x2":255,"y2":52.5},
                             {"x1":175,"y1":172.5,"x2":255,"y2":232.5}    //  64
                             ];
            this.lines = this.svgContainer.selectAll("line")
                .data(this.jsonLines)
                .enter()
                .append("line")
                .attr("x1",function(d){return d.x1;})
                .attr("y1",function(d){return d.y1;})
                .attr("x2",function(d){return d.x2;})
                .attr("y2",function(d){return d.y2;})
                .attr("visibility",function(d,i){
                    if(i >= 27 && i <= 64){return "hidden";}
                })
                .style("stroke","black")
                .style("stroke-width",1)
                .style("stroke-dasharray",function(d,i){
                    if(i >= 20 && i <= 22){return "3,3";}
                    else if(i >= 23 && i <= 25){return "2,2";}
                });
            
            // Python -> JavaScript update
            this.model.on('change:step', this.step_changed, this);
            this.model.on('change:max_step', this.max_step_changed, this);
            this.model.on('change:map_way', this.map_way_changed, this);
        },
         step_changed: function() {
            this.step = this.model.get('step');
            switch(this.step){
                case 1:
                    if(this.map_way == "直接映射" || this.map_way == "全相联映射" || this.map_way == "组相联映射"){
                        this.texts.style("fill",function(d,i){
                            if(i == 0 || i == 1){return "red";}
                            else{return "black";}
                        })
                    }
                    break;
                case 2:
                    if(this.map_way == "直接映射"){
                        this.texts.style("fill",function(d,i){
                            if(i == 0 || i == 6 || i == 18 || i == 21){return "red";}
                            else{return "black";}
                        })
                    }
                    else if(this.map_way == "全相联映射"){
                        this.texts.style("fill",function(d,i){
                            if(i == 1 || i == 6 || i == 4 || i == 9 || i == 14){return "red";}
                            else{return "black";}
                        })
                    }
                    else if(this.map_way == "组相联映射"){
                        this.texts.style("fill",function(d,i){
                            if(i == 1 || i == 4 || i == 9 || i == 14){return "red";}
                            else{return "black";}
                        })
                    }
                    break;
                case 3:
                    if(this.map_way == "直接映射"){
                        this.texts.style("fill",function(d,i){
                            if(i == 1 || i == 4 || i == 6 || i == 9 || i == 14 || i == 28 || i == 29){return "red";}
                            else{return "black";}
                        })
                    }
                    else if(this.map_way == "全相联映射"){
                        this.texts.style("fill",function(d,i){
                            if(i == 2 || i == 3){return "red";}
                            else{return "black";}
                        })
                    }
                    else if(this.map_way == "组相联映射"){
                        this.texts.style("fill",function(d,i){
                            if(i == 54 || i == 53){return "red";}
                            else{return "black";}
                        })
                    }
                    break;
                case 4:
                    if(this.map_way == "直接映射"){
                        this.texts.style("fill",function(d,i){
                            if(i == 2 || i == 3){return "red";}
                            else{return "black";}
                        })
                    }
                    else if(this.map_way == "全相联映射"){
                        this.texts.style("fill",function(d,i){
                            if(i == 3 || i == 5 || i == 15 || i == 17){return "red";}
                            else{return "black";}
                        })
                    }
                    else if(this.map_way == "组相联映射"){
                        this.texts.style("fill",function(d,i){
                            if(i == 4 || i == 6 || i == 44 || i == 45 || i == 50 || i == 52 || i == 54){return "red";}
                            else{return "black";}
                        })
                    }
                    break;
                case 5:
                    if(this.map_way == "直接映射"){
                        this.texts.style("fill",function(d,i){
                            if(i == 3 || i == 5 || i == 15 || i == 17){return "red";}
                            else{return "black";}
                        })
                    }
                    else if(this.map_way == "全相联映射"){
                        this.texts.style("fill",function(d,i){
                            if(i == 7 || i == 58 || i == 19 || i == 20 || i == 61){return "red";}
                            else{return "black";}
                        })
                        this.texts.attr("visibility",function(d,i){
                            if(i <= 21 || i == 57 || i == 58 || i == 61){return "visible";}
                            else{return "hidden";}
                        })
                    }
                    else if(this.map_way == "组相联映射"){
                        this.texts.style("fill",function(d,i){
                            if(i == 3 || i == 2){return "red";}
                            else{return "black";}
                        })
                    }
                    break;
                case 6:
                    if(this.map_way == "直接映射"){
                        this.texts.style("fill",function(d,i){
                            if(i == 35 || i == 36){return "red";}
                            else{return "black";}
                        })
                    }
                    else if(this.map_way == "全相联映射"){
                        this.texts.style("fill","black");
                        this.texts.attr("visibility",function(d,i){
                            if((i >= 22 && i <= 56) || i == 19 || i == 20 || i >= 59){return "hidden";}
                            else{return "visible";}
                        })
                    }
                    else if(this.map_way == "组相联映射"){
                        this.texts.style("fill",function(d,i){
                            if(i == 3 || i == 5 || i == 15 || i == 17){return "red";}
                            else{return "black";}
                        })
                    }
                    break;
                case 7:
                    if(this.map_way == "直接映射"){
                        this.texts.style("fill",function(d,i){
                            if((i >= 30 && i <= 32)|| (i == 6 || i == 34 || i == 36 || i == 37)){return "red";}
                            else{return "black";}
                        })
                    }
                    else if(this.map_way == "组相联映射"){
                        this.texts.style("fill",function(d,i){
                            if(i == 55 || i == 56){return "red";}
                            else{return "black";}
                        })
                    }
                    break;
                case 8:
                    if(this.map_way == "直接映射"){
                        this.texts.style("fill",function(d,i){
                            if(i == 7 || i == 37 || i == 19 || i == 20 || i == 59){return "red";}
                            else{return "black";}
                        })
                        this.texts.attr("visibility",function(d,i){
                            if(i <= 37 || i == 59){return "visible";}
                            else{return "hidden";}
                        })
                    }
                    else if(this.map_way == "组相联映射"){
                        this.texts.style("fill",function(d,i){
                            if(i == 5 || i ==47 || i == 49 || i == 56){return "red";}
                            else{return "black";}
                        })
                    }
                    break;
                case 9:
                    if(this.map_way == "组相联映射"){
                        this.texts.style("fill",function(d,i){
                            if(i == 7 || i == 37 || i == 19 || i == 20 || i == 60){return "red";}
                            else{return "black";}
                        })
                        this.texts.attr("visibility",function(d,i){
                            if(i < 22 || i == 60 || (i >= 37 && i <= 56)){return "visible";}
                            else{return "hidden";}
                        })
                    }
                    else if(this.map_way == "直接映射"){
                        this.texts.style("fill","black");
                        this.texts.attr("visibility",function(d,i){
                            if((i >= 38 && i <= 61) || i == 19 || i == 20){return "hidden";}
                            else{return "visible";}
                        })
                    }
                    break;
                default:
                    if(this.map_way == "组相联映射"){
                        this.texts.style("fill","black");
                        this.texts.attr("visibility",function(d,i){
                            if((i < 22 || (i >= 37 && i <= 56)) &&  i != 19 && i != 20){return "visible";}
                            else{return "hidden";}
                        })
                    }
            }
        },
         max_step_changed: function() {
            this.max_step = this.model.get('max_step');
        },
         map_way_changed: function() {
            this.map_way = this.model.get('map_way');
            this.texts.style("fill","black"); 
            if(this.map_way == "直接映射"){
                this.texts.attr("visibility",function(d,i){
                    if(i <= 37 && i != 19 && i != 20){return "visible";}
                    else{return "hidden";}
                })
                this.lines.attr("visibility",function(d,i){
                    if(i <= 41){return "visible";}
                    else{return "hidden";}
                })
            }
            else if(this.map_way == "组相联映射"){
                this.texts.attr("visibility",function(d,i){
                    if((i < 22 || (i >= 37 && i <= 56)) &&  i != 19 && i != 20){return "visible";}
                    else{return "hidden";}
                })
                this.lines.attr("visibility",function(d,i){
                    if(i <= 27 || (i >= 37 && i <= 55)){return "visible";}
                    else{return "hidden";}
                })
            }
            else if(this.map_way == "全相联映射"){
                this.texts.attr("visibility",function(d,i){
                    if((i != 19 && i != 20) && (i < 22 || i == 57 || i == 58)){return "visible";}
                    else{return "hidden";}
                })
                this.lines.attr("visibility",function(d,i){
                    if(i < 27 || (i >= 56 && i <= 64)){return "visible";}
                    else{return "hidden";}
                })
            }
            else if(this.map_way == "") {
                this.texts.attr("visibility",function(d,i){
                    if(i == 19 || i == 20 || (i >= 22 && i <= 61)){return "hidden";}
                })
                this.lines.attr("visibility",function(d,i){
                    if(i >= 27 && i <= 64){return "hidden";}
                })
            }
        },
    });
    
    return {
        CacheMapWayView: CacheMapWayView
    };
});