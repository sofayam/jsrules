"use strict";
 
 
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
 
var newMsg = new Message("hello");
 
session.assert(newMsg);
 

var newMsg = new Client(40);
 
session.assert(newMsg);

