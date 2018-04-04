var express = require('express')

var handlebars = require('express3-handlebars').create({defaultLayout : 'main'})
var app = express()

app.set('port' , process.env.PORT || 3000)
app.engine('handlebars', handlebars.engine)
app.set('view engine', 'handlebars')

app.use(express.static(__dirname + '/public'))

app.get('/', (req , res ) => {
    res.render('home')
})

app.get('/about', (req, res) => {
    res.render('about')
})

app.use((req, res) =>{
    res.render('400')
})

app.use((req, res) => {
    res.render('500')
})



app.listen(app.get('port'), () =>{
    console.log(`Express started on 
    http://localhost:${app.get('port')};
    press Ctrl-C to terminate`)
})