const mongoose = require('mongoose');
const config = require('../config');
var model = require('../model/model');
var ObjectId = mongoose.Types.ObjectId;

mongoose.connect(config.databaseUri, { useNewUrlParser: true });

module.exports = {
   getAllIdeas:getAllIdeas,
   saveIdeas : saveIdeas
}

function saveIdeas(ideaRecordJson){
var newIdeas = new model.ideabox();
console.log("ideas",newIdeas)
return new Promise((resolve, reject)=>{
   try{
       newIdeas.title = ideaRecordJson.title;
       console.log(newIdeas.title)
       newIdeas.domain = ideaRecordJson.domain;
       console.log(newIdeas.domain)
       newIdeas.description = ideaRecordJson.suggestions;
       console.log(newIdeas.suggestions)
       newIdeas.tags = ideaRecordJson.email;
       console.log(newIdeas.email)
       newIdeas.datetime = new Date();
       console.log( newIdeas.datetime )
       newIdeas.user = ObjectId(ideaRecordJson.user);
       console.log(newIdeas.user)

       newIdeas.save();
       return resolve(newIdeas);
   }catch(error){
       return reject(error)
   }



})
}
function getAllIdeas(userid){
   var IdeaRecords = []
   return new Promise((resolve, reject)=>{
       model.ideabox.find().then((resultset)=>{
           console.log("result",resultset)
           for(var index in resultset){
               var IdeaRecord = {}
               var item = resultset[index];

               IdeaRecord.title = item.title;
               IdeaRecord.domain = item.domain;
               IdeaRecord.description = item.description;
               IdeaRecord.tags = item.tags;
               IdeaRecord.datetime = item.datetime

               IdeaRecords.push(IdeaRecord);

               resolve(IdeaRecords);

           }

       }).catch((error)=>{
           reject(error);
       })
   })

}