'use strict';

const help = [
  { title: 'show categories', 
    subtitle: 'look all feeds categories' 
  }, {
    title: 'help or help me',
    subtitle: 'list all commands allow in the use Devs Digest Bot'
  }
];

function helpList(chat) {
  chat.sendListTemplate(help, '', { typing: true, topElementStyle: 'compact' });
}

module.exports = (bot) => {
  bot.hear([/help( me)?/i], (payload, chat) => {
    helpList(chat);
  });

  bot.on('postback:PERSISTENT_MENU_HELP', (payload, chat) => {
    helpList(chat);
  });
};