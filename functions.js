const { fileURLToPath } = require('url');
const path = require('path');
const fs = require('fs');

const fs = require('fs').promises;

function sortMegaSena(){
    var sortedList = [];
    var i = 0;
    while (i < 6){
        var sortedNumber = Math.floor(Math.random() * 60) + 1;
        var formatedNumber = sortedNumber.toString().padStart(2, '0');
        if (!sortedNumber.includes(formatedNumber)){
            sortedList.push(formatedNumber);
            i++
        }
    }
    return sortedList

}

async function sortJogoDoBicho() {
    let completeNumber = '';

    for (let i = 0; i < 5; i++) {
        const numberGroupAnimalHead = Math.floor(Math.random() * 25) + 1;
        const numberGroupAnimalTail = Math.floor(Math.random() * 25) + 1;
        let groupPositionNumber = Math.floor(Math.random() * 4);

        const data = JSON.parse(await fs.readFile('animal.json', 'utf-8'));

        let animalSelected = data.animais.find(animal => animal.groupNumber === numberGroupAnimalHead);
        const numberHead = animalSelected.animalNumber[groupPositionNumber];

        groupPositionNumber = Math.floor(Math.random() * 4);
        animalSelected = data.animais.find(animal => animal.groupNumber === numberGroupAnimalTail);
        const numberAnimalSelected = animalSelected.animalNumber[groupPositionNumber];
        const numberGroupAnimalSelected = animalSelected.groupNumber;
        const animal_nome = animalSelected.animal;

        completeNumber += `${i + 1}º ${numberHead}${numberAnimalSelected} (${numberGroupAnimalSelected}) ${animal_nome}\n`;
    }

    return completeNumber;
}

function createChatService() {
    const arquivo = path.join(__dirname,'chatInfo.json');

    if (!fs.existsSync(arquivo)){
        const chatOpen = {
            idChat: '',
            hourLastMsg: '',
            commandsUsed: [],
        }

        jsonData = JSON.stringify(chatOpen, null, 2);
        pathJson = 'chatInfo.json';
        fs.writeFile(pathJson, jsonData);
    }
}

function verifyChatService(){
    createChatService()
    
}

module.exports = { sortMegaSena, sortJogoDoBicho: sortJogoDoBicho };