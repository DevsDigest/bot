'use strict';

const categories = require('../categories');

function chatSay(chat) {
  chat.say({
    text: 'Choose a category', 
    quickReplies: categories 
  });
}

module.exports = (bot) => { 
  bot.hear(['show categories'], (payload, chat) => {
    chatSay(chat);
  });
};