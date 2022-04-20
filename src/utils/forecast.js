const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=746514321717afcc4ed2130691e9cd52&query=' + latitude + ',' + longitude

    request({ url: url, json:true }, (error, response) => {
        if (error) {
            callback(error, undefined)
        } else if (response.body.error){
            callback('Invalid request', undefined)
        } else {
            callback(undefined, {
                temperature: response.body.current.temperature,
                percipitation: response.body.current.precip
            })
        }
    })
}

module.exports = forecast