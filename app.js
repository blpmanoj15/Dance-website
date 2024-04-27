const express=require("express");
const fs = require("fs");
const app = express();
const path=require('path');
var mongoose = require('mongoose');
const bodyParser = require('body-parser');

mongoose.connect('mongodb://localhost:27017/contactDance', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//define mongoose schema
var contactSchema=new mongoose.Schema({
  name:String,
  phone:String,
  email:String,
  address:String,
  desc:String,
});

var Contact=mongoose.model('Contact', contactSchema);
const port = 8000; 
const hostname = "127.0.0.1";

// express specific stuff
app.use("/static ", express.static('static'));
// for serving static file
app.use(express.urlencoded( )); // middleware to parse url encoded bodies


// Set the templete Engine as pug
app.set("view engine", "pug");
app.set( 'views', path.join(__dirname, 'views') ); //set the views dir..




    // PUG demo  page end point
    app.get('/' ,(req,res)=>{
        
        const params={} ;
        res.status(200).render("home.pug",params)
    });




    app.get('/contact' ,(req,res)=>{
        
        const params={} ;
        res.status(200).render("contact.pug",params)
    });
    app.post('/contact', (req, res)=>{
        var myData = new Contact(req.body);
        myData.save().then(()=>{
        res.send("This item has been saved to the database")
        }).catch(()=>{
        res.status(400).send("item was not saved to the databse")
      })
      });



    app.get('/about' ,(req,res)=>{
        
        const params={} ;
        res.status(200).render("about.pug",params)
    });
    app.get('/classinfo' ,(req,res)=>{
        
        const params={} ;
        res.status(200).render("classinfo.pug",params)
    });
    app.get('/services' ,(req,res)=>{
        
        const params={} ;
        res.status(200).render("services.pug",params)
    });

    

app.listen(port, hostname, ()=>{
    console.log(`this is application on port http://${hostname}:${port}/`);
});
