// https://www.youtube.com/watch?v=83L6B13ixQ0&ab_channel=ChrisCourses

var canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

let mouse = {
    x: undefined,
    y: undefined
};

let maxRadius = 60;
let colorArray = [
    '#2C3540',
    '#475459',
    '#A65F46',
    '#D9765F',
    '#8C4C3E',
]


window.addEventListener("mousemove", function (event) {
    mouse.x = event.x;
    mouse.y = event.y;
});

window.addEventListener('resize', function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
})

function Circle(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = colorArray[Math.floor(Math.random()*colorArray.length)];
    this.minRadius = radius;

    this.draw = function() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, 2*Math.PI);
        // c.strokeStyle = 'blue';
        c.stroke();
        c.fillStyle = this.color;
        c.fill();
    };

    this.update = function () {
        if (this.x + this.radius > window.innerWidth || this.x - this.radius < 0) {
            this.dx = -dx;
        };
        this.x += this.dx;
    
        if (this.y + this.radius > window.innerHeight || this.y - this.radius < 0) {
            this.dy = -this.dy;
        };
        this.y += this.dy;

        //interactivity
        if (mouse.x - this.x < 50 && mouse.x - this.x > -50
            && mouse.y - this.y < 50 && mouse.y - this.y > - 50) {
            if(this.radius < maxRadius) {
                this.radius += 1}
        } else if (this.radius > this.minRadius) {
            this.radius -= 1;
        };

        this.draw();
    };
};




let circleArray = [];



function init() {

    circleArray = [];

    for (var i = 0; i < 800; i++) {
        let radius = Math.random()*4 + 1;
        let x = radius + Math.random() * (window.innerWidth - radius * 2);
        let y = radius + Math.random() * (window.innerHeight -radius * 2);
        let dx = (Math.random() - 0.5);
        let dy = (Math.random() - 0.5);
        
        circleArray.push(new Circle(x, y, dx, dy, radius));
    }
}



function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, window.innerWidth, window.innerHeight);
    
    for (var i = 0; i < circleArray.length; i++) {
        circleArray[i].update();
    }
  
};

init();
animate();
