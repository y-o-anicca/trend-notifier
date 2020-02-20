module.exports = class IncomingWebHook {
  constructor(url) {
    this.url = url;
    this.request = require('request');
  }

  // スラックメッセージを作成する処理
  post (message) {

    this.request({
      url: this.url,
      method: 'POST',
      headers: {'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: message,
        username: "Btrendyボット",
        icon_emoji: ":fire:",
        unfurl_links: true,
        link_names: 1, // @がメンションと解釈されるためのフラグ
      })
    }, (error, response, body) => {
      if (error) {
        return console.error(error);
      }
    });
  }
}
