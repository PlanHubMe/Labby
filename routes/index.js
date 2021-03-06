var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Welcome!' });
});
router.get('/labs', function(req, res, next) {
	res.render('labs', { title: 'My labs' });
});
router.get('/login', function(req, res, next) {
	var loptions = { title: 'Log in' };
	if (req.query.error != undefined) {
		switch (req.query.error) {
			case "invalid":
				loptions.error = "The username or password is incorrect! Make sure you've typed everything in correctly.";
				break;
			case "empty":
				loptions.error = "You have to type in both your Dalton ID and password.";
				break;
			default:
				loptions.error = "Unknown error.";
				break;
		}
	}
	res.render('login', loptions);
});
router.post('/login', function(req, res, next) {
	if (req.body.username == undefined || req.body.password == undefined ||
		req.body.username == "" || req.body.password == "") {
			res.redirect('/login?error=empty');
			next();		
	}
	var path = "/zbuttenwieser/validation/index.jsp?username=" + req.body.username + "&password=" + req.body.password;
	require("http").get({
		host: 'compsci.dalton.org',
		port: 8080,
		path: path
	}, function(resp) {
		if (resp.statusCode == 200) {
			// valid
		} else {
			// invalid
			res.redirect('/login?error=invalid');
		}
	}).on('error', function(e) {
		// :(
	});
});

module.exports = router;
