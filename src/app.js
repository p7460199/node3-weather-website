const path = require('path')
const express = require("express")
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define for Express config
const publicDirectoryPath =  path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars enginer and views location
app.set('view engine', 'hbs')  // install hbs app, not handlebar app
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup for directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Andrew Mead'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Same guy'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help me',
        name: 'Andrew Mead',
        helpText: 'Same help guy'
    })
})


app.get("/weather", (req, res) => {
    if (!req.query.address) {
        return res.send ({
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})


// before start server, pass the error get

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'same guy',
        errorMessage: 'Help article not found.'
    })
} )

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'error guy',
        errorMessage: 'Page not found.'
    })
})

app.listen(3000, () => {
  console.log("Server is up on port 3000.");
});


