// Fade-out before navigating to another page
document.querySelectorAll("a[href]").forEach(function (link) {
  const href = link.getAttribute("href");
  if (!href || href.startsWith("#") || href.startsWith("http") || href.startsWith("mailto:")) return;
  link.addEventListener("click", function (e) {
    if (e.ctrlKey || e.metaKey || e.shiftKey) return;
    e.preventDefault();
    document.body.classList.add("page-exit");
    setTimeout(function () {
      window.location.href = href;
    }, 200);
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.querySelector(".menu-toggle");
  const menu = document.querySelector(".menu");
  const form = document.querySelector("#contact-form");
  const newsImages = document.querySelectorAll(".news-image-container img");

  if (menuToggle && menu) {
    menuToggle.addEventListener("click", function () {
      menu.classList.toggle("active");
    });
  }

  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();

      const nome = document.querySelector("#nome").value.trim();
      const email = document.querySelector("#email").value.trim();
      const mensagem = document.querySelector("#mensagem").value.trim();

      const nomeRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const dangerousRegex = /<script|<\/script|javascript:|data:|on\w+\s*=/i;

      if (nome.length === 0 || !nomeRegex.test(nome)) {
        alert("Nome inválido! Certifique-se de que não está em branco e use apenas letras e espaços.");
        return;
      }

      if (!emailRegex.test(email)) {
        alert("E-mail inválido! Digite um endereço válido.");
        return;
      }

      if (dangerousRegex.test(mensagem) || mensagem.length < 10) {
        alert("Mensagem inválida! Certifique-se de que está escrita corretamente e com pelo menos 10 caracteres.");
        return;
      }

      form.submit();
    });
  }

  newsImages.forEach(function (image) {
    image.addEventListener("click", function () {
      const overlay = document.createElement("div");
      overlay.classList.add("fullscreen-image");

      const imgClone = document.createElement("img");
      imgClone.src = image.src;
      imgClone.alt = image.alt;
      overlay.appendChild(imgClone);

      function closeOverlay() {
        document.body.removeChild(overlay);
        document.removeEventListener("keydown", onKeyDown);
      }

      function onKeyDown(e) {
        if (e.key === "Escape") closeOverlay();
      }

      overlay.addEventListener("click", closeOverlay);
      document.addEventListener("keydown", onKeyDown);
      document.body.appendChild(overlay);
    });
  });
});
