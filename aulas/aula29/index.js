const pessoa = {
    nome: 'joão',
    idade: 25,
    endereco: {
        rua: 'Rua imaginária',
        numero: 123
    }
}

//acessando propriedades de um objeto via ponto
//const nome = pessoa.nome;

const { nome } = pessoa; //atribuição via desestruturação

console.log(nome);