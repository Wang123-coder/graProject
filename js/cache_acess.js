//%%javascript
require.undef('cache_acess');

define('cache_acess', ["@jupyter-widgets/base",'d3'], function(widgets,d3) {
    var CacheDataAcessView = widgets.DOMWidgetView.extend({

        // Render the view.
        render: function() {
            //var d3 = require('./d3.js');
            this.svgContainer = d3.select(this.el).append("svg")
                                    .attr("width",'auto')
                                    .attr("height",'8.2cm');
            
            this.jsonRects = [{"x":0,"y":0,"w":'15.3cm',"h":'8.2cm'},
                              {"x":95,"y":90,"w":165,"h":90},
                              {"x":392,"y":40,"w":65,"h":210},
                              {"x":95,"y":255,"w":270,"h":30}];
            this.rects = this.svgContainer.selectAll("rect")
                .data(this.jsonRects)
                .enter()
                .append("rect")
                .attr("x",function(d){return d.x;})
                .attr("y",function(d){return d.y;})
                .attr("width",function(d){return d.w;})
                .attr("height",function(d){return d.h;})
                .style("fill",function(d,i){
                    if(i == 0){return "#FAF0E6";}
                    else{return "white";}
                })
                .style("stroke",function(d,i){
                    if(i >= 1){return "black";}
                })
            
            this.jsonTexts = [{"x":145,"y":80,"text":"Cache"},  // cache  start
                              {"x":135,"y":102,"text":"Tag"}, 
                              {"x":202,"y":102,"text":"行/组号"},
                              {"x":204,"y":117,"text":"0行/组"},  
                              {"x":204,"y":132,"text":"1行/组"},   
                              {"x":400,"y":30,"text":"主存储器"},    // 主存 start
                              {"x":412,"y":52,"text":"0块"},
                              {"x":408,"y":97,"text":"31块"},
                              {"x":408,"y":112,"text":"32块"},
                              {"x":408,"y":157,"text":"63块"},
                              {"x":408,"y":172,"text":"64块"},
                              {"x":32,"y":275,"text":"主存地址"},    // 主存地址  start
                              {"x":120,"y":267,"text":"Tag"},        // 12 组、直接   hidden
                              {"x":200,"y":267,"text":"Cache行号"},    // 13 直接 hidden
                              {"x":200,"y":267,"text":"Cache组号"},    // 14 组 hidden
                              {"x":150,"y":267,"text":"标记（Tag)"},   // 15 全相联   hidden
                              {"x":300,"y":267,"text":"块内地址"},   // 主存地址 end
                             ];
            this.texts = this.svgContainer.selectAll("text")
                .data(this.jsonTexts)
                .enter()
                .append("text")
                .attr("x",function(d){return d.x;})
                .attr("y",function(d){return d.y;})
                .attr("font-size",12)
                .attr("visibility",function(d,i){
                    if(i >= 12 && i <= 15){return "hidden";}
                    else{return "visible";}
                })
                .text(function(d){return d.text;});
            
            //  
            this.cache_row = this.svgContainer.append("text")    //cache行/组数
                .attr("x",200)
                .attr("y",177)
                .attr("font-size",12)
                .text("总行数-1")
            this.cache_group = this.svgContainer.append("text")    //cache行/组数
                .attr("x",200)
                .attr("y",177)
                .attr("font-size",12)
                .attr("visibility","hidden")
                .text("总组数-1")
            this.block_count = this.svgContainer.append("text")  //主存块数
                .attr("x",402)
                .attr("y",247)
                .attr("font-size",12)
                .text("总块数-1")
            this.block_digit = this.svgContainer.append("text")   //块位数
                .attr("x",315)
                .attr("y",247)
                .attr("font-size",12)
                .text("")
            
            //   显示主存地址上方的各个位数
            this.group_tag = this.svgContainer.append("text")      //  weishu
                .attr("x",120)
                .attr("y",247)
                .attr("font-size",12)
                .attr("visibility","hidden")
                .text("group_tag")
            this.group_cachedigit = this.svgContainer.append("text")    //cache组号位数
                .attr("x",220)
                .attr("y",247)
                .attr("font-size",12)
                .attr("visibility","hidden")
                .text("group_cachedigit")
            this.direct_tag = this.svgContainer.append("text")
                .attr("x",120)
                .attr("y",247)
                .attr("font-size",12)
                .attr("visibility","hidden")
                .text("direct_tag")
            this.direct_cachedigit = this.svgContainer.append("text")  //cache行号位数
                .attr("x",220)
                .attr("y",247)
                .attr("font-size",12)
                .attr("visibility","hidden")
                .text("direct_cachedigit")
            this.full_tag = this.svgContainer.append("text")
                .attr("x",170)
                .attr("y",247)
                .attr("font-size",12)
                .attr("visibility","hidden")
                .text("full_tag")
            
            //      主存地址里面各个  二进制地址数值
            //  element[0]
            this.address_element1 = this.svgContainer.append("text")
                .attr("x",100)
                .attr("y",282)
                .attr("font-size",12)
                .text("")
            //  element[1]
            this.address_element2 = this.svgContainer.append("text")
                .attr("x",190)
                .attr("y",282)
                .attr("font-size",12)
                .text("")
            //  element[2]
            this.address_element3 = this.svgContainer.append("text")
                .attr("x",280)
                .attr("y",282)
                .attr("font-size",12)
                .text("")
            
            //     hidden  update
            this.tag0 = this.svgContainer.append("text")
                .attr("x",100)
                .attr("y",117)
                .attr("font-size",12)
                .attr("visibility","hidden")
                .text("tag0")
            this.tag1 = this.svgContainer.append("text")
                .attr("x",100)
                .attr("y",132)
                .attr("font-size",12)
                .attr("visibility","hidden")
                .text("tag1")
            this.tagx = this.svgContainer.append("text")
                .attr("x",100)
                .attr("y",154)
                .attr("font-size",12)
                .attr("visibility","hidden")
                .text("tagx")
            this.tagend = this.svgContainer.append("text")
                .attr("x",100)
                .attr("y",177)
                .attr("font-size",12)
                .attr("visibility","hidden")
                .text("tagend")
            this.xrow = this.svgContainer.append("text")
                .attr("x",207)
                .attr("y",154)
                .attr("font-size",12)
                .attr("visibility","hidden")
                .text("xrow")
            this.memory0_31 = this.svgContainer.append("text")
                .attr("x",408)
                .attr("y",74)
                .attr("font-size",12)
                .attr("visibility","hidden")
                .text("memory0_31")
            this.memory32_63 = this.svgContainer.append("text")
                .attr("x",408)
                .attr("y",134)
                .attr("font-size",12)
                .attr("visibility","hidden")
                .text("memory32_63")
            this.memory64_end = this.svgContainer.append("text")
                .attr("x",408)
                .attr("y",209)
                .attr("font-size",12)
                .attr("visibility","hidden")
                .text("memory64_end")
            
            this.detail = this.svgContainer.append("text")
                .attr("x",145)
                .attr("y",30)
                .attr("font-size",12)
                .attr("visibility","hidden")
                .text("memory64_end")
            
            this.jsonLines = [{"x1":95,"y1":105,"x2":260,"y2":105},    // 0 Cache横线  start
                             {"x1":95,"y1":120,"x2":260,"y2":120},
                             {"x1":95,"y1":135,"x2":260,"y2":135}, 
                             {"x1":95,"y1":165,"x2":260,"y2":165},   //  Cache横线  end
                             {"x1":193,"y1":90,"x2":193,"y2":180},    //  Cache竖线   
                             {"x1":144,"y1":140,"x2":144,"y2":160},   // 5 cache 虚线 3,3  
                             {"x1":215,"y1":140,"x2":215,"y2":160},   // 6 cache 虚线 3,3  
                           //------------------------------------// 
                             {"x1":392,"y1":55,"x2":457,"y2":55},     //  7 主存 横线  start
                             {"x1":392,"y1":85,"x2":457,"y2":85}, 
                             {"x1":392,"y1":100,"x2":457,"y2":100},
                             {"x1":392,"y1":115,"x2":457,"y2":115},
                             {"x1":392,"y1":145,"x2":457,"y2":145},
                             {"x1":392,"y1":160,"x2":457,"y2":160},
                             {"x1":392,"y1":175,"x2":457,"y2":175}, 
                             {"x1":392,"y1":235,"x2":457,"y2":235},    //  主存 横线  end
                             {"x1":422,"y1":57,"x2":422,"y2":83},   //  15  3,3 
                             {"x1":422,"y1":117,"x2":422,"y2":143},   //  16  3,3
                             {"x1":422,"y1":180,"x2":422,"y2":230},   //  17  3,3 
                            //------------------------------------//   
                             {"x1":95,"y1":270,"x2":365,"y2":270},   // 主存地址 横线
                             {"x1":185,"y1":255,"x2":185,"y2":285},   // 19 地址框 第二条线    hidden  组、直接 
                             {"x1":275,"y1":255,"x2":275,"y2":285},   // 地址框 最后一条线 
                             ];
            this.lines = this.svgContainer.selectAll("line")
                .data(this.jsonLines)
                .enter()
                .append("line")
                .attr("x1",function(d){return d.x1;})
                .attr("y1",function(d){return d.y1;})
                .attr("x2",function(d){return d.x2;})
                .attr("y2",function(d){return d.y2;})
                .attr("visibility",function(d,i){if(i == 19){return "hidden";}})
                .style("stroke","black")
                .style("stroke-width",1)
                .style("stroke-dasharray",function(d,i){
                    if(i == 5 || i == 6 || (i >= 15 && i <= 17)){return "3,3";}
                });
            
            //  step里用  
            //detail： xx【address_element1_10】块群xx【address_element2_10】块xx【address_element3_10】单元
            this.address_element1_10 = 0;             //主存地址中element1 对应十进制数
            this.address_element2_10 = 0;             //主存地址中element2 对应十进制数
            this.address_element3_10 = 0;             //主存地址中element3 对应十进制数
            this.memory_block_10 = 0;                 //  地址对应的实际主存块 = 块/组群号 * cache行数/组数 + address_element2_10
            this.str_tag = "";
            
            this.step = this.model.get('step');
            this.max_step = this.model.get('max_step');
            this.map_way = this.model.get('map_way');
            this.cache_RowCount = this.model.get('cache_RowCount');  //cache行数
            this.cache_GroupNum = this.model.get('cache_GroupNum');        //cache组数
            this.memory_BlockCount = this.model.get('memory_BlockCount');   //主存块数
            this.block_count.text((parseInt(this.memory_BlockCount) - 1) + "块");
            this.block_digits = this.model.get('block_digits');             //块内地址位数
            this.block_digit.text(this.block_digits + "位");
            this.cache_BlockNumDigits = this.model.get('cache_BlockNumDigits');      //cache行号位数
            this.direct_cachedigit.text(this.cache_BlockNumDigits + "位")
            this.cache_GroupNumDigits = this.model.get('cache_GroupNumDigits');      //cache组号位数
            this.group_cachedigit.text(this.cache_GroupNumDigits + "位");
            this.cache_GroupNum = this.model.get('cache_GroupNum');        //cache组数
            this.direct_tag.text(this.model.get('direct_tag_digits') + "位");
            this.group_tag.text(this.model.get('group_tag_digits') + "位");
            this.full_tag.text(this.model.get('full_tag_digits') + "位");
            this.address = this.model.get('address');                //地址
            
            // Python -> JavaScript update
            this.model.on('change:step', this.step_changed, this);
            this.model.on('change:max_step', this.max_step_changed, this);
            this.model.on('change:map_way', this.map_way_changed, this);
            this.model.on('change:cache_RowCount', this.cache_RowCount_changed, this);  //行数
            this.model.on('change:memory_BlockCount', this.memory_BlockCount_changed, this);
            this.model.on('change:block_digits', this.block_digits_changed, this);
            this.model.on('change:direct_tag_digits', this.direct_tag_digits_changed, this);
            this.model.on('change:group_tag_digits', this.group_tag_digits_changed, this);
            this.model.on('change:full_tag_digits', this.full_tag_digits_changed, this);
            this.model.on('change:cache_BlockNumDigits', this.cache_BlockNumDigits_changed, this);
            this.model.on('change:cache_GroupNumDigits', this.cache_GroupNumDigits_changed, this);
            this.model.on('change:cache_GroupNum', this.cache_GroupNum_changed, this);  //组数
            this.model.on('change:address', this.address_changed, this);
        },
         address_changed: function(){
             this.address = this.model.get('address');
             if(this.map_way == '直接映射'){
                 var tag = parseInt(this.model.get('direct_tag_digits'));
                 var row_digit = parseInt(this.cache_BlockNumDigits);
                 
                 this.address_element1.text(this.address.substring(0,tag));
                 this.address_element2.text(this.address.substring(tag,tag + row_digit));
                 this.address_element3.text(this.address.substring(tag + row_digit));
                 
                 this.str_tag = this.address.substring(0,tag);
                 
                 //  计算对应的十进制数
                 this.address_element1_10 = parseInt(this.address.substring(0,tag),2);
                 this.address_element2_10 = parseInt(this.address.substring(tag,tag + row_digit),2);
                 this.address_element3_10 = parseInt(this.address.substring(tag + row_digit),2);  
                 
                 this.memory_block_10 =  this.address_element1_10 * parseInt(this.cache_RowCount) + this.address_element2_10;
             }
             else if(this.map_way == '全相联映射'){
                 var tag = parseInt(this.model.get('full_tag_digits'));
                 this.address_element1.text(this.address.substring(0,tag));
                 this.address_element3.text(this.address.substring(tag));
                 
                 this.str_tag = this.address.substring(0,tag);
                 
                 this.address_element1_10 = parseInt(this.address.substring(0,tag),2);
                 this.address_element3_10 = parseInt(this.address.substring(tag),2); 
                 
                 this.memory_block_10 = this.address_element1_10;       //  主存块号 = tag值
             }
             else if(this.map_way == '组相联映射'){
                var tag = parseInt(this.model.get('group_tag_digits'));
                var group_digit = parseInt(this.cache_GroupNumDigits);
                this.address_element1.text(this.address.substring(0,tag));
                this.address_element2.text(this.address.substring(tag,tag + group_digit));
                this.address_element3.text(this.address.substring(tag + group_digit));
                this.address_element1_10 = parseInt(this.address.substring(0,tag),2);
                this.address_element2_10 = parseInt(this.address.substring(tag,tag + group_digit),2);
                this.address_element3_10 = parseInt(this.address.substring(tag +  group_digit),2);
                this.memory_block_10 =  this.address_element1_10 * parseInt(this.cache_GroupNum) + this.address_element2_10; 
                this.str_tag = this.address.substring(0,tag); 
             }
         },
         cache_RowCount_changed: function(){     //cache行数
             this.cache_RowCount = this.model.get('cache_RowCount');
             this.cache_row.text((parseInt(this.cache_RowCount) - 1) + "行/组");
         },
         memory_BlockCount_changed: function(){
             this.memory_BlockCount = this.model.get('memory_BlockCount');   //主存块数
             this.block_count.text((parseInt(this.memory_BlockCount) - 1) + "块");
         },
         block_digits_changed: function(){
             this.block_digits = this.model.get('block_digits');             //块内地址位数
             this.block_digit.text(this.block_digits + "位");
         },
         direct_tag_digits_changed: function(){
             this.direct_tag.text(this.model.get('direct_tag_digits') + "位");
         },
         group_tag_digits_changed: function(){
             this.group_tag.text(this.model.get('group_tag_digits') + "位");
         },
         full_tag_digits_changed: function(){
             this.full_tag.text(this.model.get('full_tag_digits') + "位");
         },
         cache_BlockNumDigits_changed: function(){
             this.cache_BlockNumDigits = this.model.get('cache_BlockNumDigits');      //cache行号位数
             this.direct_cachedigit.text(this.cache_BlockNumDigits+ "位");
         },
         cache_GroupNumDigits_changed: function(){
             this.cache_GroupNumDigits = this.model.get('cache_GroupNumDigits');      //cache组号位数
             this.group_cachedigit.text(this.cache_GroupNumDigits + "位")
         },
         cache_GroupNum_changed: function(){
             this.cache_GroupNum = parseInt(this.model.get('cache_GroupNum'));        //cache组数
             this.cache_group.text((parseInt(this.cache_GroupNum) - 1) + "行/组");
         },
         step_changed: function(){
            this.step = this.model.get('step');
            switch(this.step){
                case 1:
                    if(this.map_way == "直接映射" || this.map_way == "组相联映射"){
                        this.address_element2.style("fill","red");
                        if(this.address_element2_10 == 0){
                            this.texts.style("fill",function(d,i){
                                if(i == 3){return "red";}
                            })
                        }
                        else if(this.address_element2_10 == 1){
                            this.texts.style("fill",function(d,i){
                                if(i == 4){return "red";}
                            })
                        }
                        else if(this.address_element2_10 == parseInt(this.cache_RowCount) - 1 || this.address_element2_10 == parseInt(this.cache_GroupNum) - 1){
                            this.cache_row.style("fill", "red")
                            this.cache_group.style("fill", "red")
                        }
                        else{
                            this.xrow.attr("visibility","visible")
                                .text(this.address_element2_10 + "行/组")
                                .style("fill","red");
                        }
                    }
                    else if(this.map_way == "全相联映射"){
                        this.address_element1.style("fill","red");
                        if(this.memory_block_10 == 0){
                            this.texts.style("fill",function(d,i){
                                if(i == 6){return "red";}
                            })
                        }
                        else if(this.memory_block_10 > 0 && this.memory_block_10 < 31){
                            this.memory0_31.style("fill","red")
                                .text(this.memory_block_10 + "块")
                                .attr("visibility","visible");
                        }
                        else if(this.memory_block_10 == 31){
                            this.texts.style("fill",function(d,i){
                                if(i == 7){return "red";}
                            })
                        }
                        else if(this.memory_block_10 == 32){
                            this.texts.style("fill",function(d,i){
                                if(i == 8){return "red";}
                            })
                        }
                        else if(this.memory_block_10 > 32 && this.memory_block_10 < 63){
                            this.memory32_63.style("fill","red")
                                .text(this.memory_block_10 + "块")
                                .attr("visibility","visible")
                        }
                        else if(this.memory_block_10 == 63){
                            this.texts.style("fill",function(d,i){
                                if(i == 9){return "red";}
                            })
                        }
                        else if(this.memory_block_10 == 64){
                            this.texts.style("fill",function(d,i){
                                if(i == 10){return "red";}
                            })
                        }
                        else if(this.memory_block_10 > 64 && this.memory_block_10 < parseInt(this.memory_BlockCount) - 1){
                            this.memory64_end.style("fill","red")
                                .text(this.memory_block_10 + "块")
                                .attr("visibility","visible")
                        }
                        else{
                            this.block_count.style("fill","red");
                        }
                    }
                    break;
                case 2:   
                    if(this.map_way == "直接映射" || this.map_way == "组相联映射"){
                        this.address_element1.style("fill","red");
                        if(this.memory_block_10 == 0){
                            this.texts.style("fill",function(d,i){
                                if(i == 6){return "red";}
                            })
                        }
                        else if(this.memory_block_10 > 0 && this.memory_block_10 < 31){
                            this.memory0_31.style("fill","red")
                                .text(this.memory_block_10 + "块")
                                .attr("visibility","visible");
                        }
                        else if(this.memory_block_10 == 31){
                            this.texts.style("fill",function(d,i){
                                if(i == 7){return "red";}
                            })
                        }
                        else if(this.memory_block_10 == 32){
                            this.texts.style("fill",function(d,i){
                                if(i == 8){return "red";}
                            })
                        }
                        else if(this.memory_block_10 > 32 && this.memory_block_10 < 63){
                            this.memory32_63.style("fill","red")
                                .text(this.memory_block_10 + "块")
                                .attr("visibility","visible")
                        }
                        else if(this.memory_block_10 == 63){
                            this.texts.style("fill",function(d,i){
                                if(i == 9){return "red";}
                            })
                        }
                        else if(this.memory_block_10 == 64){
                            this.texts.style("fill",function(d,i){
                                if(i == 10){return "red";}
                            })
                        }
                        else if(this.memory_block_10 > 64 && this.memory_block_10 < parseInt(this.memory_BlockCount) - 1){
                            this.memory64_end.style("fill","red")
                                .text(this.memory_block_10 + "块")
                                .attr("visibility","visible")
                        }
                        else{
                            this.block_count.style("fill","red");
                        }
                    }
                    else if(this.map_way == "全相联映射"){
                        this.tagx.attr("visibility","visible")
                                .text(this.str_tag)
                                .style("fill","red")
                    }
                    break;
                case 3:
                    if(this.map_way == "直接映射" || this.map_way == "组相联映射"){
                        if(this.address_element2_10 == 0){
                            this.tag0.attr("visibility","visible")
                                .text(this.str_tag)
                                .style("fill","red")
                        }
                        else if(this.address_element2_10 == 1){
                            this.tag1.attr("visibility","visible")
                                .text(this.str_tag)
                                .style("fill","red")
                        }
                        else if(this.address_element2_10 == parseInt(this.cache_RowCount) - 1){
                            this.tagend.attr("visibility","visible")
                                .text(this.str_tag)
                                .style("fill","red")
                        }
                        else{
                            this.tagx.attr("visibility","visible")
                                .text(this.str_tag)
                                .style("fill","red")
                        }
                    }
                    else{
                        this.detail.text("访问：" + this.address_element1_10 + "块" + this.address_element3_10 + "单元");
                        this.detail.attr("visibility","visible")
                            .style("fill","red");
                    }
                    break;
                case 4:
                    if(this.map_way == '直接映射'){
                        this.detail.attr("visibility","visible")
                             .style("fill","red");
                        this.detail.text("访问：" + this.address_element1_10 + "块群" + this.address_element2_10 + "块" + this.address_element3_10 + "单元")
                    }
                    else if(this.map_way == '组相联映射'){
                        this.detail.attr("visibility","visible")
                             .style("fill","red");
                        this.detail.text("访问：" + this.address_element1_10 + "组群" + this.address_element2_10 + "块" + this.address_element3_10 + "单元")
                    }
                    else{
                        this.svgContainer.selectAll("text").style("fill","black");
                        this.detail.attr("visibility","hidden");
                        this.tag0.attr("visibility","hidden");
                        this.tag1.attr("visibility","hidden");
                        this.tagx.attr("visibility","hidden");
                        this.tagend.attr("visibility","hidden");
                        this.memory0_31.attr("visibility","hidden");
                        this.memory32_63.attr("visibility","hidden");
                        this.memory64_end.attr("visibility","hidden");
                        this.xrow.attr("visibility","hidden");
                    }
                    break;
                default:
                    if(this.map_way == "直接映射" || this.map_way == "组相联映射"){
                        this.svgContainer.selectAll("text").style("fill","black");
                        this.detail.attr("visibility","hidden");
                        this.tag0.attr("visibility","hidden");
                        this.tag1.attr("visibility","hidden");
                        this.tagx.attr("visibility","hidden");
                        this.tagend.attr("visibility","hidden");
                        this.memory0_31.attr("visibility","hidden");
                        this.memory32_63.attr("visibility","hidden");
                        this.memory64_end.attr("visibility","hidden");
                        this.xrow.attr("visibility","hidden");
                    }
                    break;
            } 
        },
         max_step_changed: function(){
            this.max_step = this.model.get('max_step');
        },
         map_way_changed: function(){
            this.map_way = this.model.get('map_way');
            this.svgContainer.selectAll("text").style("fill","black");
            this.detail.attr("visibility","hidden");
            this.tag0.attr("visibility","hidden");
            this.tag1.attr("visibility","hidden");
            this.tagx.attr("visibility","hidden");
            this.tagend.attr("visibility","hidden");
            this.memory0_31.attr("visibility","hidden");
            this.memory32_63.attr("visibility","hidden");
            this.memory64_end.attr("visibility","hidden");
            this.xrow.attr("visibility","hidden");
            if(this.map_way == ""){
                this.texts.attr("visibility",function(d,i){
                    if(i >= 12 && i <= 15){return "hidden";}
                    else{return "visible";}
                })
                this.address_element1.attr("visibility","hidden");
                this.address_element2.attr("visibility","hidden");
                this.address_element3.attr("visibility","hidden");
                this.group_tag.attr("visibility","hidden");
                this.group_cachedigit.attr("visibility","hidden");
                this.direct_tag.attr("visibility","hidden");
                this.direct_cachedigit.attr("visibility","hidden");
                this.full_tag.attr("visibility","hidden");
                this.lines.attr("visibility",function(d,i){
                    if(i == 19){return "hidden";}
                    else{return "visible";}
                })
                this.cache_group.attr("visibility","hidden");
                this.cache_row.attr("visibility","visible");
            }
            else if(this.map_way == "直接映射"){
                this.texts.attr("visibility",function(d,i){
                    if(i >= 14 && i <= 15){return "hidden";}
                    else{return "visible";}
                })
                this.group_tag.attr("visibility","hidden");
                this.group_cachedigit.attr("visibility","hidden");
                this.direct_tag.attr("visibility","visible");
                this.direct_cachedigit.attr("visibility","visible");
                this.full_tag.attr("visibility","hidden");
                this.lines.attr("visibility","visible");
                this.cache_group.attr("visibility","hidden");
                this.cache_row.attr("visibility","visible");
                
                var tag = parseInt(this.model.get('direct_tag_digits'));
                var row_digit = parseInt(this.cache_BlockNumDigits);
                
                this.address_element1.attr("visibility","visible");
                this.address_element2.attr("visibility","visible");
                this.address_element3.attr("visibility","visible");
                
                this.address_element1.text(this.address.substring(0,tag));
                this.address_element2.text(this.address.substring(tag,tag + row_digit));
                this.address_element3.text(this.address.substring(tag + row_digit));
                
                this.str_tag = this.address.substring(0,tag);
                
                this.address_element1_10 = parseInt(this.address.substring(0,tag),2);
                this.address_element2_10 = parseInt(this.address.substring(tag,tag + row_digit),2);
                this.address_element3_10 = parseInt(this.address.substring(tag + row_digit),2);
            }
            else if(this.map_way == "全相联映射"){
                this.texts.attr("visibility",function(d,i){
                    if(i >= 12 && i <= 14){return "hidden";}
                    else{return "visible";}
                })
                this.group_tag.attr("visibility","hidden");
                this.group_cachedigit.attr("visibility","hidden");
                this.direct_tag.attr("visibility","hidden");
                this.direct_cachedigit.attr("visibility","hidden");
                this.full_tag.attr("visibility","visible");
                this.lines.attr("visibility",function(d,i){
                    if(i == 19){return "hidden";}
                    else{return "visible";}
                });
                
                this.cache_group.attr("visibility","hidden");
                this.cache_row.attr("visibility","visible");
                
                var tag = parseInt(this.model.get('full_tag_digits'));
                
                this.address_element1.attr("visibility","visible");
                this.address_element2.attr("visibility","hidden");
                this.address_element3.attr("visibility","visible");
                
                this.address_element1.text(this.address.substring(0,tag));
                this.address_element2.attr("visibility","hidden");
                this.address_element3.text(this.address.substring(tag));
                
                this.str_tag = this.address.substring(0,tag);
                
                this.address_element1_10 = parseInt(this.address.substring(0,tag),2);
                this.address_element3_10 = parseInt(this.address.substring(tag),2);
            }
            else if(this.map_way == "组相联映射"){
                this.texts.attr("visibility",function(d,i){
                    if(i == 13 || i == 15){return "hidden";}
                    else{return "visible";}
                })
                this.group_tag.attr("visibility","visible");
                this.group_cachedigit.attr("visibility","visible");
                this.direct_tag.attr("visibility","hidden");
                this.direct_cachedigit.attr("visibility","hidden");
                this.full_tag.attr("visibility","hidden");
                this.lines.attr("visibility","visible");
                
                this.cache_group.attr("visibility","visible");
                this.cache_row.attr("visibility","hidden");
                
                var tag = parseInt(this.model.get('group_tag_digits'));
                var group_digit = parseInt(this.cache_GroupNumDigits);
                
                this.address_element1.attr("visibility","visible");
                this.address_element2.attr("visibility","visible");
                this.address_element3.attr("visibility","visible");
                
                this.address_element1.text(this.address.substring(0,tag));
                this.address_element2.attr("visibility","visible");
                this.address_element2.text(this.address.substring(tag,tag + group_digit));
                this.address_element3.text(this.address.substring(tag + group_digit));
                
                this.str_tag = this.address.substring(0,tag);
                
                this.address_element1_10 = parseInt(this.address.substring(0,tag),2);
                this.address_element2_10 = parseInt(this.address.substring(tag,tag + group_digit),2);
                this.address_element3_10 = parseInt(this.address.substring(tag +  group_digit),2);
            }
        },
    });
    
    return {
        CacheDataAcessView: CacheDataAcessView
    };
});
