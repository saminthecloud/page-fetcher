const request = require('request');
const fs = require("fs");

var websiteName = process.argv[2];
var pathToSave = process.argv[3];

const printResourceToPath = function(websiteContent, functionToRunWhenThingsAreDone) {
    fs.writeFile(pathToSave, websiteContent, (error) => {
        if (!error) {
            functionToRunWhenThingsAreDone(websiteContent.length);
        }
    })
};

const printOutWebsiteData = function(lengthOfContent) {
        console.log(`Downloaded and saved ${lengthOfContent} bytes to ${pathToSave}`);
    }


const websiteContent = request(websiteName, { json: true }, (error, response, body) => {
    if (error){
        console.log(`Error encountered. Error code is : ${error}`);
    } else if (response.statusCode <200 || response.statusCode>299) {
        console.log(`Error encountered. Status code is : ${response.statusCode}`);
    } else printResourceToPath(body, printOutWebsiteData);
});