// ==========================================
//   INICIALIZACIÓN DEL SITIO
// ==========================================
document.addEventListener('DOMContentLoaded', function() {
    initializeStars();
    initializeParticles();
    initializeSmoothScrolling();
    initializeParallaxEffects();
    initializeAnimationObserver();
    initializeMobileMenu();
});

// ==========================================
//   GENERACIÓN DE ESTRELLAS
// ==========================================
function initializeStars() {
    const starsContainer = document.getElementById('stars');
    const numStars = window.innerWidth > 768 ? 150 : 100; // Menos estrellas en móvil

    // Limpiar estrellas existentes
    starsContainer.innerHTML = '';

    for (let i = 0; i < numStars; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        
        // Posición aleatoria
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        
        // Tamaño aleatorio
        const size = Math.random() * 3 + 1;
        star.style.width = size + 'px';
        star.style.height = size + 'px';
        
        // Duración de animación aleatoria
        star.style.animationDuration = (Math.random() * 3 + 2) + 's';
        
        starsContainer.appendChild(star);
    }
}

// ==========================================
//   PARTÍCULAS FLOTANTES
// ==========================================
function initializeParticles() {
    createParticles();
    
    // Crear nuevas partículas periódicamente
    setInterval(createParticles, 3000);
}

function createParticles() {
    const maxParticles = window.innerWidth > 768 ? 5 : 3;
    const currentParticles = document.querySelectorAll('.particle').length;
    
    if (currentParticles < maxParticles) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Posición y tamaño aleatorio
        particle.style.left = Math.random() * 100 + '%';
        const size = Math.random() * 6 + 2;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        // Duración aleatoria
        particle.style.animationDuration = (Math.random() * 5 + 5) + 's';
        
        document.body.appendChild(particle);

        // Eliminar después de la animación
        setTimeout(() => {
            if (particle.parentNode) {
                particle.remove();
            }
        }, 12000);
    }
}

// ==========================================
//   SCROLL SUAVE
// ==========================================
function initializeSmoothScrolling() {
    const anchors = document.querySelectorAll('a[href^="#"]');
    
    anchors.forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ==========================================
//   EFECTOS PARALLAX
// ==========================================
function initializeParallaxEffects() {
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        const features = document.querySelector('.features');
        
        if (hero) {
            const rate = scrolled * -0.5;
            hero.style.transform = `translateY(${rate}px)`;
        }
        
        if (features) {
            const rate = (scrolled - features.offsetTop) * 0.1;
            features.style.transform = `translateY(${rate}px)`;
        }
        
        ticking = false;
    }
    
    function requestParallax() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }
    
    // Solo activar parallax en pantallas grandes
    if (window.innerWidth > 768) {
        window.addEventListener('scroll', requestParallax);
    }
}

// ==========================================
//   OBSERVER PARA ANIMACIONES
// ==========================================
function initializeAnimationObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'slideUp 0.8s ease-out forwards';
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observar cards de características
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        observer.observe(card);
    });
}

// ==========================================
//   MENÚ MÓVIL
// ==========================================
function initializeMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            this.classList.toggle('active');
        });
        
        // Cerrar menú al hacer click en un enlace
        const menuLinks = navLinks.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
            });
        });
    }
}

// ==========================================
//   EFECTOS DEL HEADER AL SCROLL
// ==========================================
function initializeHeaderEffects() {
    const header = document.querySelector('.header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Cambiar opacidad del header basado en scroll
        if (scrollTop > 100) {
            header.style.background = 'rgba(0, 0, 0, 0.95)';
            header.style.backdropFilter = 'blur(20px)';
        } else {
            header.style.background = 'rgba(0, 0, 0, 0.8)';
            header.style.backdropFilter = 'blur(10px)';
        }
        
        // Ocultar/mostrar header al hacer scroll
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            // Scrolling down
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    }, false);
}

// ==========================================
//   EFECTOS DE CURSOR (Solo PC)
// ==========================================
function initializeCursorEffects() {
    if (window.innerWidth > 768) {
        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        cursor.innerHTML = '<div class="cursor-inner"></div>';
        document.body.appendChild(cursor);
        
        document.addEventListener('mousemove', function(e) {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });
        
        // Efecto hover en botones
        const interactiveElements = document.querySelectorAll('a, button, .feature-card');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.classList.add('hover');
            });
            
            el.addEventListener('mouseleave', () => {
                cursor.classList.remove('hover');
            });
        });
    }
}

// ==========================================
//   OPTIMIZACIÓN DE RENDIMIENTO
// ==========================================
function optimizePerformance() {
    // Reducir animaciones en dispositivos de bajo rendimiento
    const isLowPerformanceDevice = navigator.hardwareConcurrency < 4 || 
                                   window.innerWidth < 768 ||
                                   navigator.connection?.effectiveType === 'slow-2g';
    
    if (isLowPerformanceDevice) {
        document.body.classList.add('low-performance');
        
        // Reducir número de partículas
        clearInterval(particleInterval);
        
        // Desactivar algunas animaciones complejas
        const nebulas = document.querySelectorAll('.nebula');
        nebulas.forEach(nebula => {
            nebula.style.display = 'none';
        });
    }
}

// ==========================================
//   MANEJO DE ERRORES
// ==========================================
function handleErrors() {
    window.addEventListener('error', function(e) {
        console.warn('Error en el sitio:', e.message);
        
        // Fallback para funcionalidad crítica
        const criticalElements = document.querySelectorAll('.cta-btn');
        criticalElements.forEach(btn => {
            if (!btn.href) {
                btn.style.cursor = 'not-allowed';
                btn.style.opacity = '0.5';
            }
        });
    });
}

// ==========================================
//   UTILS Y HELPERS
// ==========================================
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// ==========================================
//   ANIMACIONES DE ENTRADA
// ==========================================
function initializeEntryAnimations() {
    const animatedElements = document.querySelectorAll('.hero-title, .hero-subtitle, .hero-description, .cta-buttons');
    
    animatedElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(50px)';
        element.style.animation = `slideUp 1s ease-out ${index * 0.2}s forwards`;
    });
}

// ==========================================
//   EVENTOS GLOBALES
// ==========================================
let particleInterval;

// Inicializar efectos adicionales
document.addEventListener('DOMContentLoaded', function() {
    initializeHeaderEffects();
    initializeCursorEffects();
    optimizePerformance();
    handleErrors();
    initializeEntryAnimations();
});

// Manejar redimensionado de ventana
window.addEventListener('resize', debounce(function() {
    initializeStars(); // Regenerar estrellas para nueva resolución
    optimizePerformance(); // Re-evaluar rendimiento
}, 250));

// ==========================================
//   EASTER EGGS Y EFECTOS ESPECIALES
// ==========================================
function initializeEasterEggs() {
    // Konami Code
    const konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
    let konamiIndex = 0;
    
    document.addEventListener('keydown', function(e) {
        if (e.keyCode === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                activateSecretMode();
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });
}

function activateSecretMode() {
    // Modo secreto con efectos extra
    document.body.classList.add('secret-mode');
    
    // Crear explosión de partículas
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            createParticles();
        }, i * 50);
    }
    
    // Cambiar colores temporalmente
    const style = document.createElement('style');
    style.innerHTML = `
        .secret-mode .hero-title {
            animation: rainbow 2s linear infinite !important;
        }
        
        @keyframes rainbow {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
    
    // Mostrar mensaje
    const message = document.createElement('div');
    message.innerHTML = '🚀 ¡MODO SECRETO ACTIVADO! 🚀';
    message.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
        color: white;
        padding: 20px 40px;
        border-radius: 50px;
        font-size: 1.5rem;
        font-weight: bold;
        z-index: 10000;
        animation: slideUp 0.5s ease-out;
    `;
    document.body.appendChild(message);
    
    setTimeout(() => {
        message.remove();
        document.body.classList.remove('secret-mode');
        style.remove();
    }, 3000);
}

// Activar easter eggs
document.addEventListener('DOMContentLoaded', initializeEasterEggs);