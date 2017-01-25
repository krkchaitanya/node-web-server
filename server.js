const express=require("express");
const fs=require('fs');
const hbs=require("hbs");
const port=process.env.PORT||3000;
var app=express();

hbs.registerPartials(__dirname+"/views/partials");
app.set('view engine','hbs');

app.use((req,res,next)=>{
  var now= new Date().toString();
  var log=`${now}: ${req.method} ${req.url} `;
  console.log(log);
  fs.appendFile("server.log",log+'\n',(err)=>{
    if(err){
      console.log("unable to apped the file ")
    }
  })
next();
});
// app.use((req,res,next)=>{
//   res.render('maintenance.hbs');
// });

app.use(express.static(__dirname +"/public"));
app.get('/',(req,res)=>{
  //res.send("<h1>hello express</h1>");
  res.send({
    name:"andrew",
    like:[
      'biking',
      'cities'
    ]
  });
});
hbs.registerHelper('getDateYear',()=>{
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt',(text)=>{
  return text.toUpperCase();
});

app.get('/about',(req,res)=>{
  res.render('about.hbs',{
    pageTitle:"about page",
  //  currentYear:new Date().getFullYear()
  });
  });

  app.get("/projects",(req,res)=>{
    res.render("projects.hbs",{
      pageTitle:"projects"
    });
  });

  app.get('/home',(req,res)=>{
    res.render('home.hbs',{
      pageTitle:"help page",
      helloworld:"how u guys doing today"
      //currentYear:new Date().getFullYear()
    });
  });
app.listen(port,()=>{
  console.log(`serevr is on the port ${port}`);
});
