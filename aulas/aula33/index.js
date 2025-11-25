// map --> sempre terá o mesmo tamanho do array original
// Não altera o array original, e sim cria um outro baseado.

//dobrar os numeros

const numeros = [2, 4, 6, 8, 10, 12];

const numerosDobrados = numeros.map((value) => value * 2);

// console.log(numerosDobrados);

//Para cada elemento
//Retorne apenas string com o nome da pessoa
//Remova apenas a chave "nome" do objeto
//adicione uma chave id emm cada obejto

const pessoas = [
    { nome: 'Maria Tereza', idade: 70},
    { nome: 'Gustavo Rosa', idade: 30},
    { nome: 'João Pedro', idade: 45},
    { nome: 'Mariane Arruda', idade: 27},
    { nome: 'Elisa', idade: 9}
]

const pessoasNome = pessoas.map(value => value.nome);
const pessoasSemNome = pessoas.map(function (value) {
    delete value.nome
    return value;
});
const pessoasComId = pessoas.map((value, index) => value.id = index);

//console.log(pessoasNome, pessoasSemNome, pessoasComId);


const somaPares = numeros.filter( value => value % 2 === 0).map(value => value * 2).reduce((acc, value) => acc += value);

console.log(somaPares);