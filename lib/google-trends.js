module.exports = class GoogleTrends {
  // webhook = incomingWebhookのインスタンス geo = 地域（デフォルトでJP）
  constructor(webhook, geo) {

    this.trdapi = require("google-trends-api");
    this.date = new Date();
    this.geo = geo || 'JP';
    this.webhook = webhook
    this.execute();
  }

  execute() {
    // デイリートレンド取得
    this.trdapi.dailyTrends({
      trendDate: this.date,
      geo: this.geo,
    })
    .then(results => {
      var messages = this.makeMessage(JSON.parse(results));
      this.sendMessages(messages);
    })
  }

  // google-trends-apiのレスポンスから、キーワード毎にメッセージを整形する関数
  makeMessage(body) {

    var trendArray = body.default.trendingSearchesDays[0].trendingSearches
    var messages = []

    trendArray.forEach((element) => {
      // この関数の中で、記事の必要な要素を抽出して、一つの文字列に連結させる
      var message = element.title.query + '\t' + element.formattedTraffic + '\n' + element.image.newsUrl + '\n';
      messages.push(message);
    });
    messages = messages.slice(0, 5)
    return messages;
  }

  // メッセージ一つ一つ送信する処理
  sendMessages(messages) {
    (async () => {
      this.webhook.post(`本日${this.geo}の流行のキーワードです。`);
      // １秒毎にメッセージを送信
      for(let message of messages) {
        await this.sleep(1000);
        this.webhook.post(message);
      }
    })();
  }

  async sleep(millis) {
    return new Promise(resolve => setTimeout(resolve, millis));
  }
}
