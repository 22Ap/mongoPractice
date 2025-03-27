const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());

async function main() {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/MongoPrac");
        console.log("Connection successful!");
    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
    }
}

main();

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    //we have other options too that we create another model for address and them embed it here
    //but that would have been complex for this case hence we have used it here directly as an array
    address: [{
        _id : false, //this would turn off giving unique ids to each address
        location: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        state: {
            type: String,
            required: true,
        },
        pincode: {
            type: Number,
            required: true,
        }
    }]
})

const User = mongoose.model("User", userSchema);

const addUsers = async () => {
    let user1 = new User({
        name: "Anupam",
        email: "Anupam@gmail.com",
        address: [{    //address as an array because we can have multiple addresses
            location: "152 Sarvan Bhadsara Bikram",
            city: "Patna",
            state: "Bihar",
            pincode: 801104
        }]
    });

    user1.address.push({
        location: "110 Sona Naubatpur",
        city: "Patna",
        state: "Bihar",
        pincode: 801109
    });

    try {
        let result = await user1.save();
        console.log(result);
    } catch (error) {
        console.error("Error saving user:", error);
    }
    
}

const getUser = async () => {
    let result = await User.findOne({ name: "Anupam" });
    console.log(result);
}

addUsers();
getUser();

// const deleteAllUsers = async () => {
//     await User.deleteMany({});
//     console.log("All users deleted!");
// };

// deleteAllUsers();