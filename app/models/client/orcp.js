let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let ObjectId = Schema.Types.ObjectId;
let Float = require('mongoose-float').loadType(mongoose, 2);

const colection = 'Ctpdfir';
let dbSchema = new Schema({
	firm: {type: ObjectId, ref: 'Firm'},
	ctAt: Date,
	upAt: Date,

	orc: {type: ObjectId, ref: 'Orc'},

	cter: {type: ObjectId, ref: 'Cter'},

	pdfir: {type: ObjectId, ref: 'Pdfir'},

	quot : [{
		color: [{
			size: quot,
		}]
	}],

	price: Float,
});

dbSchema.pre('save', function(next) {
	if(this.isNew) {
		this.ctAt = this.upAt = Date.now();
	} else {
		this.upAt = Date.now();
	}
	this.orgQuot = this.quot;
	next();
})

module.exports = mongoose.model(colection, dbSchema);