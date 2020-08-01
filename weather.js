const https = require('https');
const http = require('http');
const api = require('./api.json');

function printWeather(weather) {
    const message = `It is currently ${weather.main.temp}C and ${weather.weather[0].description} in ${weather.name}`;
    console.log(message);
}

function printError(error) {
    console.error(error.message);
}
function get(query) {
    try {
        const request = https.get(`https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&appid=${api.key}`, response => {
            if (response.statusCode === 200) {
                let body = '';
                response.on('data', data => {
                    body += data.toString();
                });
                
                response.on('end', () => {
                    try {
                    const weather = JSON.parse(body);
                    printWeather(weather);
                    } catch (error) {
                        printError(error);
                    }
                });
            } else {
                const statusCodeError = new Error(`There was an error getting the weather information for "${query}"! (${http.STATUS_CODES[response.statusCode]})`);
                printError(statusCodeError);
            }
    });
    } catch (error) {
        printError(error.message);
    }
}

module.exports.get = get;