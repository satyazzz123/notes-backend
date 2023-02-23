const connectTomongo=require("./db");
const express = require('express')
connectTomongo();


const app = express()
const port = 3000
//middleware to use  req.body
app.use(express.json())
//api routes
app.use('/api/auth',require('./routes/auth'));
app.use('/api/notes',require('./routes/notes'))

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})