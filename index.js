// Importando as bibliotecas necessárias
const express = require("express"); // Importa o framework Express para criar e gerenciar um servidor web.
const exphbs = require("express-handlebars"); // Importa o Express Handlebars, um mecanismo de visualização para renderizar páginas HTML.
const mysql2 = require("mysql2"); // Importa o MySQL2, uma biblioteca para conectar e interagir com um banco de dados MySQL.

// Criação de uma instância do Express
const app = express(); // Cria uma aplicação Express, que será nosso servidor web.

// Configurando o middleware para servir arquivos estáticos
app.use(express.static("public")); // Define o diretório "public" como o local para arquivos estáticos, como CSS, JavaScript e imagens.

// Configuração do middleware para verificar solicitações com o tipo de conteúdo do corpo
app.use(
  express.urlencoded({
    extended: true,
  })
);

// Configura o middleware para analisar solicitações com o tipo de conteúdo JSON
app.use(express.json());

// Configurações do Handlebars
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");

// Primeira rota
app.get("/", (req, res) => {
  res.render("home");
});

// Segunda rota
app.get("/menu", (req, res) => {
  res.render("menu");
});

// Definindo uma rota GET para "/pedidos"
app.get("/pedidos", (req, res) => {
  const sql = "SELECT * FROM Pedido"; // Consulta SQL para selecionar todos os registros da tabela "Pedido"
  conn.query(sql, function (err, data) { // Executa a consulta no banco de dados
    if (err) { // Verifica se houve algum erro na execução da consulta
      console.log(err); // Se houver um erro, ele é registrado no console
      return; // Encerra a execução da função em caso de erro
    }

    const lista = data; // Armazena o resultado da consulta em uma variável "lista"
    res.render("pedidos", { lista }); // Renderiza a página "pedidos" usando o mecanismo de visualização, passando a "lista" como dados
  });
});

// Rota para a página de adicionar pedido
app.get("/adicionar", (req, res) => {
  res.render("adicionarPedido");
});

// Definindo uma rota POST para "/pedidos/adicionarpedidos"
app.post("/pedidos/adicionarpedidos", (req, res) => {
  // Extraindo dados do corpo da requisição
  const nomecliente = req.body.nomecliente;
  const telefone = req.body.telefone;
  const sabor = req.body.sabor;
  const pagamento = req.body.pagamento;
  const rua = req.body.rua;
  const bairro = req.body.bairro;
  const numerocasa = req.body.numerocasa;
  const obs = req.body.obs;

  // Query SQL para cadastrar o pedido
  const sql = `INSERT INTO Pedido (nomecliente, telefone, sabor, pagamento, rua, bairro, numerocasa, obs) VALUES
    ('${nomecliente}', '${telefone}', '${sabor}', '${pagamento}', '${rua}', '${bairro}', '${numerocasa}', '${obs}')`;

  // Executando a query no banco de dados
  conn.query(sql, function (err) {
    if (err) {
      console.log("Erro", err); // Loga o erro no console se ocorrer
      res.status(500).send("Erro ao adicionar pedido, por favor tente novamente!"); // Envia uma resposta de erro ao cliente
      return; // Encerra a execução da função em caso de erro
    }

    res.redirect("/pedidos"); // Redireciona o cliente para a página de pedidos após o sucesso
  });
});


// Definindo uma rota GET para "/lista/:id"
app.get("/lista/:id", (req, res) => {
  const id = req.params.id; // Obtendo o ID do pedido a partir dos parâmetros da URL
  const sql = `SELECT * FROM Pedido WHERE PedidoId = ${id}`; // Query SQL para selecionar o pedido com o ID especificado

  conn.query(sql, function (err, data) { // Executando a query no banco de dados
    if (err) { // Verifica se houve algum erro na execução da query
      console.log(err); // Loga o erro no console se ocorrer
      res.status(500).send("Erro ao buscar detalhes do pedido, por favor tente novamente!"); // Envia uma resposta de erro ao cliente
      return; // Encerra a execução da função em caso de erro
    }

    const detalhes = data[0]; // Armazena o primeiro (e único) resultado da query na variável "detalhes"

    res.render("detalhes", { detalhes }); // Renderiza a página "detalhes" passando os detalhes do pedido
  });
});


// Definindo uma rota GET para "/detalhes/editar/:id"
app.get("/detalhes/editar/:id", (req, res) => {
  const id = req.params.id; // Obtendo o ID do pedido a partir dos parâmetros da URL
  const sql = `SELECT * FROM Pedido WHERE PedidoId = ${id}`; // Query SQL para selecionar o pedido com o ID especificado

  conn.query(sql, function (err, data) { // Executando a query no banco de dados
    if (err) { // Verifica se houve algum erro na execução da query
      console.log(err); // Loga o erro no console se ocorrer
      return; // Encerra a execução da função em caso de erro
    }

    const listaDetalhes = data[0]; // Armazena o primeiro (e único) resultado da query na variável "listaDetalhes"

    res.render("editar", { listaDetalhes }); // Renderiza a página "editar" passando os detalhes do pedido
  });
});

app.post("/detalhes/update", (req, res) => {
  const id = req.body.PedidoId;
  const nomecliente = req.body.nomecliente;
  const telefone = req.body.telefone;
  const rua = req.body.rua;
  const bairro = req.body.bairro;
  const numerocasa = req.body.numerocasa;
  const obs = req.body.obs;

  const sql = `UPDATE Pedido SET
      nomecliente = '${nomecliente}',
      telefone = '${telefone}',
      rua = '${rua}',
      bairro = '${bairro}',
      numerocasa = '${numerocasa}',
      obs = '${obs}'      
      WHERE PedidoId = '${id}'`;

  conn.query(sql, function (err) {
    if (err) {
      console.log("erro", err);
      return;
    }

    res.redirect("/pedidos");
  });
});

// Definindo uma rota POST para "/pedidos/remove/:id"
app.post("/pedidos/remove/:id", (req, res) => {
  const id = req.params.id; // Obtendo o ID do pedido a partir dos parâmetros da URL
  const sql = `DELETE FROM Pedido WHERE PedidoId = ${id}`; // Query SQL para deletar o pedido com o ID especificado

  // Executando a query no banco de dados
  conn.query(sql, function (err, data) {
    if (err) { // Verifica se houve algum erro na execução da query
      console.log(err); // Loga o erro no console se ocorrer
    }

    res.redirect("/pedidos"); // Redireciona o cliente para a página de pedidos após o sucesso ou falha na remoção
  });
});


// Conexão com banco de dados
const conn = mysql2.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "FabulousPizzaria",
});

// Configuração do banco
conn.connect(function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log("Banco de dados conectado");
    app.listen(3005, () => {
      console.log("Servidor rodando na porta 3005");
    });
  }
});
