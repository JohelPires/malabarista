INSERT INTO Usuario (nome) VALUES ('Johel Pires');

INSERT INTO Conta(nome,idusuario) VALUES ('Principal', 1);

-- categorias padrão:
INSERT INTO Categoria (nome) VALUES 
	('Mercado'),
	('Combustível'),
	('Alimentação'),
	('Presentes'),
	('Lazer'),
	('Educação'),
	('Casa'),
	('Saúde'),
	('Outros');

SELECT * FROM conta;

ALTER TABLE Transacao
ALTER COLUMN data_hora SET DEFAULT NOW();

ALTER TABLE Transacao
ALTER COLUMN periodica SET DEFAULT 'false';

ALTER TABLE Transacao
ALTER COLUMN tipo TYPE CHAR;

-- funções
CREATE OR REPLACE FUNCTION atualiza_saldo()
  RETURNS TRIGGER
  LANGUAGE plpgsql
AS $$
DECLARE
	saldoatual MONEY;
BEGIN
	SELECT saldo INTO saldoatual FROM conta WHERE id=NEW.idconta;
  IF TG_OP = 'INSERT' THEN
  	IF NEW.tipo = 'R' THEN
		saldoatual = saldoatual + NEW.valor;
		UPDATE conta
		SET saldoatual
		WHERE id = NEW.idconta;
	END IF;
  END IF;
  RETURN NEW;
END;
$$;

CREATE OR REPLACE TRIGGER update_saldo
	AFTER INSERT ON Transacao
	FOR EACH ROW EXECUTE FUNCTION atualiza_saldo();

-- inserindo transações
DELETE FROM transacao
SELECT * FROM transacao
SELECT * FROM conta
SELECT * FROM categoria

INSERT INTO Transacao(idconta, tipo, valor, idcategoria, descricao) VALUES
	(1, 'R', 480, 9, 'Pagamento de Moisés e Adriana'),
	(1, 'D', 10, 1, 'Abacaxi'),
	(1, 'D', 112.16, 1, 'Comper');

BEGIN TRANSACTION;
	UPDATE Conta
		SET saldo = saldo - 112.16::MONEY
		WHERE id=1;
END;


BEGIN TRANSACTION;
INSERT INTO Transacao(idconta, tipo, valor, idcategoria) VALUES
	(1, 'D', 35.51, 1);
UPDATE Conta
	SET saldo = saldo - 35.51::MONEY
	WHERE id=1;
END
--

-- get all accounts

SELECT * FROM Conta WHERE idusuario=1;

SELECT tipo, SUM(valor)
FROM Transacao
GROUP BY tipo

-- create account

INSERT INTO Conta (nome, descricao, saldo, idusuario) VALUES
	('NuBank', '', 300, 1);

-- delete account

DELETE FROM Conta WHERE id=2;

-- update account


-- list all transactions
SELECT * FROM transacao;

-- listar todas as receitas:
SELECT 
	c.nome AS Conta,
	t.valor,
	ct.nome AS Categoria,
	t.descricao,
	data_hora::DATE
FROM transacao t
	INNER JOIN Conta c ON c.id = t.idconta
	INNER JOIN Categoria ct ON t.idcategoria = ct.id
WHERE tipo='R'

-- listar despesas de hoje:
SELECT 
	c.nome AS Conta,
	t.valor,
	ct.nome AS Categoria,
	t.descricao,
	data_hora::DATE
FROM transacao t
	INNER JOIN Conta c ON c.id = t.idconta
	INNER JOIN Categoria ct ON t.idcategoria = ct.id
WHERE tipo='D'



-- list transactions by account
-- filter by day, week, month, year
-- filter by category
-- filter by transaction mode: one-time or periodic

-- adiciona transacao (despesa)

BEGIN TRANSACTION;
INSERT INTO Transacao(idconta, tipo, valor, idcategoria, descricao) VALUES
	(1, 'D', 0.01, 1, 'apenas para teste');
UPDATE Conta
	SET saldo = saldo - 0.01::MONEY
	WHERE id=1;
END;

-- deleta transacao (despesa) by id

BEGIN TRANSACTION;
UPDATE Conta
	SET saldo = saldo + (SELECT valor FROM Transacao WHERE id = 7)::MONEY
	WHERE id=1;
DELETE FROM Transacao WHERE id = 7;
END;

SELECT * FROM Transacao
SELECT * FROM conta
-- edit transaction

-- list all categories
-- add category
-- delete category
-- edit category