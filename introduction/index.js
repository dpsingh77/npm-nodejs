const express = require('express');
const mongoose = require("mongoose");
const fs = require('fs');
const app = express();
const users = require("./MOCK_DATA.json");

mongoose.connect("mongodb://127.0.0.1:27017/introduction")
.then(() => console.log("DB is connected"))
.catch((err) => console.log("Mongo Error", err));

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        require : true
    },
    last_name: {
        type: String        
    },
    email: {
        type: String,
        require : true,
        unique : true
    },
    gender: {
        type: String
    },
    job_title: {
        type: String
    },
    },
    {timestamps : true}        
);

const db_users = mongoose.model('users', userSchema);

const port = 8000;

app.listen(port, () => console.log("Server has started"));
app.use(express.urlencoded({extended: false}));

app.route('/users').get( async(req, res) => {
    var allUsersFromDB = await db_users.find({})
    return res.json(allUsersFromDB);
});

app.route('/api/user/:id').get(async (req, res) => {    
    var id = req.params.id;
    console.log(id);
    var user = await db_users.findById(id);
    res.json(user) 
}).patch((req, res) => {
    
}).delete(async (req, res) => {
    var toDelete = req.params.id;
    // var user = users.find((user) => user.id === toDelete);
    await db_users.findByIdAndDelete(toDelete);
    return res.json({status : "success", id : toDelete});
});

app.route('/api/user').post(async (req, res) => {
    console.log("In post");
    var newUser = req.body;
    var createdUser = await db_users.create({
        first_name : newUser.first_name,
        last_name : newUser.last_name,
        gender : newUser.gender,
        email : newUser.email,
        job_title : newUser.job_title
    })
    console.log(createdUser);
    return res.status(201).json({msg : "User Created"});
    // var newUser = req.body;
    // users.push({...newUser, id : users.length + 1})
    // fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data) => {
    //     return res.json({status: "success", id: users.length});
    // });
    // dataFile.
    //return res.json(users);
});

// app.route('/api/addallusersfromjsonfile').post(async (req, res) => {
//     console.log("In post to add all users");
//     var fileRead = fs.readFile('./MOCK_DATA.json',  (err, data) => {
//         var obj = JSON.parse(data);
//             // console.log(obj);
//             obj.forEach( async function(newUser) {
//                 // var tableName = table.name;
//                console.log(newUser);
                
//                 var createdUser = await db_users.create({
//                 first_name : newUser.first_name,
//                 last_name : newUser.last_name,
//                 gender : newUser.gender,
//                 email : newUser.email,
//                 job_title : newUser.job_title    
//             });
//         });
//         return res.json({status: "success"});
//     });
// });
