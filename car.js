const energyIn1LPetrol = 34920000;
class Car{
    constructor(img){
        //car stats
        this.realWidth = 4.95;//real volvo xc90 dimensions in meters
        this.realHeight=1.776;
        this.mass = 2184;//mass in kg
        this.energyUsedPerMeter = (9.3 * energyIn1LPetrol) / 100000;//amount of petrol the car uses to go 1m extra urban
        this.maxAcc = (100 / 3.6) / 10;
        this.maxDecel = -Math.pow(100 / 3.6, 2) / (2 * 36);
        this.maxEngineWatts = 150000;

        //forces
        this.weightForce = this.mass * 9.8;
        this.wattsLost = 0;
        this.wattsUsed = 0;
        this.totalEnergyUsed = 0;

        this.img=img;
        this.ratio=this.realHeight/this.realWidth;
        this.calculatePixelDimensions();


        this.pos = (width - this.width) / PPM;
        this.vel = 0;//in ms^-1, around 40-50km/h 27
        this.acc = 0;//in ms^-2, max xc90 acceleration is 3.47ms^2
        this.time = 0;
        this.distance = 0;
        this.prevDistance = 0;


    }

    show(){
        image(this.img, this.pos * PPM, height - this.height - 20, this.width, this.height);
        //ticking values
        this.prevDistance = this.distance;
        this.pos -= this.vel * delta;
        if (this.acc > 0 || this.acc < 0 && this.vel > 0)//stop before 100km/h and don't go backwards
            this.vel += this.acc * delta;
        this.time += delta;
        this.distance += this.vel * delta;
        //forces
        let dragWatts = Math.abs((this.dragForce() * (this.distance - this.prevDistance)) / delta);
        let frictionWatts = Math.abs((this.rollingFrictionForce() * (this.distance - this.prevDistance)) / delta);
        let engineWatts = Math.abs((this.engineForce() * (this.distance - this.prevDistance)) / delta);
        this.wattsLost = dragWatts + frictionWatts;
        this.wattsUsed = engineWatts;
        this.totalEnergyUsed += this.wattsUsed * delta;

        //resetting
        if (this.pos < -this.realWidth || this.vel < 0) {
            this.pos = (width) / PPM;
            if (this.vel < 0) {
                this.vel = 27.77;
                this.distance = 0;
                this.time = 0;
                this.totalEnergyUsed = 0;
            }

        }


    }

    calculatePixelDimensions() {
        this.width = this.realWidth * PPM;
        this.height = this.width * this.ratio;//scale img correctly
    }

    rollingResistanceCoefficient() {
        let tirePressure = 2.1;//in bar
        return 0.005 + (1 / tirePressure) * (0.01 + 0.0095 * Math.pow((this.vel * 3.6) / 100, 2));//https://www.engineeringtoolbox.com/rolling-friction-resistance-d_1303.html
    }

    rollingFrictionForce() {
        if (this.vel <= 0)
            return 0;
        return this.rollingResistanceCoefficient() * this.weightForce;
    }

    dragForce() {
        let dragCoefficient = 0.26;//for most cars
        return dragCoefficient * 0.5 * 1.2 * Math.pow(this.vel, 2) * this.realWidth * this.realHeight;//1.2 is fluid density for air,
    }

    totalForce() {
        return this.acc * this.mass;
    }

    engineForce() {
        return this.totalForce() + this.dragForce() + this.rollingFrictionForce();
    }


}