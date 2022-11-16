var express = require('express');
var router = express.Router();
const { v4: uuid } = require('uuid');
let Local_DB =[
  
  {
    id:"fes98-49kdfdnd-jlkdfk" , description:"Drink 6 glass of water daily", title:"Drink water", deadline:"15,Nov"

  }
]


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('show', { tasks:Local_DB});
});

router.get('/create', function(req, res, next) {
  res.render('create');
});

router.post('/add', function(req, res, next) {
  const {title,description}=req.body
  let deadline = new Date().toLocaleDateString("en-US",{
    date:"numeric",
    month:"short",
    year:"numeric",
  });

  let newtask = {
  id:uuid(),
  title,
  description,
  deadline,
  }

  Local_DB.push(newtask)
  res.redirect("/");
});

router.get('/delete/:id', function(req, res, next) {
  const id = req.params.id;

  const deletetask = Local_DB.filter(function(blur){
    return blur.id !== id;
  })


  Local_DB= deletetask;
  res.redirect("/");
});

router.get('/edit/:id', function(req, res, next) {
  const id = req.params.id;

  const filterdata = Local_DB.filter(function(blur){
    return blur.id === id;
  })


  res.render("edit",{task:filterdata[0]});
});

router.post('/edit/:id', function(req, res, next) {
  const id = req.params.id;
  const {title,description} = req.body;

  const taskview = Local_DB.findIndex(function(blur){
    return blur.id === id;
  });

  const activetask = {...Local_DB[taskview],title,description}

  Local_DB[taskview] =activetask;

res.redirect("/")
});

module.exports = router;
