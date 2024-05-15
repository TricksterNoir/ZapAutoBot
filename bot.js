// Declara e usa as ferramentas
const { Client, MessageMedia, NoAuth, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
// Cria o client local
const client = new Client({
    authStrategy: new LocalAuth()
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

    if (message.body.toLowerCase() === '!ping') {
        await client.sendMessage(message.from, 'pong');
    }

    if (message.body.toLowerCase() === '!megumin') {
        const media = MessageMedia.fromFilePath('/images/megumin.jpeg')
        const chat = await message.getChat()
        await client.sendMessage(message.from, 'A mais gostosa, simpática e divertida feiticeira de Konosuba');
        chat.sendMessage(media)
    }

    if (message.body.toLowerCase() === '!l'){
        const media = MessageMedia.fromFilePath('/images/fazOL.jpg')
        const chat = await message.getChat()
        await client.sendMessage(message.from, 'Mantenha a calma guerreiro, lembre-se você tem culpa nisso, agora siga o conselho da imagem: ')
        chat.sendMessage(media)
    }

    if (message.body === '!isabelly') {
        await client.sendMessage(message.from, 'Linda, cheirosa, gostosa, peituda, lerda, preguiçosa, uma vaca, meio lélé das ideias, que precisa aprender a usar sombras, mas uma excelente amiga cuja a qual estou com saudades. Te amo sua corna <3');
    }

    if (message.body === '!preco') {
        const listaPrecos = `Abaixo segue a lista de preços do nosso serviço:\n
        Landing Page de vendas: R$1000.00\n
        Landing Page de captura: R$ 850.00\n
        Landing Page de obrigado: R$400.00\n
        Marketing Digital: R$1000.00`;
        await client.sendMessage(message.from, listaPrecos);
        await client.sendMessage(message.from, 'Algum dos nossos serviços se enquadra na sua demanda?');
    }

    if (message.body === '!megasena'){
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
        var sorteio = sortearDezenas()
        await client.sendMessage(message.from, 'Seu palpite da Mega Sena é: ' + sorteio.join(', '));
    }

});


client.initialize();