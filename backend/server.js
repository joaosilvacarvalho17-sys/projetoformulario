const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

//conexão com banco
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', // sua senha
    database: 'loja_carro'
});

// 🔹 TESTE
app.get('/', (req, res) => {
    res.send('API funcionando');
});


// SALVAR CARRO
app.post('/carros', (req, res) => {

    const { titulo, preco, descricao, marca, modelo, kilometragem, data_compra, cambio } = req.body;

    const sql = `
        INSERT INTO carros 
        (titulo, preco, descricao, marca, modelo, kilometragem, data_compra, cambio)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(sql, [titulo, preco, descricao, marca, modelo, kilometragem, data_compra, cambio], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send('Erro');
        } else {
            res.send(result);
        }
    });
});


//LISTAR CARROS
app.get('/carros', (req, res) => {

    db.query('SELECT * FROM carros', (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(result);
        }
    });

});


// EXCLUIR
app.delete('/carros/:id', (req, res) => {

    const id = req.params.id;

    db.query('DELETE FROM carros WHERE id = ?', [id], (err) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send('Deletado');
        }
    });

});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
