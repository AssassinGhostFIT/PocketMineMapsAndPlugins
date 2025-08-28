// === Fondo de estrellas ===
const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");
let stars = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

function createStars(count) {
  stars = [];
  for (let i = 0; i < count; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 1.5,
      speed: Math.random() * 0.5 + 0.2
    });
  }
}
createStars(200);

function animateStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "white";
  stars.forEach(star => {
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    ctx.fill();
    star.y += star.speed;
    if (star.y > canvas.height) {
      star.y = 0;
      star.x = Math.random() * canvas.width;
    }
  });
  requestAnimationFrame(animateStars);
}
animateStars();

// === Texto con brillo dinámico ===
const title = document.getElementById("title");
setInterval(() => {
  const colors = ["#ff00ff", "#00ffff", "#ffff00", "#ff6600"];
  const color = colors[Math.floor(Math.random() * colors.length)];
  title.style.textShadow = `0 0 15px ${color}, 0 0 30px ${color}`;
  title.style.color = color;
}, 1000);

// === Carrusel automático ===
const slides = document.querySelector(".slides");
let index = 0;
setInterval(() => {
  index = (index + 1) % 5;
  slides.style.transform = `translateX(-${index * 100}%)`;
}, 5000);

// === Neon dinámico en productos ===
const products = document.querySelectorAll(".product");
setInterval(() => {
  products.forEach(p => {
    const color = `hsl(${Math.random() * 360}, 100%, 50%)`;
    p.style.boxShadow = `0 0 10px ${color}, 0 0 20px ${color}, 0 0 40px ${color}`;
    p.style.border = `2px solid ${color}`;
  });
}, 800);
