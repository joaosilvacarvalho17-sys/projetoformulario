async function salvarCarros(event) {
    
    //impedir de recarregar a página
    event.preventDefault();

    let titulo = document.getElementById('title').value;
    let preco = document.getElementById('preco').value;
    let descricao = document.getElementById('descricao').value;
    let marca = document.getElementById('marca').value;
    let modelo = document.getElementById('modelo').value;
    let kilometragem = document.getElementById('kilometragem').value;
    let data_compra = document.getElementById('data-de-compra').value;

    let cambioSelecionado = document.querySelector('input[name="marcha"]:checked');

    let cambio = cambioSelecionado ? cambioSelecionado.id : "Não informado";

        let carro = {
        // id: Date.now(),
        titulo,
        preco,
        descricao,
        marca,
        modelo,
        kilometragem,
        data_compra,
        cambio
    };

    // let carros = JSON.parse(localStorage.getItem("carros")) || [];
    // carros.push(carro);
    // localStorage.setItem("carros", JSON.stringify(carros));

    // adicionarNaTela(carro);

    await fetch('http://localhost:3000/carros', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(carro)
});

    carregarCarros();

    document.querySelector("form").reset();
}

function adicionarNaTela(carro) {
    let lista = document.getElementById('listarCarros');
    let card = document.createElement('div');
    card.classList.add('card');

    card.innerHTML = `
    <img src="https://picsum.photos/250/150?random=${Math.random()}" width="100%">
    <h3>${carro.titulo}</h3>
    <p><strong>Preço:</strong> R$ ${carro.preco}</p>
    <p><strong>Marca:</strong> ${carro.marca}</p>
    <p><strong>Modelo:</strong> ${carro.modelo}</p>
    <p><strong>Câmbio:</strong> ${carro.cambio}</p>

    <button onclick="excluirCarro(${carro.id}, this)">Excluir</button>
    `;

    lista.appendChild(card);
}

window.onload = function () {

    carregarCarros();
    // let carros = JSON.parse(localStorage.getItem("carros")) || [];

    // carros.forEach(carro => {
    //     adicionarNaTela(carro);
    // });
}

async function carregarCarros() {
    let resposta = await fetch('http://localhost:3000/carros');

    let carros = await resposta.json();

    let lista = document.getElementById('listarCarros');
    lista.innerHTML = "";

    carros.forEach(carro => {
        adicionarNaTela(carro);
    });
}

async function excluirCarro(id, botao) {

    // let carros = JSON.parse(localStorage.getItem("carros")) || [];

    // remove do array
    // carros = carros.filter(carro => Number(carro.id) !== Number(id));

    // // salva atualizado
    // localStorage.setItem("carros", JSON.stringify(carros));
     await fetch(`http://localhost:3000/carros/${id}`, {
        method: 'DELETE'
    });

    // remove o card da tela (SEM redesenhar tudo)
    // let card = botao.parentElement;
    // card.remove();
    botao.parentElement.remove();
}
