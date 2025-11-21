'use strict'
import readline from 'readline';

function maiorNumero (n1, n2) {
    if (n1 > n2) {
        return n1
    } else {
        return n2
    }
}

var n1 = 0
var n2 = 0

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

rl.question('Informe o primeiro número: ', (answer1) => {
    n1 = parseFloat(answer1.replace(',', '.'))
    rl.question('Informe o segundo número: ', (answer2) => {
        n2 = parseFloat(answer2.replace(',', '.'))
        rl.close()
        console.log('O maior número foi de: ', maiorNumero(n1, n2))
    })
})

