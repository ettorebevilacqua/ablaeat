const next = require('next')

// note the "https" not "http" required module. You will get an error if trying to connect with https
const https = require('https')
const { parse } = require("url");

const fs = require("fs");

const hostname = 'localhost'
const port = 443
const dev = process.env.NODE_ENV !== 'production'
  
const app = next({dev, hostname, port });

const sslOptions = {
    key: fs.readFileSync("./certificates/privkey.pem"),
    cert: fs.readFileSync("./certificates/fullchain.pem")
}

const handle = app.getRequestHandler()

app.prepare().then(() => {
 const server = https.createServer(sslOptions, (req, res) => {

    // custom api middleware
    if (req.url.startsWith('/api')) {
    
      return handle(req, res);
    } else {
      // Handle Next.js routes
      return handle(req, res);
    }
 })
 server.listen(port, (err) => {
   if (err) throw err
   console.log('> Ready on https://localhost:' + port);
 })
})

/*
const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");

const hostname = "localhost";
const port = 3000;
const app = next({ dev: false, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      // Be sure to pass `true` as the second argument to `url.parse`.
      // This tells it to parse the query portion of the URL.
      const parsedUrl = parse(req.url, true);
      const { pathname, query } = parsedUrl;
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error("Error occurred handling", req.url, err);
      res.statusCode = 500;
      res.end("internal server error");
    }
  }).listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://${hostname}:${port}`);
  });
});

*/
