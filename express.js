const express=require('express');
let app=express();
const fs=require("fs");
const bodyParser=require('body-parser');
app.use(bodyParser.json());
// let book=["Ek Hee Rasta","Gaytri Mahavigyan","Ramcaritramanas"];
function addBook(book){
    let data=fs.readFileSync('./books.json');
    let jsonData= JSON.parse(data);
    jsonData.push(book);
    fs.writeFileSync('./books.json',JSON.stringify(jsonData));
    return true;
}
function getAllBooks(){
 let data=fs.readFileSync('./books.json');
 return JSON.parse(data);
}
function getAllAuthors(){
    let data=fs.readFileSync('./books.json');
    let jsonData= JSON.parse(data);
    return jsonData.map((book)=>book.Name);
   }
function getBooksById(id){
    let data=fs.readFileSync('./books.json');
    let jsonData= JSON.parse(data);
    return jsonData.filter((book)=>book.id===id)[0];
   }
function removeDuplicate(books){
    let obj={};
    for(let book of books){
        if(!obj[book.Name]){
            obj[book.Name]=book;
        }
    }
    return Object.values(obj);
}
app.use(function(req,res,next){
    if(req.header('username')==='Aniket'&&req.header('password')==='Aniket@123'){
        next();
    }
    else{
        res.setHeader("content-Type","application/json");
        res.writeHead(401);
        res.end(JSON.stringify({status:"authorization fail"}));
    }
})

app.get("/a",function(req, res) {
    res.writeHead(200);
    res.end('Hey I am Aniket');
});
app.get("/b",function(req, res) {
    res.writeHead(200);
    res.end('Hey I am Manish');
});
app.get("/books",function(req, res) {
      let  book=getAllBooks();
      let remove=removeDuplicate(book);
    if(remove){
        res.setHeader("content-Type","application/json");
    res.writeHead(200);
    res.end(JSON.stringify(remove));
    }
    else{
        res.writeHead(500);
    }
});

app.get("/books/:id",function(req, res) {
    let book=getBooksById(parseInt(req.params.id));
    if(book){
        res.setHeader("content-Type","application/json");
    res.writeHead(200);
    res.end(JSON.stringify(book));
    }
    else{
        res.writeHead(500);
    }
});
app.get("/authors",function(req, res) {
    let authors=getAllAuthors();
    if(authors){
        res.setHeader("content-Type","application/json");
    res.writeHead(200);
    res.end(JSON.stringify(authors));
    }
    else{
        res.writeHead(500);
    }
});
app.post("/books",function(req,res){
    let success=addBook(req.body);
    if(success){
        res.setHeader("content-Type","application/json");
    res.writeHead(201);
    res.end(JSON.stringify({success:true}));
    }
    else{
        res.setHeader("content-Type","application/json");
        res.writeHead(500);
        res.end(JSON.stringify({success:false}));
    }
})

app.listen(5000,()=>{
    console.log("JAI SREE SITARAM ");
})
