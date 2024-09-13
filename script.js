window.addEventListener("load", ()=>{
    const PALAVRAS_PERMITIDAS = ["acido", "chuva", "metil", "butil", "hextil"];

    const inputs_linhas = document.querySelectorAll("#inputs_container .linhas");
    
    const REGEX_LETRAS = /\b[a-zA-Z]\b/;
   
    let linha_atual = 0;
    
    window.addEventListener("keydown", (e)=>{
        if(e.key == "Enter"){    

            let palavra = Array.from(inputs_linhas[linha_atual].children).reduce((a,b)=> a + b.value, "");
    
            if(palavra.length < 5){
                document.querySelector("#mensagem_de_erro").textContent = "Só palavras com 5 letras";
                document.querySelector("#mensagem_de_erro").style.display = "block";
            } else { 

                if (!PALAVRAS_PERMITIDAS.includes(palavra)){
                    document.querySelector("#mensagem_de_erro").textContent = "Essa palavra não é aceita";
                    document.querySelector("#mensagem_de_erro").style.display = "block";
                } else {
                    
                }
            }

        } else {
            document.querySelector("#mensagem_de_erro").style.display = "none";

            
        }
    })
    
    
    Array.from(inputs_linhas[linha_atual].children).forEach((el)=>{
                
        el.addEventListener("keydown", (e)=>{
        
             if(REGEX_LETRAS.test(e.key)){
                el.value = e.key;
                console.log("É daqui msm loco")
             } else if(e.key == "Backspace"){
                el.value = "";
             }

             
        })
        
    })
})

