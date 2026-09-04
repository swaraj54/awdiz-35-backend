const http = require('http');

const myserver = http.createServer((req, res) => {
    console.log(req.url, req.method, 'request object');
    if (req.url === '/') {
        return res.end("Welcome to Home Page")
    } else if (req.url === "/login") {
        return res.end("Welcome to Login Page")
    } else {
        return res.end("Server is running on port 3000")

    }
})

myserver.listen(3000, () => { console.log("Server is running on port 3000") })