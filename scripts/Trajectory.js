define(['SvgObject'], function(SvgObject) {
    var Trajectory = SvgObject.extend({
        initialize: function(parent_id, id, class_name) {
            SvgObject.initialize.call(this, parent_id, id);
            this.class_name = class_name;
        },

        show: function() {
          // Just a test text to show things are working
          var group = this.createGroup(this.group_id);
          var scale = this.svg.createSVGTransform();
          var translate = this.svg.createSVGTransform();
          var el = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
          el.setAttribute('points', "0 0  100 100");
          el.setAttribute('id', this.id);
          el.setAttribute('pointer-events', 'none');
          group.transform.baseVal.clear();
          group.transform.baseVal.appendItem(translate);
          group.setAttribute('class', this.class_name);
          group.appendChild(el);
          $('#' + this.parent_id).append(group);
        },

        setPoints: function(points) {
            $('#' + this.id).attr('points', points);

        }
    });


    return Trajectory;
});


