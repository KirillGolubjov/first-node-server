const fs = require('fs');
const http = require('http');
const url = require('url');

const replaceTemplate = require('./modules/replaceTemplate');

const tempHome = fs.readFileSync(
  `${__dirname}/templates/template-home.html`,
  'utf8'
);

const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  'utf-8'
);

const tempAsset = fs.readFileSync(
  `${__dirname}/templates/template-asset.html`,
  'utf-8'
);

/////////////////////////////////////////////////////////////////////////////////////
//-------------------------------   SERVER   --------------------------------------//
/////////////////////////////////////////////////////////////////////////////////////

const data = fs.readFileSync(`${__dirname}/data/assets.json`, 'utf-8');
const dataObject = JSON.parse(data);

const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);

  //Home page
  if (pathname === '/' || pathname === '/home') {
    res.writeHead(200, { 'Content-Type': 'text/html' });

    const cardsHtml = dataObject
      .map((el) => replaceTemplate(tempCard, el))
      .join('');
    const output = tempHome.replace('{%ASSET_CARDS%}', cardsHtml);

    res.end(output);

    //Product page
  } else if (pathname === '/product') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    const asset = dataObject[query.id];
    const output = replaceTemplate(tempAsset, asset);

    res.end(output);
    //API page
  } else if (pathname === '/api') {
    res.writeHead(200, { 'Content-type': 'application/json' });
    res.end(data);

    //Not Found
  } else {
    res.writeHead(404, {
      'Content-type': 'text/html',
      'my-own-header': 'hello-world',
    });
    res.end('<h1>Page not found</h1>');
  }
});

server.listen(8000, '127.0.0.1', () => {
  console.log('Server running at http://127.0.0.1:8000/');
});
