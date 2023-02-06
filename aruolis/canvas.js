const canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const c = canvas.getContext('2d');

let mouse = {
    // x: undefined,
    // y: undefined
    x: 10,
    y: 10
}

window.addEventListener('mousemove', (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
});

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

function distance(x, y) {
    return Math.sqrt((mouse.x - x)**2 + (mouse.y - y)**2)
}

function Tile(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.distortion = 0;
    this.angle = 0;
    this.cx = x + width/2;
    this.cy = y + height/2;
    this.distorted = false;

    this.draw = () => {
        c.translate(this.cx, this.cy);
        c.rotate(Math.PI/180 * (this.angle + this.distortion));      
        c.strokeRect(-this.width/2, -this.height/2, this.width, this.height);
        c.rotate(Math.PI/180 * (-this.angle - this.distortion));
        c.translate(-(this.cx), -(this.cy));
    };
    this.update = () => {
        if (distance(this.cx, this.cy) < 200) {
            // this.angle = (Math.random()*10 -5);
            if (!this.distorted) {
                this.distortion = (Math.random()*10 -5)/(distance(this.cx, this.cy)/200); 
                this.distorted = true;
            }                
        } else {
            this.distorted = false;
            this.distortion = 0;
        };
        
        this.draw();    
    }
};

const tileArray = [];



for (var i = 0; i < 10; i++) {
    for(var j = 0; j < 10; j++) {
        tileArray.push(new Tile(100+i*80, 100+ j*60, 80, 60));
    }
};


function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, window.innerWidth, window.innerHeight);
    for (element of tileArray) {
        element.update();
    }
}


animate();