'use strict'

const divCalculadora = document.getElementById('calculadora-container');

function criarElemento(listaConfiguracao) {
    return {
        get renderizarCalculadora() {
            listaConfiguracao.forEach(config => {
                const elemento = document.createElement(config.tag);

                if (config.id) elemento.id = config.id;
                if (config.type) elemento.type = config.type;
                if (config.placeholder) elemento.placeholder = config.placeholder;
                if (config.classe) elemento.className = config.classe;
                if (config.readOnly) elemento.readOnly = true;
                if (config.text) elemento.innerText = config.text;

                if (config.value) elemento.value = config.value;
                if (config.command) elemento.dataset.command = config.command;

                if (config.tipo) elemento.dataset.tipo = config.tipo;

                divCalculadora.appendChild(elemento);
            })
        },
    }
};

const listaConfiguracao = [
    { tag: 'input', id: 'display', type: 'text', placeholder: '0', readOnly: true, classe: 'visor-calculadora' },

    { tag: 'button', type: 'button', id: 'btn-clear', text: 'C', command: 'limpar', classe: 'btn btn-clear' },
    { tag: 'button', type: 'button', id: 'btn-dividir', text: '÷', value: '/', tipo: 'operador', classe: 'btn btn-operador' },
    { tag: 'button', type: 'button', id: 'btn-multiplicar', text: '×', value: '*', tipo: 'operador', classe: 'btn btn-operador' },
    { tag: 'button', type: 'button', id: 'btn-backspace', text: '⌫', command: 'backspace', classe: 'btn btn-delete' },

    { tag: 'button', type: 'button', id: 'btn-7', text: '7', value: '7', tipo: 'numero', classe: 'btn btn-numero' },
    { tag: 'button', type: 'button', id: 'btn-8', text: '8', value: '8', tipo: 'numero', classe: 'btn btn-numero' },
    { tag: 'button', type: 'button', id: 'btn-9', text: '9', value: '9', tipo: 'numero', classe: 'btn btn-numero' },
    { tag: 'button', type: 'button', id: 'btn-subtrair', text: '-', value: '-', tipo: 'operador', classe: 'btn btn-operador' },

    { tag: 'button', type: 'button', id: 'btn-4', text: '4', value: '4', tipo: 'numero', classe: 'btn btn-numero' },
    { tag: 'button', type: 'button', id: 'btn-5', text: '5', value: '5', tipo: 'numero', classe: 'btn btn-numero' },
    { tag: 'button', type: 'button', id: 'btn-6', text: '6', value: '6', tipo: 'numero', classe: 'btn btn-numero' },
    { tag: 'button', type: 'button', id: 'btn-somar', text: '+', value: '+', tipo: 'operador', classe: 'btn btn-operador' },

    { tag: 'button', type: 'button', id: 'btn-1', text: '1', value: '1', tipo: 'numero', classe: 'btn btn-numero' },
    { tag: 'button', type: 'button', id: 'btn-2', text: '2', value: '2', tipo: 'numero', classe: 'btn btn-numero' },
    { tag: 'button', type: 'button', id: 'btn-3', text: '3', value: '3', tipo: 'numero', classe: 'btn btn-numero' },
    { tag: 'button', type: 'button', id: 'btn-igual', text: '=', command: 'calcular', classe: 'btn btn-igual' },

    { tag: 'button', type: 'button', id: 'btn-0', text: '0', value: '0', tipo: 'numero', classe: 'btn btn-numero btn-zero' },
    { tag: 'button', type: 'button', id: 'btn-ponto', text: '.', value: '.', tipo: 'numero', classe: 'btn btn-numero' }
];

divCalculadora.addEventListener('click', (evento) => {
    const elementoClicado = evento.target;

    if (elementoClicado.id === 'calculadora-container') return;

    const display = document.getElementById('display');

    const valor = elementoClicado.value;
    const acao = elementoClicado.dataset.command;
    const tipo = elementoClicado.dataset.tipo;

    const ultimoCaracter = display.value.slice(-1);
    const operadores = ['/', '*', '-', '+'];

    if (tipo === 'numero') {
        if (valor === '.') {
            const partes = display.value.split(/[\+\-\*\/]/);
            const numeroAtual = partes[partes.length - 1];

            if (numeroAtual.includes('.')) return;
        }

        if (display.value === '0' && valor !== '.') {
            display.value = valor;
        } else {
            display.value += valor;
        }
    }

    if (tipo === 'operador') {
        if (display.value === '' || display.value === '0') return;

        if (operadores.includes(ultimoCaracter)) {
            display.value = display.value.slice(0, -1) + valor;
        } else {
            display.value += valor;
        }
    }

    if (acao) {
        if (acao === 'limpar') {
            display.value = '0';
        }

        if (acao === 'backspace') {
            display.value = display.value.slice(0, -1);
            if (display.value === '') display.value = '0';
        }

        if (acao === 'calcular') {
            if (operadores.includes(ultimoCaracter)) return;

            try {
                const resultado = new Function('return ' + display.value)();

                if (!isFinite(resultado) || isNaN(resultado)) {
                    display.value = 'Erro';
                    setTimeout(() => display.value = '0', 1500);
                } else {
                    display.value = Number(resultado.toFixed(8)).toString();
                }
            } catch (erro) {
                display.value = 'Erro';
                setTimeout(() => display.value = '0', 1000);
            }
        }
    }
});

(function () {
    criarElemento(listaConfiguracao).renderizarCalculadora;
})();