const request = require('request')

const forecast = (longitude,latitude, callback) => {
    const weatherstackUrl = 'http://api.weatherstack.com/current?access_key=d4c719a54d79890afecccb773fb7ee9e&query=' + longitude + ',' + latitude+'&units=m'
    // console.log(weatherstackUrl)
    request({ url: weatherstackUrl, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to Weatherstack server!!!', undefined)
        }
        else if (response.body.error) {
            callback('Issue with the co-ordinates', undefined)
        }
        else {
            response={
                forecast:response.body.current.weather_descriptions + ' It is currently ' + response.body.current.temperature + ' degress out. There is a ' + response.body.current.precip + '% chance of rain st'+response.body.location.name+'.',
                location:response.body.location.name
            }
            callback(undefined,response )
        }

    })
}

module.exports = forecast