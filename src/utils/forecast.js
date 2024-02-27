const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=8f367fb725c9d9e4d7463c4a9f170cc3&query=" + latitude + "," + longitude + "&units=f"

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback("Unable to connect to weather service", undefined)
        } else if (response.body.error) {
            callback("Unable to find location", undefined);
        } else {
            callback(undefined, "We are in " + response.body.location.name + ". Local time is " + response.body.location.localtime + ". It is currently " + response.body.current.temperature + " degrees outside.")
        }
      });
} 
module.exports = forecast
