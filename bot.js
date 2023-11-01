const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const bot = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers,
	],
});

const request = require('request');
const authDetails = require('./auth.json');
const commands = require('./bot/commands.js');
const inviteAgeDays = 7;
const inviteMaxUses = 1;
const inviteUnique = true;
const newbID = '226507869401513984';
const gruntID = '267109091053142018';
const troopID = '193350542888534018';
//const memberLogChannelID = '77240621176193025';
//const leadershipChannelID = '970859038336221184';
const memberLogChannelID = '206052775061094401';
const leadershipChannelID = '206052775061094401';
const welcomeChannelID = '374762945848016906';
const bottestChannelID = '206052775061094401';
const rulesChannelID = '523332842940268554';
const generalChannelID = '193349994617634816'

bot.on('ready', () =>
{
    const welcomeChannel = bot.channels.cache.get(welcomeChannelID);
    const rulesChannel = bot.channels.cache.get(rulesChannelID);
    const botTestChannel = bot.channels.cache.get(bottestChannelID);
	
    botTestChannel.send('Boo Boo Bee Doo... Omnic v2.0 is ready to serve its CC337 Overlords!');

    console.log('Bot Online');
    bot.user.setActivity('Achieving Sentience...');
    //bot.user.setGame('$help');

    // Tries to perform this function on the live server
    try
    {
        // Get a list of members with Newbie role
        
        // CC337 Server
        bot.guild.roles.get(newbID).members.forEach((member) =>
        {
            // Get today's date
            const todaysDate = new Date();

            // Find member's join date
            const joinDate = guildMember.joinedAt;

            // Add three days to member's join date
            const threeDaysAfterJoinDate = joinDate.setDate(joinDate.getDate() + 3);

            // If member has been here more than three days and is not a Grunt yet, kick 'em out
            // and send them a message why
            if (threeDaysAfterJoinDate < todaysDate && bot.role.name != 'Grunt')
            {
                // Generate a unique, single use, 7 day invite for the member and send them a DM
                welcomeChannel.createInvite({maxAge: 604800, maxUses: 1, unique: true})
                .then(invite => guildMember.send( 
                {
                    embed:
                    {
                        color: 65380,
                        description: `Hello, you’ve been removed from the ***Charlie Company 337*** Discord for not completing basic membership requirements after three days.

Feel free to rejoin and follow these instructions to access the rest of the Discord:

__**To Gain Full Access to the CC337 Discord:**__

 **1**) Rejoin Discord: https://discord.gg/${invite.code}  This invite is single-use only and will expire after 7 days

 **2**) Change your nickname on Discord to your Bungie ID, Steam ID or Battlenet Tag. See how to here: https://support.discordapp.com/hc/en-us/articles/219070107-Server-Nicknames

 **3**) Join our group on the100: https://www.the100.io/groups/3140

Once you've completed this, post in the #welcome_new_members channel to be promoted to Grunt and receive access to the rest of the Discord.`
                    }
                }))
                .then(() =>
                {
                    member.kick('Did not complete basic membership requirements after three days');
                });
        }
    })
        console.log('Live Server');
    }
    catch (error)
    {
        console.log('Non Live Server');
    }
});

// Handles commands
bot.on('message', (msg) =>
{
    commands.process(bot, msg);
});

bot.on('guildMemberAdd', (guildMember) =>
{
    const member = guildMember;
    member.roles.add(newbID);
    // create embedded message to send to new user
    const welcomeMessageEmbed = new EmbedBuilder()
	.setColor(0x0099FF)
	.setTitle('Welcome to ***Charlie Company 337***!')
	.setURL('https://www.the100.io/groups/v2/3140')
	.setAuthor({ name: 'CC337 Dev Team', iconURL: 'https://pwntastic-avatar-production.s3.amazonaws.com/uploads/group/header_image/3140/CC337-5.png', url: 'https://discord.js.org' })
	.setDescription('CC337 New Member Welcome Message')
	.setThumbnail('http://i.imgur.com/KslihqE.png')
	.addFields(
		{ name: 'Regular field title', value: 'We are a casual gaming group that has a ton of fun together. We\'re very active here in Discord, have games going every night and group events throughout the month.' },
		{ name: '\u200B', value: '\u200B' },
		{ name: 'Inline field title', value: '__**There are a few things you need to do to gain full access to the Discord:**__', inline: false },
		{ name: 'Inline field title', value: '**1**) Join our group on the100.io. This is where we schedule our games. You can still LFG in Discord, but this is the core of our group. https://www.the100.io/g/3140', inline: false },
        { name: 'Inline field title', value: '**2**) Be sure to set your nickname to let people know how to find you on your main platform (e.g. "Username#1234 (Bungie)" or "Username (Steam)").', inline: false },
        { name: '\u200B', value: '\u200B' },
        { name: 'Inline field title', value: 'To do this: \
        - right click your name in Discord \
        - select "Edit Server Profile" \
        - change your nickname in the text box \
        - click "Save Changes" at the bottom of the screen.', inline: false },
        { name: 'Inline field title', value: 'See here for more info: https://support.discordapp.com/hc/en-us/articles/219070107-Server-Nickname', inline: false },
        { name: 'Inline field title', value: 'MESSAGE', inline: false },

        )
	.setTimestamp()
	.setFooter({ text: 'If you have any questions, please let a member of the leadership team know or post in ${bot.channels.cache.get(welcomeChannelID)} for help', iconURL: 'http://i.imgur.com/KslihqE.png' });
    // Send a DM to the new user explaining our rules.
    member.send({ embeds: [welcomeMessageEmbed] }).catch(err => {
        console.warn('Unable to DM this user:' + err);
    });
    //}
    /* member.send(  
        {
        embed:
        {
            color: 65380,
            description: `Welcome to ***Charlie Company 337***! We are a casual gaming group that has a ton of fun together. We're very active here in Discord, have games going every night and group events throughout the month.

__**There are a few things you need to do to gain full access to the Discord:**__

     **1**) Join our group on the100.io. This is where we schedule our games. You can still LFG in Discord, but this is the core of our group. https://www.the100.io/g/3140

     **2**) Be sure to set your nickname to let people know how to find you on your main platform (e.g. "Username#1234 (Bungie)" or "Username (Steam)").  
     
     To do this:
     - right click your name in Discord
     - select "Edit Server Profile"
     - change your nickname in the text box 
     - click "Save Changes" at the bottom of the screen.  

     See here for more info: https://support.discordapp.com/hc/en-us/articles/219070107-Server-Nicknames

     **3**) Familiarize yourself with our ${bot.channels.cache.get(rulesChannelID)}.

     **4**) Once you've done everything above, post in ${bot.channels.cache.get(welcomeChannelID)} to get promoted to Grunt and have full acess to our Discord.

That's it! If you have any questions, please let a member of the leadership team know or post in ${bot.channels.cache.get(welcomeChannelID)} for help.`
        } 
    }).catch(err => {
        console.warn("Unable to DM this user - " + err);
    })*/
    // Add Newbie role to new member upon joining
    //guildMember.addRole(guildMember.guild.roles.find('name', 'Newbie'));
    //const role = bot.user.getRole(newbID);
    //const member = guildMember.options.getMember(bot.user.id);

    const leadershipChannel = bot.channels.cache.get(leadershipChannelID);
    const welcomeChannel = bot.channels.cache.get(welcomeChannelID);
    //const memberLogChannel = guildMember.guild.channels.find('name', 'member_log');
    const memberLogChannel = bot.channels.cache.get(memberLogChannelID);
    // Post a message in welcome_new_members/company_leadership/member_log notifying users of new member.
    welcomeChannel.send(`Hey everyone! We have a new member. Please welcome ${guildMember.user} to our group! ${guildMember.user}, please read the post at the top of this channel for more information on how to get promoted to Grunt and be given access to the rest of the Discord. Happy gaming!`);

    leadershipChannel.send(`Hey leadership team! We have a new member. Please be sure to welcome them and encourage them to participate! New Member = ${guildMember.user}`);

    memberLogChannel.send(`New Member = ${guildMember.user}`);
});

// When a user is removed for any reason (kicked/left on own) displays a message in
// member log channel to notify mods and keep track of who has left.
bot.on('guildMemberRemove', (guildMember) =>
{
    const memberLogChannel = bot.channels.cache.get(memberLogChannelID);

    // Check audit logs to see if member was kicked
    guildMember.guild.fetchAuditLogs('limit',1)
    .then((logs) => {

        // If member was kicked by CC337Bot, send this message
        if(logs.entries.first().action === 'MEMBER_KICK' && logs.entries.first().executor.id === '206128006698237952') {
            memberLogChannel.send(`Newbie ${guildMember.user} has been kicked! Good riddance!`);
        }

        // If member was banned, left, or kicked by someone else, send this message
        else {
            memberLogChannel.send(`Member Left = ${guildMember.user}`);
        }
    });


})

// When a member is promoted to grunt or trooper, post a message in general
// When a newbie changes their nickname send a notification to leadership
// When any member changes their nickname, add it to the mod log
bot.on('guildMemberUpdate', (oldMember,newMember) =>
{
    const generalChannel = bot.channels.cache.get(generalChannelID);
    const leadershipChannel = bot.channels.cache.get(leadershipChannelID);
    const memberLogChannel = newMember.guild.channels.fetch(memberLogChannelID);
    const welcomeChannel = bot.channels.cache.get(welcomeChannelID);

    // If roles have been updated
    if (oldMember.roles.cache.some(role => role.name !== newMember.role)) {
    //if(oldMember.role.equals(newMember.roles) === false) {

        // If the new role added is grunt, send message to general channel
        if (oldMember.roles.cache.some(role => role.name !== gruntID) && newMember.roles.cache.some(role => role.name === gruntID)) {
            generalChannel.send(`Please welcome our newest grunt ${newMember.user}! Take a moment to introduce yourself in ${bot.channels.cache.get('227914910158290945')} and pick up some roles in ${newMember.guild.channels.find('name', 'role_requests')}. We're glad you joined us!`);
        }

        // If the new role added is trooper, send a message to general channel
        else if (oldMember.roles.cache.some(role => role.name !== troopID) === false && newMember.roles.cache.some(role => role.name === troopID)) {
            generalChannel.send(`Congrats to ${newMember.user} on making Trooper status! Thanks for playing with us! ${newMember.guild.emojis.find('409058931571163137')}`); // Dorito emoji 409058931571163137
        }
    }

    // If a newbie has changed their nickname
    if(newMember.nickname && oldMember.nickname !== newMember.nickname) {
        
        // Post a message to member_log
        if (oldMember.nickname) {
            memberLogChannel.send(`${oldMember.nickname} has changed their nickname to ${newMember.user}`);
        }
        
        else{
            memberLogChannel.send(`${oldMember.displayName} has added the nickname ${newMember.user}`);
        }
        
        if(newMember.rolescache.some(role => role.name === newbID)) {
            if (oldMember.nickname) {
                welcomeChannel.send(`Newbie ${oldMember.nickname} has changed their nickname to ${newMember.user}`);
            }
            
            else{
                welcomeChannel.send(`Newbie ${oldMember.displayName} has added the nickname ${newMember.user}`);
            }
        }
    }

})

// When the bot shuts down for whatever reason we post a msg in bottestchannel
// to keep a log and notify bot admins.
bot.on('disconnect', (msg) =>
{
    const botTestChannel = bot.channels.fetch(bottestChannelID);

    botTestChannel.send('Bee Bee Boop ... Bot Disconnected');
});

// Debug Handler
bot.on('debug', (e) =>
{
    console.info(e);
});

// Warning Handler
bot.on('warn', (e) =>
{
    console.warn(e);
});

// Error Handler
bot.on('error', (e) =>
{
    const botTestChannel = bot.channels.fetch(bottestChannelID);
    botTestChannel.send('IM MEEEEEELTING. - ' + e);
    console.error(e);
});

// Discord.js command to log the bot in to discord. Uses authDetails json file
bot.login(authDetails.token);
