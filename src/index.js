//Esse cara lê as cariaveis de ambiente dentro do nosso .env
require('dotenv').config();

const TelegramBot = require('node-telegram-bot-api');
const express = require('express');

const app = express();

/*Definindo uma porta padrao para utilizar caso essa porta
* estabelecida pelo servidor ou maquina onde se encontra em funcionamento
*/
const port = process.env.PORT || 3000;


// Crie um bot que use 'polling' para buscar novas atualizações 
const bot = new TelegramBot(process.env.TOKEN_BOT_TELEGRAM, {polling :  true });


app.use(require('./routes'));

  //Traga todas as informações da msg enviada a mim, e print in console
bot.on('message',(msg) => console.log('msg:', msg));

//#region Comand Echo

/**
 * Leia tudo que esta escrito depois do comand 'echo' e envia a mesma coisa 
 * para o nosso usuario 
*/
bot.onText( /\/echo (.*)/, function( msg, match ){
  
  var fromId = msg.chat.id;
  var resp = match[1];
  bot.sendMessage(fromId,resp);
  
});

//#endregion

//#region Comand GRobot Iniciar

//GRobot "Iniciar"
bot.onText( /\/GRobot (Iniciar!)/, function(msg){
  
  var fromId = msg.chat.id;
  var resp = "Opa, estou Ligado!";
  bot.sendMessage(fromId, resp);
  
});
bot.onText( /\/GRobot (iniciar!)/, function(msg){
  
  var fromId = msg.chat.id;
  var resp = "Opa, estou Ligado!";
  bot.sendMessage(fromId, resp);
  
});
//#endregion


//Apos a conexao sucess! print mensagem OK
app.listen(port, () => {
  console.log(`Serve ON in port: ${port}!`);
});

/* ?? TRATAMENTOS DE ERROS ??  */

// bot.sendMessage()
// const logErrorEcho = ( msg ) => ( err ) => 
//   console.log( msg, err )
// const logSuccessEcho = ( msg, match ) => ( data ) => 
//   console.log( `Success: `, data )
// const sendEcho = ( msg, match ) => 
//   bot.sendMessage( msg.chat.id, match[ 1 ] )
//       .then( logSuccessEcho( msg, match ) )
//       .catch( logErrorEcho( `Error: ` ) )
// bot.onText( /\/echo (.*)/, sendEcho )


