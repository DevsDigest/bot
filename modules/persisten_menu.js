'use strict';

module.exports = (bot) => {
  bot.setPersistentMenu([
    {
      type: 'postback',
      title: 'Show Categories',
      payload: 'PERSISTENT_MENU_CATEGORIES'
    },
    {
      type: 'postback',
      title: 'Help',
      payload: 'PERSISTENT_MENU_HELP'
    }
  ]);
};