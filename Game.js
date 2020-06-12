var bg = new Image();
bg.src = "back.jpg"


function soundClick() {
  var audio = new Audio(); 
  audio.src = 'DOOM.mp3'; 
  audio.autoplay = true; 
}

var canvas, ctx, balls, idTimer, rBall;
        TBall = new Class({
            initialize: function(pX,pY) {
                this.posX = pX; 
                this.posY = pY;
                this.colBall = 'rgb('+0+','
                +0+','+256+')';
                this.rBall = 25
            },
            posX: 0,
            posY: 0,
            colBall:"rgb(0,0,0)",
            rBall: 0,
            colorBall: function(ctx){
                with (this){
                    var gradient = ctx.createRadialGradient(posX+rBall/4,
                    posY-rBall/6, rBall/8, posX, posY, rBall);
                    gradient.addColorStop(0, '#fff');
                    gradient.addColorStop(0.85, colBall);
                    return gradient;
                }
            },
            draw : function(ctx){
                with (this){
                    ctx.fillStyle = colorBall(ctx);
                    ctx.beginPath();
                    ctx.arc(posX, posY, rBall, 0, 2*Math.PI, false);
                    ctx.closePath();
                    ctx.fill();
                }
            }
        });

        function drawBack(ctx, col1, col2, w, h){
            ctx.drawImage(bg, 0, 0)
            ctx.save();
        }

        let t = 0
        let cars = Array(6).fill(0).map((e,i) => ({
            x: 1100, y: (i*150)-100,
            v: 0.1 + Math.random()/3
        }));        

        function init(dt){
            canvas = document.getElementById('canvas');
            if (canvas.getContext){
                ctx = canvas.getContext('2d');
               
                drawBack(ctx,'#202020','#aaa',canvas.width,canvas.height);

                balls = [];
            }  
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            cars.forEach(car => {
                car.x -= (dt-t)*car.v;
                car.x = car.x < 0 ? 1100 : car.x;
                ctx.drawImage(img, car.x , car.y, img.width, img.height);
            });
            t = dt;
            requestAnimationFrame(init)
        }

        function goInput(event){
            var x = event.clientX-360;
            var y = event.clientY-100;
            var item = new TBall(x,y);
            item.draw(ctx);
            balls.push(item);
        }
        
        function moveBall(){

            drawBack(ctx,'#202020','#aaa',canvas.width,canvas.height);
            for (var i = 0; i < balls.length;i){
                balls[i].posX = balls[i].posX + (Math.random()*8-4);
                balls[i].posY = balls[i].posY + (Math.random()*4-8);
                balls[i].draw(ctx);
                if ((balls[i].posX > canvas.width)||(balls[i].posX < 0) ||(balls[i].posY < 0)) 
                    balls.splice(i,1);
                else 
                    i++;


            }

        
        }
        

        function target(x, y) {
            if((balls[i].posX = x))
                balls.splice(i, 1)
        }

        function move(){
            idTimer = setInterval('moveBall();',1);
        }

        
