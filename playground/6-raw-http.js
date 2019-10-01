const https = require('https');
const url = 'https://api.darksky.net/forecast/1d28e78644f139cc63c23a3b0527d498/40,-75';;

const request = https.request(url, (response) => {
    let data = '';
    response.on('data', (chunk) => {
        data = data + chunk.toString();
    });

    response.on('end', () => {
        const body = JSON.parse(data);
        console.log(body);
    });
});

request.on('error', (error) => {
    console.log('An error', error);
});

request.end();