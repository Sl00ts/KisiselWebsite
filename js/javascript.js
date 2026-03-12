const canvas = document.getElementById('trail-canvas');
const ctx = canvas.getContext('2d');

let width, height;
let mouse = { x: 0, y: 0 };
let points = [];
const maxPoints = 30;

function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

window.addEventListener('mousemove', function(e) {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    mouse.x = (e.clientX - rect.left) * scaleX;
    mouse.y = (e.clientY - rect.top) * scaleY;
});

function animate() {
    ctx.clearRect(0, 0, width, height);

    points.push({ x: mouse.x, y: mouse.y });

    if (points.length > maxPoints) {
        points.shift();
    }

    ctx.beginPath();
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    if (points.length > 0) {
        ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length; i++) {
            ctx.lineTo(points[i].x, points[i].y);
        }
    }

    ctx.lineWidth = 4;
    ctx.strokeStyle = '#d500f9';
    ctx.shadowBlur = 10;
    ctx.shadowColor = '#d500f9';
    
    ctx.stroke();

    requestAnimationFrame(animate);
}

animate();