'use strict'

const inputTextoTarefa = document.getElementById('input-texto');
const botaoAdicionarTarefa = document.getElementById('adicionar-tarefa');
const containerTarefas = document.getElementById('lista-item');

const STORAGE_KEY = 'minhaListaDeItens';

// Variável global para manter o estado da nossa lista
let listaDeTarefas = [];

// 1. Carregar itens ao iniciar
function carregarItens() {
    const itensSalvos = localStorage.getItem(STORAGE_KEY);
    if (itensSalvos) {
        listaDeTarefas = JSON.parse(itensSalvos);
        renderizarLista();
    }
}

// 2. Adicionar nova tarefa
botaoAdicionarTarefa.addEventListener('click', () => {
    const texto = inputTextoTarefa.value.trim();

    if (texto !== '') {
        const novaTarefa = {
            id: Date.now(), // Gera um ID único baseado no tempo
            nome: texto
        };

        listaDeTarefas.push(novaTarefa);
        salvarEAtualizar();

        // Limpar o input corretamente
        inputTextoTarefa.value = '';
        inputTextoTarefa.focus();
    }
});

// 3. Função principal que desenha a tela (Render)
function renderizarLista() {
    // Limpa a lista atual no HTML para não duplicar
    containerTarefas.innerHTML = '';

    listaDeTarefas.forEach(tarefa => {
        criarElementoVisual(tarefa);
    });
}

// 4. Criar o elemento HTML visualmente
function criarElementoVisual(tarefaObjeto) {
    let elementoTarefa = document.createElement("li");
    let textoTarefa = document.createElement("span"); // Span para o texto
    let botaoApagar = document.createElement("button");

    // Configurar o texto
    textoTarefa.textContent = tarefaObjeto.nome;

    // Configurar o botão
    botaoApagar.textContent = 'Apagar';
    botaoApagar.type = 'button';

    // *** AQUI ESTÁ A MÁGICA DO APAGAR ***
    // Adicionamos o evento direto ao criar o botão
    botaoApagar.addEventListener('click', () => {
        deletarTarefa(tarefaObjeto.id);
    });

    // Montar o HTML: Colocar o botão DENTRO do Li
    elementoTarefa.appendChild(textoTarefa);
    elementoTarefa.appendChild(botaoApagar);

    // Adicionar Li na lista
    containerTarefas.appendChild(elementoTarefa);
};

// 5. Função para salvar e redesenhar
function salvarEAtualizar() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(listaDeTarefas));
    renderizarLista();
}

// 6. Lógica de Remoção
function deletarTarefa(idParaRemover) {
    // Filtra a lista mantendo apenas quem tem ID diferente do removido
    listaDeTarefas = listaDeTarefas.filter(item => item.id !== idParaRemover);
    console.log("Item removido. Nova lista:", listaDeTarefas);

    salvarEAtualizar();
}

// Inicializar
carregarItens();