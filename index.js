const mongoose = require("mongoose");

//method 1 using explicit then and catch
// main()
//     .then(()=>{
//         console.log("Connection Successful");
//     })
//     .catch((err)=>{
//         console.log(err);
//     });

// async function main(){
//     await mongoose.connect("mongodb://127.0.0.1:27017/test");
// }

//method 2 using try and catch block
async function main() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/Practice");
    console.log("Connection successful!");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
}

main();

const userSchema =new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    gender:{
      type:String
    },
    age:{
      type:Number
    }
})

//adding collections to our database
const User = mongoose.model("User",userSchema);

// const user1 = new User({
//   name : "Anupam",
//   email : "Anupam@gmail.com",
//   password : "Ampam21",
//   gender : "Male",
//   age : 21
// });

// const user2 = new User({
//   name : "Motka",
//   email : "Momtu@gmail.com",
//   password : "Notcute1",
//   gender : "Male",
//   age : 23
// });

// user2
//   .save()
//   .then((res)=>{
//     console.log(res);
//   })
//   .catch((err)=>{
//     console.log(err);
//   });

//inserting many users at once
// User.insertMany([
//   {name : "Chirayu", email : "Chiray@gmail.com", password : "Chimrayu@32", gender : "Male"},
//   {name : "Sumant", email : "Sumant@gmail.com", password : "Sumant@11", age : 24},
//   {name : "Monty", email : "MOnty@gmail.com", password : "Monty@1", gender : "Male", age : 23}
// ]).then((res)=>{
//   console.log(res);
// }).catch((err)=>{
//   console.log(err);
// })

//using queries in data model
// 

// User.findById('67d557fabc598264e6f3f397')
//   .then((res)=>{
//     console.log(res);
//   })
//   .catch((err)=>{
//     console.log(err);
//   });

//updating user in the model
User.updateOne({name : "Chirayu"},{name : "Chimrayu", age : 31})
    .then((res)=>{
    console.log(res);
  })
  .catch((err)=>{
    console.log(err);
  });

//we can also use find one and update or find by id and update
User.findOneAndUpdate({name : "Anupam"}, {age:20}, {new:true})  //this will return the updated user
  .then((res)=>{
    console.log(res);
  })
  .catch((err)=>{
    console.log(err);
  });