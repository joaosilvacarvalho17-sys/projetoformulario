function salvarCarro(event) {
    
    event.preventDefault();
    let titulo = document.getElementById('title').value;
    let preco = document.getElementById('preco').value;
    let marca = document.getElementById('marca').value;
    let modelo = document.getElementById('modelo').value; 

    let cambioSelecionado = document.querySelector('input [name="marcha"]:checked');
    
    let cambio = cambioSelecionado ? cambioSelecionado.id : "Não informado";

    let carro = {
        titulo,
        preco,
        marca,
        modelo,
        cambio,
    };

    let carros = JSON.parse(localStorage.getItem("carros")) || [];
    carros.push(carro);
    localStorage.setItem("caros", JSON.stringify(carros));

    adcionarNaTela(carro);

    document.querySelector("form").reset();
}

function adicionarNaTela(carro) {
    let lista = document.getElementById('listaCarros')
    let card = document.createElement('div')
    card.classList.add('card');

    card.innerHTML = `
    <h3>${carro.titulo}</h3>
    <p><strong>Preço:</strong> R$ ${carro.preco}</p>
    <p><strong>Marca:</strong> R$ ${carro.marca}</p>
    <p><strong>Modelo:</strong> R$ ${carro.modelo}</p>
    <p><strong>Cambio:</strong> R$ ${carro.cambio}</p>
    `

        lista.appendChild(card)
}

window.pmlpad = function () {
    let carros = JSON.parse(localStorage.getItem('carros'))|| [];

    carros.forEach(carro => {
        adicionarNaTela(carro);
    });
}