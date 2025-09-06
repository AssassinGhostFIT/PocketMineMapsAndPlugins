// ==========================================
//   DATABASE DE PLUGINS CON VERSIONES
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
            "https://via.placeholder.com/600x300/96ceb4/ffffff?text=KNOCKBACK+PREVIEW+3"
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
            "https://via.placeholder.com/600x300/4ecdc4/ffffff?text=SKYWARS+COMBAT+2"
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
//   FUNCIONES PRINCIPALES DEL MODAL
// ==========================================

function openPluginModal(pluginKey) {
    const plugin = PLUGINS_DATA[pluginKey];
    if (!plugin) return;

    const modal = document.getElementById('pluginModal');
    const modalBody = document.getElementById('modalBody');

    // Generar contenido del modal
    modalBody.innerHTML = generateModalContent(plugin);

    // Mostrar modal con animación
    modal.style.display = 'block';
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
//   GENERADOR DE CONTENIDO DEL MODAL
// ==========================================

function generateModalContent(plugin) {
    const versionsHtml = generateVersionsGrid(plugin.versions);
    const detailsHtml = generatePluginDetails(plugin);
    const mediaHtml = generateMediaSection(plugin);

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

        ${detailsHtml}
        ${mediaHtml}
    `;
}

function generateVersionsGrid(versions) {
    let html = '';
    
    Object.entries(versions).forEach(([key, version]) => {
        const recommendedClass = version.recommended ? 'recommended' : '';
        const featuresHtml = version.features.map(feature => 
            `<li>${feature}</li>`
        ).join('');

        html += `
            <div class="version-card ${recommendedClass}" onclick="selectVersion('${key}', ${version.price})">
                <div class="version-name">${version.name}</div>
                <div class="version-price">$${version.price} USD</div>
                <ul class="version-features">
                    ${featuresHtml}
                </ul>
                <button class="version-btn">
                    Comprar Ahora
                </button>
            </div>
        `;
    });

    return html;
}

function generatePluginDetails(plugin) {
    const compatibilityBadges = Object.entries(plugin.compatibility).map(([key, value]) => 
        `<span class="compatibility-badge">${key.toUpperCase()}: ${value}</span>`
    ).join('');

    return `
        <div class="plugin-details">
            <div class="details-grid">
                <div class="detail-section">
                    <h4>✨ Características Principales</h4>
                    <p>Este plugin ha sido desarrollado con las últimas tecnologías y optimizado para máximo rendimiento.</p>
                    <p>Incluye sistema anti-lag, configuraciones flexibles y soporte completo para multijugador.</p>
                    
                    <h4 style="margin-top: 20px;">🛡️ Compatibilidad</h4>
                    <div class="compatibility-badges">
                        ${compatibilityBadges}
                    </div>
                </div>
                
                <div class="detail-section">
                    <h4>📞 Soporte Incluido</h4>
                    <p>• Discord 24/7 con respuesta rápida</p>
                    <p>• Instalación guiada paso a paso</p>
                    <p>• Configuración personalizada</p>
                    <p>• Updates y parches gratis</p>
                    
                    <h4 style="margin-top: 20px;">⚡ Garantías</h4>
                    <p>• 30 días de garantía completa</p>
                    <p>• Reembolso si no funciona</p>
                    <p>• Soporte técnico de por vida</p>
                </div>
            </div>
        </div>
    `;
}

function generateMediaSection(plugin) {
    const imagesHtml = plugin.images.map((img, index) => 
        `<img src="${img}" alt="Preview ${index + 1}" style="width: 100%; max-width: 300px; margin: 10px; border-radius: 10px; border: 1px solid rgba(78, 205, 196, 0.3);">`
    ).join('');

    return `
        <div class="plugin-media" style="margin-top: 40px; padding-top: 30px; border-top: 1px solid rgba(78, 205, 196, 0.3);">
            <h4 style="text-align: center; color: #4ecdc4; margin-bottom: 20px; font-size: 1.3rem;">
                🎥 Vista Previa del Plugin
            </h4>
            
            <div class="video-preview">
                <div class="video-placeholder">
                    <p>📺 Video demostrativo disponible</p>
                    <p style="font-size: 0.9rem; margin-top: 10px;">YouTube ID: ${plugin.videoId}</p>
                    <p style="font-size: 0.9rem;">TikTok: ${plugin.tiktokUrl}</p>
                </div>
            </div>

            <div style="text-align: center; margin-top: 20px;">
                <h5 style="color: #4ecdc4; margin-bottom: 15px;">📸 Capturas de Pantalla</h5>
                <div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 10px;">
                    ${imagesHtml}
                </div>
            </div>
        </div>
    `;
}

// ==========================================
//   FUNCIONES DE INTERACCIÓN
// ==========================================

function selectVersion(versionKey, price) {
    // Efecto visual al seleccionar
    const cards = document.querySelectorAll('.version-card');
    cards.forEach(card => card.style.transform = 'scale(0.95)');
    
    setTimeout(() => {
        cards.forEach(card => card.style.transform = 'scale(1)');
    }, 150);

    // Aquí iría la integración con PayPal/Gumroad
    handlePurchase(versionKey, price);
}

function handlePurchase(versionKey, price) {
    // Mostrar confirmación con estilo
    const confirmDiv = document.createElement('div');
    confirmDiv.innerHTML = `
        <div style="
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
            color: white;
            padding: 30px 40px;
            border-radius: 20px;
            text-align: center;
            z-index: 20000;
            box-shadow: 0 25px 50px rgba(0,0,0,0.5);
            animation: slideInModal 0.4s ease-out;
        ">
            <h3 style="margin: 0 0 15px 0;">🚀 ¡Genial Elección!</h3>
            <p style="margin: 0 0 20px 0;">Versión: ${versionKey.toUpperCase()}</p>
            <p style="margin: 0 0 20px 0; font-size: 1.5rem; font-weight: bold;">$${price} USD</p>
            <div style="display: flex; gap: 15px;">
                <button onclick="proceedToPayment('${versionKey}', ${price})" style="
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

function proceedToPayment(versionKey, price) {
    // Aquí integrarías con PayPal, Gumroad, etc.
    alert(`🔄 Redirigiendo a PayPal para pagar $${price} USD por ${versionKey.toUpperCase()}\n\n(Esta sería la integración real con tu pasarela de pago)`);
    
    // Ejemplo de URL de PayPal
    // window.open(`https://paypal.me/tuusuario/${price}`);
    
    // O para Gumroad:
    // window.open(`https://gumroad.com/l/knockback-${versionKey}`);
}

// ==========================================
//   EFECTOS Y ANIMACIONES DEL MODAL
// ==========================================

function initializeModalEffects() {
    // Animación de entrada para las cards de versiones
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

    // Efecto hover mejorado para las cards
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
//   EVENTOS GLOBALES
// ==========================================

// Cerrar modal con Escape
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closePluginModal();
    }
});

// Cerrar modal al hacer click fuera
document.addEventListener('click', function(e) {
    const modal = document.getElementById('pluginModal');
    if (e.target === modal) {
        closePluginModal();
    }
});

// ==========================================
//   INICIALIZACIÓN DE LA PÁGINA
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar efectos de la página de plugins
    initializePluginsPage();
});

function initializePluginsPage() {
    // Animación de entrada para las cards principales
    const pluginCards = document.querySelectorAll('.plugin-card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'slideUpCard 0.8s ease-out forwards';
            }
        });
    }, { threshold: 0.1 });

    pluginCards.forEach(card => observer.observe(card));

    // Efecto de hover mejorado para cards principales
    pluginCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}