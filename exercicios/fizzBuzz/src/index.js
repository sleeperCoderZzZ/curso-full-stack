'use strict'

const inputNumero = document.getElementById('input-numero');
const divResposta = document.getElementById('resposta');

document.getElementById('botaoVerificadorDivisao').addEventListener('click', (evento) => {
    console.log('valor input: ', inputNumero.valueAsNumber);
    const resultadoFuncao = verificarDivisao(inputNumero.valueAsNumber);
    
    if (resultadoFuncao == 'Fizz' || resultadoFuncao == 'Buzz') {
        divResposta.innerHTML = `<p>O Resultado é: ${resultadoFuncao}</p>`;
    } else {
        divResposta.innerHTML = `<p>O resultado não é divivel por 3 e nem por 5: ${resultadoFuncao}</p>`
    }
    
})

function verificarDivisao(numeroDivisao) {
    if (!isNaN(numeroDivisao)) {
        if (numeroDivisao >= 0  && numeroDivisao <= 100) {
            if (numeroDivisao % 3 == 0) {
                const eFizz = 'Fizz';
                return eFizz;
            } else if (numeroDivisao % 5 == 0) {
                const eBuzz = 'Buzz';
                return eBuzz;
            } else {
                return numeroDivisao;
            };
        } else {
            const mensagemErro = 'Fora do range de 100 paizão'
            return mensagemErro
        }
    } else {
        const mensagemErro = 'Não é um número paizão'
        return mensagemErro
    }
};