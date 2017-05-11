//create a schema
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;

var CommentSchema = new Schema({
  projectid: { type: String, lowercase: false, required: true},
  comment: { type: String, required: true},
});

module.exports = mongoose.model('Comment', CommentSchema);
