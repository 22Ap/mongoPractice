const express = require('express');
const port = 3000;
const app = express();
const cookieParser = require('cookie-parser');


//isko yahan likhne ka matlab hai ki sare requests cookie-parser middleware ke through jayenge
//uske bad hi wo apne respective routes ke pass pahuchenge
app.use(cookieParser("secretCode"));



//parsing cookies on pages on server side
//to do so we need a middleware named cookie-parser, a npm package
//we can't directly parse cookies without this
app.get('/', (req,res)=>{
    console.dir(req.cookies);
    //console.dir is used to print deeply nested objects, for which console.log does not prints whole details
    //but insted prints just [object]   
    res.send('Hello Dear');
})


/*
sending cookies from the server
hamare response ke andar ek cookie nam ka method hota hai jiski andar hum ket value pairs bhej slte hai as cookies
*/

app.get('/getcookies', (req,res)=>{
    res.cookie("name", "Anupam");   
    res.cookie("age", 21);
    /*
        ye sab hamare cookies hai,jab is route pe ek bar aa gye to ye cookies browser me load ho gaye
        aur jab tak is website pe rhenge iske sare routes pe ye cookies available rhenge.

        hum ek cookie me ek key value pair hi bhej skte hai, agar ek se jayada as json data bhejna 
        chahe to isko middleware laga ke client side pe parse krna pdega which is not recommended
    */
    res.send('Sending cookies');
})

app.get('/greet', (req,res)=>{
    let {name="Unknown"} = req.cookies;   //object destructuring
    res.send(`Hello ${name}`);
})


/*signed cookies
it is used to check or verify the integrity of the cookies, we check whether our cookie has been tampered or not
kyuki agar hum check na kre to ho skta hai ki koi manually browser me cookie ka value change kr de aur bad me dikkat ho jaye

2 step me kam hota hai signed cookies wala, pehla signed cookies bhejna aur dusra usko verify krna
signed cookies ko create ke liye hame cookie ke saath signed:true krna pdta hai, aur cookie parser me ek secret key bhi use krna pdta hai
aise krne se data thoda sa encode hoke jata hai
*/

app.get('/getsignedcookie', (req,res)=>{
    res.cookie("made-in", "India", {signed: true});
    res.send('Sending signed cookies');
})

app.get('/verify', (req,res)=>{
    console.log(req.signedCookies);
    res.send('verified')
})

app.listen(port, ()=>{
    console.log(`server is listening in http://localhost:${port}`);
});


//http is stateless
//express sessions are used to make session stateful
