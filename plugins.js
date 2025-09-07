// ==========================================
//    DATABASE DE PLUGINS CON VERSIONES
// ==========================================

const PLUGINS_DATA = {
    knockback: {
        name: "Knockback System",
        description: "Sistema de knockback revolucionario con efectos cinematográficos, partículas épicas y anti-cheat integrado. Compatible con PocketMine 5.0.0+",
        videoId: "dQw4w9WgXcQ", // YouTube video ID (placeholder)
        tiktokUrl: "@tuusuario/video/123456", // TikTok video URL
        compatibility: {
            pocketmine: "5.0.0+",
            php: "8.0+",
            mcbe: "Todas las versiones"
        },
        images: [
            "https://via.placeholder.com/600x300/4ecdc4/ffffff?text=KNOCKBACK+PREVIEW+1",
            "https://via.placeholder.com/600x300/45b7d1/ffffff?text=KNOCKBACK+PREVIEW+2",
            "https://via.placeholder.com/600x300/96ceb4/ffffff?text=KNOCKBACK+PREVIEW+3",
            "https://via.placeholder.com/600x300/ffeaa7/333333?text=KNOCKBACK+PREVIEW+4",
            "https://via.placeholder.com/600x300/ff6b6b/ffffff?text=KNOCKBACK+PREVIEW+5"
        ],
        versions: {
            starter: {
                name: "Knockback Starter",
                price: 25,
                features: [
                    "Sistema básico de knockback (3 niveles)",
                    "Configuración por mundos",
                    "Anti-spam de golpes",
                    "Comandos básicos (/kb reload)",
                    "Permisos simples",
                    "Soporte básico por Discord"
                ],
                recommended: false
            },
            plus: {
                name: "Knockback Plus",
                price: 45,
                features: [
                    "Todo lo de Starter +",
                    "8 niveles personalizables",
                    "Knockback por ítem específico",
                    "Efectos de partículas épicas",
                    "Sonidos customizables",
                    "Estadísticas básicas",
                    "Configuración avanzada GUI"
                ],
                recommended: true
            },
            pro: {
                name: "Knockback Pro",
                price: 75,
                features: [
                    "Todo lo de Plus +",
                    "Sistema de combos inteligente",
                    "Anti-cheat integrado avanzado",
                    "Base de datos SQLite",
                    "API para otros desarrolladores",
                    "Dashboard de estadísticas",
                    "Soporte prioritario 24/7"
                ],
                recommended: false
            },
            ultimate: {
                name: "Knockback Ultimate",
                price: 150,
                features: [
                    "Todo lo de Pro +",
                    "Soporte MySQL completo",
                    "Web panel administrativo",
                    "Sistema de rangos avanzado",
                    "Integración con economía",
                    "Soporte multi-servidor",
                    "Configuración en tiempo real",
                    "Updates de por vida GRATIS"
                ],
                recommended: false
            }
        }
    },
    
    skywars: {
        name: "Skywars Arena",
        description: "El minijuego Skywars más completo para PocketMine con múltiples arenas, kits personalizables y sistema de estadísticas avanzado.",
        videoId: "dQw4w9WgXcQ", // Placeholder
        tiktokUrl: "@tuusuario/video/789012",
        compatibility: {
            pocketmine: "5.0.0+",
            php: "8.0+",
            mcbe: "Todas las versiones"
        },
        images: [
            "https://via.placeholder.com/600x300/45b7d1/ffffff?text=SKYWARS+ARENA+1",
            "https://via.placeholder.com/600x300/4ecdc4/ffffff?text=SKYWARS+COMBAT+2",
            "https://via.placeholder.com/600x300/96ceb4/ffffff?text=SKYWARS+LOBBY+3",
            "https://via.placeholder.com/600x300/ffeaa7/333333?text=SKYWARS+KITS+4",
            "https://via.placeholder.com/600x300/ff6b6b/ffffff?text=SKYWARS+STATS+5"
        ],
        versions: {
            basic: {
                name: "Skywars Basic",
                price: 35,
                features: [
                    "Sistema básico de Skywars",
                    "3 mapas incluidos",
                    "Kits básicos (5 kits)",
                    "Sistema de eliminación",
                    "Comandos esenciales",
                    "Soporte básico"
                ],
                recommended: false
            },
            advanced: {
                name: "Skywars Advanced",
                price: 60,
                features: [
                    "Todo lo de Basic +",
                    "8 mapas únicos incluidos",
                    "12 kits personalizables",
                    "Sistema de estadísticas completo",
                    "Recompensas automáticas",
                    "Integración con economía",
                    "Soporte prioritario"
                ],
                recommended: true
            }
        }
    }
};

// ==========================================
//    VARIABLES DEL CARRUSEL
// ==========================================
let currentSlide = 0;
let totalSlides = 0;
let carouselInterval;

// ==========================================
//    FUNCIONES PRINCIPALES DEL MODAL
// ==========================================

function openPluginModal(pluginKey) {
    const plugin = PLUGINS_DATA[pluginKey];
    if (!plugin) {
        console.error("Plugin not found:", pluginKey);
        return;
    }

    const modal = document.getElementById('pluginModal');
    const modalBody = document.getElementById('modalBody');

    // Generar el contenido del modal principal con las versiones
    modalBody.innerHTML = generateModalContent(pluginKey, plugin);
    
    // Asignar evento de cierre a la "X" del primer modal
    const closeBtn = document.querySelector('#pluginModal .close');
    closeBtn.onclick = closePluginModal;

    // Mostrar modal con animación
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';

    // Inicializar efectos del modal
    initializeModalEffects();
}

function closePluginModal() {
    const modal = document.getElementById('pluginModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// ==========================================
//    GENERADOR DE CONTENIDO DEL MODAL PRINCIPAL
// ==========================================

function generateModalContent(pluginKey, plugin) {
    const versionsHtml = generateVersionsGrid(pluginKey, plugin.versions);
    
    return `
        <div class="modal-header">
            <h2 class="modal-plugin-title">${plugin.name}</h2>
            <p class="modal-plugin-desc">${plugin.description}</p>
        </div>
        <div class="version-selection">
            <h3 style="text-align: center; color: #4ecdc4; margin-bottom: 30px; font-size: 1.5rem;">
                🚀 Elige la Versión Perfecta para Tu Servidor
            </h3>
            <div class="version-grid">
                ${versionsHtml}
            </div>
        </div>
        <button class="close close-btn" onclick="closePluginModal()">✖</button>
    `;
}

function generateVersionsGrid(pluginKey, versions) {
    let html = '';
    
    Object.entries(versions).forEach(([versionKey, version]) => {
        const recommendedClass = version.recommended ? 'recommended' : '';
        const featuresHtml = version.features.map(feature => 
            `<li>${feature}</li>`
        ).join('');

        html += `
            <div class="version-card ${recommendedClass}">
                <div class="version-name">${version.name}</div>
                <div class="version-price">$${version.price} USD</div>
                <ul class="version-features">
                    ${featuresHtml}
                </ul>
                <button class="version-btn" onclick="openDetailsModal('${pluginKey}', '${versionKey}')">
                    Ver Detalles
                </button>
            </div>
        `;
    });

    return html;
}

// ==========================================
//    FUNCIONES DEL MODAL DE DETALLES CON CARRUSEL
// ==========================================

function openDetailsModal(pluginKey, versionKey) {
    const plugin = PLUGINS_DATA[pluginKey];
    if (!plugin) return;
    
    const version = plugin.versions[versionKey];
    if (!version) return;

    const modal = document.getElementById('detailsModal');
    const modalBody = document.getElementById('detailsModalBody');

    // Generar el contenido del modal de detalles
    modalBody.innerHTML = generateDetailsContent(plugin, version);
    
    // Ocultar el primer modal y mostrar el segundo
    document.getElementById('pluginModal').style.display = 'none';
    modal.style.display = 'flex';

    // Inicializar el carrusel
    initializeCarousel();
}

function closeDetailsModal() {
    const modal = document.getElementById('detailsModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    
    // Limpiar el carrusel
    clearInterval(carouselInterval);
}

function generateDetailsContent(plugin, version) {
    const carouselHtml = generateCarousel(plugin);
    const featuresList = version.features.map(f => 
        `<li>✓ ${f}</li>`
    ).join('');
    
    const compatibilityHtml = Object.entries(plugin.compatibility).map(([key, value]) =>
        `<p>${key.toUpperCase()}: ${value}</p>`
    ).join('');

    return `
        <h2 class="modal-title">${plugin.name} - ${version.name}</h2>
        <div class="details-grid-container">
            <div class="details-media-column">
                ${carouselHtml}
            </div>
            <div class="details-info-card">
                <div class="details-price-box">
                    <span>Precio</span>
                    <span class="price-amount">$${version.price} USD</span>
                </div>
                <div class="details-features-box">
                    <h3>Lo que obtienes:</h3>
                    <ul class="features-list-box">
                        ${featuresList}
                    </ul>
                </div>
                <div class="compatibility-box">
                    <h3>Compatibilidad</h3>
                    ${compatibilityHtml}
                </div>
            </div>
        </div>
        <div class="buy-button-container">
            <button class="buy-btn" onclick="handlePurchase('${plugin.name}', '${version.name}', ${version.price})">
                Comprar Ahora con PayPal
            </button>
        </div>
        <button class="close close-btn" onclick="closeDetailsModal()">✖</button>
    `;
}

function generateCarousel(plugin) {
    // Crear items del carrusel (video + imágenes)
    let carouselItems = '';
    
    // Agregar video primero
    carouselItems += `
        <div class="carousel-item video-item">
            <div class="content-label">📺 VIDEO</div>
            <iframe 
                src="https://www.youtube.com/embed/${plugin.videoId}?autoplay=0" 
                frameborder="0" 
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowfullscreen>
            </iframe>
        </div>
    `;
    
    // Agregar imágenes
    plugin.images.forEach((img, index) => {
        carouselItems += `
            <div class="carousel-item image-item">
                <div class="content-label">🖼️ IMAGEN ${index + 1}</div>
                <img src="${img}" alt="Preview ${index + 1}">
            </div>
        `;
    });

    // Crear indicadores
    const totalItems = 1 + plugin.images.length; // 1 video + imágenes
    let indicators = '';
    for (let i = 0; i < totalItems; i++) {
        indicators += `
            <div class="carousel-indicator ${i === 0 ? 'active' : ''}" onclick="goToSlide(${i})"></div>
        `;
    }

    return `
        <div class="media-carousel">
            <div class="carousel-container" id="carouselContainer">
                ${carouselItems}
            </div>
            <button class="carousel-nav prev" onclick="prevSlide()">‹</button>
            <button class="carousel-nav next" onclick="nextSlide()">›</button>
            <div class="carousel-indicators">
                ${indicators}
            </div>
        </div>
    `;
}

// ==========================================
//    FUNCIONES DEL CARRUSEL
// ==========================================

function initializeCarousel() {
    currentSlide = 0;
    totalSlides = document.querySelectorAll('.carousel-item').length;
    
    // Auto-play cada 5 segundos
    carouselInterval = setInterval(nextSlide, 5000);
    
    // Pausar auto-play al hover
    const carousel = document.querySelector('.media-carousel');
    if (carousel) {
        carousel.addEventListener('mouseenter', () => clearInterval(carouselInterval));
        carousel.addEventListener('mouseleave', () => {
            carouselInterval = setInterval(nextSlide, 5000);
        });
    }
}

function updateCarousel() {
    const container = document.getElementById('carouselContainer');
    const indicators = document.querySelectorAll('.carousel-indicator');
    
    if (container) {
        container.style.transform = `translateX(-${currentSlide * 100}%)`;
    }
    
    // Actualizar indicadores
    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentSlide);
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateCarousel();
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateCarousel();
}

function goToSlide(slideIndex) {
    currentSlide = slideIndex;
    updateCarousel();
    
    // Reiniciar auto-play
    clearInterval(carouselInterval);
    carouselInterval = setInterval(nextSlide, 5000);
}

// ==========================================
//    FUNCIONALIDAD DE BÚSQUEDA
// ==========================================

function filterPlugins() {
    const input = document.getElementById('pluginSearch').value.toLowerCase();
    const pluginCards = document.querySelectorAll('.plugin-card');

    pluginCards.forEach(card => {
        const pluginName = card.querySelector('.plugin-name').textContent.toLowerCase();
        const pluginDescription = card.querySelector('.plugin-description').textContent.toLowerCase();
        
        if (pluginName.includes(input) || pluginDescription.includes(input)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// ==========================================
//    FUNCIONES DE INTERACCIÓN Y COMPRA
// ==========================================

function handlePurchase(pluginName, versionName, price) {
    // Cerrar modal de detalles
    closeDetailsModal();

    // Mostrar modal de confirmación
    const confirmDiv = document.createElement('div');
    confirmDiv.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.8);
        backdrop-filter: blur(5px);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 20000;
        animation: fadeIn 0.3s ease-out;
    `;
    
    confirmDiv.innerHTML = `
        <div style="
            background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
            color: white;
            padding: 30px 40px;
            border-radius: 20px;
            text-align: center;
            box-shadow: 0 25px 50px rgba(0,0,0,0.5);
            animation: slideInModal 0.4s ease-out;
        ">
            <h3 style="margin: 0 0 15px 0;">🚀 ¡Genial Elección!</h3>
            <p style="margin: 0 0 20px 0;">Plugin: ${pluginName}</p>
            <p style="margin: 0 0 20px 0;">Versión: ${versionName}</p>
            <p style="margin: 0 0 20px 0; font-size: 1.5rem; font-weight: bold;">$${price} USD</p>
            <div style="display: flex; gap: 15px; justify-content: center;">
                <button onclick="proceedToPayment(${price})" style="
                    padding: 10px 20px;
                    border: none;
                    border-radius: 25px;
                    background: white;
                    color: #333;
                    font-weight: bold;
                    cursor: pointer;
                ">💳 Proceder al Pago</button>
                <button onclick="this.parentElement.parentElement.parentElement.remove()" style="
                    padding: 10px 20px;
                    border: 2px solid white;
                    border-radius: 25px;
                    background: transparent;
                    color: white;
                    font-weight: bold;
                    cursor: pointer;
                ">❌ Cancelar</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(confirmDiv);
}

function proceedToPayment(price) {
    const paypalMeLink = `https://paypal.me/tuusuario/${price}`;
    window.open(paypalMeLink, '_blank');
}

// ==========================================
//    EFECTOS Y ANIMACIONES DEL MODAL
// ==========================================

function initializeModalEffects() {
    const versionCards = document.querySelectorAll('.version-card');
    versionCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s ease-out';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });

    versionCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// ==========================================
//    EVENTOS GLOBALES
// ==========================================

// Cerrar modal con Escape
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const detailsModal = document.getElementById('detailsModal');
        const pluginModal = document.getElementById('pluginModal');
        
        if (detailsModal.style.display === 'flex') {
            closeDetailsModal();
        } else if (pluginModal.style.display === 'flex') {
            closePluginModal();
        }
    }
});

// Cerrar modal al hacer click fuera
document.addEventListener('click', function(e) {
    const pluginModal = document.getElementById('pluginModal');
    const detailsModal = document.getElementById('detailsModal');
    
    if (e.target === pluginModal) {
        closePluginModal();
    }
    if (e.target === detailsModal) {
        closeDetailsModal();
    }
});

// Control del carrusel con teclado
document.addEventListener('keydown', function(e) {
    if (document.getElementById('detailsModal').style.display === 'flex') {
        if (e.key === 'ArrowRight') nextSlide();
        if (e.key === 'ArrowLeft') prevSlide();
    }
});

// ==========================================
//    INICIALIZACIÓN DE LA PÁGINA
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    initializePluginsPage();
});

function initializePluginsPage() {
    const pluginCards = document.querySelectorAll('.plugin-card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'slideUpCard 0.8s ease-out forwards';
            }
        });
    }, { threshold: 0.1 });

    pluginCards.forEach(card => observer.observe(card));

    pluginCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}