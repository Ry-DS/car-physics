class Car{
    constructor(img){

        this.realWidth=4.95;//real volvo xc90 dimensions
        this.realHeight=1.776;

        this.img=img;
        this.ratio=this.realHeight/this.realWidth;

        this.width=this.realWidth*PPM;
        this.height=this.width*this.ratio;//scale img correctly
        this.pos=createVector(width-this.width,height-this.height-20);
        this.pos.div(PPM);


        this.vel=0;//in ms^-1, around 40-50km/h
        this.acc=3.47;//in ms^-2, max xc90 acceleration


    }
    show(){
        image(this.img,this.pos.x*PPM,height-(this.realHeight*PPM)-20,this.realWidth*PPM,this.realHeight*PPM);
        this.pos.sub(this.vel*delta );
        if(this.vel<27)//stop before 100km/h
        this.vel+=this.acc*delta;

        if(this.pos.x<0)
            this.pos.x=(width-this.width)/PPM;

    }

}