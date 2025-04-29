// INFORMAÇÕES DO FORMULÁRIO
//armazenando em variáveis os campos do formulário
const nome = document.getElementById("nome");
const categoria = document.getElementById("categoria");
const preco = document.getElementById("preco");
const quantidade = document.getElementById("quantidade");
const imagem = document.getElementById("imagem");
const produtoForm = document.getElementById("produto-form");

//listas para armazenar os dados do formulário
const categorias = [];
const produtos = [];

//manipulando o evento de submit do formulário
produtoForm.addEventListener("submit", (event) => {
    //impedir de recarregar a página quando o evento de submit(envio) for chamado
    event.preventDefault();
    let camposPreenchidos = true;

    if(nome.value == ''){
        document.getElementById("erro-nome").style.display = 'block';
        camposPreenchidos = false;
    }else{
        document.getElementById("erro-nome").style.display = 'none';
    }

    //valida se o campo categoria esta vazio e exibe uma mensagem
    if(categoria.value == ''){
        document.getElementById("erro-categoria").style.display = "block";
        camposPreenchidos = false;
    } else {
        document.getElementById("erro-categoria").style.display = "none";
    }

    //valida se o campo preco esta vazio exibe uma mensagem
    if(preco.value == ''){
        document.getElementById("erro-preco").style.display = "block";
        camposPreenchidos = false;
    } else {
        document.getElementById("erro-preco").style.display = "none";
    }

    //valida se o campo quantidade esta vazio e exibe uma mensagem
    if(quantidade.value == ''){
        document.getElementById("erro-quantidade").style.display = "block";
        camposPreenchidos = false;
    } else {
        document.getElementById("erro-quantidade").style.display = "none";
    }

    //se existir algum campo não preenchido, ele encerra o meu evento,
    //e isso impede que a informação incorreta seja inserida no meu localstorage0
    if(camposPreenchidos == false){
        return 
    }

    //criando um objeto para armazenar os dados do formulário
    const produtoInserido = {
        nome: nome.value,
        categoria: categoria.value,
        preco: preco.value,
        quantidade: quantidade.value,
        imagem: imagem.value
    }

    //guardando esses dados novos na lista
    produtos.push(produtoInserido);

    //guardando a lista no localstorage, transformando os dados para json usando o JSON.stringify
    localStorage.setItem("nomeProduto", JSON.stringify(produtos));
});
