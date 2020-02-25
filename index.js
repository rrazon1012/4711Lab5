let express = require('express')  
let app = express();
let bodyParser = require('body-parser');
let path = require('path');

app.use(express.static(path.join(__dirname,'/')))

app.get('/', (req, res) => {
   //res.send("Hello")
   res.sendFile(path.join(__dirname+'/index.html'))
});

app.listen(process.env.PORT ||3000);