let express = require('express')  
let app = express();
let bodyParser = require('body-parser');
let path = require('path');
let fs = require('fs');

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static(path.join(__dirname,'/')))
app.use(express.static(path.join(__dirname,'/index_files')))

app.get('/all', (req, res) => {
   //res.send("Hello")
   res.sendFile(path.join(__dirname+'/index.html'))
});

app.listen(process.env.PORT ||3000);

app.use(bodyParser.json());
app.post("/add",function(req,res){
   
   console.log("logged");
   var aname = req.body.artistname;
   var ainfo = req.body.artistinfo;
   var apic  = req.body.artistpic;
   var object = {name:aname,info:ainfo,pic:apic};
   var database = fs.readFileSync('database.json');
   database = JSON.parse(database);
   var artists = database.Artists;
   console.log(artists);
   artists.push(object);
   fs.writeFileSync('database.json',JSON.stringify(database))
   res.redirect("/")
});

//app.post("/search",function(req,res){
//   var array = 'database.json'
//   var data = JSON.parse
//   res.redirect("/")
//})

app.post("/delete",function(req,res){
   res.redirect("/")
})

