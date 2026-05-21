const express = require('express');
const session = require('express-session');
const app = express();
const db = require('./config/db.js');
const cors = require('cors');
const adminRoute = require('./routes/adminRoute');
const userRoute = require('./routes/userRoute');
const postRoute = require('./routes/postRoute');
const employeesRoute = require('./routes/employeeRoute');






app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
)
app.use(express.json());
app.use(
  session({
    secret: 'your-session-secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 2 * 60 * 60 * 1000,
      sameSite: 'lax',
    },
  })
)
app.use('/admin', adminRoute);
app.use('/user', userRoute);
app.use('/post', postRoute);
app.use('/employee', employeesRoute);
app.get('/', (req, res) => res.send('Hello World'));
app.listen(3000, () => console.log('Server running on port 3000'));