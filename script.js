// INFORMAÇÕES DO FORMULÁRIO
//armazenando em variáveis os campos do formulário
const nome = document.getElementById("nome");
const categoria = document.getElementById("categoria");
const preco = document.getElementById("preco");
const quantidade = document.getElementById("quantidade");
const imagem = document.getElementById("imagem");
const produtoForm = document.getElementById("produto-form");
const notificacao = document.getElementById("notificacao-conteudo");
const tbody = document.getElementById("produtos-lista");

//escondendo as notificação até que a função seja chamada
notificacao.style.display = 'none';

//listas para armazenar os dados do formulário
const categorias = [];
const produtos = [];

//função para exibir uma notificação
function exibirNotificacao (mensagem, status){
    //armazenando as variaveis, a viv e o span que guardam a mensagem de notificação 
    const messageEl = document.getElementById("notificacao-mensagem");

    //o textcontent ele é responsável por alterar o texto guardado no messageEl,
    //ou seja, o que está dentro do span no HTML
    messageEl.textContent = mensagem;

    if(status == 'sucesso'){
        notificacao.style.backgroundColor = '#dbead5';
        messageEl.style.color = '#103900';
    } else if(status === 'alerta'){
        notificacao.style.backgroundColor = '#ffffa0';
        messageEl.style.color = '#646600';
    } else if (status == 'erro') {
        notificacao.style.backgroundColor = '#fb6866';
        messageEl.style.color = '#470300';
    }

    notificacao.style.display = 'block';

    //esconde a notificação depois de 3 segundos
    setTimeout(() => {
        notificacao.style.display = 'none';
    }, 3000);
}

function verificaCampos() {
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
    if(quantidade.value == '' || quantidade.value == 0){
        document.getElementById("erro-quantidade").style.display = "block";
        camposPreenchidos = false;
    } else {
        document.getElementById("erro-quantidade").style.display = "none";
    }

    return camposPreenchidos;
}

//manipulando o evento de submit do formulário
produtoForm.addEventListener("submit", (event) => {
    //impedir de recarregar a página quando o evento de submit(envio) for chamado
    event.preventDefault();

    // verifica quantos campos foram preenchidos
    let totalCampos = 4;
    let preenchidos = 0;

    if (nome.value !== '') preenchidos++;
    if (categoria.value !== '') preenchidos++;
    if (preco.value !== '') preenchidos++;
    if (quantidade.value !== '') preenchidos++;

    if (preenchidos === 0) {
        verificaCampos();
        exibirNotificacao("Nenhum produto adicionado, preencha todos os campos!", 'erro');
        return;
    }

    if (preenchidos < totalCampos) {
        verificaCampos();
        exibirNotificacao("Faltam alguns campos serem preenchidos!", 'alerta');
        return;
    }

    verificaCampos(); 
    exibirNotificacao("Produto cadastrado com sucesso!", 'sucesso');

    //criando um objeto para armazenar os dados do formulário
    const produtoInserido = {
        nome: nome.value,
        categoria: categoria.value,
        preco: preco.value,
        quantidade: quantidade.value,
        imagem: imagem.value
    }


    //pegando dos produtos que já foram salvos no localStorage
    let produtosSalvos = JSON.parse(localStorage.getItem("nomeProduto")) || [];

    //guardando esses dados novos na lista
    produtosSalvos.push(produtoInserido);

    //guardando a lista no localstorage, transformando os dados para json usando o JSON.stringify
    localStorage.setItem("nomeProduto", JSON.stringify(produtosSalvos));

    //limpando os campos do formulário
    produtoForm.reset();

    adicionarItemTabela();

    // Mostrar no console
    // console.log("Produto inserido:", produtoInserido);
    // console.log("Lista de produtos atual:", produtos);
});

function adicionarItemTabela() {
    const semProdutosDiv = document.getElementById("sem-produtos");
    let produtos = JSON.parse(localStorage.getItem("nomeProduto")) || [];

    let valoresTabela = '';

    //verifica se tem algum produto
    if(produtos.length > 0) {
        semProdutosDiv.style.display = 'none';
    }
    
    produtos.forEach(produto => {
        console.log(produto);
        valoresTabela += `
            <tr>
                <td></td>
                <td>${produto.nome}</td>
                <td>${produto.categoria}</td>
                <td>${produto.preco}</td>
                <td>${produto.quantidade}</td>
            </tr>
        `
    });

    tbody.innerHTML = valoresTabela
}

adicionarItemTabela();