//déclaration de constante
const emoji = require("emoji-button")
const express = require('express');
const router = express.Router();
const dir = __dirname;
const bodyParser = require('body-parser');
const options = {}; //objet contenant les différentes variables nécéssaire à la création de la vue

//insertion du middleware bodyparser pour pouvoir lire les données issues des formulaire
router.use(bodyParser.urlencoded({extend: true}));

//création des différentes routes
router.get('/',(req,res,next)=>{
    let file = "home";
    options.title = "home";
    options.file = file;
    
    res.render('pages/home',options);
    next();
});
router.get('/chat', (req,res)=>{
    let file = "chat";
    options.title = "chat";
    options.file = file;
    res.render('pages/chat',options);
    
})
router.post('/chat', (req,res)=>{
    
    console.log(req.body.username)
    //console.log(req.params.p2)
    res.send('ok');
    
})



module.exports = router;
