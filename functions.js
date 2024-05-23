const { fileURLToPath } = require('url');
const path = require('path');
const fs = require('fs');

const fs = require('fs').promises;

function sortearDezenas(){
    var listaSorteada = [];
    var i = 0;
    while (i < 6){
        var numeroSorteado = Math.floor(Math.random() * 60) + 1;
        var numeroFormatado = numeroSorteado.toString().padStart(2, '0');
        if (!listaSorteada.includes(numeroFormatado)){
            listaSorteada.push(numeroFormatado);
            i++
        }
    }
    return listaSorteada

}

async function sortearJogoDoBicho() {
    let numero_completo = '';

    for (let i = 0; i < 5; i++) {
        const grupo_animal_sorteado_cabeca = Math.floor(Math.random() * 25) + 1;
        const grupo_animal_sorteado_animal = Math.floor(Math.random() * 25) + 1;
        let grupo_posicao_numero = Math.floor(Math.random() * 4);

        const data = JSON.parse(await fs.readFile('animal.json', 'utf-8'));

        let animal_selecionado = data.animais.find(animal => animal.numero_grupo === grupo_animal_sorteado_cabeca);
        const numero_cabeca = animal_selecionado.numeros_animal[grupo_posicao_numero];

        grupo_posicao_numero = Math.floor(Math.random() * 4);
        animal_selecionado = data.animais.find(animal => animal.numero_grupo === grupo_animal_sorteado_animal);
        const numero_animal = animal_selecionado.numeros_animal[grupo_posicao_numero];
        const numero_grupo = animal_selecionado.numero_grupo;
        const animal_nome = animal_selecionado.animal;

        numero_completo += `${i + 1}º ${numero_cabeca}${numero_animal} (${numero_grupo}) ${animal_nome}\n`;
    }

    return numero_completo;
}

function criaJsonAtendimento() {
    const arquivo = path.join(__dirname,'atendimento.json');

    if (!fs.existsSync(arquivo)){
        const atendimentos = {
            idChat: '',
            horaAtendimento: '',
            comandosUsados: [],
        }

        jsonDados = JSON.stringify(atendimentos, null, 2);
        caminhoJson = 'atendimento.json';
        fs.writeFile(caminhoJson, jsonDados);
    }
}

function verificaChatAtendimento(){
    criaJsonAtendimento()
    
}

module.exports = { sortearDezenas, sortearJogoDoBicho };