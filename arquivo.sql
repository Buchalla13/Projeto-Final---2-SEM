DROP DATABASE IF EXISTS projeto_final_bd;
CREATE DATABASE projeto_final_bd;
USE projeto_final_bd;

CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    tipo ENUM('cliente', 'funcionario', 'admin') DEFAULT 'cliente',
    cpf VARCHAR(14) UNIQUE,
    telefone VARCHAR(15),
    endereco TEXT);
    
    CREATE TABLE IF NOT EXISTS categorias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(50) NOT NULL,
    descricao TEXT
);

    CREATE TABLE IF NOT EXISTS produtos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT,
    preco DECIMAL(10,2) NOT NULL,
    categoria_id INT,
    marca VARCHAR(50),
    tamanho VARCHAR(10),
    cor VARCHAR(20),
    imagem VARCHAR(255),
    ativo BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (categoria_id) REFERENCES categorias(id)
);

CREATE TABLE IF NOT EXISTS vendas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT,
    total DECIMAL(10,2) NOT NULL,
    status ENUM('pendente', 'pago', 'enviado', 'entregue', 'cancelado') DEFAULT 'pendente',
    forma_pagamento ENUM('cartao', 'boleto', 'pix', 'sodexo'),
    endereco_entrega TEXT,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

CREATE TABLE IF NOT EXISTS itens_venda (
    id INT AUTO_INCREMENT PRIMARY KEY,
    venda_id INT,
    produto_id INT,
    quantidade INT NOT NULL,
    preco_unitario DECIMAL(10,2) NOT NULL,
    subtotal DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (venda_id) REFERENCES vendas(id) ON DELETE CASCADE,
    FOREIGN KEY (produto_id) REFERENCES produtos(id)
);

INSERT INTO categorias (nome, descricao) VALUES 
('Vestimentas', 'Camisas, Blusas, Calças, Shorts, Tênis'),
('Acessórios', 'Bolas, luvas, equipamentos'),
('Decorativos', 'Quadros, Posters, Luminárias, Estátuas');

INSERT INTO produtos (nome, descricao, preco, categoria_id, marca, tamanho, cor, imagem) VALUES 
('Camisa Brasil 2024', 'Camisa oficial da seleção brasileira', 299.90, 1, 'Nike', 'M', 'Amarela', 'camisa_brasil.jpeg'),
('Tênis Nike Revolution', 'Tênis para corrida e caminhada', 249.90, 1, 'Nike', '42', 'Preto', 'nike_revolution.jpeg'),
('Bola de Futebol Society', 'Bola oficial para society', 89.90, 2, 'Adidas', 'Único', 'Branco', 'bola_society.jpeg'),
('Short de Treino', 'Short confortável para exercícios', 59.90, 1, 'Olympikus', 'M', 'Azul', 'shorts_treino.jpeg');

select * from produtos
