let stopImg,carImg;
let car;
let lastTick = new Date().getTime();
let delta;
let PPM;//pixels per meter. In order to keep simulations realistic
let accSlider;
let stats, button;
let inputs = {};

const gasPricePerLiter = 1.44;

function preload(){
    stopImg=loadImage('assets/stop_sign.png');
    carImg=loadImage('assets/car.png');


}

function setup(){
    isMobile();
    const canvas = createCanvas(windowWidth - 10, windowHeight / 1.5);
    PPM = width / 63;//canvas is x meters long
    car = new Car(carImg);

    putInput('mass', 0, car.mass);
    putInput('maxEngineWatts', 1, car.maxEngineWatts);
    putInput('realWidth', 2, car.realWidth);
    putInput('realHeight', 3, car.realHeight);
    putInput('initialSpeed', 4, car.initialSpeed);

    accSlider = createSlider(car.maxDecel, car.maxAcc, 0);

    button = createButton('Reset');

    button.mousePressed(() => {
        car.pos = (width) / PPM;
        car.vel = car.initialSpeed;
        car.distance = 0;
        car.time = 0;
        car.totalEnergyUsed = 0;
    });
    stats = createElement("p", "");
}


function draw(){
    setValuesFromInput();
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

    //if the watts is good, do it
    //if the vel is 0 or close, acc is 0,
    //if the slider is braking, let it happen except when vel is 0.
    if ((car.wattsLost >= car.maxEngineWatts && accSlider.value() > 0) || car.vel <= 0) {
        car.acc = 0;
        if (car.vel <= 0)
            car.vel = 0;

    } else {
        car.acc = accSlider.value();

    }
    if (frameCount % (mobile ? 5 : 1) === 0)
        stats.html(`${format(car.vel)} m/s : ${format(car.vel * 3.6)} km/h : speed<br>
                    ${kFormatter(car.acc)} m/s/s : acceleration<br>
                    ${kFormatter(car.time)} seconds past<br>
                    ${kFormatter(car.distance)} meters travelled<br>
                    ${kFormatter(-car.dragForce())} drag force<br>
                    ${kFormatter(-car.rollingFrictionForce())} rolling friction force<br>
                    ${kFormatter(car.engineForce())} engine/brakes force<br>
                    ${kFormatter(car.totalForce())} total force<br>
                    ${kFormatter(car.wattsLost)} watts used<br>
                    ${kFormatter(car.totalEnergyUsed)} total energy used<br>
                    ${kFormatter(car.totalEnergyUsed / energyIn1LPetrol)} liters of petrol<br>
                    ${'$' + kFormatter((car.totalEnergyUsed / energyIn1LPetrol) * gasPricePerLiter)} money used<br>



`);

    lastTick=time;


}

function setValuesFromInput() {

}

function format(number) {
    return Number(number).toFixed(2);
}

let mobile = null;

function isMobile() {//https://stackoverflow.com/questions/11381673/detecting-a-mobile-browser
    if (mobile == null)
        (function (a) {
            if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) mobile = true;
        })(navigator.userAgent || navigator.vendor || window.opera);

    return mobile;
}

function kFormatter(num) {//https://stackoverflow.com/questions/9461621/format-a-number-as-2-5k-if-a-thousand-or-more-otherwise-900
    return Math.abs(num) > 999 ? Math.sign(num) * ((Math.abs(num) / 1000).toFixed(1)) + 'k' : format(num)
}

function putInput(name, index, def) {
    let title = createElement('p');
    title.html(name);
    title.position(10, index * 40);
    inputs[name] = createInput();
    inputs[name].position(10, index * 40 + 35);
    inputs[name].value(def);
    inputs[name].elt.onkeydown = (e) => {
        if (!/^-?\d*[.,]?\d*$/.test(inputs[name].value() + e.key) && e.key.length === 1)
            e.preventDefault();
        else setTimeout(() => car[name] = parseFloat(inputs[name].value()), 10);
        car.calculatePixelDimensions();
    };


}
    
