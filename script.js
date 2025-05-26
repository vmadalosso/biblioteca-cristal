document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.querySelector(".menu-toggle");
  const menu = document.querySelector(".menu");
  const form = document.querySelector("#contact-form");
  const newsImages = document.querySelectorAll(".news-image-container img");

  // 🔹 Alternância do menu hambúrguer
  if (menuToggle && menu) {
    menuToggle.addEventListener("click", function () {
      menu.classList.toggle("active");
    });
  }

  // 🔹 Validação do formulário
  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault(); // 🔹 Garante que a validação ocorra antes do envio

      const nome = document.querySelector("#nome").value.trim();
      const email = document.querySelector("#email").value.trim();
      const mensagem = document.querySelector("#mensagem").value.trim();

      const nomeRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const scriptRegex = /<script|<\/script|javascript:/i;

      if (nome.length === 0 || !nomeRegex.test(nome)) {
        alert("Nome inválido! Certifique-se de que não está em branco e use apenas letras e espaços.");
        return;
      }

      if (!emailRegex.test(email)) {
        alert("E-mail inválido! Digite um endereço válido.");
        return;
      }

      if (scriptRegex.test(mensagem) || mensagem.length < 10) {
        alert("Mensagem inválida! Certifique-se de que está escrita corretamente e com pelo menos 10 caracteres.");
        return;
      }

      // 🔹 Se a validação passar, o formulário pode ser enviado
      form.submit();
    });
  }

  // 🔹 Expansão de imagens ao clicar
  newsImages.forEach(image => {
    image.addEventListener("click", function () {
      const fullscreenDiv = document.createElement("div");
      fullscreenDiv.classList.add("fullscreen-image");

      const imgClone = document.createElement("img");
      imgClone.src = image.src;
      fullscreenDiv.appendChild(imgClone);

      fullscreenDiv.addEventListener("click", function () {
        document.body.removeChild(fullscreenDiv);
      });

      document.body.appendChild(fullscreenDiv);
    });
  });
});
