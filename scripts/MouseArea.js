define(['SvgObject'], function(SvgObject) {
    var MouseArea = SvgObject.extend({
        initialize: function(parent_id, id) {
            SvgObject.initialize.call(this, parent_id, id);
        },

        show: function() {
          var bb = $('#' + this.parent_id)[0].getBoundingClientRect();
          var group = this.createGroup(this.group_id);
          var scale = this.svg.createSVGTransform();
          var translate = this.svg.createSVGTransform();
          var el = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
          el.setAttribute('x', 0);
          el.setAttribute('y', 0);
          el.setAttribute('width', bb.width);
          el.setAttribute('height', bb.height);
          el.setAttribute('opacity', '0.0');
          el.setAttribute('id', this.id);
          group.transform.baseVal.appendItem(translate);
          group.setAttribute('class', 'mouse_area');
          group.appendChild(el);
          $('#' + this.parent_id).append(group);
        },

        ctm: function() {
            return $('#' + this.id)[0].getScreenCTM();

        }
    });


    return MouseArea;
});


