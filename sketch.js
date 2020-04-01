let king, man, queen, woman, ktom, o, firstdest, seconddest;

function centerCanvas() {
    let x = (windowWidth - width) / 2;
    let y = (windowHeight - height) / 2;
    cvn.position(x, y);
}

function setup(){
    stage = 0
    cvn = createCanvas(windowWidth, windowHeight);
    cvn.style('display', 'block')
    centerCanvas();
    textFont("Baskerville");
    textAlign(CENTER,CENTER)
    king = new Word(-width/3, -(height/2-(height/4)), [255,0,255,255], "King")
    man = new Word(-width/12, -(height/2-height/8), [0,255,255,255], "Man")
    woman = new Word(width/3-50, height/2-height/4-70, [55,205,55,255], "Woman")
    queen = new Word(width/6, (height/2-height/8), [255,255,0,255], "Queen")
    travel = new Word(-width/3, -(height/2-(height/4)), [255,0,255,0], "K-M")
    o = createVector(0,0)
    firstdest = p5.Vector.sub(king.position, man.position)
    seconddest = p5.Vector.add(firstdest, woman.position)
    // ktom = p5.Vector.sub(king.position, man.position)
    // ktq = p5.Vector.add(ktom, woman.position)

}

function windowResized() {
    centerCanvas();
}

function draw(){
    push()
    background(0);
    translate(width/2,height/2)
    if (stage == 0){
        king.show();
        man.show();
        queen.show();
        woman.show();
        
        drawArrow(o, king.position, king.c);
        drawArrow(o, man.position, man.c)
        drawArrow(o, queen.position, queen.c)
        drawArrow(o, woman.position, woman.c)
        
    } else if (stage == 1){
        
        travel.changeOpacity(255)
        
        
        man.show();
        queen.show();
        woman.show();
        king.show();
        drawArrow(o, king.position, king.c);
        drawArrow(o, man.position, man.c)
        drawArrow(o, queen.position, queen.c)
        drawArrow(o, woman.position, woman.c)
        drawArrow(o,travel.position, travel.c)
        if (travel.c[3] > 200) {
            travel.move(firstdest)
            travel.changeColor(color(0,0,255))
        } 
        travel.show()
    } else if (stage == 2) {
        king.show()
        man.show();
        queen.show();
        woman.show();
        drawArrow(o, king.position, king.c);
        drawArrow(o, man.position, man.c)
        drawArrow(o, queen.position, queen.c)
        drawArrow(o, woman.position, woman.c)
        drawArrow(o,travel.position, travel.c)
        travel.contents="K-M+W"
        travel.move(seconddest)
        travel.changeColor(color(225,255,0))
        travel.show()

    }
    
    //drawArrow(o, king.position, king.c);
    pop()
    // drawArrow(o, woman.position, woman.c);
    
}

class Word{
    constructor(x,y,c,contents){
        this.position = createVector(x,y)
        this.contents = contents
        this.c = c
    }

    show(){
        fill(this.c[0], this.c[1], this.c[2],this.c[3]);
        textSize(100);
        text(this.contents, this.position.x, this.position.y)
    }

    changeOpacity(da){
        console.log(this.c)
        this.c[3] = lerp(this.c[3], da, 0.025)
    }

    changeColor(dc){
        let colors = lerpColor(color(this.c), color(dc), 0.025)
        this.c = [colors.levels[0],colors.levels[1],colors.levels[2], this.c[3]]
    }

    move(dv) {
        this.position = p5.Vector.lerp(this.position, dv, 0.025)
    }
}

function drawArrow(base, vec, myColor) {
    // This comes from the p5js documentation!
    push();
    stroke(myColor[0], myColor[1], myColor[2], myColor[3]/2);
    strokeWeight(3);
    fill(myColor[0], myColor[1], myColor[2], myColor[3]/2);
    translate(base.x, base.y);
    line(0, 0, vec.x, vec.y);
    rotate(vec.heading());
    let arrowSize = 7;
    translate(vec.mag() - arrowSize, 0);
    triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
    pop();
  }

  function keyPressed() {
    if (keyCode === RIGHT_ARROW) {
        stage += 1;
    }
}