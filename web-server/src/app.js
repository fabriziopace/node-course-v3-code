const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode.js');
const forecast = require('./utils/forecast.js');

const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');

const partialsPath = path.join(__dirname, '../templates/partials');


// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

// Index page
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Fabrizio Pace'
    });
});

// About page
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About page',
        name: 'Fabrizio Pace'
    });
});

// Help page
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page',
        helpText: 'This is a help message',
        name: 'Fabrizio Pace'
    });
});

// Weather page
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        });
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error });
        };

        forecast(latitude, longitude, (error, { summary }) => {
            if (error) {
                return res.send({ error });
            };
            res.send({
                summary,
                location,
                address: req.query.address
            });
        });
    });


});

// Products page
app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        });
    };

    console.log(req.query.search);
    res.send({
        products: []
    });
});


app.get('/help/*', (req, res) => {
    res.render('notfound', {
        title: '404',
        errorMessage: 'Help article Not Found.',
        name: 'Fabrizio Pace'
    });
});

// 404 Error
app.get('*', (req, res) => {
    res.render('notfound', {
        title: '404',
        errorMessage: 'Page Not Found',
        name: 'Fabrizio Pace'
    });
});

app.listen(3000, () => {
    console.log('Server is up on port 3000.');
});