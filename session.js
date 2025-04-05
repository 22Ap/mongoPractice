const express = require('express');
const port = 3000;
const app = express();
const flash = require('connect-flash');
const path = require('path');

app.set('view engine', 'ejs');  // Enable server-side rendering with EJS
app.set('views', path.join(__dirname, 'views'));  // Set path for view files

const session = require('express-session');
const { ConnectionPoolClosedEvent } = require('mongodb');

const sessionOptions = {
    secret: "mysupersecret",
    resave: false,
    saveUninitialized: true
}
app.use(session(sessionOptions));
app.use(flash());

app.get('/', (req,res)=>{
    res.send("HELLO WORLD");
})

app.get('/reqcount', (req,res)=>{
    if(req.session.count){
        req.session.count += 1;
    }else{
        req.session.count = 1;
    }
    res.send("You have visited this page " + req.session.count + " times");
});



app.get('/register', (req,res)=>{
    let {name="user"} = req.query;
    req.session.name = name;
    req.flash("success", "user registered successfully"); //success is key and user registered successfully is value
    res.redirect('/hello');
});

app.get('/hello', (req,res)=>{

    res.locals.messages=req.flash("success");
    res.render("show.ejs",{name: req.session.name})
    //above method helps us to create multiple flash messages/variables.

    //console.log(req.flash("success"))
    //res.render("show.ejs", {name: req.session.name, msg: req.flash("success")});
});



app.listen(port, ()=>{
    console.log(`server is listening in http://localhost:${port}`);
});