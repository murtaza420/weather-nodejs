const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=ac1336baf41c28ac53bc067bf607e5f6&query=' + latitude + ',' + longitude + '&units=m'

    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather API', undefined)           
        }
        else if (body.error) {
            callback('Unable to find co-ordinates. Try another search.', undefined)
        }
        else if(body.current.weather_descriptions.length === 0) {
            callback(undefined, {
                forecast: 'It is currently ' + body.current.temperature + ' degrees outside. It feels like ' + body.current.feelslike + 
                ' degrees outside with a wind speed of ' + body.current.wind_speed + ' km/hr.' +' Humidity is ' + body.current.humidity + '.'
            })
        }
        else {
            callback(undefined, {
                forecast: body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + 
                ' degrees outside. It feels like ' + body.current.feelslike + ' degrees outside with a wind speed of ' + 
                body.current.wind_speed + ' km/hr.' + ' Humidity is ' + body.current.humidity + '.'
            })
        }
    })
}

module.exports = forecast