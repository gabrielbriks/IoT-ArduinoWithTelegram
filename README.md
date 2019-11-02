# IoT-ArduinoWithTelegram
IoT com Arduíno utilizando Jhonny-Five e Telegram


### Anotações Gerais ###

> primeira interação que podemos realizar com o bot é com o seguinte código:
    - bot.on('message',(msg) => console.log('msg', msg));

> Com isso podemos perceber que: 
    -além dos dados básicos:
        *message_id: identificador dessa mensagem
        *date: data no formato timestamp
        *text: texto recebido pelo BOT
    -Também possuimos 2 outros objetos:
        *from: dados de quem enviou a mensagem
        *chat: dados do chat aberto entre você e o BOT

> Facilmente podemos inferir que o chat.id é igual ao from.id, logo o Telegram cria essa ligação    entre você e chat que você abriu.
## Guarde bem essa informação pois sera muito útil no futuro.

### > Analisando esse retorno podemos montar o seguinte Schema para esse resultado:

# ----------------------
const from = { 
  id: Number,
  first_name: String,
  last_name: String,
  username: String 
}
     
const chat = { 
  id: Number,
  first_name: String,
  last_name: String,
  username: String,
  type: String 
}
const Schema = { 
  message_id: Number,
  from,
  chat,
  date: Number,
  text: String
}
# ----------------------

## > Para dar continuidade ao nosso BOT iremos utilizar eventos específicos para que ele não pegue TUDO que vier, mas sim apenas o que desejemos.
>Vejamos quais sao esses eventos:
    *message
    *text
    *audio
    *document
    *photo
    *sticker
    *video
    *voice
    *contact
    *location
> Esses serão os eventos que utilizaremos por hora, existem muitos outros como você pode conferir na documentação, o link esta abaixo.

> fonte: Node.js Telegram Bot API — Usage — Events

## OBS ##
    > A função "on" sempre é utilizada para ouvir um evento, por isso o nome da função ja é onText.

# Hospedando App no Heroku
    >> Primeiro devemos criar um File com o seguinte nome: "Profile", e dentro dele adicionarmos o seguinte codigo:
        >> web: node index.js

    >> Por que o Heroku? 
    >Porque ele além de possuir um plano free tem um deploy muito fácil e rápido que fica ainda mais fácil quando você está utilizando Javascript. Você só precisa criar um arquivo chamado Profile na pasta do seu projeto e fazer o deploy.

# Exemplo Básico do uso do telegram com Heroku #
>>
    //instanciando a APIs 
    const TelegramBot = require('node-telegram-bot-api');
    const express = require('express');
    //End instanciando APIs
    var appExp = express();
    /*Definindo uma porta padrao para utilizar caso essa porta
    * estabelecida pelo servidor ou maquina onde se encontra em funcionamento
    */
    const port = process.env.PORT || 3000;

    //token Telegram que você recebe do @BotFather 
    const token = '899326021:AAEIY-qEA_ueqPUAHwNg1GBrbvv23m3TPI4';

    // Crie um bot que use 'polling' para buscar novas atualizações 
    const bot = new TelegramBot(token, {polling :  true });

    //Traga todas as informações da msg enviada a mim, e print in console
    bot.on('message',(msg) => console.log('msg:', msg));

    /*Leia tudo que esta escrito depois do comand 'echo' e envia a mesma coisa 
    * para o nosso usuario */
    bot.onText( /\/echo (.*)/, function( msg, match ){
    
    var fromId = msg.chat.id;
    var resp = match[1];
    bot.sendMessage(fromId,resp);
    
    });

    /*Envie a mensagem contida em "resp" quando for utilizado o comand '/start'*/ 
    bot.onText( /\/start ('GRobot ligar!')/, function(msg){
    
    var fromId = msg.chat.id;
    var resp = "Opa, estou Ligado!";
    bot.sendMessage(fromId, resp);
    
    });

    //adicionado saida HTML para a aplicação
    appExp.get('/', function(req, res) {
    res.send('<br><i>Server ON!</i>');
    });


    appExp.listen(port, () => {
    console.log(`Serve ON in port: ${port}!`);
    });
