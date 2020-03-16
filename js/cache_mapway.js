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
            
            this.jsonTexts = [{"x":20,"y":280,"text":"Cache �� 8KB = 512B/�� �� "},
                              {"x":165,"y":280,"text":"16��"},
                              {"x":20,"y":310,"text":"���� �� 1024KB = 512B/�� �� "},
                              {"x":175,"y":310,"text":"2048��"},                  //3        
                              {"x":115,"y":35,"text":"Cache"},
                              {"x":263,"y":20,"text":"���洢��"},
                              {"x":15,"y":222,"text":"�����ַ"},
                              {"x":103,"y":57,"text":"Tag"},
                              {"x":141,"y":57,"text":"�к�"},
                              {"x":143,"y":72,"text":"0��"},       //9
                              {"x":143,"y":87,"text":"1��"},
                              {"x":143,"y":102,"text":"2��"},
                              {"x":143,"y":117,"text":"3��"},
                              {"x":141,"y":162,"text":"14��"},
                              {"x":141,"y":177,"text":"15��"},           //14
                              {"x":275,"y":42,"text":"0��"},
                              {"x":275,"y":57,"text":"1��"},
                              {"x":267,"y":237,"text":"2047��"},
                              {"x":187,"y":222,"text":"���ڵ�ַ"},
                              {"x":5,"y":120,"text":"�Ƚ�����Tagֵ,"},        //19
                              {"x":5,"y":135,"text":"�ж��Ƿ�����"},
                              {"x":195,"y":244,"text":"9λ"},
                              {"x":274,"y":87,"text":"15��"},          //22  direct start
                              {"x":274,"y":102,"text":"16��"},         
                              {"x":274,"y":117,"text":"17��"},
                              {"x":274,"y":147,"text":"31��"},
                              {"x":267,"y":192,"text":"2032��"},
                              {"x":267,"y":207,"text":"2033��"},         
                              {"x":122,"y":222,"text":"Cache�к�"},//28
                              {"x":140,"y":244,"text":"4λ"},
                              {"x":82,"y":244,"text":"7λ"},//30
                              {"x":103,"y":195,"text":"7λ"},
                              {"x":325,"y":65,"text":"0��Ⱥ"},
                              {"x":325,"y":125,"text":"1��Ⱥ"},
                              {"x":325,"y":212,"text":"127��Ⱥ"},
                              {"x":109,"y":325,"text":" = 512B/�� �� 16��/��Ⱥ �� "},
                              {"x":245,"y":325,"text":"128��Ⱥ"},
                              {"x":85,"y":222,"text":"Tag"},                //  37  direct end / group start
                              {"x":275,"y":87,"text":"7��"},          
                              {"x":275,"y":102,"text":"8��"},         
                              {"x":275,"y":117,"text":"9��"},
                              {"x":274,"y":147,"text":"15��"},
                              {"x":267,"y":192,"text":"2040��"},
                              {"x":267,"y":207,"text":"2041��"},         
                              {"x":122,"y":222,"text":"Cache���"},
                              {"x":140,"y":244,"text":"3λ"},
                              {"x":82,"y":244,"text":"8λ"},
                              {"x":325,"y":65,"text":"0��Ⱥ"},
                              {"x":325,"y":125,"text":"1��Ⱥ"},
                              {"x":325,"y":212,"text":"255��Ⱥ"},
                              {"x":70,"y":80,"text":"0��"},
                              {"x":70,"y":110,"text":"1��"},
                              {"x":70,"y":170,"text":"7��"},
                              {"x":99,"y":295,"text":" = 512B/�� �� 2��/�� �� "}, //53
                              {"x":215,"y":295,"text":"8��"},  
                              {"x":109,"y":325,"text":" = 512B/�� �� 8��/�� �� "},
                              {"x":225,"y":325,"text":"256��"},     //   56 group end
                              {"x":115,"y":244,"text":"11λ"},     //57  full start
                              {"x":100,"y":222,"text":"��ǣ�Tag)"},
                              {"x":5,"y":105,"text":"Tag:�����Ⱥ"},     //59
                              {"x":5,"y":105,"text":"Tag:������Ⱥ"},
                              {"x":5,"y":105,"text":"Tag:�����"}];
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
            
            this.jsonLines = [{"x1":95,"y1":60,"x2":175,"y2":60},    // 0 Cache����
                             {"x1":95,"y1":75,"x2":175,"y2":75},
                             {"x1":95,"y1":90,"x2":175,"y2":90},
                             {"x1":95,"y1":105,"x2":175,"y2":105},
                             {"x1":95,"y1":120,"x2":175,"y2":120},
                             {"x1":95,"y1":150,"x2":175,"y2":150},
                             {"x1":95,"y1":165,"x2":175,"y2":165},
                             {"x1":255,"y1":45,"x2":320,"y2":45},     // 7 ���� ����
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
                             {"x1":135,"y1":45,"x2":135,"y2":180},  //19  Cache����
                             {"x1":116,"y1":125,"x2":116,"y2":149},   //  20 ����   3,3
                             {"x1":153,"y1":125,"x2":153,"y2":149},
                             {"x1":285,"y1":155,"x2":285,"y2":179},
                             {"x1":285,"y1":63,"x2":285,"y2":72},    // 23  2,2 ����  
                             {"x1":285,"y1":123,"x2":285,"y2":132},
                             {"x1":285,"y1":212,"x2":285,"y2":221},
                             {"x1":183,"y1":205,"x2":183,"y2":230},  //  26  ��ַ�� ���һ����
                             {"x1":118,"y1":205,"x2":118,"y2":230},  //  27  �ڶ���   hidden
                             {"x1":175,"y1":67.5,"x2":255,"y2":37.5}, //  28  ֱ��ӳ��  hidden
                             {"x1":175,"y1":82.5,"x2":255,"y2":52.5},
                             {"x1":175,"y1":172.5,"x2":255,"y2":82.5},
                             {"x1":175,"y1":67.5,"x2":255,"y2":97.5}, 
                             {"x1":175,"y1":82.5,"x2":255,"y2":112.5}, 
                             {"x1":175,"y1":172.5,"x2":255,"y2":142.5},
                             {"x1":175,"y1":67.5,"x2":255,"y2":187.5}, 
                             {"x1":175,"y1":82.5,"x2":255,"y2":202.5},
                             {"x1":175,"y1":172.5,"x2":255,"y2":232.5},    // 36 
                             {"x1":320,"y1":30,"x2":330,"y2":30},      // 37  ֱ�ӡ��� ����
                             {"x1":320,"y1":90,"x2":330,"y2":90}, 
                             {"x1":320,"y1":150,"x2":330,"y2":150}, 
                             {"x1":320,"y1":180,"x2":330,"y2":180},
                             {"x1":320,"y1":240,"x2":330,"y2":240},     // 41
                             {"x1":175,"y1":75,"x2":255,"y2":37.5},   // 42 ��
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
                             {"x1":175,"y1":67.5,"x2":255,"y2":37.5},  // 56 ȫ
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
                    if(this.map_way == "ֱ��ӳ��" || this.map_way == "ȫ����ӳ��" || this.map_way == "������ӳ��"){
                        this.texts.style("fill",function(d,i){
                            if(i == 0 || i == 1){return "red";}
                            else{return "black";}
                        })
                    }
                    break;
                case 2:
                    if(this.map_way == "ֱ��ӳ��"){
                        this.texts.style("fill",function(d,i){
                            if(i == 0 || i == 6 || i == 18 || i == 21){return "red";}
                            else{return "black";}
                        })
                    }
                    else if(this.map_way == "ȫ����ӳ��"){
                        this.texts.style("fill",function(d,i){
                            if(i == 1 || i == 6 || i == 4 || i == 9 || i == 14){return "red";}
                            else{return "black";}
                        })
                    }
                    else if(this.map_way == "������ӳ��"){
                        this.texts.style("fill",function(d,i){
                            if(i == 1 || i == 4 || i == 9 || i == 14){return "red";}
                            else{return "black";}
                        })
                    }
                    break;
                case 3:
                    if(this.map_way == "ֱ��ӳ��"){
                        this.texts.style("fill",function(d,i){
                            if(i == 1 || i == 4 || i == 6 || i == 9 || i == 14 || i == 28 || i == 29){return "red";}
                            else{return "black";}
                        })
                    }
                    else if(this.map_way == "ȫ����ӳ��"){
                        this.texts.style("fill",function(d,i){
                            if(i == 2 || i == 3){return "red";}
                            else{return "black";}
                        })
                    }
                    else if(this.map_way == "������ӳ��"){
                        this.texts.style("fill",function(d,i){
                            if(i == 54 || i == 53){return "red";}
                            else{return "black";}
                        })
                    }
                    break;
                case 4:
                    if(this.map_way == "ֱ��ӳ��"){
                        this.texts.style("fill",function(d,i){
                            if(i == 2 || i == 3){return "red";}
                            else{return "black";}
                        })
                    }
                    else if(this.map_way == "ȫ����ӳ��"){
                        this.texts.style("fill",function(d,i){
                            if(i == 3 || i == 5 || i == 15 || i == 17){return "red";}
                            else{return "black";}
                        })
                    }
                    else if(this.map_way == "������ӳ��"){
                        this.texts.style("fill",function(d,i){
                            if(i == 4 || i == 6 || i == 44 || i == 45 || i == 50 || i == 52 || i == 54){return "red";}
                            else{return "black";}
                        })
                    }
                    break;
                case 5:
                    if(this.map_way == "ֱ��ӳ��"){
                        this.texts.style("fill",function(d,i){
                            if(i == 3 || i == 5 || i == 15 || i == 17){return "red";}
                            else{return "black";}
                        })
                    }
                    else if(this.map_way == "ȫ����ӳ��"){
                        this.texts.style("fill",function(d,i){
                            if(i == 7 || i == 58 || i == 19 || i == 20 || i == 61){return "red";}
                            else{return "black";}
                        })
                        this.texts.attr("visibility",function(d,i){
                            if(i <= 21 || i == 57 || i == 58 || i == 61){return "visible";}
                            else{return "hidden";}
                        })
                    }
                    else if(this.map_way == "������ӳ��"){
                        this.texts.style("fill",function(d,i){
                            if(i == 3 || i == 2){return "red";}
                            else{return "black";}
                        })
                    }
                    break;
                case 6:
                    if(this.map_way == "ֱ��ӳ��"){
                        this.texts.style("fill",function(d,i){
                            if(i == 35 || i == 36){return "red";}
                            else{return "black";}
                        })
                    }
                    else if(this.map_way == "ȫ����ӳ��"){
                        this.texts.style("fill","black");
                        this.texts.attr("visibility",function(d,i){
                            if((i >= 22 && i <= 56) || i == 19 || i == 20 || i >= 59){return "hidden";}
                            else{return "visible";}
                        })
                    }
                    else if(this.map_way == "������ӳ��"){
                        this.texts.style("fill",function(d,i){
                            if(i == 3 || i == 5 || i == 15 || i == 17){return "red";}
                            else{return "black";}
                        })
                    }
                    break;
                case 7:
                    if(this.map_way == "ֱ��ӳ��"){
                        this.texts.style("fill",function(d,i){
                            if((i >= 30 && i <= 32)|| (i == 6 || i == 34 || i == 36 || i == 37)){return "red";}
                            else{return "black";}
                        })
                    }
                    else if(this.map_way == "������ӳ��"){
                        this.texts.style("fill",function(d,i){
                            if(i == 55 || i == 56){return "red";}
                            else{return "black";}
                        })
                    }
                    break;
                case 8:
                    if(this.map_way == "ֱ��ӳ��"){
                        this.texts.style("fill",function(d,i){
                            if(i == 7 || i == 37 || i == 19 || i == 20 || i == 59){return "red";}
                            else{return "black";}
                        })
                        this.texts.attr("visibility",function(d,i){
                            if(i <= 37 || i == 59){return "visible";}
                            else{return "hidden";}
                        })
                    }
                    else if(this.map_way == "������ӳ��"){
                        this.texts.style("fill",function(d,i){
                            if(i == 5 || i ==47 || i == 49 || i == 56){return "red";}
                            else{return "black";}
                        })
                    }
                    break;
                case 9:
                    if(this.map_way == "������ӳ��"){
                        this.texts.style("fill",function(d,i){
                            if(i == 7 || i == 37 || i == 19 || i == 20 || i == 60){return "red";}
                            else{return "black";}
                        })
                        this.texts.attr("visibility",function(d,i){
                            if(i < 22 || i == 60 || (i >= 37 && i <= 56)){return "visible";}
                            else{return "hidden";}
                        })
                    }
                    else if(this.map_way == "ֱ��ӳ��"){
                        this.texts.style("fill","black");
                        this.texts.attr("visibility",function(d,i){
                            if((i >= 38 && i <= 61) || i == 19 || i == 20){return "hidden";}
                            else{return "visible";}
                        })
                    }
                    break;
                default:
                    if(this.map_way == "������ӳ��"){
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
            if(this.map_way == "ֱ��ӳ��"){
                this.texts.attr("visibility",function(d,i){
                    if(i <= 37 && i != 19 && i != 20){return "visible";}
                    else{return "hidden";}
                })
                this.lines.attr("visibility",function(d,i){
                    if(i <= 41){return "visible";}
                    else{return "hidden";}
                })
            }
            else if(this.map_way == "������ӳ��"){
                this.texts.attr("visibility",function(d,i){
                    if((i < 22 || (i >= 37 && i <= 56)) &&  i != 19 && i != 20){return "visible";}
                    else{return "hidden";}
                })
                this.lines.attr("visibility",function(d,i){
                    if(i <= 27 || (i >= 37 && i <= 55)){return "visible";}
                    else{return "hidden";}
                })
            }
            else if(this.map_way == "ȫ����ӳ��"){
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