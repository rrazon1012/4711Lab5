let express = require('express')  
let app = express();
let bodyParser = require('body-parser');
let path = require('path');
let fs = require('fs');

app.use(bodyParser.urlencoded({extended:false}));

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
   artists.push(object);
   fs.writeFileSync('database.json',JSON.stringify(database))
   res.redirect("/")
});

app.post("/delete",function(req,res){
   var database = fs.readFileSync('database.json');
   database = JSON.parse(database)
   var artists = database.Artists;
   database.Artists = artists.filter((user)=>{
      //console.log("Name",user.name, req.body.name)
      //console.log("Info",user.info, req.body.info)
      //console.log("matches",(user.info != req.body.info && user.info != req.body.info))
      return (user.name != req.body.name || user.info != req.body.info)});
   fs.writeFileSync('database.json',JSON.stringify(database));
})

