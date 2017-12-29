'use strict';

module.exports = (bot) => {
  bot.setPersistentMenu([
    {
      type: 'postback',
      title: 'Help',
      payload: 'PERSISTENT_MENU_HELP'
    }
  ]);
};