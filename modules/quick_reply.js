'use strict';
const axios = require('axios');
const config = require('../infra/config');

module.exports = (bot) => {
  bot.on('quick_reply', (payload, chat) => {
    let category = payload.message.text;
    let url = `${config.api}/posts/${category}?limit=5`;
    
    axios.get(url).then(response => {
      let data = response.data;
      if (data.statusCode === 404) {
        chat.say(data.message);
        return;
      }
  
      let posts = data.map((post) => {
        return {
          title: post.title,
          subtitle: post.author,
          buttons: [
            {
              type: 'web_url',
              url: post.url,
              title: 'Read post'
            }
          ]
        };
      });
      
      chat.sendGenericTemplate(posts);
  
    }).catch(error => {
      console.log(error.response);
    });
  });  
};