"use strict";
 
var express        =         require("express");
var bodyParser     =         require("body-parser");
var app            =         express();
 
app.use(bodyParser.urlencoded({
    extended: false
}));
 
var index = 0;
 
var nools = require("nools");
 
var flow = nools.compile(__dirname + "/rules.nools");
var Message = flow.getDefined("message");
var Client = flow.getDefined("client");
var session = flow.getSession();
 
session.matchUntilHalt().then(
    function() {
        //all done!
        console.log("All done!");
    },
    function(err) {
        console.log("Error matchUntilHalt()", err.stack);
    }
);
 
app.get('/fact', function(req, res) {
    var key = req.query.key;
 
    console.log("\n" + ++index + " New fact", key);
 
    var newMsg = new Message(key);
 
    session.assert(newMsg);
 
    res.end("All OK");
});

app.get('/client', function(req, res) {
    var key = req.query.key;
 
    console.log("\n" + ++index + " New fact", key);
 
    var newMsg = new Client(key);
 
    session.assert(newMsg);
 
    res.end("All OK");
}); 

app.get('/', function(req, res) {
    res.end("Watsup! Its " + new Date());
});
app.listen(4000, function() {
    console.log("Started up!");
});