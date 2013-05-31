// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
// WARNING: THE FIRST BLANK LINE MARKS THE END OF WHAT'S TO BE PROCESSED, ANY BLANK LINE SHOULD
// GO AFTER THE REQUIRES BELOW.
//
//= require jquery
//= require jquery_ujs
//= require bootstrap



$(function(){

    function Game() {
        var canvas = document.getElementById("game");
        this.width = canvas.width;
        this.height = canvas.height;
        this.context = canvas.getContext("2d");
        this.context.fillStyle = "white";
        this.keys = new KeyListener();

        this.p1 = new Paddle(5, 0);
        this.p1.y = this.height/2 - this.p1.height/2;
        this.p2 = new Paddle(this.width - 5 - 2, 0);
        this.p2.y = this.height/2 - this.p2.height/2;

        this.ball = new Ball();
        this.ball.x = this.width/3;
        this.ball.y = this.height/2;
        this.ball.vy = Math.floor(Math.random()*12 - 6);
        this.ball.vx = 7 - Math.abs(this.ball.vy);

        this.display1 = new Display(this.width/5, 25);
        this.display2 = new Display(this.width-this.width/5, 25);

    }

    function Paddle(x,y) {
        this.x = x;
        this.y = y;
        this.width = 2;
        this.height = 28;
        this.score = 0;
    }

    function Ball() {
        this.x = 0;
        this.y = 0;
        this.vx = 0;
        this.vy = 0;
        this.width = 4;
        this.height = 4;
    }

    Ball.prototype.update = function()
    {
        this.x += this.vx;
        this.y += this.vy;
    };

    Ball.prototype.draw = function(p)
    {
        p.beginPath();


        p.fillStyle="#FFFF00";
        p.fillRect(this.x, this.y, this.width, this.height);


    };

    Paddle.prototype.draw = function(p)
    {
        p.fillRect(this.x, this.y, this.width, this.height);
    };

    Game.prototype.draw = function()
    {
        this.context.beginPath();
        this.context.fillStyle="#FFFFFF";

        this.context.clearRect(0, 0, this.width, this.height);
        this.context.fillRect(this.width/2, 0, 4, this.height);

        this.context.fillRect(0, this.height/7, this.width, 1);
        this.context.fillRect(0, this.height-this.height/7, this.width, 1);

        this.context.fillRect(this.width/4, 0, 0.5, this.height);
        this.context.fillRect(this.width-this.width/4, 0, 0.5, this.height);

        this.context.fillRect(this.height/2,this.width/4,this.width/2,0.5);

        this.p1.draw(this.context);
        this.p2.draw(this.context);

        this.display1.draw(this.context);
        this.display2.draw(this.context);

        this.ball.draw(this.context);



    };

    Game.prototype.update = function()
    {
        if (this.paused)
            return;

        if (this.keys.isPressed(83)) { // DOWN
            this.p1.y = Math.min(this.height - this.p1.height, this.p1.y + 4);
        } else if (this.keys.isPressed(87)) { // UP
            this.p1.y = Math.max(0, this.p1.y - 4);
        }

        if (this.keys.isPressed(40)) { // DOWN
            this.p2.y = Math.min(this.height - this.p2.height, this.p2.y + 4);
        } else if (this.keys.isPressed(38)) { // UP
            this.p2.y = Math.max(0, this.p2.y - 4);
        }

        this.ball.update();


        if (this.ball.vx > 0) {
            if (this.p2.x <= this.ball.x + this.ball.width &&
                this.p2.x > this.ball.x - this.ball.vx + this.ball.width) {
                var collisionDiff = this.ball.x + this.ball.width - this.p2.x;
                var k = collisionDiff/this.ball.vx;
                var y = this.ball.vy*k + (this.ball.y - this.ball.vy);
                if (y >= this.p2.y && y + this.ball.height <= this.p2.y + this.p2.height) {
                    // collides with right paddle
                    this.ball.x = this.p2.x - this.ball.width;
                    this.ball.y = Math.floor(this.ball.y - this.ball.vy + this.ball.vy*k);
                    this.ball.vx = -this.ball.vx;
                }
            }
        } else {
            if (this.p1.x + this.p1.width >= this.ball.x) {
                var collisionDiff = this.p1.x + this.p1.width - this.ball.x;
                var k = collisionDiff/-this.ball.vx;
                var y = this.ball.vy*k + (this.ball.y - this.ball.vy);
                if (y >= this.p1.y && y + this.ball.height <= this.p1.y + this.p1.height) {
                    // collides with the left paddle
                    this.ball.x = this.p1.x + this.p1.width;
                    this.ball.y = Math.floor(this.ball.y - this.ball.vy + this.ball.vy*k);
                    this.ball.vx = -this.ball.vx;
                }
            }
        }

        // Top and bottom collision
        if ((this.ball.vy < 0 && this.ball.y < 0) ||
            (this.ball.vy > 0 && this.ball.y + this.ball.height > this.height)) {
            this.ball.vy = -this.ball.vy;
        }

        if (this.ball.x >= this.width)
            this.score(this.p1);
        else if (this.ball.x + this.ball.width <= 0)
            this.score(this.p2);

        this.display1.value = this.p1.score;
        this.display2.value = this.p2.score;
    };

    Game.prototype.score = function(p)
    {
        // player scores
        p.score++;
        var player = p == this.p1 ? 0 : 1;

        // set ball position
        this.ball.x = this.width/2;
        this.ball.y = p.y + p.height/2;

        // set ball velocity
        this.ball.vy = Math.floor(Math.random()*12 - 6);
        this.ball.vx = 7 - Math.abs(this.ball.vy);
        if (player == 1)
            this.ball.vx *= -1;
    };

    function Display(x, y) {
        this.x = x;
        this.y = y;
        this.value = 0;
    }

    Display.prototype.draw = function(p)
    {
        p.fillText(this.value, this.x, this.y);
    };

    // Initialize our game instance
    var game = new Game();



    function KeyListener() {
        this.pressedKeys = [];

        this.keydown = function(e) {
            this.pressedKeys[e.keyCode] = true;
        };

        this.keyup = function(e) {
            this.pressedKeys[e.keyCode] = false;
        };

        document.addEventListener("keydown", this.keydown.bind(this));
        document.addEventListener("keyup", this.keyup.bind(this));
    }

    KeyListener.prototype.isPressed = function(key)
    {
        return this.pressedKeys[key] ? true : false;
    };

    KeyListener.prototype.addKeyPressListener = function(keyCode, callback)
    {
        document.addEventListener("keypress", function(e) {
            if (e.keyCode == keyCode)
                callback(e);
        });
    };

    function MainLoop() {
        game.update();
        game.draw();
        // Call the main loop again at a frame rate of 30fps
        setTimeout(MainLoop, 33.3333);
    }

    function Restart(){

        if(document.getElementById("select_field").value == "australia")
            document.getElementById("game").style.backgroundColor = "#3366CC";
        else if(document.getElementById("select_field").value == "roland")
            document.getElementById("game").style.backgroundColor = "#d67728";
        else if(document.getElementById("select_field").value == "wimbledon")
            document.getElementById("game").style.backgroundColor = "#339933";
        else if(document.getElementById("select_field").value == "us")
            document.getElementById("game").style.backgroundColor = "#3366CC";

        game = new Game();
        game.p1.score = 0;
        game.p2.score = 0;
    }

    document.getElementById("restart").onclick=function(){

        Restart();

    };


        MainLoop();

});
