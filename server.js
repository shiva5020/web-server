const express = require('express');
const hbs = require('hbs');
var app = express();
const fs= require('fs');

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine','hbs');


hbs.registerHelper('getcurrentYear',() => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt',(text) => {
  return text.toUpperCase();
});
//this is middleware
app.use((req,res,next) => {
  var now = new Date().toString();
  var log = `${now}:${req.method} ${req.url}` ;
  console.log(log);
  fs.appendFile('server.log', log+ '\n' , (err) => {
    if(err){
      console.log('unable to append to server log');
    }
  });
  next();
});

//enviornment varible
const port = process.env.PORT || 3000;

// app.use((req,res,next) => {
//   res.render('maintainance.hbs');
// });

app.use(express.static( __dirname + '/public'));

app.get('/', (req, res) => {
  // res.send('<h1>hello express<h1>');
  // res.send({
  //   name : 'shiva',
  //   likes:[
  //     'biking',
  //     'romaing'
  //   ]
  // });
  res.render('home.hbs',{
    pagetitle : 'home page',
    currentyear : new Date().getFullYear(),
    welcomeNote : 'welcome to my wesite'
  })
});

app.get('/about',(req,res) => {
  // res.send('about page');
  res.render('about.hbs',{
    pagetitle : 'about page',
    currentyear : new Date().getFullYear()
  });
});

app.get('/bad',(req,res) => {
  res.send({
    errormessage: 'unable to connect ot server'
  });
});

app.listen(port,() => {
  console.log(`server is up on port ${port}`);
});
