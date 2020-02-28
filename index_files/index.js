
let x = document.getElementById("Add-Artist");
x.addEventListener('click',addArtist,false);

let y = document.getElementById("input-button");
y.addEventListener('click',add,false);

let z = document.getElementById("search");
z.addEventListener('click',search,false);

function addArtist(){
   var b = document.getElementById("addform");
   if(b.style.display != "flex"){
   document.getElementById("input-name").value = "";
   document.getElementById("input-info").value = "";
   document.getElementById("input-picture").value = "";
   b.style.display = "flex";
   } else if(b.style.display == "flex"){
      b.style.display = "none";
   }
}

function add(){
   var container = document.getElementById("input-destination")
   var name = document.getElementById("input-name")
   var about = document.getElementById("input-info")
   var image = document.getElementById("input-picture")
   
   var b = document.getElementById("addform");
   b.style.display = "none";
   
   var artist = document.createElement("DIV");
   artist.className = "artist";
   var pic = document.createElement("DIV")
   pic.className = "picture"
   var information = document.createElement("DIV");
   information.className = "information";
   //var deldiv = document.createElement("DIV");

   var artistname = document.createElement("P")
   console.log(name.value);
   artistname.className = "name";
   artistname.textContent = name.value;
   //name.value = "";
   
   var artistinfo = document.createElement("P")
   artistinfo.className = "spec"
   artistinfo.textContent = about.value;
   //about.value = "";
   
   var artistpicture = document.createElement("IMG")
   artistpicture.src = image.value;  
   
   var tempname = name.value;
   var tempabout = about.value;
   var tempimage = image.value;

   var del = document.createElement("BUTTON")
   del.className = "delete";
   del.textContent = "Delete"
   del.onclick = function(){
      this.parentNode.remove();
   }
   //deldiv.appendChild(del);
    
   artist.appendChild(pic);
   artist.appendChild(information);
   artist.appendChild(del);
   
   pic.appendChild(artistpicture);
   information.appendChild(artistname);
   information.appendChild(artistinfo);
   
   var information = {
      "about":tempabout,
      "image":tempimage
   };
   //localStorage.setItem(name.value,JSON.stringify(information));
   container.appendChild(artist);
}

function search(){
   
   var searchbar = document.getElementById("bar");
   var input = searchbar.value;
   var container = document.getElementById("input-destination");
   container.innerHTML = "";
   
      var patt = new RegExp(input.toLowerCase());
      fetch('database.json')  //defaults to GET request 
         .then(function(response) {
         return response.json(); 
      }) 
         .then(function(data) {// we have the data in json or text 

            for(var x in data.Artists){     
               console.log(patt.test(data.Artists[x].name.toLowerCase()))
               if(patt.test(data.Artists[x].name.toLowerCase())){
   //            console.log("Item",data.Artists);
               console.log(data.Artists[x]);
               var artist = document.createElement("DIV");
               artist.className = "artist";

               var pic = document.createElement("DIV")
               pic.className = "picture"

               var information = document.createElement("DIV");
               information.className = "information";

               var artistname = document.createElement("P")
               artistname.className = "name";
               artistname.textContent = data.Artists[x].name;

               var artistinfo = document.createElement("P")
               artistinfo.className = "spec"
               artistinfo.textContent = data.Artists[x].info;

               var artistpicture = document.createElement("IMG")
               artistpicture.className = "image";
               artistpicture.src = data.Artists[x].pic;


               var del = document.createElement("BUTTON")
               artist.appendChild(pic);
               artist.appendChild(information);
               artist.appendChild(del);

               pic.appendChild(artistpicture);
               information.appendChild(artistname);
               information.appendChild(artistinfo);  

               del.className = "delete";
               del.textContent = "Delete"
               del.onclick = function(){
                  this.parentNode.remove();
                  deleteArtist(data.Artists[x]);                  
               }
               container.appendChild(artist);
            }
      }
      }) 
         .catch(function(error) { console.log('Request failed', error) });

}

function load(){
   var searchbar = document.getElementById("bar");
   var input = searchbar.value;
   var container = document.getElementById("input-destination");
   
   fetch('database.json')  //defaults to GET request 
      .then(function(response) {
      return response.json(); 
   }) 
      .then(function(data) {// we have the data in json or text 
      
         for(var x in data.Artists){      
            let obj = data.Artists[x];
//            console.log("Item",data.Artists);
            console.log(data.Artists[x]);
            var artist = document.createElement("DIV");
            artist.className = "artist";
            
            var pic = document.createElement("DIV")
            pic.className = "picture"
            
            var information = document.createElement("DIV");
            information.className = "information";

            var artistname = document.createElement("P")
            artistname.className = "name";
            artistname.textContent = data.Artists[x].name;

            var artistinfo = document.createElement("P")
            artistinfo.className = "spec"
            artistinfo.textContent = data.Artists[x].info;

            var artistpicture = document.createElement("IMG")
            artistpicture.className = "image";
            artistpicture.src = data.Artists[x].pic;

            
            var del = document.createElement("BUTTON")
            artist.appendChild(pic);
            artist.appendChild(information);
            artist.appendChild(del);

            pic.appendChild(artistpicture);
            information.appendChild(artistname);
            information.appendChild(artistinfo);  

            del.className = "delete";
            del.textContent = "Delete"
            del.onclick = function(){
               this.parentNode.remove();
               deleteArtist(obj);
            }
            container.appendChild(artist);
         }
   }) 
      .catch(function(error) { console.log('Request failed', error) });
}

function deleteArtist(obj){
   
   fetch('/delete',{
      method:'POST',
      headers:{
         'Content-Type':"application/json"
      },
      body: JSON.stringify(obj)
   })
      .then(function(response) {
         return response.json(); 
      }) 
      .then(function(database) {// we have the data in json or text
         console.log(database)
//         artists = database.Artists;
//         console.log("deleted", obj)
//         var artists = database.Artists;
//         database.Artists = artists.filter((user)=>{return (user.name != obj.name & user.info != obj.info)});
      })
      //.catch(function(error) { console.log('Request failed', error) });
}

