var express = require("express")
var app = express();
var bcrypt = require('bcrypt')
var passport = require('passport')
var flash = require('express-flash')
var session = require('express-session')
var methodOverride = require('method-override')

const initializePassport = require('/passport-config')
initializePassport(
    passport, 
    username => users.find(user => user.username === username),
    id => users.find(user => user.id === id)
)

const users = [] // < ------------------------------------------------------------------- change to database

app.set('view-engine', 'html')
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

app.listen(3000)