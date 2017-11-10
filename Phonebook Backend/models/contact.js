var mongoose = require('mongoose');

mongoose.createConnection('mongodb://ashu:ashu@ds241895.mlab.com:41895/phonebook_by_ashukaushik', {
  useMongoClient: true
});

// Contact Schema
var contactSchema = new mongoose.Schema({
	name:{
		type: String,
		required: true
	},
	mobileOffice:{
		type: String,
		required: true
	},
	mobilePersonal:{
		type: String
	},
	address:{
		type: String,
	}
});


var Contact = module.exports = mongoose.model('contacts', contactSchema);


// Get Contacts
module.exports.getContacts = function (callback, limit){
	Contact.find(callback).limit(limit);
}

// Get Contact
module.exports.getContactById = function(id, callback){
	Contact.findById(id, callback);
}

// Add Contact
module.exports.addContact = function (contact, callback){
	Contact.create(contact, callback);
}

// Update Contact
module.exports.updateContact = function(id, contact, options, callback){
	var query = {_id: id};
	var update = {
		name: contact.name,
		mobileOffice: contact.mobileOffice,
		mobilePersonal: contact.mobilePersonal,
		address: contact.address
	}
	Contact.findOneAndUpdate(query, update, options, callback);
}

// Delete Contact
module.exports.removeContact = function(id, callback){
	var query = {_id: id};
	Contact.remove(query, callback);
}
