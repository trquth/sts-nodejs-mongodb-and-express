var express = require('express')
var fortune = require('./lib/fortune')
var seed = require('./lib/seed')
var dumb1 = require('./lib/dumb1')
var weather = require('./lib/weatherData')
var app = express()

var handlebars = require('express3-handlebars').create({
    helpers: {
        studyStatus: (averageScore) => {
            return averageScore > 5 ? 'has passed' : `hasn't passed`
        },
        showResultStudent: (data, options) => {
            var returnData = ""
            data.forEach(student => {
                student.result = student.averageScore > 5 ? `${student.name} has passed` : `${student.name} hasn't passed`
                returnData = returnData + options.fn(student);
            });

            return returnData
        },
        getFullYear: () => {
            return new Date().getFullYear()
        }
    },
    defaultLayout: 'main',
});


app.set('port', process.env.PORT || 3000)
app.engine('handlebars', handlebars.engine)
app.set('view engine', 'handlebars')

app.use(express.static(__dirname + '/public'))

app.use((req, res, next) => {
    if (!res.locals.partials) res.locals.partials = {};
    res.locals.partials.weatherContext = weather.getWeatherData();
    next();
})

app.get('/', (req, res) => {
    res.render('home')
})

app.get('/about', (req, res) => {
    res.render('about', {fortune: fortune.getFortune()})
})

app.get('/api/tours', (req, res) => {
    res.json(seed.getTours())
})

app.get('/api/tour/:id', (req, res) => {
    var p = seed.getTours().some((item) => item.id == req.params.id)
    if (p) {
        res.json({success: true})
    } else {
        res.json({err: `Can't found item`})
    }
})

app.get('/tours', (req, res) => {
    res.render('tours', seed.getSeedData())
})

app.get('/handlebars', (req, res) => {

    res.render('fundanmental-handlebar', dumb1.getDumb1())
})

app.get('/tours/hood-river', (req, res) => {
    res.render('tours/hood-river')
})

app.get('/tours/oregon-coast', (req, res) => {
    res.render('tours/oregon-coast')
})

app.get('/tours/request-group-rate', (req, res) => {
    res.render('tours/request-group-rate')
})

app.use((req, res) => {
    res.status(400)
    res.render('400')
})

app.use((req, res) => {
    res.status(500)
    res.render('500')
})


app.listen(app.get('port'), () => {
    console.log(`Express started on 
    http://localhost:${app.get('port')};
    press Ctrl-C to terminate`)
})