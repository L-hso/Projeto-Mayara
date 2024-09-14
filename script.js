window.addEventListener("load", () => {
  const PALAVRAS_PERMITIDAS = ["acido", "chuva", "metil", "butil"];

  let palavra_da_vez =
    PALAVRAS_PERMITIDAS[
      Math.ceil(Math.random() * (PALAVRAS_PERMITIDAS.length - 1))
    ];

  const inputs_linhas = document.querySelectorAll("#inputs_container .linhas");

  const REGEX_LETRAS = /\b[a-zA-Z]\b/;

  let linha_atual = 0;

  window.addEventListener("keydown", (e) => {
    if (e.key == "Enter") {
      alert(palavra_da_vez);
      let palavra = Array.from(inputs_linhas[linha_atual].children)
        .reduce((a, b) => a + b.value, "")
        .toLowerCase();

      if (palavra.length < 5) {
        document.querySelector("#mensagem_de_erro").textContent =
          "Só palavras com 5 letras";

        document.querySelector("#mensagem_de_erro").style.display = "block";
      } else {
        if (!PALAVRAS_PERMITIDAS.includes(palavra)) {
          document.querySelector("#mensagem_de_erro").textContent =
            "Essa palavra não é aceita";

          document.querySelector("#mensagem_de_erro").style.display = "block";
        } else {
          // Se o input for compativel muda as cores dos blocos
          Array.from(inputs_linhas[linha_atual].children).forEach((el, ind) => {
            if (palavra_da_vez.includes(el.value)) {
              if (palavra_da_vez.indexOf(el.value) == ind) {
                el.classList = "input_acerto";
              } else {
                el.classList = "input_acertoparcial";
              }
            } else {
              el.classList = "input_erro";
            }

            el.setAttribute("disabled", "true");
          });

          if (palavra != palavra_da_vez) {
            linha_atual++;
            Array.from(inputs_linhas[linha_atual].children).forEach((el) =>
              el.removeAttribute("disabled")
            );
          }
        }
      }
    } else {
      document.querySelector("#mensagem_de_erro").style.display = "none";
    }
  });

  // Keyboard melhor

  Array.from(inputs_linhas[linha_atual].children).forEach((el) => {
    el.addEventListener("keydown", (e) => {
      if (REGEX_LETRAS.test(e.key)) {
        el.value = e.key;
      } else if (e.key == "Backspace") {
        el.value = "";
      }
    });
  });
});
