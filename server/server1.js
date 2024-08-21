

const http = require('http');
const PORT = 3000;
const url = require('url')
const fs = require('fs');
const { parse } = require('path');

const server = http.createServer((req,res) =>{
  

  // get the req url

  const req_url = req.url;
  console.log('req_url : ',req_url);

  //parse the req url
  const parsed_url = url.parse(req_url);
  console.log('parsed_url : ',parsed_url)

  if(parsed_url.pathname === '/'){

    //serve the html file on root request

    res.writeHead(200,{'Content-Type' : "text/html"});
    res.end(fs.readFileSync('../client/index.html'));
  }

  else if(parsed_url.pathname === '/style.css'){
    //serve the css file on root request
    res.writeHead(200,{'Content-Type' : "text/css"});
    res.end(fs.readFileSync('../client/style.css'));
  }
  elseif

  
});

server.listen(PORT,()=>{
  console.log(`server running at http://localhost:${PORT}`);

})