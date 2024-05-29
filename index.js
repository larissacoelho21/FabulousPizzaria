const express = require("express");
const exhbs = require("express-handlebars");
const mysql2 = require("mysql2");

//Express
const app = express();

//CSS
app.use(express.static("public"))

//configuração do middleware para verificar solicitações com o tipo de conteudo do corpo
app.use(    
    express.urlencoded ({
        extended: true
    })
)

//Configura o middleware para analisar solicitações com o tipo de conteúdo
            //middleware sao funcoes que fazem comunicação entre front e back
app.use(express.json());

//configurações do Handlebars
app.engine('handlebars', exhbs.engine());
app.set('view engine', 'handlebars');


//primeira rota
app.get('/', (req,res) => {
    //res.send('mandando informações na tela')
    res.render("home")
})

//segunda rota
app.get('/menu', (req,res) => {
    //res.send('mandando informações na tela')
    res.render("menu")
})

//conexao com banco de dados
const conn = mysql2.createConnection({
    host:'localhost',
    user: 'root',
    password:'root',
    database: 'FabulousPizzaria'
})

//Configuração do banco
conn.connect(function (err) {
    if(err) {
        console.log(err);
    }
    //porta e executando o projeto
    console.log('Banco de dados conectado')
    app.listen(3005)
})