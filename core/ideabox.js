const mongoose = require('mongoose');
const config = require('../config');
var model = require('../model/model');
var ObjectId = mongoose.Types.ObjectId;
var mongodb = require('../db/ideaboxDao');


mongoose.connect(config.databaseUri, { useNewUrlParser: true });

module.exports = {
   saveideas: saveideas,
   getAllIdeas:getAllIdeas
}
function saveideas(ideaRecordJson){
   return new Promise(async (resolve,reject)=>{
       var responseObj = {};

       var user = mongodb.saveIdeas(ideaRecordJson).then((data)=>{
       console.log(user,"user")
           responseObj.data = data;
           responseObj.errors = [];
           responseObj.meta={};

           resolve(responseObj);
       }).catch((error)=>{
           responseObj.data = [];
           responseObj.errors = [error];
           responseObj.meta={};
       });



   })
}




function getAllIdeas(userid){
   return new Promise(async (resolve,reject)=>{
       var responseObj = {};

       mongodb.getAllIdeas(userid).then((data)=>{

           responseObj.data = [];
           responseObj.ideas = data;
           responseObj.errors = [];
           responseObj.meta={};

           resolve(responseObj);
       }).catch((error)=>{
           responseObj.data = [];
           responseObj.errors = [error];
           responseObj.meta={};
       });


   })
}