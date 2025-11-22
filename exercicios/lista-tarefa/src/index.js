'use strict'
const inputTextoTarefa = document.getElementById('input-texto');
const botaoAdicionarTarefa = document.getElementById('adicionar-tarefa');
const containerTarefas = document.getElementById('lista-item');
let idElemento = 0;

const STORAGE_KEY = 'minhaListaDeItens';

botaoAdicionarTarefa.addEventListener('click', () => {
    console.log(inputTextoTarefa.value);
    console.log(botaoAdicionarTarefa);
    console.log(containerTarefas);

    const elementoCriado = adicionarItem(inputTextoTarefa.value, containerTarefas);

    console.log(elementoCriado)
})

function carregarItens() {
    const itensSalvos = localStorage.getItem(STORAGE_KEY);
    if (itensSalvos) {
        const itens = JSON.parse(itensSalvos);
        itens.forEach(itemText => criarElemento(itemText));
    }
}

function adicionarItem(itemInput) {
    const itemText = itemInput.trim();
    if (itemText !== '') {
        criarElemento(itemText);
        salvarElementoCache();
        itemInput = '';
    }
}


function criarElemento(nomeTarefa) { 
    let elementoTarefa = document.createElement("li");
    let botaoApagar = document.createElement("button");

    elementoTarefa.textContent = `{nome: ${nomeTarefa}, id: ${idElemento} }`
    botaoApagar.value = idElemento

    idElemento++;

    containerTarefas.appendChild(elementoTarefa);
    containerTarefas.appendChild(botaoApagar);
    
    salvarElementoCache();

};

function salvarElementoCache () {
    const itens = [];
    containerTarefas.querySelectorAll('li').forEach(li => {
        itens.push(li.textContent);
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(itens));
}

function deletarELementoCache(idRemocao) {
    const itensCache = localStorage.getItem(STORAGE_KEY);

    const listaCache = JSON.parse(itensCache)
    
    const listaAtualizada = listaCache.filter(item => item.id !== idRemocao);

    console.log("olha aqui!!!!", listaAtualizada)

}

//carregarItens();

deletarELementoCache();