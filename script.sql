CREATE DATABASE FabulousPizzaria;

USE FabulousPizzaria;

CREATE TABLE Pedido (
    PedidoId INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    nomecliente VARCHAR(80),
    obs VARCHAR(200),
    telefone VARCHAR(20),
    rua VARCHAR(100),
    bairro VARCHAR(200),
    numerocasa INT,
    pagamento VARCHAR(30),
    sabor varchar(80)
);