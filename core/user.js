var model = require('../model/model');
var mongodb = require('../db/userDao');

module.exports = {
    findbyMail : findbyMail
}

async function findbyMail(email){
    
    var employee = await mongodb.findbyMail(email)
    var responseObj={};
    responseObj.employee = employee;
    responseObj.errors = [];
    responseObj.meta={};

    return Promise.resolve(responseObj);
}