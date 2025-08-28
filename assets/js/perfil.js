document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("modal");
  const modalBody = document.getElementById("modal-body");
  const closeBtn = document.querySelector(".close-btn");

  // Contenidos de ejemplo
  const content = {
    productos: "<h2>🛍️ Mis Productos</h2><p>Aquí verás tus productos en venta.</p>",
    insignia: "<h2>🏅 Insignia</h2><p>Aquí estará tu medalla o insignia.</p>",
    fama: "<h2>👑 Salón de la Fama</h2><p>Lista de los mejores vendedores.</p>",
    mochila: `
      <h2>🎒 Mochila</h2>
      <p>Aquí verás lo que has comprado.</p>
      <button id='carrito-btn'>🛒 Ver carrito</button>
    `
  };

  document.querySelectorAll(".section-card").forEach(card => {
    card.addEventListener("click", () => {
      const section = card.dataset.section;
      modalBody.innerHTML = content[section] || "Sin contenido";
      modal.style.display = "flex";

      // Accion carrito
      if (section === "mochila") {
        document.getElementById("carrito-btn").addEventListener("click", () => {
          modalBody.innerHTML = "<h2>🛒 Carrito</h2><p>Aquí se muestran los bordes y productos disponibles.</p>";
        });
      }
    });
  });

  closeBtn.addEventListener("click", () => modal.style.display = "none");
  window.addEventListener("click", (e) => {
    if (e.target === modal) modal.style.display = "none";
  });
});