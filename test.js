const fs = require('fs');
const CHECK_LOG = './log_test.txt';
//const CHECK_LOG = '../access.log';
const logString = './89.123.1.41_requests.log';
const logString2 = './34.48.240.111_requests.log';

const reg = /[8-9]+\.\d+\.\d+\.\d+\s.{77}/g;
const reg2 = /[3-4]+\.\d+\.\d+\.\d+\s+.{76}/g;

var buffer = '';

const ws = fs.createWriteStream(logString);
const ws2 = fs.createWriteStream(logString2);
const rs = fs.createReadStream(CHECK_LOG);
rs.on('data', (chunk) =>  {
  const lines = (buffer + chunk).split(/\r?\n/g);
  buffer = lines.pop();

  const modifiedLines = lines.filter( (line) => {
      return line.match(reg)
    })
  const modifiedLines2 = lines.filter( (line) => {
        return line.match(reg2)
      })
  const result = modifiedLines.toString().replace(/,/gi, '\n');
  const result2 = modifiedLines2.toString().replace(/,/gi, '\n');
  ws.write(result);
  ws2.write(result2);
    
});

rs.on('error', (err) => {
       console.log(err);
   });
