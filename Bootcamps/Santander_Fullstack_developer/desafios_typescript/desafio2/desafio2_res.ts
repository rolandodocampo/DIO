// Como podemos melhorar o esse código usando TS? 
// Soluçao ao desafio2
enum Nome{
   'maria',
   'roberto',
   'laura',
   'carlos'
}

enum Profissao{
   'atriz',
   'padeiro'
}

interface Pessoa{
   nome: Nome,
   idade: number,
   profissao: Profissao
}

let Maria: Pessoa = {
   nome: Nome.maria,
   idade: 29,
   profissao: Profissao.atriz
};

let Roberto: Pessoa = {
   nome: Nome.roberto,
   idade: 19,
   profissao: Profissao.padeiro
}

let Laura: Pessoa = {
   nome: Nome.laura,
   idade: 32,
   profissao: Profissao.atriz
};

let Carlos: Pessoa = {
   nome: Nome.carlos,
   idade: 19,
   profissao: Profissao.padeiro
}