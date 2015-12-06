var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var mongodbURL = 'mongodb://localhost:27017/test';
var mongoose = require('mongoose');

//post with grade
app.post('/',function(req,res) {
	//console.log(req.body);
	var restaurantSchema = require('./models/restaurant');
	mongoose.connect('mongodb://localhost/test');
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function (callback) {
		var rObj = {};
		rObj.address = {};
		rObj.address.building = req.body.building;
		rObj.address.street = req.body.street;
		rObj.address.zipcode = req.body.zipcode;
		rObj.address.coord = [];
		rObj.address.coord.push(req.body.lon);
		rObj.address.coord.push(req.body.lat);
		rObj.borough = req.body.borough;
		rObj.cuisine = req.body.cuisine;
		rObj.name = req.body.name;
		rObj.restaurant_id = req.body.restaurant_id;
		rObj.grades = [];
		var gObj = {};
		gObj.grade = req.body.grade;
		gObj.date = req.body.date;
		gObj.score = req.body.score;
		if(gObj.grade != null && gObj.date != null && gObj.score != null)
			rObj.grades.push(gObj);

		var Restaurant = mongoose.model('Restaurant', restaurantSchema);
		var r = new Restaurant(rObj);
		//console.log(r);
		r.save(function(err) {
       		if (err) {
				res.status(500).json(err);
				throw err
			}
       		//console.log('Restaurant created!')
       		db.close();
			res.status(200).json({message: 'insert done', id: r._id});
    	});
    });
});

//delete with one param
app.delete('/:attrib/:attrib_value',function(req,res) {
	var restaurantSchema = require('./models/restaurant');
	mongoose.connect('mongodb://localhost/test');
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function (callback) {
		var Restaurant = mongoose.model('Restaurant', restaurantSchema);
		var criteria = {};
		criteria[req.params.attrib] = req.params.attrib_value;
		Restaurant.find(criteria).remove(function(err) {
       		if (err) {
				res.status(500).json(err);
				throw err
			}
       		//console.log('Restaurant removed!')
       		db.close();
			res.status(200).json({message: 'delete done'});
    	});
    });
});

//Delete with retaurant_id
app.delete('/restaurant_id/:id',function(req,res) {
	var restaurantSchema = require('./models/restaurant');
	mongoose.connect('mongodb://localhost/test');
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function (callback) {
		var Restaurant = mongoose.model('Restaurant', restaurantSchema);
		Restaurant.find({restaurant_id: req.params.id}).remove(function(err) {
       		if (err) {
				res.status(500).json(err);
				throw err
			}
       		//console.log('Restaurant removed!')
       		db.close();
			res.status(200).json({message: 'delete done with restaurant_id', id: req.params.id});
    	});
    });
});

//Delete with borough
app.delete('/borough/:borough',function(req,res) {
	var restaurantSchema = require('./models/restaurant');
	mongoose.connect('mongodb://localhost/test');
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function (callback) {
		var Restaurant = mongoose.model('Restaurant', restaurantSchema);
		Restaurant.find({borough: req.params.borough}).remove(function(err) {
       		if (err) {
				res.status(500).json(err);
				throw err
			}
       		//console.log('Restaurant removed!')
       		db.close();
			res.status(200).json({message: 'delete done with borough', id: req.params.borough});
    	});
    });
});

//Delete with cuisine
app.delete('/cuisine/:cuisine',function(req,res) {
	var restaurantSchema = require('./models/restaurant');
	mongoose.connect('mongodb://localhost/test');
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function (callback) {
		var Restaurant = mongoose.model('Restaurant', restaurantSchema);
		Restaurant.find({cuisine: req.params.cuisine}).remove(function(err) {
       		if (err) {
				res.status(500).json(err);
				throw err
			}
       		//console.log('Restaurant removed!')
       		db.close();
			res.status(200).json({message: 'delete done with cuisine', id: req.params.cuisine});
    	});
    });
});

//Delete with address
app.delete('/address/:attrib/:attrib_value',function(req,res) {
	var restaurantSchema = require('./models/restaurant');
	mongoose.connect('mongodb://localhost/test');
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function (callback) {
		var Restaurant = mongoose.model('Restaurant', restaurantSchema);
                var criteria = {};
		criteria["address."+req.params.attrib] = req.params.attrib_value;
		Restaurant.find(criteria).remove(function(err) {
       		if (err) {
				res.status(500).json(err);
				throw err
			}
       		//console.log('Restaurant removed!')
       		db.close();
			res.status(200).json({message: 'delete done with address', id: req.params.cuisine});
    	});
    });
});

//get all
app.get('/', function(req,res) {
	var restaurantSchema = require('./models/restaurant');
	mongoose.connect('mongodb://localhost/test');
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function (callback) {
		var Restaurant = mongoose.model('Restaurant', restaurantSchema);
		Restaurant.find(function(err,results){
       		if (err) {
				res.status(500).json(err);
				throw err
			}
			if (results.length > 0) {
				res.status(200).json(results);
			}
			else {
				res.status(200).json({message: 'No matching document'});
			}
			db.close();
    	});
    });
});

//get with one param
app.get('/:attrib/:attrib_value', function(req,res) {
	var restaurantSchema = require('./models/restaurant');
	mongoose.connect('mongodb://localhost/test');
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function (callback) {
		var Restaurant = mongoose.model('Restaurant', restaurantSchema);
		var criteria = {};
		criteria[req.params.attrib] = req.params.attrib_value;
		Restaurant.find(criteria,function(err,results){
       		if (err) {
				res.status(500).json(err);
				throw err
			}
			if (results.length > 0) {
				res.status(200).json(results);
			}
			else {
				res.status(200).json({message: 'No matching document'});
			}
			db.close();
    	});
    });
});

//get with one param in address
app.get('/address/:attrib/:attrib_value', function(req,res) {
	var restaurantSchema = require('./models/restaurant');
	mongoose.connect('mongodb://localhost/test');
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function (callback) {
		var Restaurant = mongoose.model('Restaurant', restaurantSchema);
		var criteria = {};
		criteria["address."+req.params.attrib] = req.params.attrib_value;
		Restaurant.find(criteria,function(err,results){
       		if (err) {
				res.status(500).json(err);
				throw err
			}
			if (results.length > 0) {
				res.status(200).json(results);
			}
			else {
				res.status(200).json({message: 'No matching document'});
			}
			db.close();
    	});
    });
});

//get with one param in grades
app.get('/grades/:attrib/:attrib_value', function(req,res) {
	var restaurantSchema = require('./models/restaurant');
	mongoose.connect('mongodb://localhost/test');
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function (callback) {
		var Restaurant = mongoose.model('Restaurant', restaurantSchema);
		var criteria = {};
		criteria["grades."+req.params.attrib] = req.params.attrib_value;
		Restaurant.find(criteria,function(err,results){
       		if (err) {
				res.status(500).json(err);
				throw err
			}
			if (results.length > 0) {
				res.status(200).json(results);
			}
			else {
				res.status(200).json({message: 'No matching document'});
			}
			db.close();
    	});
    });
});

//put with id
app.put('/:id/:attrib/:attrib_value', function(req,res) {
	var restaurantSchema = require('./models/restaurant');
	mongoose.connect('mongodb://localhost/test');
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function (callback) {
		var Restaurant = mongoose.model('Restaurant', restaurantSchema);
		var criteria = {};
		criteria[req.params.attrib] = req.params.attrib_value;
		Restaurant.update({restaurant_id: req.params.id},{$set:criteria},function(err,results){
       		if (err) {
				res.status(500).json(err);
				throw err
			}
       		//console.log('Restaurant updated!')
       		db.close();
			res.status(200).json({message: 'update done', id: req.params.id});
    	});
    });
});

//update attrib with param
app.put('/:param/:param_value/:attrib/:attrib_value', function(req,res) {
	var restaurantSchema = require('./models/restaurant');
	mongoose.connect('mongodb://localhost/test');
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function (callback) {
		var Restaurant = mongoose.model('Restaurant', restaurantSchema);
		var criteria = {};
		criteria[req.params.attrib] = req.params.attrib_value;
		var param = {};
		param[req.params.param] = req.params.param_value;
		Restaurant.update(param,{$set:criteria},function(err,results){
       		if (err) {
				res.status(500).json(err);
				throw err
			}
       		//console.log('Restaurant updated!')
       		db.close();
			res.status(200).json({message: 'update done', id: req.params.id});
    	});
    });
});

//update grades with param
app.put('/:param/:param_value/', function(req,res) {
	var restaurantSchema = require('./models/restaurant');
	mongoose.connect('mongodb://localhost/test');
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function (callback) {
		var Restaurant = mongoose.model('Restaurant', restaurantSchema);
		var gObj = {};
		gObj.grade = req.body.grade;
		gObj.date = req.body.date;
		gObj.score = req.body.score;
		var param = {};
		param[req.params.param] = req.params.param_value;
		Restaurant.update(param,{$push:{grades: gObj}},function(err,results){
       		if (err) {
				res.status(500).json(err);
				throw err
			}
       		//console.log('Restaurant updated!')
       		db.close();
			res.status(200).json({message: 'update done', id: req.params.id});
    	});
    });
});

//update coord with param
app.put('/:param/:param_value/address/coord/:lon/:lat/', function(req,res) {
	var restaurantSchema = require('./models/restaurant');
	mongoose.connect('mongodb://localhost/test');
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function (callback) {
		var Restaurant = mongoose.model('Restaurant', restaurantSchema);
		var criteria = {};
		var x = Number(req.params.lon);
		var y = Number(req.params.lat);
		console.log(req.params.lon);
		console.log(req.params.lat);
		var cArray = [x, y];
		criteria["address.coord"] = cArray;
		var param = {};
		param[req.params.param] = req.params.param_value;
		Restaurant.update(param,{$set:criteria},function(err,results){
       		if (err) {
				res.status(500).json(err);
				throw err
			}
       		//console.log('Restaurant updated!')
       		db.close();
			res.status(200).json({message: 'update done', id: req.params.id});
    	});
    });
});

app.listen(process.env.PORT || 8099);
