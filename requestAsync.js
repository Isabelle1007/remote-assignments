
const url = "https://api.appworks-school-campus3.online/api/v1/clock/delay";
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

function requestCallback(url, callback) {

    const start = performance.now();

    // write code to request url asynchronously
    const request = new XMLHttpRequest();

    request.open('GET', url, true);  // `true` makes the request asynchronous

    request.onload = (e) => {
        const end = performance.now();
        console.log(end - start);
    }

    request.onerror = (e) => {
        console.error(request.statusText);
    };

    request.send(null);

}

function requestPromise(url) {

    const start = performance.now();

    // write code to request url asynchronously with Promise
    return new Promise((resolve, reject) => {    
        const request = new XMLHttpRequest();

        request.open('GET', url, true);  // `true` makes the request asynchronous

        request.onload = (e) => {

            const end = performance.now();
            console.log(end - start)

            if(request.status === 200) {
                resolve(request.responseText);
            }else{
                reject(request.status);
            }
        }

        request.onerror = (e) => {
            console.error(request.statusText);
        };
        
        request.send(null);
    });    
}

async function requestAsyncAwait(url) {

    const start = performance.now();

    // write code to request url asynchronously
    // you should call requestPromise here and get the result using async/await.

    try{
        const request = new XMLHttpRequest();
        const r = await request.open('GET', url, true);  // `true` makes the request asynchronous

        request.onload = (e) => {
            const end = performance.now();
            console.log(end - start);
        }

        request.onerror = (e) => {
            console.error(request.statusText);
        };

        request.send(null);
        
    }catch(err){

        console.log(err);
    }

}

requestCallback(url, console.log); // would print out the execution time
requestPromise(url).then(console.log);
requestAsyncAwait(url);