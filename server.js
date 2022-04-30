var express = require("express"),
    
    app;
// Create our Express-powered HTTP server
// and have it listen or port 3000
app = express();
app.listen(3000)
// set up our routes


app.get("/hello", function (req, res) {
    res.send("Hello World!");
    
});
app.get("/goodbye", function (req, res) {
    res.send("Goodbye World!");
});