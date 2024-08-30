

const http = require('http');
const PORT = 3000;
const url = require('url')
const fs = require('fs');
// const { parse } = require('path');
const querystring = require('querystring')

const{MongoClient} = require('mongodb')
const client  = new MongoClient('mongodb://127.0.0.1:27017')

async function connect(){
  try {
    await client.connect();
    console.log("database connection established")
  } catch (error) {
    console.log("error",error)
  }
}
connect();

const server = http.createServer((req,res) =>{

  let db = client.db("dms");
  let collection = db.collection("users");

  

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
  else if(parsed_url.pathname === '/add-user.html'){
    res.writeHead(200,{'Content-Type' : 'text/html'});
    res.end(fs.readFileSync('../client/add-user.html'))
  }
  else if(parsed_url.pathname === '/script.js'){
    res.writeHead(200,{'Content-Type' : 'text/javascript'});
    res.end(fs.readFileSync('../client/script.js'));
    
  }
 
  else if(parsed_url.pathname === '/submit' && req.method === 'POST'){
   
   console.log('reached here')
    let body = '';
    req.on('data',(chunks) =>{
      console.log(chunks);
      body = body+chunks.toString();
    });
    req.on('end',()=>{
      console.log('body',body)
      const datas = querystring.parse(body);
      console.log('datas',datas);

      console.log('name',datas.name);
      console.log('email',datas.email);

      //save to a database

      collection.insertOne({
        name : datas.name,
        email :datas.email,
        password : datas.password
      })

      .then((message)=>{
        console.log("message",message);
        res.writeHead(201,{'Content-Type' : 'text/plain'})
        res.end("user created successfully");
      })
      .catch((error)=>{
        console.log("error",error);
        res.writeHead(400,{'Content-Type' : 'text/plain'});
        res.end(error.message ? error.message: "user creation failed");
      })
    })


  }
 

  
});

server.listen(PORT,()=>{
  console.log(`server running at http://localhost:${PORT}`);

})