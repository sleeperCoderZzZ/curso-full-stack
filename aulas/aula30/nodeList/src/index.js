const containerDiv = document.querySelector('.container-div');
const colectionP = document.querySelectorAll('p');
const estiloBody = getComputedStyle(document.body);

for (let i = 0; i < colectionP.length; i++) {
    colectionP[i].style.backgroundColor = estiloBody.backgroundColor;
    colectionP[i].style.color = estiloBody.color;
}

console.log(containerDiv);
console.log(colectionP);

