document.addEventListener("DOMContentLoaded", () => {
  const settingsBtn = document.querySelector(".settings-btn");

  // Click en el botón de configuraciones
  settingsBtn.addEventListener("click", () => {
    alert("⚙️ Aquí irán las configuraciones, política de privacidad, etc.");
  });

  // Animación de entrada para la info
  const profileInfo = document.querySelector(".profile-info");
  setTimeout(() => {
    profileInfo.style.opacity = "1";
  }, 500);

  // Simulación de estado online/offline
  const dot = document.querySelector(".dot");
  setInterval(() => {
    if (dot.classList.contains("online")) {
      dot.classList.remove("online");
      dot.classList.add("offline");
    } else {
      dot.classList.remove("offline");
      dot.classList.add("online");
    }
  }, 5000); // cambia cada 5s
});