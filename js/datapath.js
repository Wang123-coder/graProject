// First undefine 'datapath' so we can easily reload this file.
require.undef('datapath');

define('datapath', ['d3'], function (d3) {

    function draw(container, data) {//Data[0]：指令类型，data[1]指令语句

	var type = data[0]
	var instruction = data[1]

	// 创建svg容器
        var svgContainer = d3.select(container).append("svg")
					       .attr("width",'16.5cm')
                                    	       .attr("height",'9.3cm');

		// 矩形
	var jsonRects = [{"rect_x":0,"rect_y":0,"rect_w":'16.5cm',"rect_h":'9.3cm'},
					 {"rect_x":38.595,"rect_y":146.563,"rect_w":25.58,"rect_h":87.5},
					 {"rect_x":103.75,"rect_y":155.3125,"rect_w":33.2,"rect_h":65.625},
			 		 {"rect_x":158.15,"rect_y":161.875,"rect_w":25.6,"rect_h":48.125},
			 		 {"rect_x":253.15,"rect_y":135.625,"rect_w":41.5,"rect_h":107.1875},
			 		 {"rect_x":373.5,"rect_y":113.125,"rect_w":33.2,"rect_h":26.25},
			 		 {"rect_x":425,"rect_y":166.25,"rect_w":27.45,"rect_h":50.3125},
					 {"rect_x":483.95,"rect_y":179.375,"rect_w":35.275,"rect_h":80.9375},
					 {"rect_x":530.45,"rect_y":188.125,"rect_w":16.6,"rect_h":63.4375}];
	// 多边形 
	var jsonPolygons = [{"polygon_points":"103.75,117.5 112,107.46875 103.75,95.625 103.75,73.75 136.95,91.25 136.95,124.0625 103.75,139.375"},
			   			{"polygon_points":"373.5,203.4375 383,194.6875 373.5,179.375 373.5,153.125 406.7,175 406.7,214.375 373.5,234.0625"}]
	
	//椭圆
	var jsonEllipses = [{"ellipse_cx":273.75,"ellipse_cy":275,"ellipse_rx":16.6,"ellipse_ry":24.0625},
			   		    {"ellipse_cx":350.675,"ellipse_cy":168.4375,"ellipse_rx":8.3,"ellipse_ry":19.6875},
			   		    {"ellipse_cx":350.675,"ellipse_cy":214.375,"ellipse_rx":8.3,"ellipse_ry":19.6875},
			   		    {"ellipse_cx":488.875,"ellipse_cy":85.3125,"ellipse_rx":8.3,"ellipse_ry":19.6875},
			   		    {"ellipse_cx":580,"ellipse_cy":230,"ellipse_rx":8.3,"ellipse_ry":19.6875}];
	// 画折线
	var jsonPolylines = [{"polyline_points":"497.1,87.5 520,87.5 520,46.875 18.675,46.875 18.675,185.9375 38.595,185.9375"},
						 {"polyline_points":"64.25,185.9375 102.6,185.9375"},
						 {"polyline_points":"73.55,186.125 73.55,91.875 103.75,91.875"},
						 {"polyline_points":"91.3,131.25 103.75,131.25"},
						 {"polyline_points":"137.025,113.75 307.1,113.75"},
						 {"polyline_points":"307.1,113.75 307.1,161.875 343.3,161.875"},
						 {"polyline_points":"136.55,185.9375 157.15,185.9375"},
						 {"polyline_points":"183.825,185.9375 203.35,185.9375"},
						 {"polyline_points":"203.35,185.9375 203.35,148.75 253,148.75"},
						 {"polyline_points":"203.35,185.9375 203.35,170.625 253,170.625"},
						 {"polyline_points":"203.35,185.9375 203.35,210 253,210"},
						 {"polyline_points":"203.35,185.9375 203.35,266.875 256.875,266.875"},
						 {"polyline_points":"289.35,266.875 327.85,266.875 327.85,223.125 342.3,223.125"},
						 {"polyline_points":"294.65,175 342.3,175"},
						 {"polyline_points":"327.85,175 327.85,126.875 373.5,126.875"},
						 {"polyline_points":"406.7,126.875 488.95,126.875 488.95,105"},
						 {"polyline_points":"294.65,210 320.7,210"},
						 {"polyline_points":"320.7,210 320.7,240 483.8,240"},
						 {"polyline_points":"320.7,210 342.3,210"},
						 {"polyline_points":"465.9,192.5 465.9,93.25 482.5,93.25"},
						 {"polyline_points":"307.1,113.75 307.1,74.375 480.5,74.375"},
						 {"polyline_points":"465.9,192.5 465.9,273 565,273 565,243 573,243"},
						 {"polyline_points":"359,170 374,170"},
						 {"polyline_points":"359,215 374,215"},
						 {"polyline_points":"406,195 425,195"},
						 {"polyline_points":"466,195 484,195"},
						 {"polyline_points":"520,218 530,218"},
						 {"polyline_points":"547,218 573,218"},
						 {"polyline_points":"589,230 598,230 598,311 212,311 211,228 252,228"},
						 {"polyline_points":"452,195 466,195"}];

	// 画线
	var jsonLines = [{"x1":190,"y1":10,"x2":190,"y2":340},
					 {"x1":315,"y1":10,"x2":315,"y2":340},
					 {"x1":460,"y1":10,"x2":460,"y2":340},
					 {"x1":555,"y1":10,"x2":555,"y2":340}]

	// 画三角形：用path
	var jsonPaths = [{"d":"M 34 181 L 39 186 L 34 191 Z"},
					 {"d":"M 98 181 L 103 186 L 98 191 Z"},
					 {"d":"M 98 87 L 103 92 L 98 97 Z"},
					 {"d":"M 98 126 L 103 131 L 98 136 Z"},
					 {"d":"M 338 157 L 343 162 L 338 167 Z"},
					 {"d":"M 152 181 L 157 186 L 152 191 Z"},
					 {"d":"M 198 181 L 203 186 L 198 191 Z"},
					 {"d":"M 248 144 L 253 149 L 248 154 Z"},
					 {"d":"M 248 166 L 253 171 L 248 176 Z"},
					 {"d":"M 248 205 L 253 210 L 248 215 Z"},
					 {"d":"M 252 262 L 257 267 L 252 272 Z"},
					 {"d":"M 338 218 L 343 223 L 338 228 Z"},
					 {"d":"M 338 170 L 343 175 L 338 180 Z"},
					 {"d":"M 368 122 L 373 127 L 368 132 Z"},
					 {"d":"M 484 112 L 489 107 L 494 112 Z"},
					 {"d":"M 479 235 L 484 240 L 479 245 Z"},
					 {"d":"M 337 205 L 342 210 L 337 215 Z"},
					 {"d":"M 475 88 L 480 93 L 475 98 Z"},
					 {"d":"M 476 69 L 481 74 L 476 79 Z"},
					 {"d":"M 568 238 L 573 243 L 568 248Z"},
					 {"d":"M 369 165 L 374 170 L 369 175 Z"},
					 {"d":"M 369 210 L 374 215 L 369 220 Z"},
				     {"d":"M 479 190 L 484 195 L 479 200 Z"},
				     {"d":"M 568 213 L 573 218 L 568 223 Z"},
				     {"d":"M 247 223 L 252 228 L 247 233 Z"}]
	// 文字
	var jsonTexts = [{"x":43,"y":192,"text":"PC"},
				     {"x":105,"y":192,"text":"Mem"},
				     {"x":112,"y":110,"text":"Add"},
				     {"x":160,"y":192,"text":"Inst"},
				     {"x":260,"y":180,"text":"Reg"},
				     {"x":260,"y":204,"text":"File"},
				     {"x":261,"y":267,"text":"Sign"},
				     {"x":255,"y":287,"text":"Extend"},
				     {"x":210,"y":110,"text":"Next SEQ PC"},
				     {"x":220,"y":145,"text":"RS1"},
				     {"x":220,"y":168,"text":"RS2"},
				     {"x":220,"y":207,"text":"RD"},    //11
				     {"x":218,"y":285,"text":"Imm"},
				     {"x":305,"y":175,"text":"A"},
				     {"x":305,"y":210,"text":"B"},
				     {"x":345,"y":162,"text":"M"},    //15
				     {"x":346,"y":172,"text":"U"},
				     {"x":347,"y":182,"text":"X"},
				     {"x":345,"y":209,"text":"M"},
				     {"x":346,"y":219,"text":"U"},
				     {"x":347,"y":229,"text":"X"},  //20
				     {"x":373,"y":130,"text":"Zero？"},
				     {"x":383,"y":198,"text":"ALU"},  //22
				     {"x":427,"y":184,"text":"ALU"},
				     {"x":427,"y":197,"text":"Out"},
				     {"x":429,"y":210,"text":"Put"},   //25
				     {"x":488,"y":214,"text":"Data"},
				     {"x":487,"y":234,"text":"Mem"},
				     {"x":483,"y":80,"text":"M"},   //28
				     {"x":484,"y":90,"text":"U"},
				     {"x":485,"y":100,"text":"X"},
				     {"x":535,"y":204,"text":"L"},
				     {"x":533,"y":224,"text":"M"},
				     {"x":534,"y":244,"text":"D"},
				     {"x":574,"y":225,"text":"M"},
				     {"x":575,"y":235,"text":"U"},
				     {"x":576,"y":245,"text":"X"},
				     {"x":25,"y":60,"text":"Next PC"},   //37
				     {"x":205,"y":60,"text":"（准备源操作数）"},
					 {"x":335,"y":60,"text":"（准备访存地址）"},
				     {"x":90,"y":35,"text":"取指令"},
				     {"x":230,"y":35,"text":"指令译码"},
				     {"x":370,"y":35,"text":"执行"},
				     {"x":495,"y":35,"text":"访存"},
				     {"x":565,"y":35,"text":"结果写回"},
				     {"x":82,"y":136,"text":"4"},
				     {"x":360,"y":330,"text":"WB Data"}];  //46
	
	// 画圆
	var jsonCircles = [{"cx":307,"cy":114},
					   {"cx":203,"cy":171},
					   {"cx":203,"cy":210},
					   {"cx":321,"cy":210},
					   {"cx":466,"cy":195}]
   
    // -------------------------------------------------------------------------//
	var init_rectangles = svgContainer.selectAll("rect")
				    .data(jsonRects)
				    .enter()
				    .append("rect")
				    .attr("x",function(d){return d.rect_x;})
				    .attr("y",function(d){return d.rect_y;})
				    .attr("width",function(d){return d.rect_w;})
				    .attr("height",function(d){return d.rect_h;})
				    .style("fill",function(d){
				    	if (d.rect_x == 0){return "#FAFAD2";}
				    	else{return "white";}
				    })
				    .style("stroke",function(d){
				    	if (d.rect_x == 0){return "white";}
				    	else{return "black"}
				    })
				    .style("stroke-width",2);
	var init_polygons = svgContainer.selectAll("polygon")
				    .data(jsonPolygons)
				    .enter()
				    .append("polygon")
				    .attr("points",function(d){return d.polygon_points;})
				    .style("fill","white")
				    .style("stroke","black")
				    .style("stroke-width",2);
	var init_ellipses = svgContainer.selectAll("ellipse")
				    .data(jsonEllipses)
				    .enter()
				    .append("ellipse")
				    .attr("cx",function(d){return d.ellipse_cx;})
				    .attr("cy",function(d){return d.ellipse_cy;})
				    .attr("rx",function(d){return d.ellipse_rx;})
				    .attr("ry",function(d){return d.ellipse_ry;})
				    .style("fill","white")
				    .style("stroke","black")
				    .style("stroke-width",2);	
	var init_polylines = svgContainer.selectAll("polyline")
				    .data(jsonPolylines)
				    .enter()
				    .append("polyline")
				    .attr("points",function(d){return d.polyline_points;})
				    .style("fill","none")
				    .style("stroke","black")
				    .style("stroke-width",2);
	var init_lines = svgContainer.selectAll("line")
				    .data(jsonLines)
				    .enter()
				    .append("line")
				    .attr("x1",function(d){return d.x1;})
				    .attr("y1",function(d){return d.y1;})
				    .attr("x2",function(d){return d.x2;})
				    .attr("y2",function(d){return d.y2;})
				    .style("stroke","black")
				    .style("stroke-width",1)
				    .style("stroke-dasharray","5,5");
	var init_paths = svgContainer.selectAll("path")
				    .data(jsonPaths)
				    .enter()
				    .append("path")
				    .attr("d",function(d){return d.d;})
	var init_texts = svgContainer.selectAll("text")
				    .data(jsonTexts)
				    .enter()
				    .append("text")
				    .attr("x",function(d){return d.x;})
				    .attr("y",function(d){return d.y;})
				    .attr("font-size",12)
				    .text(function(d){return d.text;})
				    .style("stroke","black")
				    .style("stroke-width",1);	
	var init_circles =  svgContainer.selectAll("circle")
				    .data(jsonCircles)
				    .enter()
				    .append("circle")
				    .attr("cx",function(d){return d.cx;})
				    .attr("cy",function(d){return d.cy;})
				    .attr("r",4)
				    .style("stroke","black");
	
	

    }

    return draw;
});