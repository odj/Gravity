define(['selfish', 'Ball', 'MouseArea', 'Trajectory', 'Target'],
  function(selfish, Ball, MouseArea, Trajectory, Target) {
    var GravityView = selfish.Base.extend({
        initialize: function(parent_id, id, config) {
          this.id = id;
          this.parent_id = parent_id;
          this.slider_name = this.id + '_slider';
          this.display_name = this.id + '_display';
          this.config = config ?  config : this.default_config;
          this.mouseArea = MouseArea.new(this.display_name, 'mouse_area');
          this.ball = Ball.new(this.display_name, 'ball');
          this.target = Target.new(this.display_name, 'target');
          this.boreLine = Trajectory.new(this.display_name, 'bore_line', 'bore_line');
          this.trajectory = Trajectory.new(this.display_name, 'trajectory', 'trajectory');
        },

        show: function() {
          var group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
          var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
          var trans = svg.createSVGTransform();
          var parent = $('#' + this.parent_id);
          this.height = parent.height();
          this.width = parent.width();
          var sx = this.width / this.config.width;
          this.config.height = this.config.width * this.height / this.width
          trans.setScale(sx, sx);
          group.transform.baseVal.appendItem(trans);
          group.setAttribute('id', this.display_name);
          svg.appendChild(group);
          svg.setAttribute('class', this.config.display_class);
          parent.append(svg);

          this.addGrid();

          this.mouseArea.show();

          this.boreLine.show();
          this.trajectory.show();
          this.ball.show();
          this.target.show();
        },

        makeGroup: function(id) {
          var group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
          group.setAttribute('id', id);
          return group;
        },

        addGrid: function() {
          var display = $('#' + this.display_name);
          function makeLine(x1, y1, x2, y2, class_name)
          {
              var line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
              line.setAttribute('x1', x1);
              line.setAttribute('y1', y1);
              line.setAttribute('x2', x2);
              line.setAttribute('y2', y2);
              line.setAttribute('class', class_name);
              return line;
          }
          var grid = this.makeGroup(this.id + '_grid');

          for (var i = 0; i < this.config.height; i+= this.config.grid_minor)
          {
              var class_name = i % this.config.grid_major ? 'grid_minor' : 'grid_major';
              var line = makeLine(0, i, this.config.width, i, class_name);
              grid.appendChild(line);
          }

          for (var i = 0; i < this.config.width; i+= this.config.grid_minor)
          {
              var class_name = i % this.config.grid_major ? 'grid_minor' : 'grid_major';
              var line = makeLine(i, 0, i, this.config.height, class_name);
              grid.appendChild(line);
          }
          display.append(grid);
        },

        getBall: function() {return this.ball},
        getMouseArea: function() {return this.mouseArea;},


        default_config: {
            slider_class: 'time_slider',
            display_class: 'display_window',
            width: 50, //meters
            grid_minor: 1,
            grid_major: 10,
            initialPos: {x: 10, y:30},
            initialTargetPos: {x: 40, y:10},
            initialAngle: 33.5,
            initialVelocity: 30,
            g: 9.8
        }
    });
    return GravityView;
});


