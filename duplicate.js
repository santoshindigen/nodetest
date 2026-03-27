const { json } = require("stream/consumers");
const data = require("./duplicate.json");
const fs = require("fs");
console.log(JSON.stringify(data.data));
// async function init() {
//     fs.writeFile('updatedDuplicate.json', JSON.stringify(, null, 2), (err) => {
//         if (err) {
//             console.error('Error writing file', err);
//         } else {
//             console.log('File has been saved as updatedData.json');
//         }
//     }); 
// }

// init();