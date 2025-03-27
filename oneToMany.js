// neeche wala kaam krna hai
/*
1. customer schema bnana hai
2. order schema bnana hai
3. customer schema ke ander order schema ko embed krna hai
4. phir ek customer and uske order details to database me enter krna hai
    a. uske liye pehle hmko order ko insert krna pdega
    b. phir us order ko customer ke sath link krna pdega
        link krne ka 2 tarika hai
            1.pehle ki order ka id customer me push kr de
            2.pura order hi push kr de (is code me hum yahi krenge)
                internally mongodb bas object id hi push krega, chale bhale hi hmko terminal pe pura object dikhe
        order push krne ke liye pehle usko dhundhna pdega database me

5. handling deletions:
    1. pehla to ye hai ki bas user delete ho order jaisa ka taisa bna rhe
    2. jab user delete ho tab usse juda sara order bhi delete ho jaye (cascading delete)
        iske liye query middleware use krna pdega
            1. pre = runs before query is executed
            2. post = runs after query is executed
*/

const express = require('express');
const mongoose = require('mongoose');

const app = express();

const connectMongoDb = async function (){
    try{
        mongoose.connect("mongodb://127.0.0.1:27017/MongoPrac");
        console.log("Connection successful!");
    }catch(err){
        console.error("Error connecting to MongoDB:", err);
    }
};

connectMongoDb();

const orderSchema = new mongoose.Schema({
    item:{
        type: String,
        required: true
    },
    price:{
        type:Number
    },
    quantity:{
        type:Number
    }
});
   

const customerSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    email:{
        type:String
    },
    orders:[{
        type:mongoose.Schema.Types.ObjectId,    //lnking order schema with customer schema
        ref: "Order"
    }]
});

const Order = mongoose.model("Order", orderSchema);
const Customer = mongoose.model("Customer", customerSchema);

const addOrders = async () => {
    let res = await Order.insertMany([
        {item: "samosa", price: 30, quantity: 2},
        {item: "kachodi", price: 40, quantity: 2},
        {item: "aloo parantha", price: 70, quantity: 1},
        {item: "cold drink", price: 60, quantity: 3}
    ]);
    console.log(res);
};

addOrders();


const addCustomer = async () => {
    let customer1 = new Customer({
        name: "Anupam",
        email: "Anupam@gmail.com",

    });

    let order1 = await Order.findOne({item: "samosa"});
    let order2 = await Order.findOne({item: "kachodi"});
    let order3 = await Order.findOne({item: "aloo parantha"});
    let order4 = await Order.findOne({item: "cold drink"});

    customer1.orders.push(order1, order2, order3, order4);

    let result= await customer1.save();
    console.log(result);
};

addCustomer();

//finding customers
const findCustomers = async () => {
    let result = await Customer.find({});
    console.log(result);
};

//abhi sirf sare orders ka objectId aayega but order details nahi aayega
findCustomers();

//jab hum populate use krenge to order objects aayega id ki jagah, details ke liye object ko stringify kr skte hai
const findCustomers1 = async () => {
    let result = await Customer.find({}).populate("orders");
    console.log(result);
};
//findCustomers1();

const findCustomers2 = async () => {
    let result = await Customer.find({}).populate("orders");
    console.log(JSON.stringify(result, null, 2)); // Pretty-print JSON
};
//findCustomers2();

//provides best formatting
const findCustomers3 = async () => {
    let result = await Customer.find({}).populate("orders");
    result.forEach(customer => {
        console.log(`Customer: ${customer.name}`);
        console.log("Orders:");
        customer.orders.forEach(order => {
            console.log(`- Item: ${order.item}, Price: ${order.price}, Quantity: ${order.quantity}`);
        });
    });
};
findCustomers3();

