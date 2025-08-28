/***********************
 * NAVEGACIÓN INFERIOR *
 ***********************/
function navigate(tab) {
  // Visual (activar pestaña)
  document.querySelectorAll('.bottom-nav .tab').forEach(b => b.classList.remove('active'));
  const btn = document.querySelector(`.bottom-nav .tab[data-tab="${tab}"]`);
  if (btn) btn.classList.add('active');
  // (Si luego quieres cambiar de vista, aquí lo controlas)
}

/***********************
 * BUSCADOR + FILTROS  *
 ***********************/
const state = {
  searchText: '',
  category: 'all'
};

document.getElementById('search').addEventListener('input', (e) => {
  state.searchText = e.target.value.toLowerCase().trim();
  renderProducts();
});

document.querySelectorAll('.chip').forEach(ch => {
  ch.addEventListener('click', () => {
    document.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
    ch.classList.add('active');
    state.category = ch.dataset.cat; // all | plugin | map
    renderProducts();
  });
});

/***********************
 * DATA DE PRODUCTOS   *
 ***********************/
const PRODUCTS = [
  {
    id: 'p1',
    title: 'AntiCheat Pro (PocketMine)',
    category: 'plugin',
    tags: ['Seguridad', 'PMMP'],
    price: 12.99,
    img: 'https://picsum.photos/seed/plugin1/600/400'
  },
  {
    id: 'p2',
    title: 'Mapa SkyBlock Ultra',
    category: 'map',
    tags: ['Survival', 'Retos'],
    price: 9.99,
    img: 'https://picsum.photos/seed/map1/600/400'
  },
  {
    id: 'p3',
    title: 'EconomyX Plugin',
    category: 'plugin',
    tags: ['Economía', 'Tienda'],
    price: 7.50,
    img: 'https://picsum.photos/seed/plugin2/600/400'
  },
  {
    id: 'p4',
    title: 'Mapa BedWars Arena Pack',
    category: 'map',
    tags: ['PVP', 'Arena'],
    price: 11.00,
    img: 'https://picsum.photos/seed/map2/600/400'
  },
  {
    id: 'p5',
    title: 'RankUP + Permissions',
    category: 'plugin',
    tags: ['Ranks', 'Permisos'],
    price: 14.99,
    img: 'https://picsum.photos/seed/plugin3/600/400'
  },
  {
    id: 'p6',
    title: 'Mapa Hardcore World',
    category: 'map',
    tags: ['Hardcore', 'Exploración'],
    price: 8.99,
    img: 'https://picsum.photos/seed/map3/600/400'
  }
];

/***********************
 * RENDER DE PRODUCTOS *
 ***********************/
function productMatches(p) {
  const okCat = state.category === 'all' || p.category === state.category;
  const t = state.searchText;
  if (!t) return okCat;
  const hay =
    p.title.toLowerCase().includes(t) ||
    p.tags.join(' ').toLowerCase().includes(t);
  return okCat && hay;
}

function renderProducts() {
  const list = document.getElementById('products');
  list.innerHTML = '';
  PRODUCTS.filter(productMatches).forEach(p => {
    const card = document.createElement('article');
    card.className = 'card';
    card.innerHTML = `
      <img src="${p.img}" alt="${p.title}">
      <div class="content">
        <h3>${p.title}</h3>
        <div>
          <span class="badge">${p.category === 'plugin' ? 'Plugin' : 'Map'}</span>
          ${p.tags.map(t=>`<span class="badge">${t}</span>`).join('')}
        </div>
        <div class="price">$${p.price.toFixed(2)}</div>
        <div class="actions">
          <button class="btn primary">Comprar</button>
          <button class="btn ghost">Detalle</button>
        </div>
      </div>
    `;
    list.appendChild(card);
  });
}
renderProducts();

/***********************
 * SLIDER PROMOS (5s)  *
 ***********************/
const slides = document.querySelector('.slides');
const dotsWrap = document.querySelector('.dots');
const images = Array.from(document.querySelectorAll('.slides img'));
let index = 0;
let timer = null;

function buildDots() {
  dotsWrap.innerHTML = '';
  images.forEach((_, i) => {
    const b = document.createElement('button');
    if (i === 0) b.classList.add('active');
    b.addEventListener('click', () => goTo(i));
    dotsWrap.appendChild(b);
  });
}
function updateDots() {
  dotsWrap.querySelectorAll('button').forEach((d,i)=>{
    d.classList.toggle('active', i===index);
  });
}
function goTo(i) {
  index = (i + images.length) % images.length;
  slides.style.transform = `translateX(-${index * 100}%)`;
  updateDots();
  restartAuto();
}
function next() { goTo(index + 1); }
function prev() { goTo(index - 1); }
function auto() { timer = setInterval(next, 5000); }
function restartAuto() { clearInterval(timer); auto(); }

document.querySelector('.next').addEventListener('click', next);
document.querySelector('.prev').addEventListener('click', prev);
buildDots();
auto();

/*******************************
 * STARFIELD + SHOOTING STARS  *
 *******************************/
const canvas = document.getElementById('stars');
const ctx = canvas.getContext('2d');
let stars = [];
let shooting = [];
const STAR_COUNT = 180;

function resizeCanvas() {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
}
addEventListener('resize', resizeCanvas);
resizeCanvas();

function initStars() {
  stars = [];
  for (let i=0; i<STAR_COUNT; i++) {
    stars.push({
      x: Math.random()*canvas.width,
      y: Math.random()*canvas.height,
      r: Math.random()*1.5 + 0.2,
      s: Math.random()*0.5 + 0.2
    });
  }
}
initStars();

function drawStars() {
  ctx.fillStyle = '#fff';
  for (const st of stars) {
    ctx.beginPath();
    ctx.arc(st.x, st.y, st.r, 0, Math.PI*2);
    ctx.fill();
    st.y += st.s;
    if (st.y > canvas.height) {
      st.y = 0;
      st.x = Math.random()*canvas.width;
    }
  }
}

function spawnShooting() {
  if (Math.random() < 0.012) {
    const x = Math.random() * canvas.width * 0.8 + canvas.width*0.1;
    shooting.push({ x, y: -20, len: Math.random()*80+40, vx: 8, vy: 8, a: 1 });
  }
}
function drawShooting() {
  for (let i=shooting.length-1; i>=0; i--) {
    const sh = shooting[i];
    ctx.strokeStyle = `rgba(255,255,255,${sh.a})`;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(sh.x, sh.y);
    ctx.lineTo(sh.x - sh.len, sh.y + sh.len);
    ctx.stroke();
    sh.x += sh.vx; sh.y += sh.vy; sh.a -= 0.02;
    if (sh.a <= 0) shooting.splice(i,1);
  }
}

function loop() {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  drawStars();
  drawShooting();
  spawnShooting();
  requestAnimationFrame(loop);
}
loop();

/*******************************
 * NAVEGACIÓN ENTRE PESTAÑAS   *
 *******************************/
function navigate(tab) {
  switch(tab) {
    case 'inicio':
      window.location.href = 'index.html';
      break;
    case 'servers':
      window.location.href = 'servers.html';
      break;
    case 'sells':
      window.location.href = 'sells.html';
      break;
    case 'chat':
      window.location.href = 'chat.html';
      break;
    case 'perfil':
      window.location.href = 'perfil.html';
      break;
    default:
      console.warn('Se intentó navegar a una pestaña desconocida:', tab);
  }
}
