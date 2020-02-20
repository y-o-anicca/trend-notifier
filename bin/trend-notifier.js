const GoogleTrends = require('../lib/google-trends');
const IncomingWebHook = require('../lib/incoming-webhook');

const webhook = new IncomingWebHook('https://hooks.slack.com/services/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')
new GoogleTrends(webhook, process.argv[2])
