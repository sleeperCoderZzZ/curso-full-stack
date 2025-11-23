function comecoFrase (comeco) {
    function restoFrase (resto) {
        return comeco + '' + resto
    };

    return restoFrase;
};

const olaMundo = comecoFrase('Olá')(' resto')//.restoFrase('mundo!');

console.log(olaMundo);
console.log(comecoFrase('ola'));