const express=require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT ||3000;

var app = express();
hbs.registerPartials(__dirname+'/views/partials')
hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear();
});
app.set('view engine','hbs')

app.use((req,res,next)=>{
    var now = new Date().toString();
    var log =`${now} : ${req.method} : ${req.url}`;
    console.log(log);
    fs.appendFile('server.log',log+'\n',(error)=>{
        console.log('can\'t write in the file');
        
    });
    next();
});

// app.use((req,res,next)=>{
//     res.render('maintenance.hbs',{
//         title : 'Maintenance'
//     });
// });

app.use(express.static(__dirname+'/public'));


var obj={
    name : 'ahmed',
    age : 25
};

app.get('/',(req,res)=>{
    res.render('home.hbs',{
        title:'Home page',
        welcome : 'welcome'
    });
});

app.get('/about',(req,res)=>{
    res.render('about.hbs',{
        title:'About page'
    });
});

app.get('/bad',(req,res)=>{
    res.send({
        errorMessage : 'something went bad'
    });
});
app.listen(port,()=>{
    console.log(`the app started at port ${port}`);
    
});