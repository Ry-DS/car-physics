const {Engine, World, Bodies, Mouse, MouseConstraint, Constraint} = Matter;
let engine, world;
let ground;
let box;
let mConstraint;

function setup() {
    let canvas = createCanvas(windowWidth - 10, windowHeight - 50);
    engine = Engine.create();
    world = engine.world;
    ground = new Ground(width / 2, height - 10, width, 20);
    box = new Box(width / 2, 0, 20, 20);
    const mouse = Mouse.create(canvas.elt);
    const options = {
        mouse: mouse,
    };

    // A fix for HiDPI displays
    mouse.pixelRatio = pixelDensity();
    mConstraint = MouseConstraint.create(engine, options);
    World.add(world, mConstraint);
}

function draw() {
    background(51);
    Engine.update(engine);
    ground.show();
    box.show();

}