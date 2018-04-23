/*var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
  res.render('index', { title: 'xpress' });
});

module.exports = router;*/

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var user = require('../modal/users').user;
var index = require('../modal/indexshows').index;


/* GET home page. */
router.get('/', function(req, res) {
    res.render('index', { title: 'index' });
});

/*login*/
router.get('/login', function(req, res) {
    res.render('login', { title: 'login' });
});
router.get('/123', function(req, res) {
    res.json([{
        "url": "songs/One Of Us.mp3",
        // "title": "One Of Us",
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
/*获取所有用户*/
router.get('/getAllUser', function(req, res) {
    var query_doc = {};
    (function() {
        user.find(query_doc, function(err, result) {
            if (err) { return console.log(err); }
            res.render('ucenter', { result: "result" });
        });
    })(query_doc);
});
/*增加用户*/
router.post('/addAllUser', function(req, res) {
    var query_doc = req.body;
    var newUser = new user(query_doc);
    (function() {
        newUser.save(function(err, doc) {
            if (err) {
                res.json(err);
            } else {
                res.json(doc);
            }
        });
    })(query_doc);
});
router.post('/logincheck', function(req, res) {
    console.log(req);
    var query_doc = { name: req.body.name, password: req.body.password };
    (function() {
        user.count(query_doc, function(err, doc) {
            console.log(doc);
            if (doc == 1) {
                console.log(query_doc.name + ": login success in " + new Date());
                res.json(query_doc);
            } else {
                console.log(query_doc.name + ": login failed in " + new Date());
            }
        });
    })(query_doc);
});
/*ucenter*/
router.post('/ucenter', function(req, res) {
    var query_doc = { name: req.body.name, password: req.body.password };
    (function() {
        user.count(query_doc, function(err, doc) {
            if (doc == 1) {
                console.log(query_doc.name + ": login success in " + new Date());
                res.render('ucenter', { user: query_doc.name, title: 'ucenter' });
                // res.render('ucenter', { title: 'ucenter' });
            } else {
                console.log(query_doc.name + ": login failed in " + new Date());
                res.redirect('/');
            }
        });
    })(query_doc);
});
/*登录*/
router.post('/loginvue', function(req, res) {
    var query_doc = { name: req.body.name, password: req.body.password };
    (function() {
        user.findOne(query_doc, function(err, findUser) {
            if(err){
                console.log(query_doc.name + ": login failed in " + new Date());
                res.json({code:404,result:error});
                return;
            }

            if(!findUser){
                console.log(query_doc.name + ": error username or password" + new Date());
                res.json({code:404,result:"用户名或密码错误"});
                return;
            }
            var returnData = {};
            returnData.code = 200;
            returnData.result = {_id:findUser._id,name:findUser.name};
            res.json(returnData);
            //更新最后登陆时间
            user.update({_id:findUser._id},{$set: {lastLoginTime: new Date()}}).exec();
        });
    })(query_doc);
});
/*显示计划*/
router.post('/indexshow', function(req, res) {
    var query_doc = { name: req.body.name }; //查询所有
    (function() {
        index.find(query_doc, null, { sort: { date: -1 } }, function(err, doc) {
            /*console.log(doc);*/
            if (err) {
                res.json(err);
            } else {
                res.json(doc);
            }
        });
    })(query_doc);

});
/*增加计划*/
router.post('/addassignments', function(req, res) {
    var query_doc = req.body; //查询所有
    var indexlist = new index(query_doc);
    (function() {
        indexlist.save(function(err, doc) {
            if (err) {
                /*res.json(err);*/
            } else {
                console.log(query_doc.name + "【用户】" + query_doc.context + "计划添加成功");
                res.redirect('/');
            }
        });
    })(query_doc);

});
/*删除计划*/
router.post('/delassignments', function(req, res) {
    var query_doc = req.body; //查询所有
    var indexlist = new index(query_doc);
    console.log(indexlist,query_doc);
    (function() {
        indexlist.remove(query_doc, function(err, result) {
            if (err) {
                console.log('Error:' + err);
                res.json(err);
                return;
            }else{
                console.log('用户：'+query_doc.name+'remove success' + query_doc.id);
                res.json({result:'ok'});
            }
        });
    })(query_doc);

});

module.exports = router;