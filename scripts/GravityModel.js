define(['selfish'], function(selfish) {
    var GravityModel = selfish.Base.extend({
        initialize: function(view) {
            this.view = view;
            this.config = view.config;
            this.reset();
        },
        changeAngle: function(inc) {
            this.angle -= inc;
            this.angle = this.angle < 0 ? 0 : this.angle;
            this.angle = this.angle > 85 ? 85 : this.angle;

            this.v0.x = this.vInit * Math.cos(this.angle * Deg2Rad);
            this.v0.y = this.vInit * Math.sin(this.angle * Deg2Rad);

            this.v.x = this.vInit * Math.cos(this.angle * Deg2Rad);
            this.v.y = this.vInit * Math.sin(this.angle * Deg2Rad);
            this.setX(this.currentX);
        },
        changeVelocity: function(inc) {
            this.vInit += inc;
            this.vInit = this.vInit < 1 ? 1 : this.vInit;
            this.vInit = this.vInit > 300 ? 300 : this.vInit;

            this.v0.x = this.vInit* Math.cos(this.angle * Deg2Rad);
            this.v0.y = this.vInit * Math.sin(this.angle * Deg2Rad);

            this.setX(this.currentX);
        },

        reset: function() {
            this.angle = this.config.initialAngle;
            this.vInit = this.config.initialVelocity;
            this.tNow = 0;
            this.v0 = {};
            this.v = {};
            this.v0.x = this.config.initialVelocity * Math.cos(this.angle * Deg2Rad);
            this.v0.y = this.config.initialVelocity * Math.sin(this.angle * Deg2Rad);

            this.v.x = this.config.initialVelocity * Math.cos(this.angle * Deg2Rad);
            this.v.y = this.config.initialVelocity * Math.sin(this.angle * Deg2Rad);


            this.tv = {x:0, y:0};

            this.initialPos = this.config.initialPos;
            this.initialTargetPos = this.config.initialTargetPos;
            this.ballPos = {x: this.initialPos.x, y: this.initialPos.y};
            this.targetPos = {x: this.initialTargetPos.x, y: this.initialTargetPos.y};
            this.dX = 0;
        },

        getBoreLine: function() {
            var points = "";
            var tanA = Math.tan(this.angle * Deg2Rad);
            var y = this.config.initialPos.y;
            y -= tanA * (this.config.width - this.config.initialPos.x);
            points = addPoint(points, this.initialPos);
            points = addPoint(points, {x: this.config.width, y: y});
            return points;
        },

        getTrajectory: function() {
            var tDelta = 1 / this.v.x;
            var tEnd = this.config.width / this.v.x;
            var trajectory = [];

            for (var  t = 0; t < tEnd; t += tDelta) {
                var pt = {};
                pt.x = this.initialPos.x + this.v0.x * t;
                pt.y = this.initialPos.y + (-this.v0.y * t) + (this.config.g * t * t / 2);
                trajectory.push(pt);
            }
            return addPoints("", trajectory);
        },

        getBallPos: function() {
            return this.ballPos;
        },

        getTargetPos: function() {
            return this.targetPos;
        },

        getBallVector: function() {
            return this.v;
        },

        getTargetVector: function() {
            return this.tv;

        },

        setX: function(x) {
            this.currentX = x;
            this.currentX = this.config.initialPos.x > this.currentX ? this.config.initialPos.x : this.currentX;
            dX = this.currentX - this.config.initialPos.x;
            this.tNow = dX / this.v0.x;

            // Ball Position
            this.ballPos.x = this.currentX;
            this.ballPos.y = this.initialPos.y + (-this.v0.y * this.tNow) + (this.config.g * this.tNow * this.tNow / 2);
            yCurrentVector = this.v0.y - (this.tNow * this.config.g);

            // Ball vector
            this.v.y = yCurrentVector;
            this.v.x = this.vInit * Math.cos(this.angle * Deg2Rad);

            // Target Position
            this.targetPos.y = this.initialTargetPos.y + (this.config.g * this.tNow * this.tNow / 2);

            //Target Vector
            this.tv.y = -(this.tNow * this.config.g);


            this.dX = dX;

        }
    });

    var Deg2Rad = 2 * Math.PI / 360;
    var addPoint = function(pointString, point) {
        if (pointString !== '') { pointString += ', ';}
        return pointString + point.x + ", " + point.y;
    }

    var addPoints = function(pointString, points) {
        for (var i = 0; i < points.length; i++) {
            pointString = addPoint(pointString, points[i]);
        }
        return pointString;
    }

    return GravityModel;
});


