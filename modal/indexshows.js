var base = require('../database/base');
var ObjectId = base.ObjectId;
var Schema = base.Schema;   //  创建模型
var indexScheMa = new Schema({
	context: String,
	date: String,
	name:String
},{versionKey:false}); //  定义了一个新的模型，但是此模式还未和users集合有关联
var IndexEntity = base.mongoose.model('indexshows', indexScheMa); //  与users集合关联
exports.index = IndexEntity;