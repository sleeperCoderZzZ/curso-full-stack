const botaoCodificar = document.getElementById('botao-codificar');
const botaoDecodificar = document.getElementById('botao-decodificar');
const inputTexto = document.getElementById('input-texto');
const divResposta = document.getElementById('div-resposta');

function decodificar(texto) {
    let resposta = '';
    for (let letra of texto) {
        const codigoLetra = letra.charCodeAt(0);
        const codigoLetraCodificada = codigoLetra - 3;
        const letraCodificada = String.fromCharCode(codigoLetraCodificada);
        resposta += letraCodificada;
    }
    return resposta;
}

function clicarBotaoCodificar() {
    const texto = inputTexto.value;
    const textoCodificado = codificar(texto);
    divResposta.textContent = textoCodificado;
}


function clicarBotaoDecodificar() {
    const texto = divResposta.textContent;
    console.log('divRespota: ', divResposta.textContent);
    console.log('texto: ', texto);
    const textoDecodificado = decodificar(texto);
    console.log('textoDecodificado: ', textoDecodificado);
    divResposta.textContent = textoDecodificado

}

function codificar(texto) {
    let resposta = '';
    for (let letra of texto) {
        const codigoLetra = letra.charCodeAt(0);
        const codigoLetraCodificada = codigoLetra + 3;
        const letraCodificada = String.fromCharCode(codigoLetraCodificada);
        resposta += letraCodificada;
    }
    return resposta;
}