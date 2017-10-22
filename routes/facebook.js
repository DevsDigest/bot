const config = require('../config');
const Fb = require('.././facebook');

function receivedMessage(event) {
  const facebook = new Fb(event);
  facebook.receivedMessage();
}

function receivedPostback(event) {
  const facebook = new Fb(event);
  facebook.receivedPostback(event);
}

class Facebook {
  validate(req, res) {
    if(req.query['hub.mode'] === 'subscribe' && req.query['hub.verify_token'] === config.FACEBOOK.VERIFY_TOKEN) {
      console.log('verified webhook');
      res.status(200).send(req.query['hub.challenge']);
    } else {
      console.error('Token invalid');
      res.sendStatus(403);
    }
  }

  send(req, res) {
    let data = req.body;
    if(data.object === 'page') {
      data.entry.forEach((entry) => {
        entry.messaging.forEach((event) => {
          if(event.message) {
            console.log('called here event message');
            receivedMessage(event);
          } else if(event.postback) {
            receivedPostback(event);
          } else {
            console.log('called here without event');
          }
        });
      });
      res.sendStatus(200);
    }
  }
}

module.exports = Facebook;