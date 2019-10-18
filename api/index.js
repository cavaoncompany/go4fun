var axios = require("axios");
var express = require("express");

var nodemailer = require('nodemailer');
var bodyparser = require("body-parser");

var app = express();
const apiUrl = process.env.API_URL + '/api';

app.post('/contactus', (req, res)=>{
	axios.get(apiUrl+'/settings/mail')
	.then(function (response) {
		var transporter = nodemailer.createTransport({
			host: response.data.mail_server,
			port: response.data.port,
			auth: {
				user: response.data.login_name,
				pass: response.data.password,
			}
		});
		
		if(req.body.email && req.body.phone && req.body.name){
			let mailBody = {
				from: req.body.email,
				to: process.env.Email_To,
				subject: `Sending Email from ${req.body.name}`,
				text: `Contact Form Submission Recieved
						Name: ${req.body.name}
						Email: ${req.body.email}
						Contact Number: ${req.body.phone}
						Message: ${req.body.msg}`,
				html:  `<p><strong>Contact Form Submission Recieved</strong></p>
						<p><strong>Name:</strong> ${req.body.name}</p>
						<p><strong>Email:</strong> ${req.body.email}</p>
						<p><strong>Contact Number:</strong> ${req.body.phone}</p>
						<p><strong>Message:</strong> ${req.body.msg}</p>`
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
	.catch(function (error) {
		console.log(error);
		res.status(500).json({'message': 'An unexpected error was encountered'});
	});		
})



app.post('/inquiryform', (req, res)=>{
	axios.get(apiUrl+'/settings/mail')
	.then(function (response) {
		var transporter = nodemailer.createTransport({
			host: response.data.mail_server,
			port: response.data.port,
			auth: {
				user: response.data.login_name,
				pass: response.data.password,
			}
		});
		
		if(req.body.email && req.body.phone && req.body.firstname){
			let mailBody = {
				from: req.body.email,
				to: process.env.Email_To,
				subject: `Sending inquiry Email from ${req.body.firstname}`,
				text:  `Enquiry Recieved
						Name: ${req.body.firstname} ${req.body.surname}
						Email: ${req.body.email}
						Contact Number: ${req.body.phone}
						Sex: ${req.body.sex}
						DOB: ${req.body.birth}
						Departure Date: ${req.body.startDate}
						Departure City: ${req.body.startCity}
						Visitor Number: ${req.body.visitorNo}
						Remark: ${req.body.remark}`,
	
				html:  `<p><strong>Enquiry Recieved</strong></p>
						<p><strong>Name:</strong> ${req.body.firstname} ${req.body.surname}</p>
						<p><strong>Email:</strong> ${req.body.email}</p>
						<p><strong>Contact Number:</strong> ${req.body.phone}</p>
						<p><strong>Sex:</strong> ${req.body.sex}</p>
						<p><strong>DOB:</strong> ${req.body.birth}</p>
						<p><strong>Departure Date:</strong> ${req.body.startDate}</p>
						<p><strong>Departure City:</strong> ${req.body.startCity}</p>
						<p><strong>Visitor Number:</strong> ${req.body.visitorNo}</p>
						<p><strong>Remark:</strong> ${req.body.remark}</p>`
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
	.catch(function (error) {
		res.status(500).json({'message': 'An unexpected error was encountered'});
	});	
			
})

module.exports = {
	path: "/api/sendemail",
	handler: app
};