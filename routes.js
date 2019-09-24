const fs = require('fs');

function routeHandler(req, res) {
  const url = req.url;
  const method = req.method;
  if (url === `/`) {
    res.setHeader(`Content-Type`, `text/html`);
    res.write(
      `<html><head><title>Somehting</title></head><body><form action="/messages" method="POST"><input name="message" /><button>Submit</button></form><body></html>`
    );
    res.end();
    return;
  } else if (url === '/messages' && method === 'POST') {
    const body = [];
    req.on('data', chunk => {
      body.push(chunk);
      console.log(chunk);
    });
    req.on('end', () => {
      const data = Buffer.concat(body).toString();
      console.log(body);
      fs.writeFile('./messages.txt', data.split('=')[1], err => {
        res.statusCode = 302;
        res.setHeader('location', '/');
        res.end();
      });
    });

    return;
  }
  res.setHeader(`Content-Type`, `text/html`);
  res.write(
    `<html><head><title>Somehting</title></head><body><h1>Hello thhere</h1><body></html>`
  );
  res.end();
}

exports.routeHandler = routeHandler;
