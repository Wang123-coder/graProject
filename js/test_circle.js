//%%javascript
require.undef('test_circle');

define('test_circle', ["@jupyter-widgets/base",'d3'], function(widgets,d3) {
    var TestCircleView = widgets.DOMWidgetView.extend({

        // Render the view.
        render: function() {
            //var d3 = require('./d3.js');
            this.svgContainer = d3.select(this.el).append("svg")
                                    .attr("width",30)
                                    .attr("height",30);
            this.circle = this.svgContainer.append("circle")
                .attr("cx",15)
                .attr("cy",15)
                .attr("r",15)
                .style("fill",this.model.get('color'));
            this.index = this.svgContainer.append("text")
                .attr("x",9)
                .attr("y",19)
                .attr("font-size",13)
                .text(this.model.get('test_index'))
                .style("fill","black");
            
            // Python -> JavaScript update
            this.model.on('change:color', this.color_changed, this);
            this.model.on('change:test_index', this.test_index_changed, this);
        },
         color_changed: function(){
             this.circle.style("fill",this.model.get('color'));
         },
         test_index_changed: function(){
             this.index.text(this.model.get('test_index'));
         },
    });
    
    return {
        TestCircleView: TestCircleView
    };
});