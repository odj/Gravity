define(['selfish'], function(selfish) {
    var SvgObject = selfish.Base.extend({
        initialize: function(parent_id, id) {
            this.parent_id = parent_id;
            this.id = id
            this.group_id = 'group_' + id;
            this.svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            this.translate = this.svg.createSVGTransform();
            this.scale = this.svg.createSVGTransform();
            this.translate.setTranslate(0, 0);
            this.scale.setScale(1, 1);
        },

        createGroup: function(id) {
          var group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
          group.setAttribute('id', id);
          return group;
        },

        addEvent: function(eventName, handler) {
          $('#' + this.id)[0].addEventListener(eventName, handler);
        },

        setScale: function(sx, sy) {
          this.scale.setScale(sx, sy);
          var group = $('#' + this.group_id)[0];
          group.transform.baseVal.clear();
          group.transform.baseVal.appendItem(this.scale);
          group.transform.baseVal.appendItem(this.translate);
        },

        setTranslate: function(x, y) {
          this.translate.setTranslate(x, y);
          var group = $('#' + this.group_id)[0];
          group.transform.baseVal.clear();
          group.transform.baseVal.appendItem(this.scale);
          group.transform.baseVal.appendItem(this.translate);
        },

        show: function() {
          // Just a test text to show things are working
          var group = this.createGroup(this.group_id);
          var scale = this.svg.createSVGTransform();
          var translate = this.svg.createSVGTransform();
          scale.setScale(0.25, 0.25);
          translate.setTranslate(10, 50);
          group.setAttribute('class', 'unclassified_svg');
          var text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
          text.setAttribute('x', 0);
          text.setAttribute('y', 0);
          text.setAttribute('fill', 'green');
          text.setAttribute('id', this.id);
          text.textContent = 'svg';
          group.transform.baseVal.clear();
          group.transform.baseVal.appendItem(translate);
          group.transform.baseVal.appendItem(scale);
          group.appendChild(text);
          $('#' + this.parent_id).append(group);
        },
        empty: function(elem) {
          while (elem.lastChild) {
            elem.removeChild(elem.lastChild);
          }

        }

    });
    return SvgObject;
});


