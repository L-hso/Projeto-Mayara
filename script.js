window.addEventListener("load", () => {
  const PALAVRAS_PERMITIDAS = ["acida", "chuva", "metil", "butil", "octil"];

  let palavra_da_vez =
    PALAVRAS_PERMITIDAS[
      Math.ceil(Math.random() * (PALAVRAS_PERMITIDAS.length - 1))
    ];

  const inputs_linhas = document.querySelectorAll("#inputs_container .linhas");

  const REGEX_LETRAS = /\b[a-zA-Z]\b/;

  let linha_atual = 0;

  // Keyboard melhor 1 ocorrencia
  Array.from(inputs_linhas[linha_atual].children).forEach((el) => {

    el.addEventListener("keydown", (e) => {
      if (REGEX_LETRAS.test(e.key)) {
        el.value = e.key.toLowerCase();
      } else if (e.key == "Backspace") {
        el.value = "";
      }
    });
  });
  //----------------------------------

  window.addEventListener("keydown", (e) => {
    //Verifica se o jogador clicou enter
    if (e.key == "Enter") {
      alert(palavra_da_vez);
      let palavra = Array.from(inputs_linhas[linha_atual].children)
        .reduce((a, b) => a + b.value, "")
        .toLowerCase();


      //Verifica se a palavra tem 5 letras 
      if (palavra.length < 5) {
        document.querySelector("#mensagem_de_erro").textContent =
          "Só palavras com 5 letras";

        document.querySelector("#mensagem_de_erro").style.display = "block";

        //Verifica se a palavra é permitida
      } else if (!PALAVRAS_PERMITIDAS.includes(palavra)) {
        document.querySelector("#mensagem_de_erro").textContent =
          "Essa palavra não é aceita";

        document.querySelector("#mensagem_de_erro").style.display = "block";


      // Se o input for compativel muda as cores dos inputs
      } else {
        let p = palavra_da_vez.split("");

        Array.from(inputs_linhas[linha_atual].children).forEach((input, input_ind) => {

          if (p.some((letter, index) => input.value == letter && index == input_ind)) {
            input.classList = "input_acerto";
          } else if (p.some((letter, _) => input.value == letter)) {
            input.classList = "input_acertoparcial";
          } else {
            input.classList = "input_erro";
          }

          input.setAttribute("disabled", "true");

        });
        linha_atual++;
        // Libera o próximo input se a palavra estiver incorreta
        if (palavra != palavra_da_vez && linha_atual != 4) {
          
          

          Array.from(inputs_linhas[linha_atual].children).forEach((el) =>
            el.removeAttribute("disabled")
          );

          Array.from(inputs_linhas[linha_atual].children).forEach((el) => {
            el.addEventListener("keydown", (i) => {
              if (REGEX_LETRAS.test(i.key)) {
                el.value = i.key.toLowerCase();
              }

              if (i.key == "Backspace") {
                el.value = "";
              }

              document.querySelector("#mensagem_de_erro").style.display = "none";
            });
          });
          console.log(linha_atual)

        } else if (palavra == palavra_da_vez) {
          document.querySelector("#info_final #painel_de_reset h1").textContent = "Você ganhou!"
          document.querySelector("#info_final").style.display = "flex";
        } else {

          document.querySelector("#info_final #painel_de_reset h1").textContent = "Você perdeu!"
          document.querySelector("#info_final").style.display = "flex";
        }


      }
    }
  });
});

