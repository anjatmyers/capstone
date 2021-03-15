const express = require('express'); 
const app = express();
const passport = require('passport');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Headers", "*");
    next();
  });
//   ^ this middleware will allow access for all CORS

app.use(require('./routes/authentications'));
app.use(require('./routes/googleauth'));
app.use(require('./routes/assessments'));


app.listen(3001, () => {
    console.log('listening on port 3001');
})
