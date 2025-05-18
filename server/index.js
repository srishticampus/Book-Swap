const express=require('express')
const bodyParser=require('body-parser')
const db=require('./DBConnection')
const app=express()
const cors=require('cors')
const multer=require('multer')
const jwt=require('jsonwebtoken')
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

app.use(express.static(`${__dirname}/upload`));

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.use(cors())
const route=require('./routes')
app.use('/',route)

const PORT = 4059;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
