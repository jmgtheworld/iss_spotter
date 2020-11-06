/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */

const request = require('request');

const fetchMyIP = function(callback) {
  // use request to fetch IP address from JSON API
  request("https://api.ipify.org/?format=json", (error, response, body) => {
    
    if (error) {
      callback(error, null);
    }
    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    } 
      const ipAddress = JSON.parse(body).ip;
      callback(null, ipAddress);
  });
};

// module.exports = { fetchMyIP };


const fetchCoordsByIP = function(ip, callback) {
  request("http://ip-api.com/json/" + ip, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coordinates for IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
      let latlng = JSON.parse(body);
      let latlngObject = {
        "latitude": latlng.lat,
        "longitude": latlng.lon
      }
      callback(null, latlngObject);
  });
};

// module.exports = { fetchCoordsByIP };

const fetchISSFlyOverTimes = function(coords, callback) {
  request("http://api.open-notify.org/iss-pass.json?lat=" + coords.latitude + "&lon=" + coords.longitude, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coordinates for IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    } 
      let data = JSON.parse(body);
      let dataResponse = data.response;
      callback(null, dataResponse);
  });
};

// module.exports = { fetchISSFlyOverTimes };

const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }

    fetchCoordsByIP(ip, (error, loc) => {
      if (error) {
        return callback(error, null);
      }

      fetchISSFlyOverTimes(loc, (error, nextPasses) => {
        if (error) {
          return callback(error, null);
        }

        callback(null, nextPasses);
      });
    });
  });
};

module.exports = { nextISSTimesForMyLocation };