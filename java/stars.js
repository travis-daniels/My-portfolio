const canvas = document.getElementById("starfield");
const ctx = canvas.getContext("2d");

let width, height;
let stars = [];
const STAR_COUNT = 300;

function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

function createStar() {
    return {
        x: Math.random() * width - width / 2,
        y: Math.random() * height - height / 2,
        z: Math.random() * width
    };
}

for (let i = 0; i < STAR_COUNT; i++) {
    stars.push(createStar());
}

function animate() {
    ctx.fillStyle = "#0f0f24";
    ctx.fillRect(0, 0, width, height);

    ctx.translate(width / 2, height / 2);

    for (let star of stars) {
        star.z -= 4;

        if (star.z <= 0) {
            Object.assign(star, createStar());
            star.z = width;
        }

        const sx = star.x / star.z * width;
        const sy = star.y / star.z * height;

        ctx.fillStyle = "white";
        ctx.fillRect(sx, sy, 2, 2);
    }

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    requestAnimationFrame(animate);
}

animate();
