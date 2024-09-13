const PALAVRAS_PERMITIDAS = ["Ácido", "Chuva", "Metil", "Butil", "Hextil"];

const inputs_linhas = document.querySelectorAll("#inputs_container .linhas");

const REGEX_LETRAS = /[a-z]/;

let linha_atual = 0;

window.addEventListener("keypress", (e)=>{
    if(e.key == "Enter"){
                                                            
        if(Array.from(inputs_linhas[linha_atual].childNodes).some(e=>e.value == "")){
            document.querySelector("#mensagem_de_erro").style.visibility = "visible";
        } else { 
            document.querySelector("#mensagem_de_erro").style.visibility = "hidden";
            console.log(inputs_linhas[linha_atual].children)
        }

    } else if(REGEX_LETRAS.test(e.key)) {
        
    }
})