var mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
    username: 
    {
        type:String,
        required: true
    },
    email:
    {
        type:String,
        required:true
    },
    password: 
    {
        type:String,
        required:true
    },
    created_at:
    {
        type:Date,
        default:Date.now
    }
});

var postSchema = new mongoose.Schema({
    text: String,
    username: String,
    created_at:{
        type: Date,
        default:Date.now
    }
});

//use mongoose to exports the userSchema and postSchema
mongoose.model("User",userSchema);
mongoose.model("Posts",postSchema);

// module.exports = userSchema;
// module.exports = postSchema;

//utility functions
var User = mongoose.model('User');
exports.findByUsername = function(userName, callback){

	User.findOne({ user_name: userName}, function(err, user){

		if(err){
			return callback(err);
		}

		//success
		return callback(null, user);
	});

}

exports.findById = function(id, callback){

	User.findById(id, function(err, user){

		if(err){
			return callback(err);
		}

		return callback(null, user);
	});
}