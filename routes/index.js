/*var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
  res.render('index', { title: 'xpress' });
});

module.exports = router;*/

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var user = require('../database/db').user;
var index = require('../database/db').index;


/* GET home page. */
router.get('/', function(req, res) {
    res.render('index', { title: 'index' });
});

/*login*/
router.get('/login', function(req, res) {
    res.render('login', { title: 'login' });
});
router.get('/123', function(req, res) {
    res.json([
  {
    "url": "songs/One Of Us.mp3",
    "title": "One Of Us",
    "singer": "Joan Osborne"
}, {
    "url": "songs/No getting over me.mp3",
    "title": "No getting over me",
    "singer": "Willie Clayton"
}, {
    "url": "songs/My Heart Will Go On.mp3",
    "title": "My Heart Will Go On",
    "singer": "Celine Dion"
}]);
   
});
/*获取index显示数据*/
router.post('/indexshow', function(req, res) {
     var query_doc = {name:req.body.name};//查询所有
    (function(){
        index.find(query_doc,null,{sort:{date:-1}},function(err, doc){
            /*console.log(doc);*/
            if(err){
                res.json(err);
            }else{
                res.json(doc);
            }
        });
    })(query_doc);
   
});
/*登录*/
router.post('/loginvue', function(req, res) {
    console.log(req);
    var query_doc = {name: req.body.name, password: req.body.password};
    (function(){
        user.count(query_doc, function(err, doc){
            if(doc == 1){
                console.log(query_doc.name + ": login success in " + new Date());
                res.json(query_doc);
            }else{
                console.log(query_doc.name + ": login failed in " + new Date());
               /*res.redirect('/');*/
               res.redirect(301, 'http://172.16.22.247:8080/login');
            }
        });
    })(query_doc);
});

router.post('/logincheck', function(req, res) {
    console.log(req);
    var query_doc = {name: req.body.name, password: req.body.password};
    (function(){
        user.count(query_doc, function(err, doc){
            console.log(doc);
            if(doc == 1){
                console.log(query_doc.name + ": login success in " + new Date());
                res.json(query_doc);
            }else{
                console.log(query_doc.name + ": login failed in " + new Date());
                

            }
        });
    })(query_doc);
});
/*ucenter*/
router.post('/ucenter', function(req, res) {
    var query_doc = {name: req.body.name, password: req.body.password};
    (function(){
        user.count(query_doc, function(err, doc){
            if(doc == 1){
                console.log(query_doc.name + ": login success in " + new Date());
                res.render('ucenter', { user:query_doc.name });
                res.render('ucenter', { title: 'ucenter' });
            }else{
                console.log(query_doc.name + ": login failed in " + new Date());
                res.redirect('/');
            }
        });
    })(query_doc);
});
/*增加计划*/
router.post('/addassignments', function(req, res) {
     var query_doc = req.body;//查询所有
     var indexlist = new index(query_doc);    
    (function(){
        indexlist.save(function(err, doc){
            if(err){
                res.json(err);
            }else{
                console.log(query_doc.name+"【用户】"+query_doc.context+"计划添加成功");
            }
        });
    })(query_doc);
   
});

module.exports = router;