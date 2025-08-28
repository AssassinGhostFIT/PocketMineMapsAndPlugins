// assets/js/perfil.js

document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("modal");
  const modalBody = document.getElementById("modal-body");
  const closeBtn = document.querySelector(".close-btn");
  const sectionCards = document.querySelectorAll(".section-card");

  // Animación mostrar modal
  function showModal(content) {
    modalBody.innerHTML = content;
    modal.style.display = "flex";
    modal.style.alignItems = "center"; // 👈 centrado vertical
    modal.style.justifyContent = "center"; // 👈 centrado horizontal
    modal.style.opacity = 0;
    modal.style.transform = "scale(0.8)";
    
    setTimeout(() => {
      modal.style.transition = "all 0.3s ease";
      modal.style.opacity = 1;
      modal.style.transform = "scale(1)";
    }, 10);
  }

  // Animación cerrar modal
  function hideModal() {
    modal.style.transition = "all 0.3s ease";
    modal.style.opacity = 0;
    modal.style.transform = "scale(0.8)";
    setTimeout(() => {
      modal.style.display = "none";
    }, 300);
  }

  // Abrir modal con contenido según sección
  sectionCards.forEach(card => {
    card.addEventListener("click", () => {
      card.style.transform = "scale(0.95)";
      setTimeout(() => card.style.transform = "scale(1)", 150);

      const section = card.getAttribute("data-section");
      let content = "";

      switch (section) {
        case "productos":
          content = `
            <h2>🛍️ Mis Productos</h2>
            <p>Aquí aparecerán tus productos creados.</p>
          `;
          break;
        case "insignia":
          content = `
            <h2>🏅 Insignias</h2>
            <p>Estas son tus insignias desbloqueadas.</p>
          `;
          break;
        case "fama":
          content = `
            <h2>👑 Salón de la Fama</h2>
            <p>Ranking de los mejores vendedores.</p>
          `;
          break;
        case "mochila":
          content = `
            <h2>🎒 Mochila</h2>
            <p>Aquí verás tus compras y bordes de perfil.</p>
            <button class="cart-btn">🛒 Ver carrito</button>
            <div class="cart-modal" style="display:none; margin-top:10px; padding:10px; border-radius:10px; background:#111;">
              <h3>Carrito de compras</h3>
              <p>No tienes productos en el carrito todavía.</p>
            </div>
          `;
          break;
        default:
          content = `<p>Sección en construcción 🚧</p>`;
      }

      showModal(content);

      // Submodal carrito dentro de mochila
      setTimeout(() => {
        const cartBtn = document.querySelector(".cart-btn");
        const cartModal = document.querySelector(".cart-modal");
        if (cartBtn && cartModal) {
          cartBtn.addEventListener("click", () => {
            if (cartModal.style.display === "none") {
              cartModal.style.display = "block";
              cartModal.style.opacity = 0;
              cartModal.style.transform = "translateY(-20px)";
              setTimeout(() => {
                cartModal.style.transition = "all 0.3s ease";
                cartModal.style.opacity = 1;
                cartModal.style.transform = "translateY(0)";
              }, 10);
            } else {
              cartModal.style.transition = "all 0.3s ease";
              cartModal.style.opacity = 0;
              cartModal.style.transform = "translateY(-20px)";
              setTimeout(() => {
                cartModal.style.display = "none";
              }, 300);
            }
          });
        }
      }, 50);
    });
  });

  // Cerrar modal
  closeBtn.addEventListener("click", hideModal);

  // Cerrar si clickea fuera
  window.addEventListener("click", (e) => {
    if (e.target === modal) hideModal();
  });

  // Botón de configuración (ejemplo simple con engranaje ⚙️)
  const settingsBtn = document.querySelector(".settings-btn");
  if (settingsBtn) {
    settingsBtn.addEventListener("click", () => {
      showModal(`
        <h2>⚙️ Configuración</h2>
        <p>Aquí podrás editar tu perfil próximamente.</p>
      `);
    });
  }
});