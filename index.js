const express = require('express')
const app = express()
const routes = require('./routes/routes')


app.use(express.json())
app.listen(3000, ()=>{
    console.log("Server Started...");
})

app.use('/api', routes)




module.exports = app
