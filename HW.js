const fs = require('fs');

var pattern = new RegExp(/[8-9]+\.\d+\.\d+\.\d+\s.{77}|[3-4]+\.\d+\.\d+\.\d+\s+.{76}/g);

const ws = fs.createWriteStream('./89.123.1.41_requests.log');
const ws2 = fs.createWriteStream('./34.48.240.111_requests.log');
const rs = fs.createReadStream('./access.log');
rs.on('data', (line) =>  {
  const lines = line.toString().match(pattern);

  const ml = lines.filter(item =>item.match("89.123.1.41")).toString().replace(/,/g, '\n');
  const ml2 = lines.filter(item =>item.match("34.48.240.111")).toString().split(/,/g).join('\n');

  ws.write(ml);
  ws2.write(ml2);
});

