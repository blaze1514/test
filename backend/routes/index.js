var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var users = require('../users');
var list = require('../list');

const accesskey = 'eswar';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/login', function(req, res){
  let {username, password} = req.body;
  console.log(users)

  const user = users.find(u => {return u.username === username && u.password === password });

  if(user){
    const accessToken = jwt.sign({username: user.username}, accesskey);
    return res.status(200).json({
      token: accessToken
    })
  }else{
   return res.status(404).json({msg: "Invalid UserName or password given"});
  }
})

router.get('/getData', function(req, res){
  let token = req.headers.authorization;
  if(token){
    let temp = token.split(' ')[1];
    jwt.verify(temp, accesskey, (err, user) => {
      if(err){
        return res.sendStatus(403);
      }else{
        return res.status(200).json({data: list})
      }
    })
  }else{
    return res.sendStatus(401);
  }
})

module.exports = router;
