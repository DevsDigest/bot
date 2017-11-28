'use strict';

const request = require('request');
const config = require('./config');
const categories = require('./data/categories');

function sendAPI(data) {
  request({
    url: `${config.FACEBOOK.API_URI}/me/messages`,
    qs: { access_token: config.FACEBOOK.PAGE_ACCESS_TOKEN },
    method: 'POST',
    json: data
  }, (err, res, body) => {
    if (!err && res.statusCode === 200) {
      console.log(`Message sent successful \nUser id: ${body.recipient_id}`);
    } else {
      console.error('Failed:', res.statusCode, res.statusMessage, body.error);
    }
  });
}

function sendMessageHelp(id) {
  let data = {
    recipient: { id: id },
    message: {
      attachment: {
        type: 'template',
        payload: {
          template_type: 'list',
          top_element_style: 'compact',
          elements: [{
            title: 'show categories',
            subtitle: 'look all feeds categories'
          },
          {
            title: 'help me',
            subtitle: 'list with all commands that you can use'
          }]
        }
      }
    }
  };

  sendAPI(data);
}

function sendMessageCategories(id, text = 'Choice a category') {
  const category = categories.map((item) => {
    return {
      content_type: 'text',
      title: item.toUpperCase(),
      payload: item
    };
  });

  let data = {
    recipient: { id: id },
    message: {
      text: text,
      quick_replies: category
    }
  };

  sendAPI(data);
}

function sendMessageText(id, text = 'Sorry, I do not understand your choice. You can use the word "help me" and I will show to you all commands allowed.') {
  let data = {
    recipient: { id: id },
    message: { text: text }
  };

  sendAPI(data);
}

function showPosts(id, cat) {
  request({
    url: `${config.API_SERVER.URI}/v1/posts/${cat}?limit=5`,
    method: 'GET'
  }, (err, res, body) => {
    if (!err && res.statusCode === 200) {
      let data = JSON.parse(body);

      if (data.statusCode !== 404) {

        let posts = data.map((item) => {
          return {
            title: item.title,
            subtitle: item.siteName,
            url: item.url
          };
        });

        sendMessagePosts(id, posts);

      } else {
        sendMessageText(id, data.message);
      }
    } else {
      console.error(`Failed. \n${res.statusCode} - ${res.statusMessage}`);
    }
  });
}

function sendMessagePosts(id, posts = []) {
  let post = posts.map((post) => {
    return {
      title: post.title,
      subtitle: post.subtitle,
      default_action: {
        type: 'web_url',
        url: post.url,
      },
      buttons: [
        {
          type: 'web_url',
          url: post.url,
          title: 'Read post'
        },
        {
          type: 'element_share'
        }
      ]
    };
  });

  let data = {
    recipient: { id: id },
    message: {
      attachment: {
        type: 'template',
        payload: {
          template_type: 'generic',
          elements: post
        }
      }
    }
  };

  sendAPI(data);
}

function sendMessageAttachments(id) {
  let data = {
    recipient: { id: id },
    message: { text: 'Sorry! You can not use attachments' }
  };

  sendAPI(data);
}

class Facebook {
  constructor(event) {
    this.event = event;
    this.id = this.event.sender.id;
  }

  receivedMessage() {
    let message = this.event.message;
    let messageText = message.text;
    let messageAttachments = message.attachments;
    let quickReply = message.quick_reply;

    if (quickReply) {
      console.log('called quick reply');
      showPosts(this.id, quickReply.payload);
      return;
    }

    if (messageText) {
      switch(messageText) {
      case 'show categories':
        sendMessageCategories(this.id);
        break;
      case 'help me':
        sendMessageHelp(this.id);
        break;
      default:
        sendMessageText(this.id);
      }
    } else if (messageAttachments) {
      console.log('called attachment');
      sendMessageAttachments(this.id);
      return;
    }
  }

  receivedPostback() {
    let payload = this.event.postback.payload;

    if (payload === 'Get Started') {
      request({
        url: `${config.FACEBOOK.API_URI}/${this.id}`,
        qs: { access_token: config.FACEBOOK.PAGE_ACCESS_TOKEN, fields: 'first_name' },
        method: 'GET'
      }, (err, res, body) => {
        if (!err && res.statusCode === 200) {
          let data = JSON.parse(body);
          let firstName = data.first_name;
          let message = `Hello ${firstName}. To start you need choose a category below and I will show to you some posts`;

          sendMessageCategories(this.id, message);
        } else {
          console.error('Failed:', res.statusCode, res.statusMessage, body.error);
        }
      });
    }
  }
}

module.exports = Facebook;