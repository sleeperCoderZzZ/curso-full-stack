// for in -> Lẽ os indices de um array ou chaves de um objeto

const frutas = ['Maçã', 'Pera', 'Uva'];

const pessoa = {
    nome: 'João',
    idade: 19,
    peso: 70
}

for (let chave in pessoa) {
    console.log(chave, pessoa[chave]); // utilizando notação de colchetes para acessar o valor da chave
}


for (let i in frutas) {
    console.log(i, frutas[i]);
}

