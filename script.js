let canvas=document.createElement("canvas");
document.body.appendChild(canvas);
canvas.height=window.innerHeight;
canvas.width=window.innerWidth;

let tool=canvas.getContext("2d");
//this function return value between minum and maxium value provided by user
function random(min, max) {
    const num = Math.floor(Math.random() * (max - min + 1)) + min;
    return num;
}

function Ball(x, y, velX, velY, color, size){
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.color = color;
    this.size = size;
}

Ball.prototype.draw=function(){
    tool.beginPath();
    tool.fillStyle=this.color;
    tool.arc(this.x, this.y, this.size, 0, 2*Math.PI);
    tool.fill();

}

Ball.prototype.update=function(){
    if(this.x+this.size>canvas.width){
        this.velX=-this.velX;
    }
    if(this.x+this.size<0){
        this.velX=-this.velX;
    }
    if(this.y+this.size>canvas.height){
        this.velY=-this.velY;
    }
    if(this.y+this.size<0){
        this.velY=-this.velY;
    }

    this.x+=this.velX;
    this.y+=this.velY;
    //
    // testBall.draw();
}

Ball.prototype.collisionDetect = function() {
    for (let j = 0; j < balls.length; j++) {
        //if the ball is not same 
      if (!(this === balls[j])) {
          //calculate the difference b/w 2 balls
        const dx = this.x - balls[j].x;
        const dy = this.y - balls[j].y;
        //calculate dist b/w them
        const distance = Math.sqrt(dx * dx + dy * dy);
        //if the diff b/w them is less than combined radius of 2 balss, then they have collided, so change color. 
        if (distance < this.size + balls[j].size) {
          balls[j].color = this.color = 'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) +')';
        }
      }
    }
  }

// let testBall=new Ball(350,300,100,100,"red",50);

let balls=[];

while(balls.length<25){
    let size = random(10,20);
    let ball=new Ball(
        random(0+size,canvas.width-size),
        random(0+size,canvas.height-size),
        random(-10,10),
        random(-10,10),
        "rgb("+random(0,255)+","+random(0,255)+","+random(0,255)+")",
        size
    )
    balls.push(ball);
}

function loop(){
    tool.fillStyle="rgba(0,0,0,0.15)";
    tool.fillRect(0,0,canvas.width,canvas.height);

    for(let i=0;i<balls.length;i++){
        balls[i].draw();
        balls[i].update();
        balls[i].collisionDetect();
    }
    requestAnimationFrame(loop);
}
// loop();

var timeout; 
let isIdle=true;
document.addEventListener("mousemove" ,function(){
    if(isIdle){
        clearTimeout(timeout);
        timeout = setTimeout(function(){
            document.body.appendChild(canvas);
            loop();
        }
            , 2000);
        isIdle=false;
    }
    else if(!isIdle){
        document.body.removeChild(canvas);
        isIdle=true;
    }
});
// testBall.draw();
// testBall.update();