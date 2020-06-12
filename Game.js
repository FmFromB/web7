var bg = new Image();
bg.src = "back.jpg"

let t = 0
let demons = Array(6).fill(0).map((e,i) => ({
    x: 1100, y: (i*150)-100,
    v: 0.1 + Math.random()/3
})); 

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

function init(){
    canvas = document.getElementById('canvas');
    if (canvas.getContext){
        ctx = canvas.getContext('2d');
        drawBack(ctx,'#202020','#aaa',canvas.width,canvas.height);
        balls = [];
    }  
}
        
function draw(dt){
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    demons.forEach(demon => {
        demon.x -= (dt-t)*demon.v;
        demon.x = demon.x < 0 ? 1100 : demon.x;
        ctx.drawImage(img, demon.x , demon.y, img.width, img.height);
    });
    t = dt;
    requestAnimationFrame(draw)
}

function goInput(event){
    var x = event.clientX-360;
    var y = event.clientY-100;
    var item = new TBall(x,y);
    item.draw(ctx);
    balls.push(item);
    soundClick(2)
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

function soundClick(n) {
    var audio = new Audio(); 
    if (n == 1){
        audio.src = 'DOOM.mp3'; 
    }
    if (n == 2){
        audio.src = 'Blaster.mp3'; 
    }
    audio.autoplay = true;
}

function targetCheck(posX, y){
    if (posX == y){
        demons.splice(1)
    }
}

function move(){
    idTimer = setInterval('moveBall();',1);
}

function rules(){
    alert("ШОК КОНТЕНТ! На вас напали демонюки! Врубайте мощный гитарный запил (моего сочинения), и вступайте в бой!!!");
}

        

        
   