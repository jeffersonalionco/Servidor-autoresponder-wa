const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const datahora = new Date();

// Configuração de cabeçalhos para permitir CORS e definir tipo de conteúdo
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Content-Type", "application/json; charset=UTF-8");
    res.header("Access-Control-Allow-Methods", "POST");
    res.header("Access-Control-Max-Age", "3600");
    res.header("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    next();
});

// Middleware para lidar com JSON no corpo da requisição
app.use(bodyParser.json());




// Endpoint para processar a mensagem
app.post('/api_autoresponder', (req, res) => {
    const data = req.body;
    
    // Verifica se os dados necessários estão presentes
    if (
        data.query && data.query.sender && data.query.message &&
        data.appPackageName && data.messengerPackageName
    ) {
        const appPackageName = data.appPackageName;
        const messengerPackageName = data.messengerPackageName;
        const sender = data.query.sender;
        const message = data.query.message;
        const isGroup = data.query.isGroup;
        const groupParticipant = data.query.groupParticipant;
        const ruleId = data.query.ruleId;
        const isTestMessage = data.query.isTestMessage;

        // Processamento das mensagens (aqui você pode adicionar lógica personalizada)
        
        
        let data1 = datahora.getUTCDate();


        // Exemplo de resposta
        const replies = [
            { message: `Hey ${sender}!\nThanks for sending: ${message}` },
            { message: 'Success ✅' },
            { message: `Isso é a dia: ${data1}`}
        ];

        // Responde com sucesso
        res.status(200).json({ replies });
    } else {
        // Responde com erro caso os dados estejam incompletos
        res.status(400).json({
            replies: [
                { message: 'Error ❌' },
                { message: 'Houve no processamento da seu comando.' }
            ]
        });
    }
});

// Inicia o servidor na porta 3000
app.listen(3000, () => {
    console.log('Servidor Node.js rodando na porta 3000');
});
