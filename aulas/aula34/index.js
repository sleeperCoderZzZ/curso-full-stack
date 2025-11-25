// defineProperty

// function Produto (nome, valor, estoque) {
//     this.nome = nome;
//     this.valor = valor;

//     Object.defineProperty(this, 'estoque', {
//         enumerable: true, // mostra a chave do objeto
//         value: estoque, //define o valor da propriedade
//         writable: false, // Define se pode ou não alterar o valor da propriedade
//         configurable: false // Pode reconfigurar a chave
//     })
// }

// const produto1 = new Produto('camiseta', 80, 500);

// console.log(produto1);


// defineProperty --> getter e setters

function Produto (nome, valor, estoque) {
    this.nome = nome;
    this.valor = valor;

    let estoquePrivado = estoque;
    Object.defineProperty(this, 'estoque', {
        enumerable: true, // mostra a chave do objeto
        configurable: false, // Pode reconfigurar a chave
        get: function () {
            return estoquePrivado
        },
        set: function(value) {
            if (typeof value === 'Number') {
                throw new TypeError('Não é número');
            };

            estoquePrivado = value;
        }
    })
}

const produto1 = new Produto('camiseta', 80, 500);

console.log(produto1, produto1.estoque, produto1.estoque = 600);