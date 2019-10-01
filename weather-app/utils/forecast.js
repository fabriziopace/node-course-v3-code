const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/1d28e78644f139cc63c23a3b0527d498/' + encodeURIComponent(latitude) + ', ' + encodeURIComponent(longitude);

    request({ url, json: true }, (error, { body }) => {
        if (error) { // low-level error
            callback('Unable to connect to weather service!', undefined);
        } else if (body.error) { // no-matching results
            callback('Unable to find location.', undefined);
        } else {
            callback(undefined, {
                summary: body.daily.data[0].summary,
                temperature: body.currently.temperature,
                precipProbability: body.currently.precipProbability
            });
        }
    });
};

module.exports = forecast;