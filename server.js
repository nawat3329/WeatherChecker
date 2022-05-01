var express = require("express")
/* var bcrypt = require('bcrypt')
var passport = require('passport')
var flash = require('express-flash')
var session = require('express-session')
var methodOverride = require('method-override')
 */
const mongoose = require('mongoose');
const User = require('./models/user');
var app = express()

//connect to mongodb
const dbURI = 'mongodb+srv://admin:A395UNE4fFE6mnJ2@des422-mongodb.7jcr1.mongodb.net/DES422-MongoDB?retryWrites=true&w=majority'

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err));


app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/javascript', express.static(__dirname + 'public/javascript'))

app.set('views', './views');
app.set('view engine', 'ejs');

// insert user
app.get('/main', (req, res) =>{
    res.render('index')
});

app.get('/add-user', (req, res) =>{
    const user = new User({
        name:'Jack Sparrow',
        email:'Jack@gmail.com',
        username:'jack',
        password:'1234'
    });

    user.save()
    .then((result)=>{
        res.send(result)
    })
    .catch((err)=>{
        console.log(err);
    });
});

// show all users
app.get('/all-users',(req, res)=>{
    User.find()
    .then((result)=>{
        res.send(result);
    })
    .catch((err)=>{
        conslotchange.log(err);
    });
})
// show user
app.get('/single-user',(req, res)=>{
    User.find({username:'jack'})
    .then((result)=>{
        res.send(result)
    })
    .catch((err)=>{
        conslotchange.log(err);
    });
})


app.get('/setting', (req, res)=>{
    res.redirect('/users');
});

app.get('/users', (req, res)=>{
    User.find()
    .then((result)=>{
        
        res.render('setting', {users: result})
    })
    .catch((err) =>{
        console.log(err);
    })
})

/* const initializePassport = require('/passport-config')
initializePassport(
    passport, 
    username => users.find(user => user.username === username),
    id => users.find(user => user.id === id)
)

const users = [] // < ------------------------------------------------------------------- change to database


app.use(express.urlencoded({extended: false}))
app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))

app.get("/", checkAuthenticated,(req, res) => {
    res.render("main.html", { name: req.user.fname});  
});

app.get("/", checkNotAuthenticated,(req, res) => {
    res.render("login.html");  
});

app.post("/login", checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}));

app.get("/signup", checkNotAuthenticated, (req, res) => {
    res.render("signup.html");  
});

app.post("/signup", checkNotAuthenticated, async (req, res) => {
    try{
        var hashedPassword = bcrypt.hash(req.body.password, 10)
        users.push({ //also this one
            id: Date.now().toString(),
            fname: req.body.fname,
            lname: req.body.lname,
            email: req.body.email,
            username: req.body.username,
            password: hashedPassword
        })
        res.redirect('/login')
    }catch{
        res.redirect('/signup')
    }
})

app.delete('/logout', (req,res) => {
    req.logout()
    res.redirect('/login')
}) 

function checkAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return next()
    }
    res.redirect('/login')
}

function checkNotAuthenticated(req, res, next){
    if(res.isAuthenticated()){
        return res.redirect('/')
    }
    next()
}
*/
