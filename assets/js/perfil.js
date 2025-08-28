document.addEventListener("DOMContentLoaded", () => {
  const followBtn = document.querySelector(".follow-btn");
  const status = document.querySelector(".status");

  followBtn.addEventListener("click", () => {
    if (followBtn.textContent.includes("Seguir")) {
      followBtn.textContent = "Siguiendo ✓";
      followBtn.style.background = "#00cc88";
    } else {
      followBtn.textContent = "+ Seguir";
      followBtn.style.background = "#ff00ff";
    }
  });

  // Simulación: cambiar estado aleatoriamente
  setInterval(() => {
    if (Math.random() > 0.5) {
      status.textContent = "En línea";
      status.classList.add("online");
      status.classList.remove("offline");
    } else {
      status.textContent = "Desconectado";
      status.classList.add("offline");
      status.classList.remove("online");
    }
  }, 5000);
});