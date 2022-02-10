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

app.get('/menu/:id',(req,res) => {
    let restId  = Number(req.params.id)
    db.collection('Menu').find({restaurant_id:restId}).toArray((err,result) =>{
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


const data1 = [{
    "menu_id":1,
    "menu_name": "Garlic Breadsticks",
    "description": "Baked to perfection. Your perfect pizza partner! Tastes best with dip",
    "restaurant_id": 1,
    "menu_image": "https://b.zmtcdn.com/data/dish_photos/03b/787727453bd857cff70be6560bfb603b.png",
    "menu_type": "vegetarian",
    "menu_price": "99"
},
{
    "menu_id":2,
    "menu_name": "Farmhouse",
    "description": "Delightful combination of onion, capsicum, tomato & grilled mushroom",
    "restaurant_id": 1,
    "menu_image": "https://b.zmtcdn.com/data/dish_photos/a3d/7ca006ec8907c2ae13fd006cf0853a3d.png",
    "menu_type": "vegetarian",
    "menu_price": "229"
},
{
    "menu_id":3,
    "menu_name": "Indi Tandoori Paneer",
    "description": "It is hot. It is spicy. It is oh-so-Indian. Tandoori paneer with capsicum",
    "restaurant_id": 1,
    "menu_image": "https://b.zmtcdn.com/data/dish_photos/665/febfde767bd3543e6b8d9094f2531665.jpg",
    "menu_type": "vegetarian",
    "menu_price": "249"
},
{
    "menu_id":4,
    "menu_name": "Chicken Pepperoni Stuffed Garlic Bread",
    "description": "Freshly Baked Garlic Bread stuffed with Delectable Chicken Pepperoni, Cheese and sprinkled with Basil Parsley",
    "restaurant_id": 1,
    "menu_image": "https://b.zmtcdn.com/data/dish_photos/17f/731e22c58e4b9571db474c7099b1817f.png",
    "menu_type": "non-vegetarian",
    "menu_price": "159"
},
{
    "menu_id":5,
    "menu_name": "Creamy Tomato Pasta Pizza - Non Veg",
    "description": "Loaded with a delicious creamy tomato pasta topping, BBQ pepper chicken, green capsicum, crunchy red and yellow bell peppers.",
    "restaurant_id": 1,
    "menu_image": "https://b.zmtcdn.com/data/dish_photos/b1f/b33c5c010ef9458bdf571b044553cb1f.jpg",
    "menu_type": "non-vegetarian",
    "menu_price": "229"
}

];

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