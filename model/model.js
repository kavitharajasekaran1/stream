var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var leaveRecordSchema = new Schema({
   from: Date,
   to: Date,
   count: Number,
   reason:String,
   leaveType: String,
   status:String,
   user :{ type: Schema.Types.ObjectId, ref: 'employee' }

})

var employeeSchema = new Schema({
   fname: String,
   lname: String,
   email: String,
   leavebalance :String
 });
 var ideaboxschema = new Schema({
     title: String,
     domain: String,
     description: String,
     tags: String,
     created_at: String,
     description: String,
     suggestions: String,
     user :{ type: Schema.Types.ObjectId, ref: 'employee' }

 })

var employee = mongoose.model('employee', employeeSchema);

var leaveRecord = mongoose.model('leaveRecord', leaveRecordSchema);

var ideabox = mongoose.model('ideabox', ideaboxschema);

module.exports={
   employee : employee,
   leaverecord : leaveRecord,
   ideabox: ideabox
};