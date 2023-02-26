
const url = "https://api.appworks-school-campus3.online/api/v1/clock/delay";
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

function requestSync(url) {

    const start = performance.now();

    // write code to request url synchronously
    const request = new XMLHttpRequest();
    request.open('GET', url, false);  // `false` makes the request synchronous
    request.send(null);

    // if (request.status === 200) {
    //     console.log(request.responseText);
    // }
   
    const end = performance.now();
    console.log(end - start)
}

requestSync(url) // would print out the execution time
requestSync(url) 
requestSync(url)