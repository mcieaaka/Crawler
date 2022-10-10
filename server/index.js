const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
// const axios = require('axios');

PORT = 4000|| process.env.PORT;
var mysql = require('mysql');
const SpecificArticle = require('./Controller.js').SpecificArticle;
const ArticleList = require('./Controller.js').ArticleList;

var connection = mysql.createConnection({
  host     : 'crawlerdb.cczpqsi56qoj.us-east-1.rds.amazonaws.com',
  port     : 3306,
  user     : 'admin',
  password : 'crawlerDB',
  database : 'gocometcrawler'
});

app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());
//SpecificArticle("file:///D:/sem6/TESTPAGE/on-design-thinking-8426ecf328b3.html")
// SpecificArticle("https://medium.com/@fosta/on-design-thinking-8426ecf328b3")

app.get("/search/:tag",async(req,res)=>{
  const L =await ArticleList("https://medium.com/tag/"+req.params.tag.toLowerCase());
  res.json(L);
})

app.get("/view",async(req,res)=>{
  const A = await SpecificArticle("https://medium.com"+req.query.link);
  res.json(A);
})
// ArticleList("https://medium.com/design/")
app.post("/save",async(req,res)=>{
  const t = req.body.title;
  const i = req.body.intro;
  const l = req.body.link;
  connection.query('Insert into savedblogs set title=?,intro=?,link=?',[t,i,l],(
    (error,results,fields)=>{
      if(error){
        res.send("<script>alert("+error+")</script>")
      }else{
        res.send("<script>alert(\"Article Saved\")</script>")
      }
    }
  ))
})

app.get("/saved",async(req,res)=>{
  connection.query("SELECT * FROM savedblogs",
  (error,results,fields)=>{
    if(error) console.log(error);
    else{
      res.json(results);
    }
  })
})

app.listen(PORT, ()=>{console.log('listening on port '+PORT);});