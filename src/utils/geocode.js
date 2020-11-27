const request = require('request')

const geocode = (place, callback) => {
    const mapBoxUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(place) + '.json?access_token=pk.eyJ1IjoiamF5YW50aGt1bWFyeXAxIiwiYSI6ImNrZmhza3M0eTAwa3czMHFocjViOGw5dzkifQ.TCuaE2aWfmMY_H-FKKbLvQ&limit=1'
    request({ url: mapBoxUrl, json: true }, (error, {body}={}) => {
        if (error) {
            callback('There is trouble fetching data!', undefined)
        }
        else if (body.message) { callback(body.message, undefined) }
        else if (body.features.length < 1) { callback('No matching results!!', undefined) }
        else {
            const latitude = body.features[0].center[0]
            const longitude = body.features[0].center[1]
            // const {body.features[0].center[1]:longitude, body.features[0].center[0]:latitude}=response
            callback(undefined, { longitude,latitude  })
        }
    })
}

module.exports = geocode

// const forecast = (latitude, longitude, callback) => {
//     const weatherstackUrl = 'http://api.weatherstack.com/current?access_key=d4c719a54d79890afecccb773fb7ee9e&query=' + latitude + ',' + longitude
//     request({ url: weatherstackUrl, type: json }, (error, response)=>{
//         if (error) {
//             callback('Unable to connect to Weatherstack server!!!', undefined)
//         }
//         else if (response.body.error) {
//             callback('Issue with the co-ordinates', undefined)
//         }
//         else {
//             callback(undefined, response.body.current.weather_descriptions + ' It is currently ' + response.body.current.temperature + ' degress out. There is a ' + response.body.current.precip + '% chance of rain.')
//         }

//     })
// }

// // request({ url: url, json: true }, (error, response) => {
// //     if(error){
// //         console.log('Unable to connect to WeatherStack')
// //     }
// //     else if(response.body.error){
// //         console.log(response.body.error.info)
// //     }
// //     else
// //     console.log(response.body.current.weather_descriptions + ' It is currently ' + response.body.current.temperature + ' degress out. There is a ' + response.body.current.precip + '% chance of rain.')
// // })
