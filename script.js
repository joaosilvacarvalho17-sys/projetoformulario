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