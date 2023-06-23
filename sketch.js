let polySynth;

function preload(){
  bird =loadImage("images/bird.png");
  angel1=loadImage("images/angel1.png");
  angel2=loadImage("images/angel2.png");
  angel3=loadImage("images/angel3.png");
  clouds=loadImage("images/clouds.jpeg");

}

function setup() {
  createCanvas(1000, 400);
  angels = [];
  angels.push(new Angel());
  console.log(angels)
  polySynth = new p5.PolySynth();
}

class Angel {
  constructor(){
    this.x=width+30;
    this.y=random(2*height/5,3*height/5);
    this.imageNum = floor(random(0,3));
  }
  
  display(){
    if (this.imageNum==0){
      this.image=angel1;
    }
    else if(this.imageNum==1){
      this.image=angel2;
    }
    else{this.image=angel3;}
    image(this.image,this.x,this.y,this.image.width/5,this.image.height/5);
  }
  
  move(){
    this.x-=5;
    if (this.x<width/7){
      angels.shift();
      angels.push(new Angel());
      playSynth();
    }
  }
}

function draw() {
  background(220);
    image(clouds,0,0);

  for (i=0;i<angels.length;i++){
    angels[i].display();
    angels[i].move();
  }     
  image(bird,20,20,bird.width/1.5,bird.height/1.5);
}

function playSynth() {
  userStartAudio();

  // note duration (in seconds)
  let dur = 1;

  // time from now (in seconds)
  let time = 0;

  // velocity (volume, from 0 to 1)
  let vel = 0.5;

  // notes can overlap with each other
  polySynth.play('G3', vel, 0, 5*dur/3);
  polySynth.play('C4', vel, time += 1/3, 4*dur/3);
  polySynth.play('G4', vel, time += 1/3, dur);
}