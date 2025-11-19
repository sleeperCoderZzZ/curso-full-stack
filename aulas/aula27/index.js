// Operação ternária
// condicional ? expres1 : expres2
// if condicional is true execute express1 else false execute express2

const pontuacaoUsuario = 1000;

//estrutura com operador ternário
const nivelUsuario = pontuacaoUsuario >= 1000 ? 'Usuário VIP' : 'Usuário normal';


const corUsuario = null;
const corPadrao = corUsuario || 'Preto';


console.log(nivelUsuario, corPadrao);



// Estrutura if/else padrão
if(pontuacaoUsuario >= 1000) {
    console.log('Usuário VIP');
} else {
    console.log('Usuário normal');
}