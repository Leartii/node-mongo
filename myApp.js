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
  Person.findOne({favoriteFoods : food}, (err, foods) => {
    if(err){
      return console.log(err);
    }
    done(null,foods);
  })
};

const findPersonById = (personId, done) => {
  Person.findById(personId, (err,personi) => {
    if(err){
      return console.log(err);
    }
    done(null,personi);
  })
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId, (err, data) => {

    if(err){
      return console.log(err);
    }
    data.favoriteFoods.push(foodToAdd);
    data.save((err,persi) => {
      if(err){
        return console.log(err);
      }
      done(null,persi)
    });
  })
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({name : personName}, {$set : {age : ageToSet}}, {new : true}, (err,data) => {
    if(err){
      return console.log(err);
    }
    done(null,data);
  })
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err,data) => {
    if(err){
      return console.log(err)
    }
    done(null,data);
  })
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name : nameToRemove}, (err,data)=>{
    if(err){
      return console.log(err);
    }
    done(null,data);
  })
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  var findquery = Person.find({favoriteFoods : foodToSearch}).sort({name : 1}).limit(2).select({name : 1, age : 0, favoriteFoods : 1}).exec(done);
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
