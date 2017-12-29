'use strict';

const config = require('./infra/config');
const Bootbot = require('bootbot');
const categories = require('./categories');
const persistenMenu = require('./modules/persisten_menu');
const chooseCategories = require('./modules/choose_categories');
const quickReplies = require('./modules/quick_reply');
const help = require('./modules/help');

const bot = new Bootbot({
  accessToken: config.facebook.pageAccess,
  verifyToken: config.facebook.token,
  appSecret: config.facebook.appSecret
});

bot.setGreetingText('Hey there! Welcome to Devs Digest Bot!');

bot.setGetStartedButton((payload, chat) => {
  chat.getUserProfile().then((user) => {
    chat.say({ 
      text: `Hello ${user.first_name}, to start you need choose a category below and I will show to you some posts.`, 
      quickReplies: categories
    });
  });
});

bot.module(persistenMenu);
bot.module(chooseCategories);
bot.module(quickReplies);
bot.module(help);

bot.start(config.serverPort);