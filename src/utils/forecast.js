const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=ac1336baf41c28ac53bc067bf607e5f6&query=' + latitude + ',' + longitude + '&units=f'

    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather API', undefined)           
        }
        else if (body.error) {
            callback('Unable to find co-ordinates. Try another search.', undefined)
        }
        else if(body.current.weather_descriptions.length === 0) {
            callback(undefined, {
                temperature: body.current.temperature,
                feelsLike: body.current.feelslike 
            })
        }
        else {
            callback(undefined, {
                description: body.current.weather_descriptions[0],
                temperature: body.current.temperature,
                feelsLike: body.current.feelslike 
            })
        }
    })
}

module.exports = forecast