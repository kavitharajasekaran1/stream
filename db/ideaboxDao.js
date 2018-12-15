const mongoose = require('mongoose');
const config = require('../config');
var model = require('../model/model');
var dateFormat = require('dateformat')
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
        newIdeas.suggestions = ideaRecordJson.suggestions;
        console.log(newIdeas.suggestions)
        newIdeas.description = ideaRecordJson.description;
        console.log(newIdeas.description)
        newIdeas.email = ideaRecordJson.email;
        console.log(newIdeas.email)
        newIdeas.created_at = dateFormat("dd/mm/yyyy");
        console.log( newIdeas.created_at )
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
                IdeaRecord.email = item.email;
                IdeaRecord.created_at = item.created_at;
                IdeaRecord.suggestions = item.suggestions;

                IdeaRecords.push(IdeaRecord);

                resolve(IdeaRecords);
                
            }
            
        }).catch((error)=>{
            reject(error);
        })
    })
    
}
