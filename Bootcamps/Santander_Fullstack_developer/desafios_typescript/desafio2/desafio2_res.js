"use strict";
// Como podemos melhorar o esse código usando TS? 
// Soluçao ao desafio2
var Nome;
(function (Nome) {
    Nome[Nome["maria"] = 0] = "maria";
    Nome[Nome["roberto"] = 1] = "roberto";
    Nome[Nome["laura"] = 2] = "laura";
    Nome[Nome["carlos"] = 3] = "carlos";
})(Nome || (Nome = {}));
var Profissao;
(function (Profissao) {
    Profissao[Profissao["atriz"] = 0] = "atriz";
    Profissao[Profissao["padeiro"] = 1] = "padeiro";
})(Profissao || (Profissao = {}));
let Maria = {
    nome: Nome.maria,
    idade: 29,
    profissao: Profissao.atriz
};
let Roberto = {
    nome: Nome.roberto,
    idade: 19,
    profissao: Profissao.padeiro
};
let Laura = {
    nome: Nome.laura,
    idade: 32,
    profissao: Profissao.atriz
};
let Carlos = {
    nome: Nome.carlos,
    idade: 19,
    profissao: Profissao.padeiro
};
