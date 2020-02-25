let x = document.getElementById("Add-Artist");
x.addEventListener('click',addArtist,false);

let y = document.getElementById("input-button");
y.addEventListener('click',add,false);

let z = document.getElementById("search");
z.addEventListener('click',search,false);

function addArtist(){
   var b = document.getElementById("addform");
   document.getElementById("input-name").value = "";
   document.getElementById("input-info").value = "";
   document.getElementById("input-picture").value = "";
   b.style.display = "flex";
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
      localStorage.removeItem(tempname);
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
   
   localStorage.setItem(name.value,JSON.stringify(information));
   container.appendChild(artist);
}

function search(){
   
   var searchbar = document.getElementById("bar");
   var input = searchbar.value;
   var container = document.getElementById("input-destination");
   container.innerHTML = "";
   
   for(var i = 0; i < localStorage.length;i++)
   {
      var patt = new RegExp(input.toLowerCase());
      console.log(input);
      console.log(localStorage.key(i));
      console.log(patt.test(localStorage.key(i).toLowerCase()));
      if(patt.test(localStorage.key(i).toLowerCase()))
      {   
         var array = JSON.parse(localStorage.getItem(localStorage.key(i)));
         var artist = document.createElement("DIV");
         artist.className = "artist";
         var pic = document.createElement("DIV")
         pic.className = "picture"
         var information = document.createElement("DIV");
         information.className = "information";
         
         var artistname = document.createElement("P")
         artistname.className = "name";
         artistname.textContent = localStorage.key(i);
   
         var artistinfo = document.createElement("P")
         artistinfo.className = "spec"
         artistinfo.textContent = array.about;

         var artistpicture = document.createElement("IMG")
         artistpicture.src = array.image;
         
         var del = document.createElement("BUTTON")
         del.className = "delete";
         del.textContent = "Delete"
         del.onclick = function(){
            this.parentNode.remove();
            localStorage.removeItem(artistname.textContent);
            
         }
         
         artist.appendChild(pic);
         artist.appendChild(information);
         artist.appendChild(del);
   
         pic.appendChild(artistpicture);
         information.appendChild(artistname);
         information.appendChild(artistinfo);  
         container.appendChild(artist);
      }
   }
}

function load(){
   var searchbar = document.getElementById("bar");
   var input = searchbar.value;
   var container = document.getElementById("input-destination");
   for(var i = 0; i < localStorage.length;i++){
         var array = JSON.parse(localStorage.getItem(localStorage.key(i)));
         var artist = document.createElement("DIV");
         artist.className = "artist";
         var pic = document.createElement("DIV")
         pic.className = "picture"
         var information = document.createElement("DIV");
         information.className = "information";
         
         var artistname = document.createElement("P")
         artistname.className = "name";
         artistname.textContent = localStorage.key(i);
   
         var artistinfo = document.createElement("P")
         artistinfo.className = "spec"
         artistinfo.textContent = array.about;
   
         var artistpicture = document.createElement("IMG")
         artistpicture.src = array.image;
      
         container.appendChild(artist);
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
            localStorage.removeItem(artistname.textContent);
         }
      }
}
