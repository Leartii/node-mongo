require('dotenv').config();
const mongoose = require("mongoose");
const { ignore } = require('nodemon/lib/rules');
console.log("process.env"+process.env.MONGO_URI);

mongoose.connect(process.env.MONGO_URI,{ useNewUrlParser: true, useUnifiedTopology: true });
const Schema = mongoose.Schema;
let personSchema = new Schema({
  name : String,
  age : Number,
  favoriteFoods : [String]
});

let Person = mongoose.model('Person',personSchema);

var createAndSavePerson = function(done) {
  console.log("Inside the create and save person function");
  var janeFonda = new Person({name: "Jane Fonda", age: 84, favoriteFoods: ["eggs", "fish", "fresh fruit"]});

  janeFonda.save(function(err, data) {
    if (err) return console.error(err);
    done(null, data)
  });
};
let arrayOfPeople = [{name: "Jane Fonda", age: 84, favoriteFoods: ["eggs", "fish", "fresh fruit"]},
{name: "Jane1 Fonda1", age: 85, favoriteFoods: ["eggs", "fish", "fresh fruit"]},
{name: "Jane2 Fonda2", age: 86, favoriteFoods: ["eggs", "fish", "fresh fruit"]}];

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err,data) => {
    if(err){
      return console.log(err);
    } 
    done(null,data);
  });
  
};

const findPeopleByName = (personName, done) => {
  Person.find({name : personName}, (err,pers) => {
    if(err){
      return console.log(err);
    }
    done(null,pers);
  })
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods : [$e : food]}, (err, foods) => {
    if(err){
      return console.log(err);
    }
    done(null,foods);
  })
};

const findPersonById = (personId, done) => {
  done(null /*, data*/);
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  done(null /*, data*/);
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  done(null /*, data*/);
};

const removeById = (personId, done) => {
  done(null /*, data*/);
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  done(null /*, data*/);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
