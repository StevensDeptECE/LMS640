//create a schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var discussionSchema = new Schema({
  subject: { type: String, required: true },
  content: String
  // username: { type: String, required: true, unique: true },
  // password: { type: String, required: true },
  // team: Number,
  // courseId: String
  // meta: {
  //   age: Number,
  //   website: String
  // },
  // created_at: Date,
  // updated_at: Date
});

module.exports = mongoose.model('Discussion', discussionSchema);
