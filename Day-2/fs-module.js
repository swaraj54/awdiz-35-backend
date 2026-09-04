const fs = require('fs');

fs.writeFileSync('fs-created-file.text', 'This is a file created using fs module in Node.js');

fs.readFile('fs-created-file.text', 'utf-8', (err, data) => {
    if (err) {
        console.log(err);
    } else {
        console.log(data,"data read from file");
    }
})