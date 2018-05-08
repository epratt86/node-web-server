const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const app = express();

//find the partials
hbs.registerPartials(__dirname + '/views/partials');

//Helpers
hbs.registerHelper('getCurrentYear', ()=> {
  return new Date().getFullYear()
});
hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});
//use 'handlebars'
app.set('view engine', 'hbs');

//middleware
app.use((req, res, next) => {
  let now = new Date().toString();
  let log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to server.log');
    }
  });
  next();
});
app.use((req, res, next) => {
  res.render('maintenance');
});

app.use(express.static(__dirname + '/public'));

app.get('/', (req,res) => {
  res.render('home', {
    title: 'Home Page',
    message: 'Thank\'s for visiting!'
  });
});

app.get('/about', (req,res) => {
  res.render('about', {
    title: 'About Page'
  });
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'This shit is fucked up!'
  });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
