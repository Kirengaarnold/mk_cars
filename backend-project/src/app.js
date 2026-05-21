const express = require('express');
const app = express();
const db = require('./config/db.js');
const cors = require('cors');
const adminRoute = require('./routes/adminRoute');
const userRoute = require('./routes/userRoute');
const postRoute = require('./routes/postRoute');
const employeesRoute = require('./routes/employeeRoute');






app.use(cors());
app.use(express.json());
app.use('/admin', adminRoute);
app.use('/user', userRoute);
app.use('/post', postRoute);
app.use('/employee', employeesRoute);
app.get('/', (req, res) => res.send('Hello World'));
app.listen(3000, () => console.log('Server running on port 3000'));