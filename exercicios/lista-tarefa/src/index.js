'use strict'

const inputTextoTarefa = document.getElementById('input-texto');
const botaoAdicionarTarefa = document.getElementById('adicionar-tarefa');
const containerTarefas = document.getElementById('lista-item');

const STORAGE_KEY = 'minhaListaDeItens';

let listaDeTarefas = [];

function carregarItens() {
    const itensSalvos = localStorage.getItem(STORAGE_KEY);
    if (itensSalvos) {
        listaDeTarefas = JSON.parse(itensSalvos);
        renderizarLista();
    }
}

botaoAdicionarTarefa.addEventListener('click', () => {
    const texto = inputTextoTarefa.value.trim();

    if (texto !== '') {
        const novaTarefa = {
            id: Date.now(),
            nome: texto
        };

        listaDeTarefas.push(novaTarefa);
        salvarEAtualizar();

        inputTextoTarefa.value = '';
        inputTextoTarefa.focus();
    }
});

function renderizarLista() {
    containerTarefas.innerHTML = '';

    listaDeTarefas.forEach(tarefa => {
        criarElementoVisual(tarefa);
    });
}

function criarElementoVisual(tarefaObjeto) {
    let elementoTarefa = document.createElement("li");
    let textoTarefa = document.createElement("span");
    let botaoApagar = document.createElement("button");

    textoTarefa.textContent = tarefaObjeto.nome;

    botaoApagar.textContent = 'Apagar';
    botaoApagar.type = 'button';

    botaoApagar.addEventListener('click', () => {
        deletarTarefa(tarefaObjeto.id);
    });

    elementoTarefa.appendChild(textoTarefa);
    elementoTarefa.appendChild(botaoApagar);

    containerTarefas.appendChild(elementoTarefa);
};

function salvarEAtualizar() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(listaDeTarefas));
    renderizarLista();
}

function deletarTarefa(idParaRemover) {
    listaDeTarefas = listaDeTarefas.filter(item => item.id !== idParaRemover);
    console.log("Item removido. Nova lista:", listaDeTarefas);

    salvarEAtualizar();
}

carregarItens();