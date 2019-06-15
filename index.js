let stopImg,carImg;
let car;
let lastTick=new Date().getTime(),delta;
let PPM=30;//pixels per meter. In order to keep simulations realistic
//20 meters from stop sign
function preload(){
    stopImg=loadImage('assets/stop_sign.png');
    carImg=loadImage('assets/car.png');


}

function setup(){
    const canvas=createCanvas(windowWidth-10,windowHeight/1.2);
    car=new Car(carImg);

}
function draw(){
    const time=new Date().getTime();
    delta=(time-lastTick)/1000;
    background(34,128,178);//sky blue
    noStroke();
    //ground
    fill(51);
    rect(0,height-20,width,20);
    //Stop Sign
    image(stopImg,PPM,height-20- (2.13*PPM),0.76*PPM,0.76*PPM);//real stop sign dimensions
    fill(80);
    rect(PPM*1.34,height-20-((2.13-0.76)*PPM),0.1*PPM,(2.13-0.76)*PPM);
    //car
    car.show();
    lastTick=time;



}