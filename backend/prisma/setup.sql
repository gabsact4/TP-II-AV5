-- Criar banco se não existir
CREATE DATABASE IF NOT EXISTS atlantis
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE atlantis;

-- Tabela de clientes
CREATE TABLE IF NOT EXISTS clientes (
  id             INT AUTO_INCREMENT PRIMARY KEY,
  nome           VARCHAR(255) NOT NULL,
  nomeSocial     VARCHAR(255),
  dataNascimento DATETIME,
  dataCadastro   DATETIME NOT NULL DEFAULT NOW()
);

-- Tabela de acomodações
CREATE TABLE IF NOT EXISTS acomodacoes (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  numero      VARCHAR(10) NOT NULL UNIQUE,
  tipo        VARCHAR(50) NOT NULL,
  capacidade  INT NOT NULL,
  precoDiaria DOUBLE NOT NULL,
  andar       INT NOT NULL,
  descricao   TEXT,
  status      VARCHAR(30) NOT NULL DEFAULT 'Disponível'
);

-- Tabela de hospedagens
CREATE TABLE IF NOT EXISTS hospedagens (
  id           INT AUTO_INCREMENT PRIMARY KEY,
  clienteId    INT NOT NULL,
  acomodacaoId INT NOT NULL,
  checkIn      DATETIME NOT NULL,
  checkOut     DATETIME NOT NULL,
  status       VARCHAR(30) NOT NULL DEFAULT 'Ativa',
  valorTotal   DOUBLE NOT NULL DEFAULT 0,
  observacoes  TEXT,
  FOREIGN KEY (clienteId)    REFERENCES clientes(id),
  FOREIGN KEY (acomodacaoId) REFERENCES acomodacoes(id)
);

-- Dados de exemplo (opcional)
INSERT IGNORE INTO acomodacoes (numero, tipo, capacidade, precoDiaria, andar, descricao, status) VALUES
  ('101', 'Standard',     2, 280,  1, 'Quarto standard com vista para o jardim', 'Disponível'),
  ('201', 'Luxo',         2, 480,  2, 'Quarto luxo com varanda e vista para o mar', 'Disponível'),
  ('301', 'Suite',        4, 850,  3, 'Suite espaçosa com sala de estar', 'Disponível'),
  ('401', 'Presidencial', 6, 2200, 4, 'Suite presidencial com terraço privativo', 'Disponível');
