//Axios/Cheerio
url = "https://medium.com/tag/"+req.params.tag+"/latest";
  axios(url)
  .then(response =>{
    const html = response.data;
    const $ = cheerio.load(html);
    const articles = [];
    
    $('.ae.fu',html).each(()=>{
      const title = $(this).find('h2').text();
      const anchor = $(this).find('a.ez').attr('href');
      // console.log(anchor);
      articles.push({
        title,
        anchor
      })
    })
    res.json(articles);
  }).catch((err)=>{console.log(err);})

//Login Signup Trials
// app.post("/signup",(req,res)=>{
//     pw = md5(req.body.pw);
//     uname = req.body.name;
//     connection.query('INSERT INTO users SET username=?, password=?',[uname,pw],
//     (error,results,fields)=>{
//         if(error)
//             console.log(error);
//         else
//             res.json({message:"DONE"})
//     })
// })

// app.post("/login",(req,res)=>{
//     pw = md5(req.body.pw);
//     uname = req.body.name;
//     connection.query('SELECT * FROM USERS WHERE USERNAME=?',uname,
//     (error,results,fields)=>{
//         if(error)
//     })
// })