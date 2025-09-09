// ==========================================
//   SECURE ADMIN PANEL - JAVASCRIPT COMPLETO REAL
// ==========================================

// Configuración de seguridad REAL
const SECURE_CONFIG = {
    adminEmail: 'brayanhernandez385@gmail.com',
    adminPassword: '202016', // Contraseña REAL actualizada
    sessionTimeout: 24 * 60 * 60 * 1000, // 24 horas
    maxLoginAttempts: 3,
    lockoutTime: 15 * 60 * 1000 // 15 minutos de bloqueo
};

// Datos REALES de plugins (sincronizado con la web principal)
let REAL_PLUGINS_DATA = {
    knockback: {
        name: "Knockback System",
        description: "Sistema de knockback revolucionario con efectos cinematográficos, partículas épicas y anti-cheat integrado. Compatible con PocketMine 5.0.0+",
        videoId: "dQw4w9WgXcQ",
        tiktokUrl: "@tuusuario/video/123456",
        status: "active",
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
        videoId: "dQw4w9WgXcQ",
        tiktokUrl: "@tuusuario/video/789012",
        status: "development",
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

// Temas REALES disponibles
const REAL_THEMES = {
    cosmic: {
        name: "Cósmico",
        colors: {
            primary: "#4ecdc4",
            secondary: "#ff6b6b",
            accent: "#45b7d1",
            background: "#0a0a0a"
        }
    },
    halloween: {
        name: "Halloween",
        colors: {
            primary: "#ff6600",
            secondary: "#ff9500",
            accent: "#cc4400",
            background: "#1a0a00"
        }
    },
    christmas: {
        name: "Navidad",
        colors: {
            primary: "#c41e3a",
            secondary: "#2e8b57",
            accent: "#ffd700",
            background: "#0f1a0f"
        }
    },
    summer: {
        name: "Verano",
        colors: {
            primary: "#00bfff",
            secondary: "#ffd700",
            accent: "#ff6347",
            background: "#001122"
        }
    }
};

// Variables globales REALES
let currentLoginAttempts = 0;
let isLocked = false;
let currentUserData = {};
let realSalesData = [];
let realUsersData = [];

// ==========================================
//   SISTEMA DE AUTENTICACIÓN REAL
// ==========================================

function initializeSecureLogin() {
    // Verificar si está bloqueado
    checkLockoutStatus();
    
    const form = document.getElementById('secureLoginForm');
    const emailInput = document.getElementById('adminEmail');
    const passwordInput = document.getElementById('adminPassword');
    const accessStatus = document.getElementById('accessStatus');
    const secureBtn = form.querySelector('.secure-btn');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (isLocked) {
            showSecureStatus('❌ Cuenta bloqueada temporalmente. Intente más tarde.', 'error');
            return;
        }
        
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        // Mostrar estado de autenticación
        secureBtn.classList.add('loading');
        accessStatus.className = 'access-status';
        accessStatus.textContent = '';

        // Log de intento de acceso (REAL)
        logSecurityEvent('login_attempt', email);

        // Autenticación REAL
        setTimeout(() => {
            if (authenticateUser(email, password)) {
                // Login exitoso REAL
                accessStatus.className = 'access-status success';
                accessStatus.textContent = '✅ Acceso autorizado. Iniciando sistema...';
                
                // Guardar sesión REAL
                saveSecureSession(email);
                
                // Log de acceso exitoso
                logSecurityEvent('login_success', email);
                
                // Reset intentos
                currentLoginAttempts = 0;
                localStorage.removeItem('secureLoginAttempts');
                
                // Redireccionar
                setTimeout(() => {
                    window.location.href = 'control.html';
                }, 1500);
            } else {
                // Login fallido REAL
                handleFailedLogin();
                accessStatus.className = 'access-status error';
                accessStatus.textContent = `❌ Credenciales incorrectas. Intentos restantes: ${SECURE_CONFIG.maxLoginAttempts - currentLoginAttempts}`;
                secureBtn.classList.remove('loading');
                
                // Log de acceso fallido
                logSecurityEvent('login_failed', email);
                
                // Limpiar formulario
                setTimeout(() => {
                    passwordInput.value = '';
                    if (!isLocked) {
                        accessStatus.className = 'access-status';
                        accessStatus.textContent = '';
                    }
                }, 3000);
            }
        }, 1500);
    });
}

function authenticateUser(email, password) {
    return email === SECURE_CONFIG.adminEmail && password === SECURE_CONFIG.adminPassword;
}

function handleFailedLogin() {
    currentLoginAttempts++;
    localStorage.setItem('secureLoginAttempts', currentLoginAttempts.toString());
    
    if (currentLoginAttempts >= SECURE_CONFIG.maxLoginAttempts) {
        lockAccount();
    }
}

function lockAccount() {
    isLocked = true;
    const lockTime = Date.now() + SECURE_CONFIG.lockoutTime;
    localStorage.setItem('secureAccountLocked', lockTime.toString());
    
    logSecurityEvent('account_locked', 'system');
    showSecureStatus('🔒 Cuenta bloqueada por múltiples intentos fallidos', 'error');
}

function checkLockoutStatus() {
    const lockTime = localStorage.getItem('secureAccountLocked');
    currentLoginAttempts = parseInt(localStorage.getItem('secureLoginAttempts') || '0');
    
    if (lockTime && Date.now() < parseInt(lockTime)) {
        isLocked = true;
        const timeLeft = Math.ceil((parseInt(lockTime) - Date.now()) / 60000);
        showSecureStatus(`🔒 Cuenta bloqueada. Tiempo restante: ${timeLeft} minutos`, 'error');
    } else if (lockTime) {
        // Desbloquear cuenta
        localStorage.removeItem('secureAccountLocked');
        localStorage.removeItem('secureLoginAttempts');
        currentLoginAttempts = 0;
        isLocked = false;
    }
}

function saveSecureSession(email) {
    const sessionData = {
        authenticated: true,
        email: email,
        loginTime: Date.now(),
        sessionId: generateSessionId()
    };
    
    localStorage.setItem('secureAdminAuth', 'authenticated');
    localStorage.setItem('secureAdminSession', JSON.stringify(sessionData));
    
    currentUserData = sessionData;
}

function generateSessionId() {
    return 'secure_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

function secureLogout() {
    // Log del logout
    logSecurityEvent('logout', currentUserData.email || 'admin');
    
    // Limpiar sesión REAL
    localStorage.removeItem('secureAdminAuth');
    localStorage.removeItem('secureAdminSession');
    localStorage.removeItem('secureLoginAttempts');
    
    showSecureNotification('Sesión cerrada de forma segura', 'success');
    
    setTimeout(() => {
        window.location.href = 'access.html';
    }, 1000);
}

function checkSecureSession() {
    const authenticated = localStorage.getItem('secureAdminAuth');
    const sessionData = localStorage.getItem('secureAdminSession');
    
    if (!authenticated || !sessionData) {
        window.location.href = 'access.html';
        return false;
    }
    
    try {
        const session = JSON.parse(sessionData);
        const currentTime = Date.now();
        const timeDiff = currentTime - session.loginTime;
        
        if (timeDiff > SECURE_CONFIG.sessionTimeout) {
            showSecureNotification('Sesión expirada por inactividad', 'warning');
            secureLogout();
            return false;
        }
        
        currentUserData = session;
        return true;
    } catch (e) {
        secureLogout();
        return false;
    }
}

// ==========================================
//   SISTEMA DE DASHBOARD REAL
// ==========================================

function initializeSecureSystem() {
    if (!checkSecureSession()) return;
    
    loadRealPluginsData();
    initializeSecureMenu();
    showSecureSection('dashboard');
    updateRealStats();
    loadCurrentSecureTheme();
    setupRealAutoSave();
    initializeSecurityWatermark();
}

function loadRealPluginsData() {
    // Cargar datos reales desde localStorage
    const savedData = localStorage.getItem('realAdminPluginsData');
    if (savedData) {
        try {
            REAL_PLUGINS_DATA = { ...REAL_PLUGINS_DATA, ...JSON.parse(savedData) };
        } catch (e) {
            console.warn('Error loading saved plugins data');
        }
    }
    
    // Sincronizar con la web principal REAL
    syncWithMainSite();
}

function syncWithMainSite() {
    // Actualizar los datos de plugins en la web principal
    const mainSiteData = {
        PLUGINS_DATA: REAL_PLUGINS_DATA,
        lastUpdate: Date.now(),
        updatedBy: currentUserData.email
    };
    
    localStorage.setItem('mainSitePluginsData', JSON.stringify(mainSiteData));
    
    // Aplicar tema actual si existe
    const currentTheme = localStorage.getItem('currentSecureTheme');
    const themeColors = localStorage.getItem('secureThemeColors');
    
    if (currentTheme && themeColors) {
        localStorage.setItem('mainSiteCurrentTheme', currentTheme);
        localStorage.setItem('mainSiteThemeColors', themeColors);
    }
}

function initializeSecureMenu() {
    const menuItems = document.querySelectorAll('.secure-menu-item');
    
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            const section = this.dataset.section;
            showSecureSection(section);
            
            // Actualizar estado activo
            menuItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
            
            // Actualizar título
            const pageTitle = document.getElementById('securePageTitle');
            const sectionTitles = {
                dashboard: 'Panel de Control Principal',
                content: 'Gestión de Plugins',
                media: 'Gestión de Mapas',
                users: 'Base de Usuarios',
                commerce: 'Sistema Comercial',
                appearance: 'Control de Apariencia',
                analytics: 'Análisis Avanzado',
                system: 'Configuración del Sistema'
            };
            
            if (pageTitle) {
                pageTitle.textContent = sectionTitles[section] || 'Sistema Administrativo';
            }
        });
    });
}

function showSecureSection(sectionId) {
    // Ocultar todas las secciones
    const sections = document.querySelectorAll('.secure-section');
    sections.forEach(section => section.classList.remove('active'));
    
    // Mostrar sección seleccionada
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
        
        // Log de navegación
        logSecurityEvent('navigation', sectionId);
        
        // Inicializar funcionalidad específica REAL
        switch(sectionId) {
            case 'content':
                loadRealContentManagement();
                break;
            case 'appearance':
                loadRealThemeManagement();
                break;
            case 'users':
                loadRealUsersManagement();
                break;
            case 'analytics':
                loadRealAnalytics();
                break;
            case 'dashboard':
                updateRealStats();
                break;
        }
    }
}

function toggleSecureSidebar() {
    const sidebar = document.getElementById('secureSidebar');
    if (sidebar) {
        sidebar.classList.toggle('open');
    }
}

// ==========================================
//   GESTIÓN REAL DE PLUGINS
// ==========================================

function loadRealContentManagement() {
    updateRealPluginCards();
}

function updateRealPluginCards() {
    Object.keys(REAL_PLUGINS_DATA).forEach(pluginKey => {
        const card = document.querySelector(`[data-content="${pluginKey}"]`);
        if (card) {
            const plugin = REAL_PLUGINS_DATA[pluginKey];
            const versionsCount = Object.keys(plugin.versions).length;
            const minPrice = Math.min(...Object.values(plugin.versions).map(v => v.price));
            
            // Actualizar estadísticas REALES
            const stats = card.querySelectorAll('.content-stat strong');
            if (stats[0]) stats[0].textContent = versionsCount;
            if (stats[1]) stats[1].textContent = `$${minPrice}`;
            if (stats[2]) stats[2].textContent = getRealSalesCount(pluginKey);
            
            // Actualizar estado
            const statusElement = card.querySelector('.content-secure-status');
            if (statusElement) {
                statusElement.textContent = plugin.status === 'active' ? 'Publicado' : 'Desarrollo';
                statusElement.className = `content-secure-status ${plugin.status}`;
            }
        }
    });
}

function editSecureContent(pluginKey) {
    const plugin = REAL_PLUGINS_DATA[pluginKey];
    if (!plugin) {
        showSecureNotification('Plugin no encontrado', 'error');
        return;
    }
    
    // Log de edición
    logSecurityEvent('edit_plugin', pluginKey);
    
    // Crear modal REAL de edición
    createRealEditModal(pluginKey, plugin);
}

function createRealEditModal(pluginKey, plugin) {
    const modal = document.createElement('div');
    modal.className = 'secure-modal-overlay';
    modal.style.display = 'flex';
    modal.style.alignItems = 'center';
    modal.style.justifyContent = 'center';
    
    modal.innerHTML = `
        <div style="
            background: var(--secure-bg-darker);
            border: 2px solid var(--secure-border);
            border-radius: 20px;
            padding: 30px;
            width: 90%;
            max-width: 800px;
            max-height: 80vh;
            overflow-y: auto;
            position: relative;
        ">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px;">
                <h3 style="color: var(--secure-primary); font-size: 1.5rem;">
                    ✏️ Editar Plugin: ${plugin.name}
                </h3>
                <button onclick="closeSecureModal()" style="
                    background: none;
                    border: none;
                    color: var(--secure-error);
                    font-size: 1.5rem;
                    cursor: pointer;
                    padding: 5px;
                ">&times;</button>
            </div>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 30px;">
                <div>
                    <label style="color: var(--secure-text-secondary); display: block; margin-bottom: 5px;">Nombre del Plugin</label>
                    <input type="text" id="realPluginName" value="${plugin.name}" style="
                        width: 100%;
                        padding: 10px;
                        background: var(--secure-bg-light);
                        border: 1px solid var(--secure-border);
                        border-radius: 8px;
                        color: var(--secure-text-primary);
                        font-size: 1rem;
                    ">
                </div>
                <div>
                    <label style="color: var(--secure-text-secondary); display: block; margin-bottom: 5px;">Video ID (YouTube)</label>
                    <input type="text" id="realPluginVideoId" value="${plugin.videoId}" style="
                        width: 100%;
                        padding: 10px;
                        background: var(--secure-bg-light);
                        border: 1px solid var(--secure-border);
                        border-radius: 8px;
                        color: var(--secure-text-primary);
                        font-size: 1rem;
                    ">
                </div>
            </div>
            
            <div style="margin-bottom: 20px;">
                <label style="color: var(--secure-text-secondary); display: block; margin-bottom: 5px;">Descripción</label>
                <textarea id="realPluginDescription" style="
                    width: 100%;
                    min-height: 80px;
                    padding: 10px;
                    background: var(--secure-bg-light);
                    border: 1px solid var(--secure-border);
                    border-radius: 8px;
                    color: var(--secure-text-primary);
                    font-size: 1rem;
                    resize: vertical;
                ">${plugin.description}</textarea>
            </div>
            
            <div style="margin-bottom: 30px;">
                <label style="color: var(--secure-text-secondary); display: block; margin-bottom: 5px;">Imágenes (URLs separadas por nueva línea)</label>
                <textarea id="realPluginImages" style="
                    width: 100%;
                    min-height: 100px;
                    padding: 10px;
                    background: var(--secure-bg-light);
                    border: 1px solid var(--secure-border);
                    border-radius: 8px;
                    color: var(--secure-text-primary);
                    font-size: 1rem;
                    resize: vertical;
                ">${plugin.images.join('\n')}</textarea>
            </div>
            
            <div style="margin-bottom: 30px;">
                <h4 style="color: var(--secure-primary); margin-bottom: 15px;">💰 Versiones y Precios</h4>
                <div id="realVersionsContainer">
                    ${generateRealVersionsEditor(plugin.versions, pluginKey)}
                </div>
            </div>
            
            <div style="display: flex; gap: 10px; justify-content: flex-end;">
                <button onclick="closeSecureModal()" style="
                    padding: 10px 20px;
                    background: transparent;
                    border: 1px solid var(--secure-border);
                    border-radius: 8px;
                    color: var(--secure-text-secondary);
                    cursor: pointer;
                    transition: all 0.3s ease;
                ">Cancelar</button>
                <button onclick="saveRealPlugin('${pluginKey}')" style="
                    padding: 10px 20px;
                    background: linear-gradient(45deg, var(--secure-primary), var(--secure-secondary));
                    border: none;
                    border-radius: 8px;
                    color: white;
                    font-weight: bold;
                    cursor: pointer;
                    transition: all 0.3s ease;
                ">💾 Guardar Cambios</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Evento para cerrar con clic fuera
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeSecureModal();
        }
    });
}

function generateRealVersionsEditor(versions, pluginKey) {
    let html = '';
    Object.entries(versions).forEach(([versionKey, version]) => {
        html += `
            <div style="
                background: var(--secure-bg-light);
                border: 1px solid var(--secure-border);
                border-radius: 10px;
                padding: 15px;
                margin-bottom: 15px;
            " data-version="${versionKey}">
                <div style="display: grid; grid-template-columns: 2fr 1fr auto; gap: 15px; align-items: center; margin-bottom: 15px;">
                    <input type="text" value="${version.name}" data-field="name" style="
                        padding: 8px;
                        background: var(--secure-bg-dark);
                        border: 1px solid var(--secure-border);
                        border-radius: 5px;
                        color: var(--secure-text-primary);
                    ">
                    <input type="number" value="${version.price}" data-field="price" min="1" style="
                        padding: 8px;
                        background: var(--secure-bg-dark);
                        border: 1px solid var(--secure-border);
                        border-radius: 5px;
                        color: var(--secure-text-primary);
                        width: 80px;
                    ">
                    <label style="display: flex; align-items: center; gap: 5px; color: var(--secure-text-secondary); font-size: 0.9rem;">
                        <input type="checkbox" ${version.recommended ? 'checked' : ''} data-field="recommended">
                        Recomendado
                    </label>
                </div>
                <textarea data-field="features" style="
                    width: 100%;
                    min-height: 60px;
                    padding: 8px;
                    background: var(--secure-bg-dark);
                    border: 1px solid var(--secure-border);
                    border-radius: 5px;
                    color: var(--secure-text-primary);
                    font-size: 0.9rem;
                    resize: vertical;
                ">${version.features.join('\n')}</textarea>
            </div>
        `;
    });
    return html;
}

function saveRealPlugin(pluginKey) {
    try {
        // Recopilar datos del formulario REAL
        const name = document.getElementById('realPluginName').value.trim();
        const description = document.getElementById('realPluginDescription').value.trim();
        const videoId = document.getElementById('realPluginVideoId').value.trim();
        const images = document.getElementById('realPluginImages').value
            .split('\n')
            .map(url => url.trim())
            .filter(url => url);

        if (!name || !description) {
            showSecureNotification('Nombre y descripción son obligatorios', 'error');
            return;
        }

        // Actualizar datos del plugin REAL
        REAL_PLUGINS_DATA[pluginKey].name = name;
        REAL_PLUGINS_DATA[pluginKey].description = description;
        REAL_PLUGINS_DATA[pluginKey].videoId = videoId;
        REAL_PLUGINS_DATA[pluginKey].images = images;

        // Actualizar versiones REALES
        const versionEditors = document.querySelectorAll('[data-version]');
        versionEditors.forEach(editor => {
            const versionKey = editor.dataset.version;
            const nameInput = editor.querySelector('[data-field="name"]');
            const priceInput = editor.querySelector('[data-field="price"]');
            const recommendedInput = editor.querySelector('[data-field="recommended"]');
            const featuresInput = editor.querySelector('[data-field="features"]');

            REAL_PLUGINS_DATA[pluginKey].versions[versionKey] = {
                name: nameInput.value.trim(),
                price: parseInt(priceInput.value) || 0,
                recommended: recommendedInput.checked,
                features: featuresInput.value.split('\n').map(f => f.trim()).filter(f => f)
            };
        });

        // Guardar en localStorage REAL
        saveRealPluginsData();

        // Sincronizar con web principal REAL
        syncWithMainSite();

        // Log de modificación
        logSecurityEvent('plugin_updated', pluginKey);

        showSecureNotification('Plugin actualizado correctamente', 'success');
        closeSecureModal();
        updateRealPluginCards();

    } catch (error) {
        console.error('Error saving plugin:', error);
        showSecureNotification('Error al guardar el plugin', 'error');
    }
}

function saveRealPluginsData() {
    try {
        localStorage.setItem('realAdminPluginsData', JSON.stringify(REAL_PLUGINS_DATA));
        localStorage.setItem('lastPluginUpdate', Date.now().toString());
        localStorage.setItem('updatedBy', currentUserData.email);
    } catch (error) {
        console.error('Error saving plugins data:', error);
        showSecureNotification('Error al guardar datos', 'error');
    }
}

function previewSecureContent(pluginKey) {
    // Abrir plugin en la web principal REAL
    const mainSiteUrl = window.location.origin + window.location.pathname.replace('/management-portal-bh385/control.html', '/plugins.html');
    window.open(`${mainSiteUrl}#${pluginKey}`, '_blank');
    
    logSecurityEvent('preview_plugin', pluginKey);
}

function contentSecureSettings(pluginKey) {
    const plugin = REAL_PLUGINS_DATA[pluginKey];
    if (!plugin) return;

    const newStatus = plugin.status === 'active' ? 'development' : 'active';
    REAL_PLUGINS_DATA[pluginKey].status = newStatus;
    
    saveRealPluginsData();
    syncWithMainSite();
    updateRealPluginCards();
    
    logSecurityEvent('plugin_status_changed', `${pluginKey}:${newStatus}`);
    showSecureNotification(`Plugin ${newStatus === 'active' ? 'activado' : 'puesto en desarrollo'}`, 'success');
}

function closeSecureModal() {
    const modal = document.querySelector('.secure-modal-overlay');
    if (modal) {
        modal.remove();
    }
}

// ==========================================
//   GESTIÓN REAL DE TEMAS
// ==========================================

function loadRealThemeManagement() {
    const currentTheme = localStorage.getItem('currentSecureTheme') || 'cosmic';
    const currentThemeElement = document.getElementById('currentSecureTheme');
    
    if (currentThemeElement) {
        currentThemeElement.textContent = REAL_THEMES[currentTheme]?.name || 'Personalizado';
    }

    // Actualizar estado de tarjetas de temas
    const themeCards = document.querySelectorAll('.theme-secure-card');
    themeCards.forEach(card => {
        card.classList.toggle('active', card.dataset.theme === currentTheme);
    });

    setupRealColorControls();
}

function applySecureTheme(themeName) {
    if (!REAL_THEMES[themeName]) {
        showSecureNotification('Tema no válido', 'error');
        return;
    }

    const theme = REAL_THEMES[themeName];
    applyRealThemeColors(theme.colors);

    // Guardar tema REAL
    localStorage.setItem('currentSecureTheme', themeName);
    localStorage.setItem('secureThemeColors', JSON.stringify(theme.colors));

    // Aplicar al panel admin
    const currentThemeElement = document.getElementById('currentSecureTheme');
    if (currentThemeElement) {
        currentThemeElement.textContent = theme.name;
    }

    // Actualizar tarjetas
    const themeCards = document.querySelectorAll('.theme-secure-card');
    themeCards.forEach(card => {
        card.classList.toggle('active', card.dataset.theme === themeName);
    });

    // Sincronizar con web principal REAL
    syncWithMainSite();

    logSecurityEvent('theme_applied', themeName);
    showSecureNotification(`Tema ${theme.name} aplicado correctamente`, 'success');
}

function setupRealColorControls() {
    const currentTheme = localStorage.getItem('currentSecureTheme') || 'cosmic';
    const savedColors = JSON.parse(localStorage.getItem('secureThemeColors') || '{}');
    const themeColors = savedColors.primary ? savedColors : REAL_THEMES[currentTheme]?.colors || REAL_THEMES.cosmic.colors;

    const primaryInput = document.getElementById('secureColorPrimary');
    const secondaryInput = document.getElementById('secureColorSecondary');
    const backgroundInput = document.getElementById('secureColorBackground');

    if (primaryInput) primaryInput.value = themeColors.primary;
    if (secondaryInput) secondaryInput.value = themeColors.secondary;
    if (backgroundInput) backgroundInput.value = themeColors.background;
}

function applySecureCustomTheme() {
    const primaryColor = document.getElementById('secureColorPrimary')?.value;
    const secondaryColor = document.getElementById('secureColorSecondary')?.value;
    const bgColor = document.getElementById('secureColorBackground')?.value;

    if (!primaryColor || !secondaryColor || !bgColor) {
        showSecureNotification('Todos los colores son obligatorios', 'error');
        return;
    }

    const customColors = {
        primary: primaryColor,
        secondary: secondaryColor,
        accent: primaryColor,
        background: bgColor
    };

    applyRealThemeColors(customColors);

    // Guardar colores personalizados REALES
    localStorage.setItem('currentSecureTheme', 'custom');
    localStorage.setItem('secureThemeColors', JSON.stringify(customColors));

    const currentThemeElement = document.getElementById('currentSecureTheme');
    if (currentThemeElement) {
        currentThemeElement.textContent = 'Personalizado';
    }

    // Sincronizar con web principal
    syncWithMainSite();

    logSecurityEvent('custom_theme_applied', JSON.stringify(customColors));
    showSecureNotification('Colores personalizados aplicados', 'success');
}

function applyRealThemeColors(colors) {
    const root = document.documentElement;
    
    root.style.setProperty('--secure-primary', colors.primary);
    root.style.setProperty('--secure-secondary', colors.secondary);
    root.style.setProperty('--secure-accent', colors.accent);
    root.style.setProperty('--secure-bg-dark', colors.background);

    // También aplicar a las variables originales para compatibilidad
    root.style.setProperty('--primary-color', colors.primary);
    root.style.setProperty('--secondary-color', colors.secondary);
    root.style.setProperty('--accent-color', colors.accent);
    root.style.setProperty('--bg-dark', colors.background);
}

function loadCurrentSecureTheme() {
    const savedColors = localStorage.getItem('secureThemeColors');
    if (savedColors) {
        try {
            const colors = JSON.parse(savedColors);
            applyRealThemeColors(colors);
        } catch (e) {
            console.warn('Error loading theme colors');
        }
    }
}

// ==========================================
//   ESTADÍSTICAS REALES
// ==========================================

function updateRealStats() {
    const stats = {
        totalPlugins: Object.keys(REAL_PLUGINS_DATA).length,
        activePlugins: Object.values(REAL_PLUGINS_DATA).filter(p => p.status === 'active').length,
        totalSales: getRealTotalSales(),
        totalUsers: getRealTotalUsers(),
        todayVisits: getRealTodayVisits()
    };

    // Actualizar elementos del DOM REALES
    const statElements = document.querySelectorAll('.secure-stats-grid .stat-secure-number');
    if (statElements[0]) statElements[0].textContent = stats.activePlugins;
    if (statElements[1]) statElements[1].textContent = `$${stats.totalSales}`;
    if (statElements[2]) statElements[2].textContent = stats.totalUsers;
    if (statElements[3]) statElements[3].textContent = stats.todayVisits;

    updateRealMenuBadges(stats);
}

function getRealTotalSales() {
    const salesData = JSON.parse(localStorage.getItem('realSalesData') || '[]');
    return salesData.reduce((total, sale) => total + sale.amount, 0);
}

function getRealTotalUsers() {
    const usersData = JSON.parse(localStorage.getItem('realUsersData') || '[]');
    return usersData.length;
}

function getRealTodayVisits() {
    const visitsData = JSON.parse(localStorage.getItem('realVisitsData') || '[]');
    const today = new Date().toDateString();
    return visitsData.filter(visit => new Date(visit.date).toDateString() === today).length;
}

function getRealSalesCount(pluginKey) {
    const salesData = JSON.parse(localStorage.getItem('realSalesData') || '[]');
    return salesData.filter(sale => sale.pluginId === pluginKey).length;
}

function updateRealMenuBadges(stats) {
    const contentBadge = document.querySelector('[data-section="content"] .secure-badge');
    const usersBadge = document.querySelector('[data-section="users"] .secure-badge');

    if (contentBadge) contentBadge.textContent = stats.totalPlugins;
    if (usersBadge) usersBadge.textContent = stats.totalUsers;
}

// ==========================================
//   GESTIÓN DE USUARIOS REALES
// ==========================================

function loadRealUsersManagement() {
    const users = JSON.parse(localStorage.getItem('realUsersData') || '[]');
    // Aquí se implementaría la carga real de usuarios
    logSecurityEvent('view_users', 'admin');
}

// ==========================================
//   SISTEMA DE LOGS Y SEGURIDAD
// ==========================================

function logSecurityEvent(event, details) {
    const logEntry = {
        timestamp: new Date().toISOString(),
        event: event,
        details: details,
        user: currentUserData.email || 'unknown',
        ip: 'hidden', // En producción se obtendría la IP real
        userAgent: navigator.userAgent
    };

    const logs = JSON.parse(localStorage.getItem('securityLogs') || '[]');
    logs.push(logEntry);

    // Mantener solo los últimos 1000 logs
    if (logs.length > 1000) {
        logs.splice(0, logs.length - 1000);
    }

    localStorage.setItem('securityLogs', JSON.stringify(logs));
}

// ==========================================
//   SISTEMA DE NOTIFICACIONES REALES
// ==========================================

function showSecureNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `secure-notification ${type}`;
    
    const icons = {
        success: '✅',
        error: '❌',
        warning: '⚠️',
        info: 'ℹ️'
    };

    notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: 10px;">
            <span style="font-size: 1.2rem;">${icons[type] || 'ℹ️'}</span>
            <span>${message}</span>
        </div>
    `;

    document.body.appendChild(notification);

    // Auto-remover
    setTimeout(() => {
        notification.style.animation = 'fadeOut 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}

function showSecureStatus(message, type) {
    const statusElement = document.getElementById('accessStatus');
    if (statusElement) {
        statusElement.className = `access-status ${type}`;
        statusElement.textContent = message;
    }
}

// ==========================================
//   FUNCIONES DE UTILIDAD REALES
// ==========================================

function setupRealAutoSave() {
    // Auto-guardar cada 2 minutos
    setInterval(() => {
        saveRealPluginsData();
        logSecurityEvent('auto_save', 'system');
    }, 2 * 60 * 1000);
}

function createSystemBackup() {
    const backupData = {
        plugins: REAL_PLUGINS_DATA,
        users: JSON.parse(localStorage.getItem('realUsersData') || '[]'),
        sales: JSON.parse(localStorage.getItem('realSalesData') || '[]'),
        theme: localStorage.getItem('currentSecureTheme'),
        themeColors: localStorage.getItem('secureThemeColors'),
        logs: JSON.parse(localStorage.getItem('securityLogs') || '[]'),
        timestamp: new Date().toISOString(),
        version: '1.0'
    };

    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = `backup-sistema-${new Date().toISOString().split('T')[0]}.json`;
    link.click();

    URL.revokeObjectURL(url);
    
    logSecurityEvent('backup_created', 'manual');
    showSecureNotification('Backup del sistema descargado', 'success');
}

function previewMainSite() {
    const mainSiteUrl = window.location.origin + window.location.pathname.replace('/management-portal-bh385/control.html', '/index.html');
    window.open(mainSiteUrl, '_blank');
    
    logSecurityEvent('preview_main_site', 'admin');
}

function quickThemeChange() {
    const themes = ['cosmic', 'halloween', 'christmas', 'summer'];
    const currentTheme = localStorage.getItem('currentSecureTheme') || 'cosmic';
    const currentIndex = themes.indexOf(currentTheme);
    const nextTheme = themes[(currentIndex + 1) % themes.length];

    applySecureTheme(nextTheme);
}

// ==========================================
//   EFECTOS VISUALES Y SEGURIDAD
// ==========================================

function createSecurityParticles() {
    const container = document.getElementById('secureParticles');
    if (!container) return;

    for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: var(--secure-primary);
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: secureFloat ${3 + Math.random() * 4}s ease-in-out infinite;
            opacity: ${0.3 + Math.random() * 0.7};
        `;
        container.appendChild(particle);
    }
}

function initializeSecurityWatermark() {
    const watermark = document.createElement('div');
    watermark.className = 'secure-watermark';
    watermark.textContent = `Admin Session: ${currentUserData.sessionId || 'unknown'}`;
    document.body.appendChild(watermark);
}

// ==========================================
//   INICIALIZACIÓN Y EVENTOS GLOBALES
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    // Cargar datos guardados REALES
    loadRealPluginsData();
    loadCurrentSecureTheme();
});

// Prevenir pérdida de datos REAL
window.addEventListener('beforeunload', function(e) {
    saveRealPluginsData();
    logSecurityEvent('session_end', 'beforeunload');
});

// Detección de inactividad REAL
let inactivityTimer;
function resetInactivityTimer() {
    clearTimeout(inactivityTimer);
    inactivityTimer = setTimeout(() => {
        showSecureNotification('Sesión por expirar por inactividad', 'warning');
        setTimeout(() => {
            logSecurityEvent('session_timeout', 'inactivity');
            secureLogout();
        }, 60000); // 1 minuto de advertencia
    }, 30 * 60 * 1000); // 30 minutos
}

document.addEventListener('mousemove', resetInactivityTimer);
document.addEventListener('keypress', resetInactivityTimer);
document.addEventListener('click', resetInactivityTimer);

// Inicializar timer al cargar
resetInactivityTimer();