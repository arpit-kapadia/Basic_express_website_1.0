var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var config =require("./config.js");
router.get('/', function(req,res,next){
	res.render('contact',{title : 'Contact'});
});

router.post('/send', function(req,res,next){
	var transporter = nodemailer.createTransport({
		service : 'Gmail',
		auth    : {
			user : config.senderMail,
			pass : config.senderPassword
		}
	});

	var mailOptions = {
		from    : config.senderMail,
		to      : config.recieverMail,
		subject : 'express_website submission',
		text    : 'submission recieved. Details of the submission-    name: '+req.body.name+' email: '+req.body.email+' message: '+req.body.message,
		html    : '<p>Submission Recieved. Details are as follows.</p><ul><li>Name: '+req.body.name+'</li><li>Email: '+req.body.email+'</li><li>Message: '+req.body.message+'</li></ul>'
	};

	transporter.sendMail(mailOptions, function(error,info){
		if(error){
			console.log(error);
			res.redirect('/');
		}
		else{
			console.log('Mail sent'+info.response);
			res.redirect('/');
		}
	});
});

module.exports = router;