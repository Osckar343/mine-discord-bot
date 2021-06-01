const {Client, MessageEmbed, Emoji, MessageReaction} =  require('discord.js');
const Discord = require('discord.js');
const client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });

const Tenor = require("tenorjs").client({
  "Key": "W01WZ7UAQS0A", // https://tenor.com/developer/keyregistration
  "Filter": "off", // "off", "low", "medium", "high", not case sensitive
  "Locale": "en_US", // Your locale here, case-sensitivity depends on input
  "MediaFilter": "minimal", // either minimal or basic, not case sensitive
  "DateFormat": "D/MM/YYYY - H:mm:ss A" // Change this accordingly
});

const mysql = require('mysql');

var con = mysql.createConnection({
  host: 'localhost',
  database: 'memeify',
  user: 'root',
  password: '',
});

con.connect(function(error){
  if(error)
    throw error;
  else 
    console.log('Connected to database');
});

let sql = 'INSERT INTO bot (bot_id)'

con.query('SELECT * FROM bot', function(error, result, fields){
  if(error) throw err;
  console.log(result);
});

con.end;

//var CronJob = require('cron').CronJob;


var idMessage = "";
var idClient = "";
var objMessage = new Discord.Message();

//Initialized in 1 because bot always reactions first.
var option1 = 1;
var option2 = 1;
var option3 = 1;

var objMessage = new Discord.Message();

client.login('ODQ2NTM0MTUzNjc5MjczOTk0.YKw6Xg.L9LCqRk34auNA9414Fw9UT9AyHk');

client.on('ready', () => {
    client.user.setActivity("Memes", {
        type: "WATCHING",
      });

    console.log('Bot is ready as ' + client.user.tag);  
    console.log('ID Client: ' + client.user.id);
    idClient = client.user.id;
});

function between(min, max) {  
    return Math.floor(
      Math.random() * (max - min) + min
    )
  }

client.on('message', async (message) => {
  objMessage = message; //global

  const title = new MessageEmbed()
  .setTitle('⬜⬜⬜⬛⬛')
  .setColor('BLUE');

  if(message.content == 'write'){
    let sent = await message.channel.send(title);
    idMessage = sent.id; // you can get its ID with <Message>.id, as usually

    message.channel.messages.fetch(idMessage)
      .then(message =>  
                  message.react('1️⃣')
      .then(() => message.react('2️⃣'))
      .then(() => message.react('3️⃣'))
      .catch(error => console.error('One of the emojis failed to react:', error))
    )
    .catch(console.error);

    console.log('ID Del mensaje: ' + idMessage);
  }

  if(message.content == 'count'){
    message.channel.messages.fetch(idMessage).then(
      function (message){
        const reactions = message.reactions.cache;
        console.log('Reacciones: '  + reactions.get('1️⃣').count);
        console.log('Reacciones: '  + reactions.get('2️⃣').count);
        console.log('Reacciones: '  + reactions.get('3️⃣').count);
      });
  }
  
    /*var job = new CronJob(
      '* * * * * *',
      function() {
        console.log('every second');
      },
      null,
      false,
      'America/Los_Angeles'
    );  
    job.start();*/

    //Receiving the message

      if(message.content === 'search'){
        (async function(){
          console.log(await getGif());
        })();
      }

    
    console.log(message.content); 
    if(message.content === 'test'){

      let porcentaje = 100;

        const title = new MessageEmbed()
        .setTitle('**ATENCIÓN!!!** Se abre votación para escoger nuevo *TOPIC*!!')
        .setColor('BLUE');

        const poll = new MessageEmbed()
          .addField('1️⃣ League of Legends','⬜⬜⬜⬛⬛⬛⬛⬛⬛⬛' + ' - ' + porcentaje + '%')
          .addField('2️⃣ Programación','⬜⬜⬜⬜⬜⬛⬛⬛⬛⬛' + ' - ' + porcentaje + '%')
          .addField('3️⃣ Minecraft','⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜' + ' - ' + porcentaje + '%')
          .setDescription('¿De qué tema te gustaría ver memes?')
          .setThumbnail('https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/dbe21d7e-5f33-4784-9f21-218c9a3b9b8a/d74335n-ed3a5286-29c7-4ac4-901c-4c226eca5d43.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2RiZTIxZDdlLTVmMzMtNDc4NC05ZjIxLTIxOGM5YTNiOWI4YVwvZDc0MzM1bi1lZDNhNTI4Ni0yOWM3LTRhYzQtOTAxYy00YzIyNmVjYTVkNDMucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.mu7oizEDI7YswedsL33n68JO2XxhT9XwNNCTzS_iPq4')
          .addFields(
            { name: '\u200B', value: '\u200B'},
            { name: '\u200B', value: '**Más votado** : *League of Legends*', inline: true },
          )
          .setImage('https://media1.tenor.com/images/7ae3f6f1c48b01549b855cb0f6b1c4d7/tenor.gif?itemid=5658972')
          .setTimestamp()
          .setFooter('Reacciona para votar', 'https://i.pinimg.com/736x/3f/a3/a1/3fa3a17031811cf7d77813bcc373bee1.jpg');

        message.channel.send(title);
        message.channel.send(poll)
          .then( function (message) {      
             message.react('1️⃣')
             .then(() => message.react('2️⃣'))
             .then(() => message.react('3️⃣'))
             .catch(error => console.error('One of the emojis failed to react:', error));
          });
    }
    const allowedGreeting = /h?(o+la+|o+l+i+(s?)|a+l+o+|e+ll+o+|k+o+n+i+c+h+i+w+a+|^h+i+\s|0+l+a+|^h+e+y+)i?a*?/gim;
    
    if( message.content.match(allowedGreeting)  && message.author.username !== 'Mine'){
        greeting = between(1,7);
        const ayy = client.emojis.cache.get("771522257532223528");
        846629293319913485
        switch(greeting)
        {
            case 1: message.channel.send(`Holi ${message.author.username}!!  ${ayy} ${ayy} ${ayy}`); break;
            case 2: message.channel.send(`Holaa ${message.author.username}!!  ${ayy} ${ayy} ${ayy}`); break;
            case 3: message.channel.send(`Que tal ${message.author.username}!!  ${ayy} ${ayy} ${ayy}`); break;
            case 4: message.channel.send(`Muy buenas ${message.author.username}!!  ${ayy} ${ayy} ${ayy}`); break;
            case 5: message.channel.send(`Un gustazo ${message.author.username}!!  ${ayy} ${ayy} ${ayy}`); break;
            case 6: message.channel.send(`Buenas ${message.author.username}!!  ${ayy} ${ayy} ${ayy}`); break;
            case 7: message.channel.send(`Mucho gusto ${message.author.username}!!  ${ayy} ${ayy} ${ayy}`); break;
        }
        
    }

    if (message.content === '**help') {
        const embed = new MessageEmbed()
            .setTitle('Lista de comandos. Tsssss')
            .addField('**pepe','Revela algunas de las frases más icónicas de SanfinG')
            .addField('**emojis','Despliega todos los emojis personalizados del servidor')
            .addField('**random','Muestra un emoji animado al azar')
            .setColor('GREEN')

        message.channel.send(embed);
      }

      if (message.content === "**emojis") {
        const emojiList = message.guild.emojis.cache.map(emoji => emoji.toString()).join(" ");
        message.channel.send(emojiList);
        console.log(emojiList);
      }

      if (message.content === "**pepe") {
        message.channel.send('chingatumadrepepe');
      }

      if(message.content === "**random"){
        greeting = between(1,6);
        const left = client.emojis.cache.get('846629136008478731');
        const right = client.emojis.cache.get("846629293319913485");
        const angry = client.emojis.cache.get("846633284708073472");
        const bunhu = client.emojis.cache.get("846633285089755147");
        const pixelssway = client.emojis.cache.get("846633285601329213");
        const dance = client.emojis.cache.get("846633562513997854");
        const no = client.emojis.cache.get("846100084864843817");


        switch(greeting)
        {
            case 1: message.channel.send(`${left} ${right}`); break;
            case 2: message.channel.send(`${angry}`); break;
            case 3: message.channel.send(`${bunhu}`); break;
            case 4: message.channel.send(`${pixelssway}`); break;
            case 5: message.channel.send(`${dance}`); break;
            case 6: message.channel.send(`${no}`); break;
            default: break;
        }
        message.delete();
    }
});



// Emit the event


client.on('messageReactionAdd', async (reaction, user) => {
  if(reaction.message.id === idMessage && user.id != idClient){
   if(reaction.emoji.name === '1️⃣' || reaction.emoji.name === '2️⃣' || reaction.emoji.name === '3️⃣'){

 

    updatePoll(reaction);
   }
  }
});


client.on('messageReactionRemove', (reaction, user) => {
  if(reaction.message.id === idMessage && user.id != idClient){
    if(reaction.emoji.name === '1️⃣' || reaction.emoji.name === '2️⃣' || reaction.emoji.name === '3️⃣')
     updatePoll(reaction);
   }
});


function countReactions(messageObj){
  //let arrayReactions = Array.from({ length: 3 }, (_, idx) => 0);
  let array = [0,0,0];
  messageObj.channel.messages.fetch(idMessage).then(
     array = getArrayReactions(messageObj)
    );
    
    return array;
}

function getArrayReactions(messageObj){
  let arrayReactions = [0,0,0];
  const reactions = messageObj.reactions.cache;

  arrayReactions[0] = reactions.get('1️⃣').count;
  arrayReactions[1] = reactions.get('2️⃣').count;
  arrayReactions[2] = reactions.get('3️⃣').count;

  return arrayReactions;
}


async function updatePoll(reaction){
  getFetched(reaction);

  let dataVotes = countReactions(objMessage);
  console.log('datavotes: ' + dataVotes);
  //data base.

  let porcentages = calculatePorcentage(dataVotes);
  let pollUpdated = await generatePoll(porcentages);
  reaction.message.edit(pollUpdated);
}

async function getFetched(reaction){
  try {
    await reaction.fetch();
  } catch (error) {
    console.log('Something went wrong when fetching the message: ', error);
    return;
  }
}

function generateProgressBar(arrayPorcentages){
  let barSize = 10;
  let arrayProgressBar = Array.from({ length: arrayPorcentages.length }, (_, idx) => "");

  for (let i = 0; i < arrayPorcentages.length; i++) {
    for (let j = 0; j < barSize; j++) {
      if(j < (arrayPorcentages[i] / barSize))
        arrayProgressBar[i] += '⬜';
      else 
       arrayProgressBar[i] += '⬛';
    }
  }
  return arrayProgressBar;
}

function calculatePorcentage(arrayVotes){
  let total = arrayVotes.reduce((a, b) => ( a + b ) , 0) - arrayVotes.length; //get the sume of all votes.
  let arrayPorcentages = new Array(arrayVotes.length);
  for (let i = 0; i < arrayVotes.length; i++) 
    if(total === 0)
     arrayPorcentages[i] = 0;
    else
      arrayPorcentages[i] = ( (arrayVotes[i]  - 1) / total ) * 100;
  
  return arrayPorcentages;
}

async function generatePoll(porcentages){
  let progressBar = generateProgressBar(porcentages);

  const poll = createPoll(progressBar,porcentages);
  return poll;
}

function test (Results){

}


function createPoll(progressBar, porcentages){
  let random = between(0,24);

    function valor(){
      let xdxd = "";

      Tenor.Search.Random("food", "1").then(
        xdxd = Results => {
          for (let i = 0; i < Results.length; i++) {
            //console.log(`Item ${Results[i].url}`);
            return Results[i].url;
          }
      })
      return xdxd;
    }
    
    let aaa = valor();
    
    console.log(aaa);



  const poll = new MessageEmbed()
  .addField('1️⃣ League of Legends',progressBar[0] + ' - ' + porcentages[0] + '%')
  .addField('2️⃣ Programación',progressBar[1] + ' - ' + porcentages[1] + '%')
  .addField('3️⃣ Minecraft',progressBar[2] + ' - ' + porcentages[2] + '%')
  .setDescription('¿De qué tema te gustaría ver memes?')
  .addFields(
    { name: '\u200B', value: '\u200B'},
    { name: '\u200B', value: '**Más votado** : *League of Legends*', inline: true },
  )
  .setImage()
  .setTimestamp()
  .setFooter('Reacciona para votar', 'https://i.pinimg.com/736x/3f/a3/a1/3fa3a17031811cf7d77813bcc373bee1.jpg');
  
  return poll;
}


