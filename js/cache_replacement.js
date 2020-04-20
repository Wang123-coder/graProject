//%%javascript 
require.undef('cache_replacement');

define('cache_replacement', ["@jupyter-widgets/base",'d3'], function(widgets,d3) {
    var CacheReplacementView = widgets.DOMWidgetView.extend({

        // Render the view.
        render: function() {
            //var d3 = require('./d3.js');
            this.svgContainer = d3.select(this.el).append("svg")
                                    .attr("width",'auto')
                                    .attr("height",'8.2cm');
            
            this.jsonRects = [{"x":0,"y":0,"w":'15.3cm',"h":'8.2cm'},
                             {"x":70,"y":170,"w":30,"h":60},              //1  3行一组
                             {"x":120,"y":170,"w":30,"h":60},
                             {"x":170,"y":170,"w":30,"h":60},
                             {"x":220,"y":170,"w":30,"h":60},
                             {"x":270,"y":170,"w":30,"h":60},
                             {"x":320,"y":170,"w":30,"h":60},
                             {"x":370,"y":170,"w":30,"h":60},
                             {"x":420,"y":170,"w":30,"h":60},
                             {"x":470,"y":170,"w":30,"h":60},
                           //------------------------------//
                             {"x":70,"y":170,"w":30,"h":80},              // 10  4行一组
                             {"x":120,"y":170,"w":30,"h":80},
                             {"x":170,"y":170,"w":30,"h":80},
                             {"x":220,"y":170,"w":30,"h":80},
                             {"x":270,"y":170,"w":30,"h":80},
                             {"x":320,"y":170,"w":30,"h":80},
                             {"x":370,"y":170,"w":30,"h":80},
                             {"x":420,"y":170,"w":30,"h":80},
                             {"x":470,"y":170,"w":30,"h":80},];
            this.rects = this.svgContainer.selectAll("rect")
                .data(this.jsonRects)
                .enter()
                .append("rect")
                .attr("x",function(d){return d.x;})
                .attr("y",function(d){return d.y;})
                .attr("width",function(d){return d.w;})
                .attr("height",function(d){return d.h;})
                .attr("visibility",function(d,i){
                    if(i >= 10){return "hidden";}
                    else{return "visible";}
                })
                .style("fill",function(d,i){
                    if(i == 0){return "#E6E6FA";}
                    else{return "white";}
                })
                .style("stroke",function(d,i){
                    if(i >= 1){return "black";}
                })
            
            this.jsonTexts = [{"x":40,"y":60,"text":"基本思想：总是把最先进入的那一块替换掉"},   //0
                              {"x":40,"y":60,"text":"基本思想：总是把最近最少使用的那一块替换掉"},  // 1
                              {"x":40,"y":85,"text":"例：假定主存中的5块{1,2,3,4,5}同时映射到cache同一组中"},  // 2
                              {"x":40,"y":110,"text":"访问序列：{1->2->3->4->1->2->5->1->2}"},  // 3
                              {"x":80,"y":155,"text":"1"},  // 4
                              {"x":130,"y":155,"text":"2"},
                              {"x":180,"y":155,"text":"3"},
                              {"x":230,"y":155,"text":"4"},
                              {"x":280,"y":155,"text":"1"},
                              {"x":330,"y":155,"text":"2"},
                              {"x":380,"y":155,"text":"5"},
                              {"x":430,"y":155,"text":"1"},
                              {"x":480,"y":155,"text":"2"},  //12
                            //------  先进先出  3------//
                              {"x":80,"y":185,"text":"1*"},  // 13r   step1
                              {"x":130,"y":185,"text":"1*"},  // 14  step 2
                              {"x":130,"y":205,"text":"2"},   // 15r
                              {"x":180,"y":185,"text":"1*"},  // 16  step 3
                              {"x":180,"y":205,"text":"2"}, 
                              {"x":180,"y":225,"text":"3"}, //18r
                              {"x":230,"y":185,"text":"4"},  // 19r  step 4
                              {"x":230,"y":205,"text":"2*"}, 
                              {"x":230,"y":225,"text":"3"}, 
                              {"x":280,"y":185,"text":"4"},  // 22  step 5
                              {"x":280,"y":205,"text":"1"}, //23r
                              {"x":280,"y":225,"text":"3*"},
                              {"x":330,"y":185,"text":"4*"},  //25   step 6
                              {"x":330,"y":205,"text":"1"}, 
                              {"x":330,"y":225,"text":"2"}, //27r
                              {"x":380,"y":185,"text":"5"},  // 28r  step 7
                              {"x":380,"y":205,"text":"1*"}, 
                              {"x":380,"y":225,"text":"2"}, 
                              {"x":430,"y":185,"text":"5"},  //31  step 8
                              {"x":430,"y":205,"text":"1*"}, //32r
                              {"x":430,"y":225,"text":"2"},
                              {"x":480,"y":185,"text":"5"},  // 34  step 9
                              {"x":480,"y":205,"text":"1*"}, 
                              {"x":480,"y":225,"text":"2"},//36r
                              //------  先进先出  4------//
                              {"x":80,"y":185,"text":"1*"},  //    step1   37   【37】
                              {"x":130,"y":185,"text":"1*"},  //   step 2  38
                              {"x":130,"y":205,"text":"2"},  //  【39】
                              {"x":180,"y":185,"text":"1*"},  //   step 3  40
                              {"x":180,"y":205,"text":"2"}, 
                              {"x":180,"y":225,"text":"3"}, //  【42】
                              {"x":230,"y":185,"text":"1*"},  //   step 4  43
                              {"x":230,"y":205,"text":"2"}, 
                              {"x":230,"y":225,"text":"3"},
                              {"x":230,"y":245,"text":"4"},  //  【46】
                              {"x":280,"y":185,"text":"1*"},  //   step 5  47 【47】
                              {"x":280,"y":205,"text":"2"}, 
                              {"x":280,"y":225,"text":"3"},
                              {"x":280,"y":245,"text":"4"},
                              {"x":330,"y":185,"text":"1*"},  //   step 6  51
                              {"x":330,"y":205,"text":"2"}, //  【52】
                              {"x":330,"y":225,"text":"3"},
                              {"x":330,"y":245,"text":"4"},
                              {"x":380,"y":185,"text":"5"},  //   step 7  55  【55】
                              {"x":380,"y":205,"text":"2*"}, 
                              {"x":380,"y":225,"text":"3"},
                              {"x":380,"y":245,"text":"4"},
                              {"x":430,"y":185,"text":"5"},  //   step 8  59  
                              {"x":430,"y":205,"text":"1"},  // 【60】
                              {"x":430,"y":225,"text":"3*"},
                              {"x":430,"y":245,"text":"4"},
                              {"x":480,"y":185,"text":"5"},  //   step 9  63
                              {"x":480,"y":205,"text":"1"},   // 【64】
                              {"x":480,"y":225,"text":"2"},
                              {"x":480,"y":245,"text":"4*"},
                            //--------- 最近最少用  3-----------//
                              {"x":80,"y":185,"text":"1"},     //step 1 【67】
                              {"x":130,"y":185,"text":"2"},    //step 2  【68】
                              {"x":130,"y":205,"text":"1"},
                              {"x":180,"y":185,"text":"3"},    //step 3 【70】
                              {"x":180,"y":205,"text":"2"},
                              {"x":180,"y":225,"text":"1"},
                              {"x":230,"y":185,"text":"4"},    //step 4 【73】
                              {"x":230,"y":205,"text":"3"},
                              {"x":230,"y":225,"text":"2"},
                              {"x":280,"y":185,"text":"1"},    //step 5【76】
                              {"x":280,"y":205,"text":"4"},
                              {"x":280,"y":225,"text":"3"},
                              {"x":330,"y":185,"text":"2"},    //step 6 【79】
                              {"x":330,"y":205,"text":"1"},
                              {"x":330,"y":225,"text":"4"},
                              {"x":380,"y":185,"text":"5"},    //step 7 【82】
                              {"x":380,"y":205,"text":"2"},
                              {"x":380,"y":225,"text":"1"},
                              {"x":430,"y":185,"text":"1"},    //step 8 【85】
                              {"x":430,"y":205,"text":"5"},
                              {"x":430,"y":225,"text":"2"},
                              {"x":480,"y":185,"text":"2"},    //step 9 【88】
                              {"x":480,"y":205,"text":"1"},
                              {"x":480,"y":225,"text":"5"},
                            //--------- 最近最少用  4----------//
                              {"x":80,"y":185,"text":"1"},     //step 1 【91】
                              {"x":130,"y":185,"text":"2"},    //step 2  【92】
                              {"x":130,"y":205,"text":"1"},
                              {"x":180,"y":185,"text":"3"},    //step 3 【94】
                              {"x":180,"y":205,"text":"2"},
                              {"x":180,"y":225,"text":"1"},
                              {"x":230,"y":185,"text":"4"},    //step 4 【97】
                              {"x":230,"y":205,"text":"3"},
                              {"x":230,"y":225,"text":"2"},
                              {"x":230,"y":245,"text":"1"},
                              {"x":280,"y":185,"text":"1"},    //step 5【101】
                              {"x":280,"y":205,"text":"4"},
                              {"x":280,"y":225,"text":"3"},
                              {"x":280,"y":245,"text":"2"},
                              {"x":330,"y":185,"text":"2"},    //step 6 【105】
                              {"x":330,"y":205,"text":"1"},
                              {"x":330,"y":225,"text":"4"},
                              {"x":330,"y":245,"text":"3"},
                              {"x":380,"y":185,"text":"5"},    //step 7 【109】
                              {"x":380,"y":205,"text":"2"},
                              {"x":380,"y":225,"text":"1"},
                              {"x":380,"y":245,"text":"4"},
                              {"x":430,"y":185,"text":"1"},    //step 8 【113】
                              {"x":430,"y":205,"text":"5"},
                              {"x":430,"y":225,"text":"2"},
                              {"x":430,"y":245,"text":"4"},
                              {"x":480,"y":185,"text":"2"},    //step 9 【117】
                              {"x":480,"y":205,"text":"1"},
                              {"x":480,"y":225,"text":"5"},
                              {"x":480,"y":245,"text":"4"},
                              ];
            this.texts = this.svgContainer.selectAll("text")
                .data(this.jsonTexts)
                .enter()
                .append("text")
                .attr("x",function(d){return d.x;})
                .attr("y",function(d){return d.y;})
                .attr("font-size",14)
                .attr("visibility",function(d,i){
                    if(i <= 1 || i >= 13){return "hidden";}
                    else{return "visible";}
                })
                .text(function(d){return d.text;});
            
            this.jsonLine = [{"x":70,"y":190},
                             {"x":70,"y":210},
                             {"x":70,"y":230},
                             {"x":120,"y":190},
                             {"x":120,"y":210},
                             {"x":120,"y":230},
                             {"x":170,"y":190},
                             {"x":170,"y":210},
                             {"x":170,"y":230},
                             {"x":220,"y":190},
                             {"x":220,"y":210},
                             {"x":220,"y":230},
                             {"x":270,"y":190},
                             {"x":270,"y":210},
                             {"x":270,"y":230},
                             {"x":320,"y":190},
                             {"x":320,"y":210},
                             {"x":320,"y":230},
                             {"x":370,"y":190},
                             {"x":370,"y":210},
                             {"x":370,"y":230},
                             {"x":420,"y":190},
                             {"x":420,"y":210},
                             {"x":420,"y":230},
                             {"x":470,"y":190},
                             {"x":470,"y":210},
                             {"x":470,"y":230}
                            ];
            this.lines = this.svgContainer.selectAll("line")
                .data(this.jsonLine)
                .enter()
                .append("line")
                .attr("x1",function(d){return d.x;})
                .attr("y1",function(d){return d.y;})
                .attr("x2",function(d){return d.x + 30;})
                .attr("y2",function(d){return d.y;})
                .attr("visibility",function(d,i){
                    if(i % 3 == 2){return "hidden";}
                    else{return "visible";}
                })
                .style("stroke","black")
                .style("stroke-width",1);
            
            this.step = this.model.get('step');
            this.max_step = this.model.get('max_step');
            this.replace_way = this.model.get('replace_way');
            this.group_capacity_index = this.model.get('group_capacity_index');
            
            // Python -> JavaScript update
            this.model.on('change:step', this.step_changed, this);
            this.model.on('change:max_step', this.max_step_changed, this);
            this.model.on('change:replace_way', this.replace_way_changed, this);
            this.model.on('change:group_capacity_index', this.group_capacity_index_changed, this);
        },
         step_changed: function() {
            this.step = this.model.get('step');
            if(this.replace_way == '先进先出(FIFO)'){
                if(this.group_capacity_index == 0){
                     switch(this.step){
                         case 1:
                             this.texts.attr("visibility",function(d,i){
                                 if(i == 0 || (i >=2 && i <= 13)){return "visible";}
                                 else{return "hidden";}
                             })
                             .style("fill",function(d,i){
                                 if(i == 13){return "red";}
                                 else{return "black";}
                             })
                             break;
                         case 2:
                             this.texts.attr("visibility",function(d,i){
                                 if(i == 0 || (i >=2 && i <= 15)){return "visible";}
                                 else{return "hidden";}
                             })
                             .style("fill",function(d,i){
                                 if(i == 15){return "red";}
                                 else{return "black";}
                             })
                             break;
                        case 3:
                            this.texts.attr("visibility",function(d,i){
                                 if(i == 0 || (i >=2 && i <= 18)){return "visible";}
                                 else{return "hidden";}
                             })
                             .style("fill",function(d,i){
                                 if(i == 18){return "red";}
                                 else{return "black";}
                             })
                             break;
                        case 4:
                            this.texts.attr("visibility",function(d,i){
                                 if(i == 0 || (i >=2 && i <= 21)){return "visible";}
                                 else{return "hidden";}
                             })
                             .style("fill",function(d,i){
                                 if(i == 19){return "red";}
                                 else{return "black";}
                             })
                             break;  
                        case 5:
                            this.texts.attr("visibility",function(d,i){
                                 if(i == 0 || (i >=2 && i <= 24)){return "visible";}
                                 else{return "hidden";}
                             })
                             .style("fill",function(d,i){
                                 if(i == 23){return "red";}
                                 else{return "black";}
                             })
                             break;
                        case 6:
                            this.texts.attr("visibility",function(d,i){
                                 if(i == 0 || (i >=2 && i <= 27)){return "visible";}
                                 else{return "hidden";}
                             })
                             .style("fill",function(d,i){
                                 if(i == 27){return "red";}
                                 else{return "black";}
                             })
                             break;
                        case 7:
                            this.texts.attr("visibility",function(d,i){
                                 if(i == 0 || (i >=2 && i <= 30)){return "visible";}
                                 else{return "hidden";}
                             })
                             .style("fill",function(d,i){
                                 if(i == 28){return "red";}
                                 else{return "black";}
                             })
                             break;
                        case 8:
                            this.texts.attr("visibility",function(d,i){
                                 if(i == 0 || (i >=2 && i <= 33)){return "visible";}
                                 else{return "hidden";}
                             })
                             .style("fill",function(d,i){
                                 if(i == 32){return "red";}
                                 else{return "black";}
                             })
                             break;
                        case 9:
                            this.texts.attr("visibility",function(d,i){
                                 if(i == 0 || (i >=2 && i <= 36)){return "visible";}
                                 else{return "hidden";}
                             })
                             .style("fill",function(d,i){
                                 if(i == 36){return "red";}
                                 else{return "black";}
                             })
                             break;
                        case 10:
                            break;
                        case 11:
                            break;
                        default:
                            this.texts.style("fill","black")
                                .attr("visibility",function(d,i){
                                    if(i == 0 || (i >= 2 && i <= 12)){return "visible";}
                                    else{return "hidden";}
                                });
                            break;    
                     }
                }
                else{
                    switch(this.step){
                         case 1:
                             this.texts.attr("visibility",function(d,i){
                                 if(i == 0 || (i >=2 && i <= 12) || (i == 37)){return "visible";}
                                 else{return "hidden";}
                             })
                             .style("fill",function(d,i){
                                 if(i == 37){return "red";}
                                 else{return "black";}
                             })
                             break;
                         case 2:
                             this.texts.attr("visibility",function(d,i){
                                 if(i == 0 || (i >=2 && i <= 12) || (i >= 37 && i <= 39)){return "visible";}
                                 else{return "hidden";}
                             })
                             .style("fill",function(d,i){
                                 if(i == 39){return "red";}
                                 else{return "black";}
                             })
                             break;
                        case 3:
                            this.texts.attr("visibility",function(d,i){
                                 if(i == 0 || (i >=2 && i <= 12) || (i >= 37 && i <= 42)){return "visible";}
                                 else{return "hidden";}
                             })
                             .style("fill",function(d,i){
                                 if(i == 42){return "red";}
                                 else{return "black";}
                             })
                             break;
                        case 4:
                            this.texts.attr("visibility",function(d,i){
                                 if(i == 0 || (i >=2 && i <= 12)|| (i >= 37 && i <= 46)){return "visible";}
                                 else{return "hidden";}
                             })
                             .style("fill",function(d,i){
                                 if(i == 46){return "red";}
                                 else{return "black";}
                             })
                             break;  
                        case 5:
                            this.texts.attr("visibility",function(d,i){
                                 if(i == 0 || (i >=2 && i <= 12)|| (i >= 37 && i <= 50)){return "visible";}
                                 else{return "hidden";}
                             })
                             .style("fill",function(d,i){
                                 if(i == 47){return "red";}
                                 else{return "black";}
                             })
                             break;
                        case 6:
                            this.texts.attr("visibility",function(d,i){
                                 if(i == 0 || (i >=2 && i <= 12)|| (i >= 37 && i <= 54)){return "visible";}
                                 else{return "hidden";}
                             })
                             .style("fill",function(d,i){
                                 if(i == 52){return "red";}
                                 else{return "black";}
                             })
                             break;
                        case 7:
                            this.texts.attr("visibility",function(d,i){
                                 if(i == 0 || (i >=2 && i <= 12)|| (i >= 37 && i <= 58)){return "visible";}
                                 else{return "hidden";}
                             })
                             .style("fill",function(d,i){
                                 if(i == 55){return "red";}
                                 else{return "black";}
                             })
                             break;
                        case 8:
                            this.texts.attr("visibility",function(d,i){
                                 if(i == 0 || (i >=2 && i <= 12)|| (i >= 37 && i <= 62)){return "visible";}
                                 else{return "hidden";}
                             })
                             .style("fill",function(d,i){
                                 if(i == 60){return "red";}
                                 else{return "black";}
                             })
                             break;
                        case 9:
                            this.texts.attr("visibility",function(d,i){
                                 if(i == 0 || (i >=2 && i <= 12)|| (i >= 37 && i <= 66)){return "visible";}
                                 else{return "hidden";}
                             })
                             .style("fill",function(d,i){
                                 if(i == 65){return "red";}
                                 else{return "black";}
                             })
                             break;
                        case 10:
                            break;
                        case 11:
                            break;
                        default:
                            this.texts.style("fill","black")
                                .attr("visibility",function(d,i){
                                    if(i == 0 || (i >= 2 && i <= 12)){return "visible";}
                                    else{return "hidden";}
                                });
                            break;    
                     }
                }
            } 
            else{
                if(this.group_capacity_index == 0){
                     switch(this.step){
                         case 1:
                             this.texts.attr("visibility",function(d,i){
                                 if(i == 1 || (i >=2 && i <= 12) || (i == 67)){return "visible";}
                                 else{return "hidden";}
                             })
                             .style("fill",function(d,i){
                                 if(i == 67){return "red";}
                                 else{return "black";}
                             })
                             break;
                         case 2:
                             this.texts.attr("visibility",function(d,i){
                                 if(i == 1 || (i >=2 && i <= 12) || (i >= 67 && i <= 69)){return "visible";}
                                 else{return "hidden";}
                             })
                             .style("fill",function(d,i){
                                 if(i == 68){return "red";}
                                 else{return "black";}
                             })
                             break;
                        case 3:
                            this.texts.attr("visibility",function(d,i){
                                 if(i == 1 || (i >=2 && i <= 12) || (i >= 67 && i <= 72)){return "visible";}
                                 else{return "hidden";}
                             })
                             .style("fill",function(d,i){
                                 if(i == 70){return "red";}
                                 else{return "black";}
                             })
                             break;
                        case 4:
                            this.texts.attr("visibility",function(d,i){
                                 if(i == 1 || (i >=2 && i <= 12)|| (i >= 67 && i <= 75)){return "visible";}
                                 else{return "hidden";}
                             })
                             .style("fill",function(d,i){
                                 if(i == 73){return "red";}
                                 else{return "black";}
                             })
                             break;  
                        case 5:
                            this.texts.attr("visibility",function(d,i){
                                 if(i == 1 || (i >=2 && i <= 12)|| (i >= 67 && i <= 78)){return "visible";}
                                 else{return "hidden";}
                             })
                             .style("fill",function(d,i){
                                 if(i == 76){return "red";}
                                 else{return "black";}
                             })
                             break;
                        case 6:
                            this.texts.attr("visibility",function(d,i){
                                 if(i == 1 || (i >=2 && i <= 12)|| (i >= 67 && i <= 81)){return "visible";}
                                 else{return "hidden";}
                             })
                             .style("fill",function(d,i){
                                 if(i == 79){return "red";}
                                 else{return "black";}
                             })
                             break;
                        case 7:
                            this.texts.attr("visibility",function(d,i){
                                 if(i == 1 || (i >=2 && i <= 12)|| (i >= 67 && i <= 84)){return "visible";}
                                 else{return "hidden";}
                             })
                             .style("fill",function(d,i){
                                 if(i == 82){return "red";}
                                 else{return "black";}
                             })
                             break;
                        case 8:
                            this.texts.attr("visibility",function(d,i){
                                 if(i == 1 || (i >=2 && i <= 12)|| (i >= 67 && i <= 87)){return "visible";}
                                 else{return "hidden";}
                             })
                             .style("fill",function(d,i){
                                 if(i ==85){return "red";}
                                 else{return "black";}
                             })
                             break;
                        case 9:
                            this.texts.attr("visibility",function(d,i){
                                 if(i == 1 || (i >= 2 && i <= 12)|| (i >= 67 && i <= 90)){return "visible";}
                                 else{return "hidden";}
                             })
                             .style("fill",function(d,i){
                                 if(i == 88){return "red";}
                                 else{return "black";}
                             })
                             break;
                        case 10:
                            break;
                        case 11:
                            break;
                        default:
                            this.texts.style("fill","black")
                                .attr("visibility",function(d,i){
                                    if(i == 1 || (i >= 2 && i <= 12)){return "visible";}
                                    else{return "hidden";}
                                });
                            break;    
                     }
                }
                else{
                    switch(this.step){
                         case 1:
                             this.texts.attr("visibility",function(d,i){
                                 if(i == 1 || (i >=2 && i <= 12) || (i == 91)){return "visible";}
                                 else{return "hidden";}
                             })
                             .style("fill",function(d,i){
                                 if(i == 91){return "red";}
                                 else{return "black";}
                             })
                             break;
                         case 2:
                             this.texts.attr("visibility",function(d,i){
                                 if(i == 1 || (i >=2 && i <= 12) || (i >= 91 && i <= 93)){return "visible";}
                                 else{return "hidden";}
                             })
                             .style("fill",function(d,i){
                                 if(i == 92){return "red";}
                                 else{return "black";}
                             })
                             break;
                        case 3:
                            this.texts.attr("visibility",function(d,i){
                                 if(i == 1 || (i >=2 && i <= 12) || (i >= 91 && i <= 96)){return "visible";}
                                 else{return "hidden";}
                             })
                             .style("fill",function(d,i){
                                 if(i == 94){return "red";}
                                 else{return "black";}
                             })
                             break;
                        case 4:
                            this.texts.attr("visibility",function(d,i){
                                 if(i == 1 || (i >=2 && i <= 12)|| (i >= 91 && i <= 100)){return "visible";}
                                 else{return "hidden";}
                             })
                             .style("fill",function(d,i){
                                 if(i == 97){return "red";}
                                 else{return "black";}
                             })
                             break;  
                        case 5:
                            this.texts.attr("visibility",function(d,i){
                                 if(i == 1 || (i >=2 && i <= 12)|| (i >= 91 && i <= 104)){return "visible";}
                                 else{return "hidden";}
                             })
                             .style("fill",function(d,i){
                                 if(i == 101){return "red";}
                                 else{return "black";}
                             })
                             break;
                        case 6:
                            this.texts.attr("visibility",function(d,i){
                                 if(i == 1 || (i >=2 && i <= 12)|| (i >= 91 && i <= 108)){return "visible";}
                                 else{return "hidden";}
                             })
                             .style("fill",function(d,i){
                                 if(i == 105){return "red";}
                                 else{return "black";}
                             })
                             break;
                        case 7:
                            this.texts.attr("visibility",function(d,i){
                                 if(i == 1 || (i >=2 && i <= 12)|| (i >= 91 && i <= 112)){return "visible";}
                                 else{return "hidden";}
                             })
                             .style("fill",function(d,i){
                                 if(i == 109){return "red";}
                                 else{return "black";}
                             })
                             break;
                        case 8:
                            this.texts.attr("visibility",function(d,i){
                                 if(i == 1 || (i >=2 && i <= 12)|| (i >= 91 && i <= 116)){return "visible";}
                                 else{return "hidden";}
                             })
                             .style("fill",function(d,i){
                                 if(i == 113){return "red";}
                                 else{return "black";}
                             })
                             break;
                        case 9:
                            this.texts.attr("visibility",function(d,i){
                                 if(i == 1 || (i >=2 && i <= 12)|| (i >= 91 && i <= 120)){return "visible";}
                                 else{return "hidden";}
                             })
                             .style("fill",function(d,i){
                                 if(i == 117){return "red";}
                                 else{return "black";}
                             })
                             break;
                        case 10:
                            break;
                        case 11:
                            break;
                        default:
                            this.texts.style("fill","black")
                                .attr("visibility",function(d,i){
                                    if(i == 1 || (i >= 2 && i <= 12)){return "visible";}
                                    else{return "hidden";}
                                });
                            break;    
                     }
                }
            }
        },
         max_step_changed: function() {
            this.max_step = this.model.get('max_step');
        },
         replace_way_changed: function(){
             this.replace_way = this.model.get('replace_way');
             if(this.replace_way == ''){
                 this.texts.attr("visibility",function(d,i){
                     if(i <= 1 || i >= 13){return "hidden";}
                     else{return "visible";}
                 })
             }
             else if(this.replace_way == '先进先出(FIFO)'){
                 this.texts.attr("visibility",function(d,i){
                     if(i == 1 || i >= 13){return "hidden";}
                     else{return "visible";}
                 })
             }
             else if(this.replace_way == '最近最少使用(LRU)'){
                 this.texts.attr("visibility",function(d,i){
                     if(i == 0 || i >= 13){return "hidden";}
                     else{return "visible";}
                 })
             }
        },
         group_capacity_index_changed: function(){
             this.group_capacity_index = this.model.get('group_capacity_index');
             if(this.group_capacity_index == 0){
                 this.rects.attr("visibility",function(d,i){
                     if(i >= 10){return "hidden";}
                     else{return "visible";}
                 })
                 this.lines.attr("visibility",function(d,i){
                    if(i % 3 == 2){return "hidden";}
                    else{return "visible";}
                })
             }
             else if(this.group_capacity_index == 1){
                 this.rects.attr("visibility",function(d,i){
                     if(i > 0 && i < 10){return "hidden";}
                     else{return "visible";}
                 })
                 this.lines.attr("visibility","visible")
             }
        },
    });
    
    return {
        CacheReplacementView: CacheReplacementView
    };
});
