// index2.js
const { nextISSTimesForMyLocation } = require('./iss_promised');

// see index.js for printPassTimes 
// copy it from there, or better yet, moduralize and require it in both files


// Call 
nextISSTimesForMyLocation()
  .then((passTimes) => {
    const { printPassTimes } = require('./index');
  })
  .catch((error) => {
    console.log("It didn't work: ", error.message);
  });