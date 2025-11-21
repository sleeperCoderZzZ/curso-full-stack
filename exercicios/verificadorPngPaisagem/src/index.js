'use strict'

let dadosImagemBase64 = null;

const divResposta = document.getElementById('resposta');

document.getElementById('input-img').addEventListener('change', (evento) => {
    if (!evento.target.files.length) return;

    reader(evento.target.files[0], (err, res) => {
        if (err) {
            console.error('Erro ao ler arquivo:', err);
            return;
        }

        dadosImagemBase64 = res;
    });
});

document.getElementById('botaoCalcularTamanho')
.addEventListener('click', async () => {

    const tamanho = extrairTamanhoArquivo(dadosImagemBase64);
    const resolucao = await obterResolucaoArquvio(dadosImagemBase64);
    const ePaisagem = resolucao.largura > resolucao.altura ? 'Sim' : 'Não'        

    divResposta.innerHTML = `
        É paisagem ? ${ePaisagem} <br>
        Resolução: ${resolucao.largura} × ${resolucao.altura}<br>
        Tamanho aproximado: ${tamanho} bytes
    `;
});

function reader(file, callback) {
    const fr = new FileReader();
    fr.onload = () => callback(null, fr.result);
    fr.onerror = (err) => callback(err);
    fr.readAsDataURL(file);
}

function extrairTamanhoArquivo(base64) {
    if (!base64) return 0;
    return Math.ceil((base64.length * 3) / 4) - 2;
}

function obterResolucaoArquvio(base64) {
    return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
            resolve({
                largura: img.width,
                altura: img.height
            });
        };
        img.src = base64;
    });
}
