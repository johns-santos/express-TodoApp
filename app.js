const express = require('express');
const bodyParser = require('body-parser');
const date = require(__dirname + "/date.js");



const app = express();

let items = [];
let workItems = [];

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"))

app.get("/", function (req, res) { 
  
  //let today = new Date();
  // let options = {
  //   weekday: "long",
  //   day: "numeric",
  //   month: "long",
  //   year: "numeric"
  // };

  let day = date()//today.toLocaleDateString("en-US", options);
  res.render("list", {listTitle: day, newListItems: items});
});


// FORM POST request
app.post("/", function(req, res){

  let item = req.body.newItem;

  if(item == ""){
    return false;
  }if (req.body.list == "Work"){
    workItems.push(item)
    res.redirect("/work")
  } else {
    items.push(item)

    res.redirect("/");
  }

});

app.get("/work", function(req,res){
  res.render("list", {listTitle: "Work List", newListItems: workItems })
});

app.get("/about", function(req, res){
  res.render("about");
});

app.post("/work", function(req, res){
  let item = req.body.newItem;
  workItems.push(item);
  res.redirect("/work")

})

app.listen(3000, function () {
  console.log("Server started on port 3000");
});










