// Importa as funções que serão utilizadas
const { sortearDezenas, sortearJogoDoBicho } = require('./functions');

// Declara e usa as ferramentas
const { Client, MessageMedia, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

// Cria o client local
const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        headless: false,
        executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe'
    }
});

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

    // É possível citar a pessoa que enviou a mensagem
    const chat = await message.getChat();
    let user = await message.getContact();

    if (message.body.toLowerCase() === '!oi') {
        await chat.sendMessage(`Olá @${user.id.user}!`, { mentions: [user] });
    }

    if (message.body.toLowerCase() === '!lista3.0') {
        await client.sendMessage(message.from, 'Segue a URL do vídeo solicitado: https://www.youtube.com/watch?v=Yl9SoE7N2yo');
    }

    if (message.body.toLowerCase() === '!lista2.0') {
        await client.sendMessage(message.from, 'Segue a URL do vídeo solicitado: https://www.youtube.com/watch?v=JDO9xha81HQ');
    }

    if (message.body.toLowerCase() === '!ping') {
        await client.sendMessage(message.from, 'pong');
    }

    if (message.body.toLowerCase() === '!megumin') {
        const media = MessageMedia.fromFilePath('./images/megumin.jpeg');
        await chat.sendMessage(media, { caption: 'A mais gostosa, simpática e divertida feiticeira de Konosuba' });
    }

    if (message.body.toLowerCase() === '!l') {
        const media = MessageMedia.fromFilePath('./images/fazOL.jpg');
        await chat.sendMessage(media, { caption: 'Mantenha a calma guerreiro, lembre-se você tem culpa nisso, agora siga o conselho da imagem' });
    }

    if (message.body.toLowerCase() === '!preco') {
        const listaPrecos = `Abaixo segue a lista de preços do nosso serviço:\n
        Landing Page de vendas: R$1000.00\n
        Landing Page de captura: R$ 850.00\n
        Landing Page de obrigado: R$400.00\n
        Marketing Digital: R$1000.00`;
        await client.sendMessage(message.from, listaPrecos);
        await client.sendMessage(message.from, 'Algum dos nossos serviços se enquadra na sua demanda?');
    }

    if (message.body.toLowerCase() === '!megasena') {
        var sorteio = sortearDezenas();
        await client.sendMessage(message.from, 'Seu palpite da Mega Sena é: ' + sorteio.join(', '));
    }

    if (message.body.toLowerCase() === '!bicho') {
        var resposta = await sortearJogoDoBicho();
        await client.sendMessage(message.from, 'Seu palpite para o jogo do bicho é:\n ' + resposta);
    }

});

client.initialize();