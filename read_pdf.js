const fs = require('fs');
const pdf = require('pdf-parse');

let dataBuffer = fs.readFileSync('Prjt Sample.pdf');

pdf(dataBuffer).then(function(data) {
    fs.writeFileSync('pdf_content.txt', data.text);
    console.log("Extracted text successfully.");
}).catch(function(error) {
    console.error("Error extracting text:", error);
});
