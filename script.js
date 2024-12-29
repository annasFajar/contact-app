const ejs = require('ejs');
const fs = require('fs');
const express = require('express');
const app = express()
const port = 3000
const {fileSync, fileBaca, details} = require('./util/contacts')

fileSync()
const contacts = fileBaca()


app.set('view engine', 'ejs')

app.use(express.static('public'))

//midleware
// app.use((req,res,next)=> {
//     console.log(Date.now());
//     next()
// })



app.get('/home',(req, res,next) => {
    res.render('main',{
        title: 'MyIndex',
        page:'home',
        vContent: 'home.ejs',
        nama:'annas', 
    } )
})

app.get('/aboutMe', (req,res)=> {
    res.render('main',{
        title: 'MyAbout',
        page:'about',
        vContent: 'about.ejs',
    });
});



app.get('/contacts', (req,res)=> {
    // res.sendFile('./home.html',{root:__dirname})
    res.render('main', {
        title: 'Contacts',
        page:'about',
        vContent: 'contacts.ejs',
        contacts
    })
})

app.get('/contacts/:nama',(req, res,next) => {
    
    const detail = details(req.params.nama)
    res.render('main',{
        title: 'MyIndex',
        page:'home',
        vContent: 'detail.ejs',
        contacts,
        detail
    } )
})
const data = {
        title: 'MyIndex',
        page:'contacts',
        vContent: 'contacts.ejs',
        contacts, 
    };
    
    ejs.renderFile('views/main.ejs', data, (err, html) => {
    if (err) {
        console.error(err);
        return;
    }
    fs.writeFileSync('views/index.html', html); // Simpan hasil ke folder dist
    console.log('EJS rendered to HTML successfully!');
    });


// klo param doang bearti semua yang di url di panggil di get harus ada : (titik dua)
app.param('id', (req,res) =>{
    res.send('ini param')
})

app.get('/user/:id', function (req, res, next) {
    res.send('ini param')
    console.log('although this matches')
    next()
})
app.get('/home/:id', function (req, res, next) {
    res.send('ini param')
    console.log('although this matches')
    next()
})



app.use((req,res,next)=>{
    // <h1>404</h1>
    console.log('404')
    next()
})
app.use((req, res,next) => {
    
    res.status(404).send('bad request').end();
})

app.listen(port, () => {
    console.log(`listen to port:${port}`)
})


