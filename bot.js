// Declara e usa as ferramentas
const { Client, MessageMedia } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

// Cria o client local
const client = new Client();

// Gera o QRCode para login no whatsapp
client.on('qr', (qr) => {
    console.log('QR Code recebido, escaneie-o com seu telefone:');
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('Cliente pronto!');
});

// Comandos que recebem a mensagem e respondem de acordo
client.on('message', async (message) => {
    console.log('Mensagem recebida: ', message.body);

    if (message.body.toLowerCase() === '!ping') {
        await client.sendMessage(message.from, 'pong');
    }

    if (message.body.toLowerCase() === '!megumin') {
        await client.sendMessage(message.from, 'A mais gostosa, simpática e divertida feiticeira de Konosuba');
    }

    if (message.body === '!gostosa') {
        const media = MessageMedia.fromFilePath('gostosa.jpg');
        const chat = await message.getChat()
        chat.sendMessage(media)
    }

    if (message.body.toLowerCase() === '!l'){
        const media = MessageMedia.fromFilePath('fazOL.jpg')
        const chat = await message.getChat()
        await client.sendMessage(message.from, 'Mantenha a calma guerreiro, lembre-se você tem culpa nisso, agora siga o conselho da imagem: ')
        chat.sendMessage(media)
    }

});


client.initialize();