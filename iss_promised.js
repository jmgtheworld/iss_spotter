const request = require('request-promise-native');


const fetchMyIP = function() {
  return request("https://api.ipify.org/?format=json");
}

const fetchCoordsByIP = function(body) {
  let ip = JSON.parse(body).ip;
  return request("http://ip-api.com/json/" + ip);
};

const fetchISSFlyOverTimes = function(body) {
  let data = JSON.parse(body);
  return request("http://api.open-notify.org/iss-pass.json?lat=" + data.lat + "&lon=" + data.lon);
}

const nextISSTimesForMyLocation = function(body) {
  return fetchMyIP()
  .then(fetchCoordsByIP)
  .then(fetchISSFlyOverTimes)
  .then((data) => {
    const {response} = JSON.parse(data);
    return response;
  });
};

module.exports = { nextISSTimesForMyLocation };