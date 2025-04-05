const express = require('express');
const port = 3000;
const app = express();

const session = require('express-session');
const { ConnectionPoolClosedEvent } = require('mongodb');

const sessionOptions = {
    secret: "mysupersecret",
    resave: false,
    saveUninitialized: true
}
app.use(session(sessionOptions));


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
    res.redirect('/hello');
})

app.get('/hello', (req,res)=>{
    res.send(`hello mr. ${req.session.name}`);
})



app.listen(port, ()=>{
    console.log(`server is listening in http://localhost:${port}`);
});