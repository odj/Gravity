define(['SvgObject', 'Vector'], function(SvgObject, Vector) {
    var Target = SvgObject.extend({
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
          var el = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
          el.setAttribute('x', -0.25);
          el.setAttribute('y', -2);
          el.setAttribute('width', 0.5);
          el.setAttribute('height', 4);
          el.setAttribute('id', this.id);
          el.setAttribute('pointer-events', 'none');
          group.transform.baseVal.appendItem(translate);
          group.setAttribute('class', 'target');
          group.appendChild(el);
          $('#' + this.parent_id).append(group);
          this.vector.show();
        },

        setVector: function(x, y) {this.vector.setVector(x, y);}

    });


    return Target;
});



