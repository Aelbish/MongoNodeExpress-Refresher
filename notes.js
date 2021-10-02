//Visit:https://medium.com/@LindaVivah/the-beginners-guide-understanding-node-js-express-js-fundamentals-e15493462be1

//Node

//npm init -y inside foodapp-backend
//will create package.json which will track all the dependencies
//so someone else can do npm i and install the required dependencies for the project

//Suppose math.js file
//module.exports is an object
//so we can export what we want with module.exports = object
//const add = () => {console.log("add")}
// module.exports.add = add
//or we can create an object which includes add, subtract as key and their functions as values
//module.exports = object
//or we can do module.exports.add = (x,y) => {x+y};

//Suppose another file
//const {add, subtract} = require ("./Math.js");

//Express

//THE USE METHOD
//app.use(), runs for all the incoming requests

//REQUEST OBJECT
//req is an object that comes from the client, for example a form data

//RESPONSE
//res.send, send the response for a request, the response can be a string or object
//do console.log(req) to see all the properties of req

//ROUTING
//app.get("path", (req, res) => {res.send("HELLO FROM GET REQUEST")})

//app.post("path", (req, res) => {res.send("HELLO FROM POST REQUEST")})

//the colon indicates a variable
//app.get("/r/:subreddit", (req, res) => {
//  const {subreddit} = req.params;
//})

//Acessing query, key value pairs
//app.get("/search", (req, res) => {
//the query would be something like http://localhost:30001/search?location=hammond&food=burger
//  const {location, food} = req.query; this would get the hammond location query and burger food query
//})

//MongoDB
//Stores data in BSON i.e Binary JSON

//creating
//create a db - use dbName
//see the collections inside our db - show collections
//automatically create a collection by inserting= db.collectionName.insert({name:"Aelbish", age:23}) //either pass a single object or array of objects

//reading
//find everything in a collection - db.collectioName.find()
//find by a query, pass an object with the key and value - db.collectionName.find({age:23})
//there is also db.collectionName.findOne()

//updating
// there are various atomic operators that can be used for updating our data, $set is one of them
//db.collectionName.updateOne({name:"Aelbish"}, {$set: {age:22, sex:"male"}})
//the $currentDate operator below will add another property named lastChanged with the value of modified date to all the objects having sex as male
//db.collectionName.updateMany({sex:"male"}, {$set: {age:23}, $currentDate:{lastChanged:true}})

//deleting
//db.collectionName.deleteOne({name:"Aelbish"})
//db.collectioName.deleteMany({sex:"male"})

//additional operators mongo
//to find based on a nested object
const dog1 = {
  name: "Sheru",
  personality: { childFriendly: true, catFriendly: false },
};
//db.collectionName.find({'personality.childFriendly':true})
//$gt, $gte, $lt, $lte, $eq, $ne, $in, $and, $not, $or, $nor
//db.collectionName.find({age:{$gt:19}})
//db.collectionName.find({size:{$in:["S", "M", "L"]}, age:{$gte:10}})
//find a dog that is cat friendly or that has age less than or equal to 2
//db.dogs.find({$or: [{'personality.catFriendly':true}, {age:{$lte:2}}]})

//Mongoose
//ODM - Object Data Mapper, Object Document Mapper - map documents coming from a database into usable JavaScript objects
//Allows us to model out our application data by defining a schema
//Connecting to our DB with Mongoose
const PORT = 3000;
mongoose
  .connect("CONNECTION_URL FROM MONGODB ATLAS", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server listening on ${PORT}`);
    });
  })
  .catch((e) => {
    console.log(`Error connecting to the database ${e.message}`);
  });

//We first create a schema which will be used to create a model. The model will act like a class
//Schema is like a blueprint for the class
const movieSchema = new mongoose.Schema({
  title: String,
  year: Number,
  score: Number,
  rating: String,
});
//creating the model from the Schema, the "Movie" should always be start with capital letter and should be singular - it is the model name
//this Movie const will act like a class
const Movie = mongoose.model("Movie", movieSchema);
//mongoose will create a collection named "movies" from the above code
//creating a new Movie object or an instance of the Movie
const newMovie = new Movie({
  title: "Amadeus",
  year: "1986",
  score: "9.2",
  rating: "R",
});
//saving the newMovie to the database
// await newMovie.save();

//to insert many movies at once, maybe to seed the database in the beginning
//NOTE: Movie. not an instance of Movie
//insertMany returns a PROMISE, we do not need to call save unlike when creating a new instance
Movie.insertMany([
  {
    title: "Amadeus",
    year: "1986",
    score: "9.2",
    rating: "R",
  },
  {
    title: "Son of a biyatch",
    year: "1996",
    score: "9.2",
    rating: "R",
  },
])
  .then((res) => {
    console.log(res);
  })
  .catch((e) => {
    console.log("Error", e);
  });

  //Finding 