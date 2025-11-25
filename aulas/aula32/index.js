'use strict'
// filter --> sempre irá retornar um array com a mesma quantidade de elementos ou menos no final da execução

// retorne os números maiores que 10
const numeros = [8, 10, 50, 2, 12, 3, 27, 40];

const numerosFiltrados = numeros.filter((value, index, array) => {
    console.log(value, index, array);
    return value > 10;
})

console.log(numerosFiltrados);

//filtrar as pessoas com mais de 50 anos
//filtrar as pessoas com nome acima de 5 caractere
//filtrar as pessoas que terminam o nome com A

const pessoas = [
    {nome: 'Maria', idade: 65},
    {nome: 'tereza', idade: 70},
    {nome: 'isabeli', idade: 18},
    {nome: 'joão', idade: 30},
    {nome: 'matheus', idade: 18}
]

const pessoasFormatadas = pessoas.filter((value) => {
    return value.idade > 50 && value.nome.length > 5 && value.nome.toLowerCase().lastIndexOf('a', -1)
})

console.log(pessoasFormatadas[0])