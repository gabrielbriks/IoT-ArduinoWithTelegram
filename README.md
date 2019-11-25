# IoT-Arduino & Telegram



Meu primeiro projeto IoT básico desenvolvido em JavaScript, onde foi introduzido ao um protótipo de uma casa, para ligar uma lâmpada e controlar um servo motor(simulando o portão). 

**Componentes utilizados**
 - Arduíno Nano
 - Protoboard
 - Módulo Relé
 - Servo Motor

**No desenvolvimento utilizei:**
 [NodeJS](https://nodejs.org/en/)
 [Jhonn-Five](http://johnny-five.io/)
 [Firebase](https://firebase.google.com/)
[Telegram Bot API](https://core.telegram.org/bots/api)

A biblioteca [Jhonn-Five](http://johnny-five.io/) me proporcionou realizar a comunicação com o Arduíno utilizando JavaScript de forma bem tranquila, no meu caso utilizei a porta serial, mas é possível utiliza-lo de outras formas também.

Utilizei o [Firebase](https://firebase.google.com/) juntamente com o [Bot API](https://core.telegram.org/bots/api) do Telegram para armazenar e buscar os estados em que o portão e a luz se encontrava. Neste caso, ao enviar o comando para o bot que criei la no Telegram, ele seta esse estado no do Firebase em tempo real, e logo em seguida o Arduíno busca esse estado para realizar a ação. 

[Como Criar um Bot?](https://core.telegram.org/bots)

O objetivo que estava tentando propor, era tornar possível que o usuário interagisse com os dispositivo sem ao menos estar literalmente dentro de casa, utilizei a lâmpada e um servo motor(que no caso estaria simulando o portão), apenas para exemplificar esse comportamento, mas é possível utilizar essa ideia em toda a casa de forma bem legal.
