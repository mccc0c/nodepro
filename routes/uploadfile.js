var express = require('express');
var router = express.Router();
/*模拟上传文件*/
router.post('/filechange', function(req, res) {
    console.log(req);
   /* var query_doc = req.body; //查询所有
    consol.log(query_doc);
    var indexlist = new index(query_doc);*/
    (function() {
        res.json({ "result": "/upload/file/xx.doc" });
    })();
});
module.exports = router;