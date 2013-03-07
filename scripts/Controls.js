define(['selfish'], function(selfish) {
    var Controls = selfish.Base.extend({
        initialize: function(parent_id, gravityView, gravityModel) {
          this.parent_id = parent_id;
          this.id = parent_id + '_controls';
          this.angle_slider = this.id + '_angle_slider';
          this.velocity_slider = this.id + '_velocity_slider';
          this.angle_label = this.id + '_angle_label';
          this.velocity_label = this.id + '_velocity_label';
          this.gravityView = gravityView;
          this.gravityModel = gravityModel;
          this.mouseArea = gravityView.mouseArea;
        },

        update: function() {
          var boreLine = this.gravityModel.getBoreLine();
          this.gravityView.boreLine.setPoints(boreLine);

          var ballPos = this.gravityModel.getBallPos();
          this.gravityView.ball.setTranslate(ballPos.x, ballPos.y);

          this.targetPos = this.gravityModel.getTargetPos();
          this.gravityView.target.setTranslate(targetPos.x, targetPos.y);
          var targetVector = this.gravityModel.getTargetVector();
          this.gravityView.target.setVector(targetVector.x / 3, targetVector.y / 3);

          var ballVector = this.gravityModel.getBallVector();
          this.gravityView.ball.setVector(ballVector.x / 3, ballVector.y / 3);
          this.gravityView.trajectory.setPoints(this.gravityModel.getTrajectory());
          $('#' + 'i_velocity_info').html(Math.floor(this.gravityModel.vInit));
          $('#' + 'i_velocity_mph_info').html(Math.floor(this.gravityModel.vInit * 2.23694));
          $('#' + 'h_velocity_info').html(Math.floor(this.gravityModel.v0.x));
          $('#' + 'h_velocity_mph_info').html(Math.floor(this.gravityModel.v0.x * 2.23694));
          $('#' + 'angle_info').html(Math.floor(this.gravityModel.angle));
          $('#' + 'time_info').html(Math.floor(this.gravityModel.tNow * 1000));
          $('#' + 'dist_info').html(Math.floor(this.gravityModel.dX));
        },

        show: function() {
          // Must be called after GravityView is shown
          mouseDown = false;  // Global!
          lastXPosition = 0; // Global!
          lastYPosition = 0; // Global!
          var mouseArea = this.gravityView.getMouseArea()
          var gravityModel = this.gravityModel;
          var update = this.update;

          this.mouseArea.addEvent('mousemove', function(evt) {
              if (mouseDown) {  // Left click
                  if (typeof(evt.webkitMovementY) === 'number') { // Chrome
                      gravityModel.changeAngle(evt.webkitMovementY / 10);
                  } else if (typeof(evt.mozMovementY) === 'number') { // FF
                      gravityModel.changeAngle(evt.mozMovementY / 10);
                  } else {
                      if (lastYPosition !== 0) { //Everyone else
                          gravityModel.changeAngle(evt.clientY - lastYPosition / 10);
                      }
                  }
                  lastXPosition = evt.clientX;
                  lastYPosition = evt.clientY;
              }

              { // regular move -- we do this anyway
                  var pt = $('svg')[0].createSVGPoint();
                  var ctm = mouseArea.ctm();
                  pt.x = evt.clientX; pt.y = evt.clientY;
                  var newPt = pt.matrixTransform(ctm.inverse());
                  gravityModel.setX(newPt.x);
              }

              update();
          });

          this.mouseArea.addEvent('mousewheel', function(evt) {
              gravityModel.changeVelocity(evt.wheelDelta / 240);
              update();
          });

          this.mouseArea.addEvent('mousedown', function(evt) {
              mouseDown = true;
          });

          this.mouseArea.addEvent('mouseup', function(evt) {
              mouseDown = false;
          });

          this.mouseArea.addEvent('mouseout', function(evt) {
              mouseDown = false;
              //$('.info_bottom').css('visibility', 'hidden');
          });

          this.mouseArea.addEvent('mouseover', function(evt) {
              mouseDown = false;
              //$('.info_bottom').css('visibility', 'visible');
          });

          this.mouseArea.addEvent('mouseleave', function(evt) {
              mouseDown = false;
              //$('.info_bottom').css('visibility', 'hidden');
          });

          update(); // Set everything up on start
        }

    });
    return Controls;
});


