var express = require("express");
var nodemailer = require('nodemailer');
var bodyparser = require("body-parser");

var app = express();

var transporter = nodemailer.createTransport({
	host: process.env.Email_Host,
	auth:{
		user: process.env.Email_User,
		pass: process.env.Email_Pass
	},
	port:'25',
});


app.post('/contactus', (req, res)=>{
	
	if(req.body.email && req.body.phone && req.body.name){
		let mailBody = {
			from: req.body.email,
			to: process.env.Email_To,
			subject: `Sending Email from ${req.body.name}`,
			text: `this is the message from ${req.body.msg}, contact number is ${req.body.phone}`
		};
	
		transporter.sendMail(mailBody, function(error, info){
			if(error) {
				res.status(500).json(error);
			}else {
				res.status(200).json({'message': 'success'})
			}
		});
	}else{
		res.status(500).json({'message': 'please fill in the required'})
	}
			
})



app.post('/inquiryform', (req, res)=>{
	console.log("get in to inquiry")
	if(req.body.email && req.body.phone && req.body.firstname){
		let mailBody = {
			from: req.body.email,
			to: process.env.Email_To,
			subject: `Sending inquiry Email from ${req.body.firstname}`,
			text: `This is the message from ${req.body.firstname} ${req.body.surname}, contact number is ${req.body.phone} start date is ${req.body.startDate} and the city is ${req.body.startCity} 
					visitor Number: ${req.body.visitorNo} 
					remark:${req.body.remark}  `
		};
	
		transporter.sendMail(mailBody, function(error, info){
			if(error) {
				res.status(500).json(error);
			}else {
				res.status(200).json({'message': 'success'})
			}
		});
	}else{
		res.status(500).json({'message': 'please fill in the required'})
	}
			
})

module.exports = {
	path: "/api/sendemail",
	handler: app
};