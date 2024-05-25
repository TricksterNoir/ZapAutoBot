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

        let animalSelected = data.animals.find(animal => animal.groupNumber === numberGroupAnimalHead);
        const numberHead = animalSelected.animalNumber[groupPositionNumber];

        groupPositionNumber = Math.floor(Math.random() * 4);
        animalSelected = data.animals.find(animal => animal.groupNumber === numberGroupAnimalTail);
        const numberAnimalSelected = animalSelected.animalNumber[groupPositionNumber];
        const numberGroupAnimalSelected = animalSelected.groupNumber;
        const animal_nome = animalSelected.animal;

        completeNumber += `${i + 1}º ${numberHead}${numberAnimalSelected} (${numberGroupAnimalSelected}) ${animal_nome}\n`;
    }

    return completeNumber;
}

function createChatService() {
    const archive = path.join(__dirname,'chatInfo.json');

    if (!fs.existsSync(archive)){
        const chatOpen = {
            "clients": [
                {
                    'idChat': '',
                    'hourLastMsg': '',
                    'commandsUsed': []
                }
            ]
        };

        jsonData = JSON.stringify(chatOpen, null, 2);
        pathJson = 'chatInfo.json';
        fs.writeFile(pathJson, jsonData);
    }
}

function getHourNow(){
    const now = new Date();

    const hours = now.getHours()
    const minutes = now.getMinutes()
    const seconds = now.getSeconds()
    const totalMinutes = hours * 60 + minutes + seconds / 60
    
    return totalMinutes
}

async function verifySection(idChat, hourNow, commandUsed){
    const jsonData = await fs.readFile('chatInfo.json', 'utf-8');
    const jsonClient = JSON.parse(jsonData);
    const clientOnLineIndex = jsonClient.clients.findIndex(person => person.idChat === idChat);
    
    if (clientOnLineIndex !== -1){
        const clientOnLine = jsonClient.clients[clientOnLineIndex];

        if (clientOnLine.clients.commandsUsed.includes(commandUsed)){
            if((clientOnLine.hourLastMsg - hourNow) > 10){

                jsonClient.clients[clientOnLine].commandsUsed = [commandUsed]
                jsonClient.clients[clientOnLine].hourLastMsg = hourNow
                await fs.writeFile('chatInfo.json', JSON.stringify(jsonClient, null, 2));

                return commandUsed
            } else{
                return 'Comando já usado nos ultimos 10 minutos, por favor tente outro comando.'
            }
        }
    }
}
function verifyChatService(idPerson, hourMsg, commandUsed){
    createChatService()
    fs.readFile('./chatInfo.json', 'utf8',(data))
    const jsonPersons = JSON.parse(data)
    const hourNow = getHourNow()

    if (!jsonPersons.clients.some(client => client.idChat === idPerson)) {
        const newData = {
            'idChat': idPerson,
            'hourLastMsg': hourMsg,
            'commandsUsed': commandUsed
        }

        jsonPersons.push(newData)
        return commandUsed

    } else {
        return verifySection(idPerson, hourNow, commandUsed)
    }
}

module.exports = { sortMegaSena, sortJogoDoBicho: sortJogoDoBicho };