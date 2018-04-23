var base = require('../database/base');
var ObjectId = base.ObjectId;
var Schema = base.Schema;   //  创建模型
var userScheMa = new Schema({
	name: String,
	password: String,
	lastLoginTime:Date,
	createTime:{
		type:Date,
		default:Date.now
	}
},{versionKey:false}); //  定义了一个新的模型，但是此模式还未和users集合有关联
var UserEntity = base.mongoose.model('users', userScheMa); //  与users集合关联
exports.user = UserEntity;