var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var mailSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
    },
    text: {
		type: String,
		required: true
	},
	date: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model('mail',mailSchema);