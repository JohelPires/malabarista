/* Lógico_1: */


CREATE TABLE Usuario (
    id INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    nome TEXT
);
CREATE TABLE Conta (
    id INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    nome TEXT,
    descricao TEXT,
    saldo MONEY DEFAULT 0,
    idusuario INT REFERENCES Usuario(id)
);

CREATE TABLE Categoria (
    id INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    nome TEXT,
    icone TEXT
);

CREATE TABLE Transacao (
    id INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    idconta INT REFERENCES Conta(id),
    data_hora TIMESTAMPTZ DEFAULT NOW(),
    tipo CHAR, -- 'D' = despesa, 'R' = receita
    descricao TEXT,
    valor MONEY,
    frequencia CHAR, -- D = daily, W = Weekly, M = Monthly
    periodica BOOLEAN DEFAULT 'false',
    idcategoria INT REFERENCES Categoria(id)
);

CREATE TABLE transfere (
    fk_Conta_id INT REFERENCES Conta(id),
    fk_Conta_id2 INT REFERENCES Conta(id),
    data_hora TIMESTAMPTZ,
    valor MONEY,
    descricao TEXT
);