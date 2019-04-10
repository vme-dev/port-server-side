var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var postSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	date: {
		type: Date,
		default: Date.now
	},
	img: {
		type: String,
		required: true

	}
});

module.exports = mongoose.model('posts',postSchema);