var express = require('express')

var handlebars = require('express3-handlebars').create({defaultLayout: 'main'})
var app = express()

app.set('port', process.env.PORT || 3000)
app.engine('handlebars', handlebars.engine)
app.set('view engine', 'handlebars')

app.use(express.static(__dirname + '/public'))

var fortunes = ["Conquer your fears or they will conquer you.",
    "Rivers need springs.",
    "Do not fear what you don't know.",
    "You will have a pleasant surprise.",
    "Whenever possible, keep it simple.",];

var tours = [{id: 0, name: 'Hood River', price: 99.99},
{id: 1, name: 'Oregon Coast', price: 149.95},];

app.get('/', (req, res) => {
    res.render('home')
})

app.get('/about', (req, res) => {
    var randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
    res.render('about', {fortune: randomFortune})
})

app.get('/api/tours', (req, res) => {
    res.json(tours)
})

app.get('/api/tour/:id', (req, res) => {
    var p = tours.some((item) => item.id == req.params.id)
    if (p) {
        res.json({success : true})
    }else{
        res.json({err : `Can't found item`})
    }
})

app.use((req, res) => {
    res.render('400')
})

app.use((req, res) => {
    res.render('500')
})



app.listen(app.get('port'), () => {
    console.log(`Express started on 
    http://localhost:${app.get('port')};
    press Ctrl-C to terminate`)
})