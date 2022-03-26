let express = require('express');
let app = express();
const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;
//const mongoUrl = "mongodb://localhost:27017"
const mongoUrl = "mongodb+srv://Takasi:Test1234@cluster0.pbpmw.mongodb.net/Restaurant?retryWrites=true&w=majority";
//const dotenv = require('dotenv')
//dotenv.config()
const bodyParser = require('body-parser')
const cors = require('cors');
const { json } = require('body-parser');
let port = process.env.PORT || 4000;
var db;

//db = client.db('Restaurant');
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(cors())

app.get('/',(req,res) => {
    res.send("Welcome to express")
})


//location
app.get('/location',(req,res) => {
    db.collection('location').find().toArray((err,result) =>{
        if(err) throw err;
        
        res.send(result)
        console.log(result)
    })
})

//restaurant
app.get('/restaurants', (req,res) => {
    let stateID = Number(req.params.state_id)
    let mealID = Number(req.params.meal_id)
    let query = {};
    if(stateID&mealID){
        query = {"mealtypes.mealtype_id":mealID, state_id:stateID}
    }
    else if(stateID){
        query = {state_id:stateID}
    }
    else if(mealID){
        query = {"mealtypes.mealtype_id":mealID}
    }
    console.log("stateID ", stateID)
    db.collection('zomato').find(query).toArray( (err, result) =>{
        if(err) throw err;
        res.send(result)
    })
})

//filters

app.get('/filter/:mealID', (req,res) => {
    let sort = {cost:1}
    let mealId = Number(req.params.mealId)
    let skip = 0;
    let limit = 1000000000000;
    let cuisineId = Number(req.params.cuisine)
    let lcost = Number(req.params.lcost);
    let hcost = Number(req.params.hcost);
    let query = {}

    if(req.query.sort){
        sort = {cost:req.query.sort}
    }
    if(req.query.skip && req.query.limit){
        skip = Number(req.query.skip);
        limit = Number(req.query.limit);
    }
    if(cuisineId&lcost&hcost){
        query = {
            "cuisines.cuisine_id":cuisineId,
            "mealTypes.mealtype_id":mealId,
            $and:[{cost:{$gt:lcost,$lt:hcost}}]
        }
    }
    else if(cuisineId){
        query = {"cuisines.cuisine_id":cuisineId,"mealTypes.mealtype_id":mealId}
    }
    else if(lcost&hcost){
        query = {$and:[{cost:{$gt:lcost,$lt:hcost}}],"mealTypes.mealtype_id":mealId}
    }

    db.collection('zomato').find(query).sort(sort).skip(skip).limit(limit).toArray((err,result) =>{
        if(err) throw err;
        res.send(result)
    })
})

app.get('/quicksearch',(req,res) => {
    db.collection('Menu').find().toArray((err,result) =>{
        if(err) throw err;
        res.send(result)
    })
})

app.get('/menu/:id',(req,res) => {
    let restId  = Number(req.params.id)
    db.collection('Menu').find({restaurant_id:restId}).toArray((err,result) =>{
        if(err) throw err;
        res.send(result)
    })
})

app.get('/details/:restid',(req,res) => {
    let restId  = Number(req.params.restid)
    db.collection('zomato').find({restaurant_id:restId}).toArray((err,result) =>{
        if(err) throw err;
        res.send(result)
    })
})


// get orders
app.get('/orders',(req,res) => {
    let email  = req.query.email
    let query = {};
    if(email){
        query = {"email":email}
    }
    db.collection('orders').find(query).toArray((err,result) =>{
        if(err) throw err;
        res.send(result)
    })
})

app.post('/placeorder', (req, res) => {
    console.log(req.body)
    db.collection('orders').insertOne(req.body, (err,result) => {
        if(err) throw err;
        res.send('order placed')
    })

})

app.delete('/deleteOrder', (req,res) => {
    db.collection('orders').remove({}, (err,result) => {
        if(err) throw err;
        res.send(result)
    })
})

app.put('/updateOrder/:id', (req,res) => {
    let oldID = mongo.ObjectId(req.params.id)
    let status = req.query.status?req.query.status:'Pending'
    db.collection('orders').updateOne(
        {oldID},
        {$set:{
            "status": status,
            "bank_name": req.body.bank_name,
            "bank_status":req.body.bank_status
        }

        }, (err,result) => {
            if(err) throw err;
            res.send(`Status updated to ${status}`)
        }
    )
})




//Insert many documents

/*
app.get('/menu',(req,res) => {
    db.collection('menu3').insertMany(data1, function (err) {
        try { 
            
            console.log("saved")
            }catch(err){
            console.log(err)
            }
    });
    });
        
   */     









MongoClient.connect(mongoUrl, (err,client) => {
    if(err) console.log("Error While Connecting");
    db = client.db('Restaurant');
    app.listen(port,()=>{
        console.log(`listening on port no ${port}`)
    });
})