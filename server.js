var express = require("express");
const mongoose = require('mongoose');
const session= require('express-session');
const passport= require('passport');
const localStrategy= require('passport-local').Strategy;
const bcrypt= require('bcrypt');
const flash = require('express-flash')
var app = express()

// connect to DB
const dbURI = 'mongodb+srv://Nawat3329:13Lovk1y01P1USPF@weatherchecker.rzztr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err));

mongoose.connection.on('connected', () => {
        console.log('Mongoose is connected')
})
// --------------------------
//  create new collection
const Schema = mongoose.Schema;

const UserSchema = new Schema({
name: {
    type: String,
    required: true
},
email:{
    type: String,
    required: true
},
username:{
    type: String,
    required: true
},
password:{
    type: String,
    required: true
},
api:{
    type: String,
    required: false
}
}, {timestamps: true });

const User = mongoose.model('User', UserSchema);
//-----------------------------------

app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/javascript', express.static(__dirname + 'public/javascript'))
app.set('views', './views');
app.set('view engine', 'ejs');
app.use(session({
	secret: "verygoodsecret",
	resave: false,
	saveUninitialized: true
}));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Passport.js
app.use(passport.initialize());
app.use(passport.session());
app.use(flash())

passport.serializeUser(function (user, done) {
	done(null, user.id);
});

passport.deserializeUser(function (id, done) {
	User.findById(id, function (err, user) {
		done(err, user);
	});
});

passport.use(new localStrategy(function (username, password, done) {
	User.findOne({ username: username }, function (err, user) {
		if (err) return done(err);
		if (!user) return done(null, false, { message: 'Incorrect username.' });

		bcrypt.compare(password, user.password, function (err, res) {
			if (err) return done(err);
			if (res === false) return done(null, false, { message: 'Incorrect password.' });
			
			return done(null, user);
		});
	});
}));

function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) return next();
	res.redirect('/login');
}

function isLoggedOut(req, res, next) {
	if (!req.isAuthenticated()) return next();
	res.redirect('/');
}
app.get('/', isLoggedIn, (req, res) => {
    res.render('index.ejs')
});

app.get('/login', isLoggedOut, (req, res) => {
    res.render('login.ejs')
});

app.post('/login', passport.authenticate('local', {
	successRedirect: '/',
	failureRedirect: '/login',
    failureFlash: true
}));

app.get('/logout', function (req, res) {
	req.logout();
	res.redirect('/');
});

app.get('/signup', isLoggedOut, (req, res) => {
    res.render('signup.ejs')
});

app.post('/signup', isLoggedOut, async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newuser = new User({
            name: req.body.name,
            email: req.body.email,
            username: req.body.username,
            password: hashedPassword
        });
        newuser.save();
        res.redirect('/login');
    } catch {
        res.redirect('/signup');
    }
})


app.get('/users', isLoggedIn, (req, res) => {
    User.find({username: req.user.username})
        .then((result) => {

            res.render('users', { users: result })
        })
        .catch((err) => {
            console.log(err);
        })
})

app.post('/users', isLoggedIn, (req, res) => {
    // console.log(req.user.username)
    User.findOneAndUpdate({username: req.user.username},{api: req.body.api},{
        new: true,
        upsert: true
    },
    (error,data)=>{
        if(data){
        }
    })
    res.redirect('/')
})

app.get('/api', isLoggedIn, (req, res ) => {
    console.log("test")
    User.find({username: req.user.username})
        .then((result) => {
            console.log(result)
            res.json({ api: result[0].api })
        })
        .catch((err) => {
            console.log(err);
        })
})


module.exports = User;

app.listen(3030, () => {
	console.log("Listening on port 3030");
});
