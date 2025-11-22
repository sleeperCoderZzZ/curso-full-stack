'use strict'

let divTimer = document.getElementById('timer-container');
let botaoParado = false;
let tempoComeco = 0;
let tempoPassado = 0;
let idInterval = null;

document.getElementById('botaoTimerContinuar').addEventListener('click', () => {

    if (idInterval !== null) return;

    divTimer.style.color = null;

    tempoComeco = Date.now() - tempoPassado;

    console.log(tempoComeco)

    idInterval = setInterval(atualizarCronometro, 1000);
})

document.getElementById('botaoTimerParar').addEventListener('click', () => {

    if (idInterval) {

        tempoPassado = Date.now() - tempoComeco;

        divTimer.style.color = 'red'

        clearInterval(idInterval);
        idInterval = null;

    }

})

document.getElementById('botaoTimerZerar').addEventListener('click', () => {

    zerarCronometro();

    divTimer.style.color = null;

    tempoPassado = 0;

    clearInterval(idInterval);
    idInterval = null;

})

function atualizarCronometro() {

    const tempoDecorrido = Date.now() - tempoComeco;

    let horas = Math.floor(tempoDecorrido / 3600000);
    let minutos = Math.floor((tempoDecorrido % 3600000) / 60000);
    let segundos = Math.floor((tempoDecorrido % 60000) / 1000);

    const horasFmt = String(horas).padStart(2, '0');
    const minutosFmt = String(minutos).padStart(2, '0');
    const segundosFmt = String(segundos).padStart(2, '0');

    const tempoTimer = `${horasFmt}:${minutosFmt}:${segundosFmt}`;

    divTimer.textContent = tempoTimer

    return tempoTimer
}

function zerarCronometro() {

    const tempoZerado = 0;

    let horas = Math.floor(tempoZerado / 3600000);
    let minutos = Math.floor((tempoZerado % 3600000) / 60000);
    let segundos = Math.floor((tempoZerado % 60000) / 1000);

    const horasFmt = String(horas).padStart(2, '0');
    const minutosFmt = String(minutos).padStart(2, '0');
    const segundosFmt = String(segundos).padStart(2, '0');

    const tempoTimerZerado = `${horasFmt}:${minutosFmt}:${segundosFmt}`;

    divTimer.textContent = tempoTimerZerado

    return tempoTimerZerado

}


