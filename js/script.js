function navigate(section) {
  const content = document.getElementById('content');
  content.innerHTML = `<h2>Sección: ${section}</h2><p>Contenido en construcción...</p>`;
}

/* --- Animación de estrellas con fugaces --- */
const canvas = document.getElementById("starfield");
const ctx = canvas.getContext("2d");

let stars = [];
let shootingStars = [];
const numStars = 150;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

function createStars() {
  for (let i = 0; i < numStars; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 1.5,
      speed: Math.random() * 0.5 + 0.2
    });
  }
}
createStars();

function drawStars() {
  ctx.fillStyle = "white";
  stars.forEach(star => {
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, 2 * Math.PI);
    ctx.fill();
  });
}

function updateStars() {
  stars.forEach(star => {
    star.y += star.speed;
    if (star.y > canvas.height) {
      star.y = 0;
      star.x = Math.random() * canvas.width;
    }
  });
}

/* --- Estrellas fugaces --- */
function createShootingStar() {
  const startX = Math.random() * canvas.width;
  shootingStars.push({
    x: startX,
    y: 0,
    length: Math.random() * 80 + 30,
    speed: Math.random() * 10 + 6,
    opacity: 1
  });
}

function drawShootingStars() {
  shootingStars.forEach((star, index) => {
    ctx.strokeStyle = `rgba(255,255,255,${star.opacity})`;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(star.x, star.y);
    ctx.lineTo(star.x - star.length, star.y + star.length);
    ctx.stroke();

    star.x += star.speed;
    star.y += star.speed;
    star.opacity -= 0.02;

    if (star.opacity <= 0) {
      shootingStars.splice(index, 1);
    }
  });
}

/* Loop de animación con degradado galaxia */
function animate() {
  // Degradado estilo sci-fi / galaxia
  let gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  gradient.addColorStop(0, "#0f2027");   // azul oscuro
  gradient.addColorStop(0.3, "#203a43"); // azul gris
  gradient.addColorStop(0.6, "#2c5364"); // azul verdoso
  gradient.addColorStop(1, "#4a148c");   // morado fuerte

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  updateStars();
  drawStars();
  drawShootingStars();

  if (Math.random() < 0.01) {
    createShootingStar();
  }

  requestAnimationFrame(animate);
}
animate();
