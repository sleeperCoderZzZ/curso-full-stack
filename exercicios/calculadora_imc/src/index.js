const pesoInput = document.getElementById('peso');
const alturaInput = document.getElementById('altura');
const calcularBtn = document.getElementById('calcular-btn');
const resultadoDiv = document.getElementById('resultado');

function calcularIMC(peso, altura) {
    return peso / (altura * altura);
}

function classificarIMC(imc) {
    if(imc < 18.5) {
        return 'Abaixo do peso';
    } else if(imc < 24.9) {
        return 'Peso normal';
    } else if(imc < 29.9) {
        return 'Sobrepeso';
    } else {
        return 'Obesidade';
    }
}

calcularBtn.addEventListener('click', () => {
    const peso = parseFloat(pesoInput.value);
    const altura = parseFloat(alturaInput.value); // Convertendo cm para metros

    console.log(`Peso: ${peso}, Altura: ${altura}`);

    if(isNaN(peso) || isNaN(altura) || altura <= 0) {
        resultadoDiv.innerHTML = '<p class="error">Por favor, insira valores válidos para peso e altura.</p>';
        return;
    }

    const imc = calcularIMC(peso, altura);
    const classificacao = classificarIMC(imc);

    resultadoDiv.innerHTML = `<p>Seu IMC é ${imc.toFixed(2)} (${classificacao})</p>`;
});