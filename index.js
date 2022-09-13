const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const port = 8000;

const db = require('./config/mongoose');
const Contact = require('./models/contact');
const app = express();

app.set('view engine','ejs');

// this sets whatever we r gonna render  its gonna be from the following dir
app.set('views', path.join(__dirname, 'views'));


app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static('assets')); //it'll look for assets dir

// middleware1
// app.use(function(req,res,next){
//   console.log('middleware1');
//   req.myName = 'jasir'  //we can manipulate the data as we want
//   next();
// })

// middleware2
// app.use(function(req,res,next){
//   console.log('middleware2');
//   console.log(req.myName)
//   next();
// })


// var contactList = [
//     {
//         name : 'jasir',
//         phone : '234534543'
//     },

//     {
//         name : 'abs',
//         phone : '12321343'
//     },

//     {
//         name : 'dyrt',
//         phone : '13123'
//     }

// ]




app.get('/', function(req,res){
    // res.send("response is sent ...fine")
    // return res.render('home',{
    //     title : 'Contact List',
    //     contact_list : contactList
    Contact.find({},function(err,contacts){
        if(err){
            console.log('error in fetching contacts from db');
            return;
        }

        return res.render('home', {
            title : 'Contact List',
            contact_list: contacts

    });
   
    })
    });

    


app.get('/practise',function(req, res){

    return res.render('practise', {
       title : "lets practise"
    });
})

// app.get('/delete-contact/:phone',function(req, res){   -> for params
app.get('/delete-contact',function(req,res){
    //  console.log(req.params);
    console.log(req.query);

    /* let phone = req.query.phone; */
      
    let id = req.query.id;

    // let contactIndex = contactList.findIndex(contact => contact.phone == phone);
    
    // if(contactIndex  != -1){
    // contactList.splice(contactIndex,1);
    // }

    Contact.findByIdAndDelete(id,function(err){
        if(err){
            console.log('Error in deleting an object from database');
            return;
        }
         
     res.redirect('back');

    });
      
    //  res.redirect('back');
});


app.post('/create-contact',function(req,res){
  
    // contactList.push({
    //     name: req.body.name,
    //     phone: req.body.phone 

    // });
     
    // contactList.push(req.body);

Contact.create({
    name: req.body.name,
    phone: req.body.phone
},function(err,newContact){
    if(err){
         console.log('error in creating a contact') ;
          return;
        }
        console.log('********', newContact);


        return res.redirect('back');

})

    // return res.redirect('/') or
    // return res.redirect('back');
   });

  


app.listen(port, function(err){
   
    if(err){
        console.log('error in running server', err)
        return;
    }
    
    console.log('Inside Listen. Express server running fine');

});