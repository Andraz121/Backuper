// Version créer par Andraz
Discord = require('discord.js');
const client = new Discord.Client({
    intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES]
});
const fs = require('fs');
const moment = require('moment');
const synchronizeSlashCommands = require('discord-sync-commands');
const config = require('./config.json');

// EVENTS
client.on('ready', () => { 
  console.log(`${client.user.username} is connected to the WebSocket`);
  client.user.setPresence({
      activities: [{ name: config.activity, type: 'WATCHING' }],
      status: 'online',
  }); 
});

client.login(config.token);


// COMMANDES
client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand() || !interaction.guild) {
      return;
    }
    const { commandName, options } = interaction;
    
    // UTILITAIRE
       // UTILITAIRE
    if (interaction.commandName === 'help') {
        const help = new Discord.MessageEmbed()
      .setColor('#2f3136')
      .setTitle(':page_with_curl: ・ Voici la liste des commandes disponibles :')
      .setThumbnail(interaction.client.user.displayAvatarURL())
      .setDescription(`> ${interaction.client.user.username} est un bot qui permet de stocker vos serveurs en toutes sécurité !`)  
      .addFields(
        { name: `:floppy_disk: ・ Backuper :`, value: `> > **${config.prefix}create-backup**: Permet de créer une backup.> **${config.prefix}backup-list**: Affiche une backup. \n > **${config.prefix}backup-delete**: Permet de delete une backup. \n > **${config.prefix}backup-load**: Permet de load une backup.`},
        { name: `:pushpin: ・ Utilitaire :`, value: `> **${config.prefix}help**: Affiche les commandes. \n > **${config.prefix}invite**: Affiche le lien du bot. \n > **${config.prefix}about**: Affiche les informations du bot.` },
      ) 
      .setFooter(interaction.client.user.username, interaction.client.user.displayAvatarURL())
      .setTimestamp()
 
	const addButton = new Discord.MessageButton()
  .setLabel('Invite')
  .setURL(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot%20applications.commands`)
  .setStyle('LINK');
    	constsupportButton = new Discord.MessageButton()
  .setLabel('Invite')
  .setURL(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot%20applications.commands`)
  .setStyle('LINK');
	const row = new Discord.MessageActionRow().addComponents(addButton, supportButton);
interaction.reply({ embeds: [help], components: [row] });

         }
        
  if (interaction.commandName === 'invite') {
    const invite = new Discord.MessageEmbed()
        .setColor('#2f3136')
        .setAuthor(interaction.client.user.username, interaction.client.user.avatarURL())
        .setDescription(`Voici le lien pour m'ajouter à **ton serveur**, et profiter de moi avec mon super **système de coins**.`) 
        .setFooter(interaction.client.user.username, interaction.client.user.displayAvatarURL())
        .setTimestamp();
const addButton = new Discord.MessageButton()
  .setLabel('Ajoute moi !')
  .setURL(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot%20applications.commands`)
  .setStyle('LINK');
const row = new Discord.MessageActionRow().addComponents(addButton);

interaction.reply({ embeds: [invite], components: [row] });
  }
if (interaction.commandName === 'about') {
    const djs = require('discord.js').version;
    const d = moment.duration(interaction.client.uptime);
    const days = (d.days() == 1) ? `${d.days()} days` : `${d.days()} days`;
    const minutes = (d.minutes() == 1) ? `${d.minutes()} minutes` : `${d.minutes()} minutes`;
    const hours = (d.hours() == 1) ? `${d.hours()} hours` : `${d.hours()} hours`;
    const seconds = (d.seconds() == 1) ? `${d.seconds()} seconds` : `${d.seconds()} secondes`;  
    const about = new Discord.MessageEmbed()
    .setTitle(`:page_with_curl: ・ Voici les informations de ${interaction.client.user.username} :`)
    .setThumbnail(interaction.client.user.displayAvatarURL())
    .addFields(
        { name: `<:owner:1105512835062177942> ・ Développeur :`, value: `> <@793482512416112641>`, inline: false },
        { name: `<:status:1105514128484864050> ・ En ligne depuis :`, value: `> ${days}, ${hours}, ${minutes} and ${seconds}`, inline: false },
        { name: `<:djs:1105513014645489807>・Discord.js :`, value: `> \`${djs}\``, inline: false },
        { name: `<:servers:1105513190764314787> ・ Serveur :`, value: `> \`${interaction.client.guilds.cache.size}\``, inline: false },
        { name: `<:user:1105510574206492683>・Users :`, value: `> \`${interaction.client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)}\``, inline: false },
        { name: `<:ping:1105511327016960013> ・ Ping :`, value: `> \`${interaction.client.ws.ping} ms\``, inline: false },
    )
    .setFooter(interaction.client.user.username, interaction.client.user.displayAvatarURL())
    .setTimestamp();
    interaction.reply({ embeds: [about] });
  }
  });

        // CONFIG SLASH
synchronizeSlashCommands(client, [
    {  name: 'help',
        description: 'Affiche les commandes'
      },
      {
        name: 'invite',
        description: 'Affiche le lien du bot'
      },
      {
        name: 'about',
        description: 'Affiche les informations du bot'
      },
    ], {
      debug: true,
    });
    
    // TAG FOR HELP
    client.on('messageCreate', async (message) => {
      if (message.mentions.has(client.user)) { // Vérifier si le bot a été mentionné
      message.channel.send(`:star: Mon préfixe sur ce serveur est : \`${config.prefix}\``)
      }
    });