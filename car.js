class Car{
    constructor(img){

        this.realWidth=4.95;//real volvo xc90 dimensions
        this.realHeight=1.776;

        this.img=img;
        this.ratio=this.realHeight/this.realWidth;

        this.calculatePixelDimensions();
        this.pos = (width - this.width) / PPM;

        this.vel = 27;//in ms^-1, around 40-50km/h 27
        this.acc = -17.47;//in ms^-2, max xc90 acceleration is 3.47ms^2
        this.time = 0;
        this.distance = 0;


    }
    show(){
        image(this.img, this.pos * PPM, height - this.height - 20, this.width, this.height);
        //ticking values
        this.pos -= this.vel * delta;
        if (this.vel < 28 && this.acc > 0 || this.acc < 0 && this.vel > 0)//stop before 100km/h and don't go backwards
        this.vel+=this.acc*delta;
        this.time += delta;
        this.distance += this.vel * delta;
        //resetting
        if (this.pos < -this.realWidth || this.vel < 0) {
            this.pos = (width) / PPM;
            if (this.vel < 0) {
                this.vel = 27;
                this.distance = 0;
                this.time = 0;
            }

        }

    }

    calculatePixelDimensions() {
        this.width = this.realWidth * PPM;
        this.height = this.width * this.ratio;//scale img correctly
    }

}