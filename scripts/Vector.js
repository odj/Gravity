define(['SvgObject'], function(SvgObject) {
    var Vector = SvgObject.extend({
        initialize: function(parent_id, id) {
            SvgObject.initialize.call(this, parent_id, id);
            this.vert_group = this.group_id + '_vert';
            this.horz_group = this.group_id + '_horz';
        },

        show: function() {
          var group = this.createGroup(this.group_id);
          var groupV = this.createGroup(this.vert_group);
          var groupH = this.createGroup(this.horz_group);
          var translate = this.svg.createSVGTransform();
          var hRotate = this.svg.createSVGTransform();
          var vRotate = this.svg.createSVGTransform();
          var scale = this.svg.createSVGTransform();
          var vScale= this.svg.createSVGTransform();
          var hScale= this.svg.createSVGTransform();
          hRotate.setRotate(0, 0, 0);
          vRotate.setRotate(-90, 0, 0);
          hScale.setScale(1, 1);
          vScale.setScale(1, 1);
          group.transform.baseVal.clear();
          group.transform.baseVal.appendItem(translate);

          groupH.transform.baseVal.clear();
          groupH.transform.baseVal.appendItem(hRotate);
          groupH.transform.baseVal.appendItem(hScale);

          groupV.transform.baseVal.clear();
          groupV.transform.baseVal.appendItem(vRotate);
          groupV.transform.baseVal.appendItem(vScale);

          group.setAttribute('class', 'vector');
          group.appendChild(groupV);
          group.appendChild(groupH);
          this.newArrow(groupH, 10);
          this.newArrow(groupV, 10);
          $('#' + this.parent_id).append(group);

        },

        newArrow: function(parent_el, len)
        {
          if (len === 0) {
            return;
          }
          // Thie line
          var l1 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
          l1.setAttribute('x1', 0);
          l1.setAttribute('y1', 0);
          l1.setAttribute('x2', len);
          l1.setAttribute('y2', 0);
          l1.setAttribute('pointer-events', 'none');

          var headSize = len > 0 ? -0.5 : 0.5;
          // Arrow 1
          var l2 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
          l2.setAttribute('x1', len);
          l2.setAttribute('y1', 0);
          l2.setAttribute('x2', len + headSize);
          l2.setAttribute('y2', 0.5);
          l2.setAttribute('pointer-events', 'none');

          // Arrow 2
          var l3 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
          l3.setAttribute('x1', len);
          l3.setAttribute('y1', 0);
          l3.setAttribute('x2', len + headSize);
          l3.setAttribute('y2', -0.5);
          l3.setAttribute('pointer-events', 'none');

          parent_el.appendChild(l1);
          parent_el.appendChild(l2);
          parent_el.appendChild(l3);
        },

        setVector: function(x, y) {
          hGroup = $('#' + this.horz_group)[0];
          vGroup = $('#' + this.vert_group)[0];

          this.empty(hGroup);
          this.empty(vGroup);

          this.newArrow(hGroup, x);
          this.newArrow(vGroup, y);
        }

    });


    return Vector;
});



