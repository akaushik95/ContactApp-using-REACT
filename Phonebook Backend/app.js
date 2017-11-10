var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cors = require('cors')

app.use(cors());

app.use("/", express.static(__dirname+"/public"));
app.use("/", bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());


var Contact =require('./models/contact');

// Connect to Mongoose
mongoose.connect('mongodb://ashu:ashu@ds241895.mlab.com:41895/phonebook_by_ashukaushik', {
  useMongoClient: true,
});

var db = mongoose.connection;

app.get('/', function(req, res){
	res.send('Please use /api/contacts');
});

app.get('/api/contacts',function(req, res){
	Contact.getContacts(function(err, contacts){
		if(err){
			throw err;
		}
		res.json(contacts);
	});
});

app.get('/api/contacts/:_id', function (req, res){
	Contact.getContactById(req.params._id, function(err, contact){
		if(err){
			throw err;
		}
		res.json(contact);
	});
});

app.post('/api/contacts', function(req, res){
	var contact = req.body;
	Contact.addContact(contact, function(err, contact){
		if(err){
			throw err;
		}
		res.json(contact);
	});
});

app.put('/api/contacts/:_id', function(req, res){
	var id = req.params._id;
	var contact = req.body;
	Contact.updateContact(id, contact, {}, function(err, contact){
		if(err){
			throw err;
		}
		res.json(contact);
	});
});

app.delete('/api/contacts/:_id', function(req, res){
	var id = req.params._id;
	Contact.removeContact(id, function(err, contact){
		if(err){
			throw err;
		}
		res.json(contact);
	});
});

app.listen(3200);
console.log('Running on port 3200...');
