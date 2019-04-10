var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var tagSchema = new Schema({ 
	tag: {
		type: String,
		required: true
	}
});

var workSchema = new Schema({
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
    tags: {
	    type: String,
	    default: undefined
  	},
	img: {
		type: String,
		required: true

	}
});

module.exports = mongoose.model('work',workSchema);