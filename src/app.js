const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')
const { createSecretKey } = require('crypto')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Andrew Mead'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Andrew Mead'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Andrew Mead'
    })
})

app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({
            error: 'Provide address'
        })
    } else {

        const location = req.query.address

        geocode(location, (error, data) => {
            if (!location) {
                return res.send('Location not provided')
            }
        
            if (error) {
                return res.send(error)
            }
        
            forecast(data.latitude, data.longitude, (error, weatherData) => {
                console.log(data.location)
                console.log(weatherData)
                const message = 'The temparature in ' + location + ' is ' + weatherData.temperature + ' and chance of rain is ' + weatherData.percipitation
                return res.send({
                    temp: weatherData.temperature,
                    perc: weatherData.percipitation
                })
            })
        })   
    }

})

app.get('/product', (req, res) => {

    if (!req.query.search) {
        return res.send({
            error: 'Provide search term'
        })
    } else {
        res.send({
            product: []
        })
    }

    
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Andrew Mead',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Andrew Mead',
        errorMessage: 'Page not found.'
    })
})

app.listen(port, () => {
    console.log('Server is up on port 3000.')
})