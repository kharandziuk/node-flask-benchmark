var express = require("express");
var jade = require('jade');
var db = new (require('sqlite3').verbose()).Database('data.db');
var app = express();

var fib = function (n) {
  if (n === 0) {
    return 0;
  } else if (n == 1) {
    return 1;
  } else {
    return fib(n - 1) + fib(n - 2)
  }
};

var getApp = function () {
    app.get("/:number", function (req, res) {
      var number = req.param("number"); 
      query = db.prepare("INSERT INTO data VALUES (?)")
      for(var i=0; i<10; i++) {
        query.run((fib(number)))
      };
      dball("select * from data limit 100", function(err, rows){
        var rendered = jade.renderFile('layout.jade', {list: rows})
        res.send(rendered); 
      });
    });
    app.listen(3000);
}

db.get(
  "SELECT name FROM sqlite_master WHERE type='table' AND name='data'",
  function (err, row) {
    if(err !== null) {
      throw new Error();
    }
    if(row === undefined) {
      db.run('create table data (value text)', getApp)
    } else {
      getApp()
    }
  }
);
