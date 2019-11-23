//Esse cara lê as cariaveis de ambiente dentro do nosso .env
require('dotenv').config();

const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const firebase = require("firebase");

const five = require('johnny-five');
const board = new five.Board({port:'COM3'});

const app = express();

var firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.DATABASE_URL,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUKCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appID: process.env.APP_ID,

};

firebase.initializeApp(firebaseConfig);
var db = firebase.database();


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

//#region Comand GRobot Lampada ON

function ligarLampada(message){

  var fromId = message.chat.id;
  var resp = "Lâmpada ligada!";
  var err = "Opa! Nos desculpe, no momento não foi possivel realizar essa ação!"+
  "Por favor, verifique sua conexão com a internet.";
  
  db.ref('lampada').set('on');

  db.ref('lampada').on('value', function(snapshot){

    let lampada = snapshot.val();

    if(lampada == 'on'){
     
      return result =  bot.sendMessage(fromId, resp);
    }
    else if(lampada != 'on' && lampada != 'off'){

      return result = bot.sendMessage(fromId, err);
    }
    

  }); 

 
}

bot.onText( /\/GRobot (Ligar lampada!)/, function(msg){
  
  return ligarLampada(msg);

});

bot.onText( /\/GRobot (ligar lampada!)/, function(msg){
  
  return ligarLampada(msg);
  
});

// /// Com Acento ///
bot.onText( /\/GRobot (Ligar lâmpada!)/, function(msg){
  
  return ligarLampada(msg);
  
});

bot.onText( /\/GRobot (ligar lâmpada!)/, function(msg){
  
  return ligarLampada(msg);
  
});

//#endregion

//#region Comand GRobot Lampada OFF

function desligarLampada(message){

  var fromId = message.chat.id;
  var resp = "Lâmpada desligada!";
  var err = "Opa! Nos desculpe, no momento não foi possivel realizar essa ação!"+
  "Por favor, verifique sua conexão com a internet.";
  
  db.ref('lampada').set('off');

  db.ref('lampada').on('value', function(snapshot){

    let lampada = snapshot.val();

    if(lampada == 'off'){

     return result =  bot.sendMessage(fromId, resp);
    }
    else if(lampada != 'on' && lampada != 'off'){

      return result = bot.sendMessage(fromId, err);
    }

  }); 

 
}

bot.onText( /\/GRobot (Desligar lampada!)/, function(msg){
  
  return desligarLampada(msg);

});

bot.onText( /\/GRobot (desligar lampada!)/, function(msg){
  
  return desligarLampada(msg);

});

//Com acento//
bot.onText( /\/GRobot (Desligar lâmpada!)/, function(msg){
  
  return desligarLampada(msg);

});

bot.onText( /\/GRobot (desligar lâmpada!)/, function(msg){
  
  return desligarLampada(msg);

});

//#endregion

//#region  Comand GRobot Portao

  function abrirPortao(message){
    
    var fromId = message.chat.id;
    var resp = "Abrindo Portão...";
    var err = "Opa! Nos desculpe, no momento não foi possivel realizar essa ação!"+
    "Por favor, verifique sua conexão com a internet.";
    
    db.ref('portao').set('open');
  
    db.ref('portao').on('value', function(snapshot){
  
      let portao = snapshot.val();
  
      if(portao == 'open'){
       
        return result =  bot.sendMessage(fromId, resp);
      }
      else if(portao != 'open' && portao != 'close'){
  
        return result = bot.sendMessage(fromId, err);
      }
      
  
    }); 
  
  }

  bot.onText( /\/GRobot (Abrir portao!)/, function(msg){

    return abrirPortao(msg);
  });
  bot.onText( /\/GRobot (abrir portao!)/, function(msg){

    return abrirPortao(msg);
  });
  bot.onText( /\/GRobot (Abrir portão!)/, function(msg){

    return abrirPortao(msg);
  });
  bot.onText( /\/GRobot (abrir portão!)/, function(msg){

    return abrirPortao(msg);
  });


  function fecharPortao(message){
    
    var fromId = message.chat.id;
    var resp = "Fechando Portão...";
    var err = "Opa! Nos desculpe, no momento não foi possivel realizar essa ação!"+
    "Por favor, verifique sua conexão com a internet.";
    
    db.ref('portao').set('close');
  
    db.ref('portao').on('value', function(snapshot){
  
      let portao = snapshot.val();
  
      if(portao == 'close'){
       
        return result =  bot.sendMessage(fromId, resp);
      }
      else if(portao != 'open' && portao != 'close'){
  
        return result = bot.sendMessage(fromId, err);
      }
      
  
    }); 
  
  }

  bot.onText( /\/GRobot (Fechar portao!)/, function(msg){

    return fecharPortao(msg);
  });
  bot.onText( /\/GRobot (fechar portao!)/, function(msg){

    return fecharPortao(msg);
  });
  bot.onText( /\/GRobot (Fechar portão!)/, function(msg){

    return fecharPortao(msg);
  });
  bot.onText( /\/GRobot (fechar portão!)/, function(msg){

    return fecharPortao(msg);
  });

//#endregion

//#region ARDUINO

  board.on('ready', function(){
    var lamp = new five.Led(8)
    var ledRed = new five.Led(12);

   var servo = new five.Servo({
      // id: "MyServo",     // User defined id
      pin: 10,           // Which pin is it attached to?
       type: "continuous",  // Default: "standard". Use "continuous" for continuous rotation servos
       range: [0,180],    // Default: 0-180
      // fps: 100,          // Used to calculate rate of movement between positions
      // invert: false,     // Invert all specified positions
       startAt: 90,       // Immediately move to a degree
      center: false,      // overrides startAt if true and moves the servo to the center of the range
    });

    this.repl.inject({
      //ledRed : ledRed,
      lamp : lamp,
      servo : servo
    });

    db.ref('lampada').on('value', function(snapshot){

      let lampada = snapshot.val();
     
      if(lampada == 'on'){
       
        lamp.on(); 
      }
      else{
  
        lamp.off();
      }
      
  
    }); 


    db.ref('portao').on('value', function(snapshot){

      let portao = snapshot.val();

      if(portao == 'open'){
        //servo.cw(2);
        servo.max();
       
      }else{

        servo.min();
      }
    });


  });


//#endregion





//Apos a conexao sucess! print mensagem OK
app.listen(port, () => {
  console.log(`Serve ON in port: ${port}!`);
});




