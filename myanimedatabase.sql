CREATE TABLE Anime (

    id_anime INT PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(100) NOT NULL,
    ano_lancamento INT NOT NULL

);

CREATE TABLE Personagem (
    id_personagem INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL, 
    id_anime INT,
    FOREIGN KEY (id_anime) REFERENCES Anime(id_anime)

);

CREATE TABLE Anime_Genero (
    id_anime INT,
    id_genero INT,
    FOREIGN KEY (id_anime) REFERENCES Anime(id_anime),
    FOREIGN KEY (id_genero) REFERENCES Genero(id_genero),
    PRIMARY KEY (id_anime, id_genero)
);

--inserçao

INSERT INTO Anime (titulo, ano_lancamento) VALUES ('Naruto', 2002);
INSERT INTO Anime (titulo, ano_lancamento) VALUES ('Attack on Titan', 2013);

--inserindo personagens

INSERT INTO Personaagem (nome, id_anime) VALUES ('Naruto Uzumaki', 1);
INSERT INTO Personagem (nome, id_anime) VALUES ('Eren Yeager', 2);

--inserindo generos

INSERT INTO Genero (descricao) VALUES ('Shounen');
INSERT INTO Genero (descricao) VALUES ('Açao');
INSERT INTO Genero (descricao) VALUES ('Fantasia');

--

--relacionamento anime-genero

INSERT INTO Anime_Genero (id_anime, id_genero) VALUES (1,1);
INSERT INTO Anime_Genero (id_anime, id_genero) VALUES (1,2);
INSERT INTO Anime_Genero (id_anime, id_genero) VALUES (2,1);
INSERT INTO Anime_Genero (id_anime, id_genero) VALUES (2,3);

--

--consultas

SELECT A.titulo, P.nome AS personagem
FROM Anime A
JOIN Personagem P ON A.id_anime = P.id_anime;

--animes por genero

SELECT A.titulo, G.descricao AS genero
FROM Anime A
JOIN Anime_Genero AG ON A.id_anime = AG.id_anime
JOIN Genero G ON AG.id_genero = G.id_genero;

--numero de animes por genero

SELECT G.descricao AS genero, COUNT(A.id_anime) AS total_animes
FROM Genero G
JOIN Anime_Genero AG ON G.id_genero = AG.id_genero
JOIN Anime A  ON AG.id_anime = A.id_anime
GROUP BY G.descricao;    