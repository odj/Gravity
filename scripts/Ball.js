define(['SvgObject', 'Vector'], function(SvgObject, Vector) {
    var Ball = SvgObject.extend({
        initialize: function(parent_id, id) {
            SvgObject.initialize.call(this, parent_id, id);
            this.vector_id = id + '_vector';
            this.vector = Vector.new(this.group_id, this.vector_id);
        },

        show: function() {
          // Just a test text to show things are working
          var group = this.createGroup(this.group_id);
          var scale = this.svg.createSVGTransform();
          var translate = this.svg.createSVGTransform();
          var el = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
          el.setAttribute('cx', 0);
          el.setAttribute('cy', 0);
          el.setAttribute('r', 1);
          el.setAttribute('id', this.id);
          el.setAttribute('pointer-events', 'none');
          group.transform.baseVal.appendItem(translate);
          group.setAttribute('class', 'ball');
          group.appendChild(el);
          $('#' + this.parent_id).append(group);
          this.vector.show();
        },

        setVector: function(x, y) {this.vector.setVector(x, y);}

    });


    return Ball;
});


