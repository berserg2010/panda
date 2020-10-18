const fs = require('fs');
const { PeerServer } = require('peer');


const peerServer = PeerServer({
  path: '/myapp',
  port: 9000,
  secret: true,
  ssl: {
    key: fs.readFileSync('../ssl/dev.local.key'),
    cert: fs.readFileSync('../ssl/dev.local.crt')
  },
});

exports.server = peerServer
