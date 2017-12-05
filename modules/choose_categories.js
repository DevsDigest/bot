'use strict';

const categories = require('../categories');

function chatSay(chat) {
  chat.say({
    text: 'Choose a category', 
    quickReplies: categories 
  });
}

module.exports = (bot) => {

  bot.on('postback:PERSISTENT_MENU_CATEGORIES', (payload, chat) => {
    chatSay(chat);
  });
  
  bot.hear(['show categories'], (payload, chat) => {
    chatSay(chat);
  });
};