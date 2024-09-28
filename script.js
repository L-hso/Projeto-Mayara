window.addEventListener("load", () => {
  let PALAVRAS_PERMITIDAS = [
    "acido",
    "cloro",
    "bases",
    "oxido",
    "metil",
    "butil",
    "octil",
    "bario",
    "otoso",
  ];
  PALAVRAS_PERMITIDAS = PALAVRAS_PERMITIDAS.map((e) => e.toLowerCase());

  let palavra_da_vez = "asoti";

  const REGEX_LETRAS = /\b[a-zA-Z]\b/;

  const inputs_linhas = document.querySelectorAll("#inputs_container .linhas");
  const mensagem_de_erro = document.querySelector("#mensagem_de_erro");
  const fundo_escuro = document.querySelector("#fundo_escuro");

  let jogo_acabou = false;

  let linha_atual = 0;

  //Melhora a jogabilidade escrevendo e usando as setas
  function keyboardMelhor(input, tecla, ind, inputs) {
    switch (tecla.key) {
      case "Backspace":
        if (ind - 1 >= 0 && input.value == "") {
          inputs[ind - 1].focus();
          inputs[ind].blur();
        }
        input.value = "";
        break;

      case "ArrowLeft":
        if (ind - 1 >= 0) {
          inputs[ind - 1].focus();
          inputs[ind].blur();
        }
        break;

      case "ArrowRight":
        if (ind + 1 <= 4) {
          inputs[ind + 1].focus();
          inputs[ind].blur();
        }
        break;

      default:
        if (REGEX_LETRAS.test(tecla.key)) {
          input.value = tecla.key.toLowerCase();
          if (ind + 1 <= 4) {
            inputs[ind + 1].focus();
            inputs[ind].blur();
          }
        }
    }
  }

  // Keyboard melhor
  Array.from(inputs_linhas[linha_atual].children).forEach(
    (input, ind, inputs) => {
      input.addEventListener("keydown", (tecla) => {
        keyboardMelhor(input, tecla, ind, inputs);
      });
    }
  );
  //----------------------------------

  //Funcionalidades do jogo

  window.addEventListener("keydown", (tecla) => {
    if (!jogo_acabou) {
      //Verifica se o jogador clicou enter
      if (tecla.key == "Enter") {
        let palavra = Array.from(inputs_linhas[linha_atual].children)
          .reduce((acumulador, input) => acumulador + input.value, "")
          .toLowerCase();

        //Verifica se a palavra tem 5 letras
        if (palavra.length < 5) {
          mensagem_de_erro.textContent = "Só palavras com 5 letras";

          mensagem_de_erro.style.display = "block";

          //Verifica se a palavra é permitida
        } else if (!PALAVRAS_PERMITIDAS.includes(palavra)) {
          mensagem_de_erro.textContent = "Essa palavra não é aceita";

          mensagem_de_erro.style.display = "block";

          // Se o input for compativel muda as cores dos inputs
        } else {
          let p = palavra_da_vez.split("");

          // bario
          // sosto
          // osoto
          // soost
          const limite_letras = {};

          p.forEach((letra) => {
            limite_letras[letra] =
              palavra_da_vez.match(new RegExp(letra, "g"))?.length ?? 0;
          });

          Array.from(inputs_linhas[linha_atual].children).forEach(
            (input, input_ind) => {
              if (p[input_ind] == input.value) {
                input.classList = "input_acerto";
                limite_letras[input.value]--;
              }
              input.setAttribute("disabled", "true");
            }
          );

          Array.from(inputs_linhas[linha_atual].children).forEach((input) => {
            if (input.classList != "input_acerto") {
              if (limite_letras[input.value] > 0) {
                limite_letras[input.value]--;
                input.classList = "input_acertoparcial";
              } else {
                input.classList = "input_erro";
              }
            }

            input.setAttribute("disabled", "true");
          });

          linha_atual++;

          // Libera o próximo input se a palavra for permitida mas estiver incorreta
          if (palavra != palavra_da_vez && linha_atual != 4) {
            Array.from(inputs_linhas[linha_atual].children).forEach(
              (input, ind, inputs) => {
                input.removeAttribute("disabled");

                Array.from(inputs_linhas[linha_atual].children)[0].focus();

                input.addEventListener("keydown", (tecla) => {
                  keyboardMelhor(input, tecla, ind, inputs);
                });
              }
            );
          } else if (palavra == palavra_da_vez) {
            document.querySelector(
              "#fundo_escuro #painel_de_reset h1"
            ).textContent = "Você ganhou!";
            fundo_escuro.style.display = "flex";
            document.querySelector(
              "#fundo_escuro #painel_de_reset"
            ).style.display = "flex";

            jogo_acabou = true;
          } else {
            document.querySelector(
              "#fundo_escuro #painel_de_reset h1"
            ).textContent = "Você perdeu!";

            fundo_escuro.style.display = "flex";
            document.querySelector(
              "#fundo_escuro #painel_de_reset"
            ).style.display = "flex";

            jogo_acabou = true;
          }
        }
      } else {
        mensagem_de_erro.style.display = "none";
      }
    }
  });

  //Configs

  const config_btn = document.querySelector("#configuracoes");

  config_btn.addEventListener("click", () => {
    fundo_escuro.style.display = "flex";
    document.querySelector("#fundo_escuro #painel_de_config").style.display =
      "block";

    document.querySelector("#btn_fechar").addEventListener("click", () => {
      fundo_escuro.style.display = "none";
      document.querySelector("#fundo_escuro #painel_de_config").style.display =
        "none";
    });
  });

  //Dicas
  const dicas_btn = document.querySelector("#dicas");

  dicas_btn.addEventListener("click", () => {
    if (dicas_btn.dataset.usou == "false" && !jogo_acabou) {
      let random_ind = Math.ceil(Math.random() * 4);

      inputs_linhas[linha_atual].children.item(random_ind).value =
        palavra_da_vez[random_ind];
      inputs_linhas[linha_atual].children.item(random_ind).classList +=
        "input_acerto";
      inputs_linhas[linha_atual].children
        .item(random_ind)
        .setAttribute("disabled", "true");
      dicas_btn.dataset.usou = "true";
    }
  });
});
