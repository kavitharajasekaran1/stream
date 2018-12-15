const mongoose = require('mongoose');
const config = require('../config');
var model = require('../model/model');
var dateFormat = require('dateformat')
var ObjectId = mongoose.Types.ObjectId;

mongoose.connect(config.databaseUri, { useNewUrlParser: true });

module.exports = {
    getAllLeaves : getAllLeaves,
    saveleave : saveleave

}

function saveleave(leaveRecordJson){
    var newLeave = new model.leaverecord();
    console.log("from=hjjjk===>",dateFormat(leaveRecordJson.selectedRange.start,"dd/mm/yyyy"));
    console.log("end====>",leaveRecordJson.selectedRange.end);
    console.log("reason====>", leaveRecordJson.reason);
    console.log("leavetype====>", leaveRecordJson.leaveType);

    return new Promise((resolve, reject)=>{
        try{
            newLeave.from = dateFormat(leaveRecordJson.selectedRange.start,"dd/mm/yyyy" )
            // newLeave.from.setDate(newLeave.from.getDate() + 1);
            newLeave.to = dateFormat(leaveRecordJson.selectedRange.end,"dd/mm/yyyy")
            // newLeave.to.setDate(newLeave.to.getDate() + 1);
            newLeave.reason = leaveRecordJson.reason;
            newLeave.leaveType = leaveRecordJson.leaveType;
            newLeave.count = leaveRecordJson.count;
            newLeave.user = ObjectId(leaveRecordJson.user);
         
            

            newLeave.save();
            return resolve(newLeave);
        }catch(error){
            return reject(error)
        }
        

       

    })
    
}

function updateLeaveInfo(userid, leaveid){
   model.leave.findOne({'user':ObjectId('5b5ad13fb671cd3aa0f6e473')}).then((leaveObj)=>{

       console.log(leaveObj)
       var leaveRecords = leaveObj.leaves;
       if (leaveRecords === undefined){
           leaveRecords = [];
       }
       leaveRecords.splice(1,1);
       leaveObj.set({'leaves':leaveRecords});
       leaveObj.save().then((updatedleaveObj)=>{
           console.log(updatedleaveObj);
       });

   })

   //newLeave.findOneAndUpdate({'user':'5b5ad380eb41a308207f1bb1'},{new: true},  )


}


function getAllLeaves(userid){
    var leaveRecords = []
    return new Promise((resolve, reject)=>{
        console.log(userid)
        model.leaverecord.find({'user':ObjectId(userid)}).then((resultset)=>{
            console.log("result",resultset)
            for(var index in resultset){
                var leaveRecord = {}
                var item = resultset[index];

                leaveRecord.from = item.from;
                leaveRecord.to = item.to;
                leaveRecord.reason = item.reason;
                leaveRecord.id = item._id;
                leaveRecord.count = item.count

                leaveRecords.push(leaveRecord);

                resolve(leaveRecords);
                
            }
            
        }).catch((error)=>{
            reject(error);
        })
    })
    
}


//updateLeaveInfo(null,null);