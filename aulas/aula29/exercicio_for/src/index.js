const elementoContainer = document.getElementById('div-container');

const listaElementos = [
    {tag: 'p', texto: 'Frase 1'},
    {tag: 'div', texto: 'Frase 2'},
    {tag: 'footer', texto: 'Frase 3'},
    {tag: 'section', texto: 'Frase 4'}
]

for (let i = 0; i < listaElementos.length; i++) {
    const { tag, texto } = listaElementos[i];
    const elementoCriado = criarElemento(tag, texto);
    elementoContainer.appendChild(elementoCriado);
};

function criarElemento(tag, texto) {
    const elemento = document.createElement(tag);
    elemento.innerText = texto;
    return elemento;
}