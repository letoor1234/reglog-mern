const express=require ('express');
const morgan = require ('morgan'); // display requests in console
const path = require('path');

const {mongoose} = require ('./database');

const app = express();

//  <Setings
app.set('port', process.env.PORT || 3000); // process env port takes the default port of the system
//  </Settings

//  <Middlewares
app.use(morgan('dev'));

app.use(express.json()); // the server understands Json
// </Middlewares

// <Routes
app.use('/api/tasks', require('./routes/task.routes'));
// </Routes

// <Statics
app.use(express.static(path.join(__dirname, 'public')));
// </Statics

// Start server
app.listen(app.get('port'), ()=>{
  console.log('Server on port ', app.get('port'));//get from app.set
});
