var mongodb = require('./db');
var mongoose = mongodb.mongoose;
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;
module.exports = {
	mongodb:mongodb,
	mongoose:mongoose,
	Schema:Schema,
	ObjectId:ObjectId,
	Mixed:Schema.Types.Mixed
}