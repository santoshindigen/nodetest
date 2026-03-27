const fs = require("fs")
const emiailContent = require("./createEmail.json");

function replaceMultiplePatterns(data, patterns) {
    function recurse(nodes) {
        if (!Array.isArray(nodes)) return;

        nodes.forEach(node => {
            if (node.content && typeof node.content === 'string') {
                patterns.forEach(({ regex, replacer }) => {
                    node.content = node.content.replace(regex, replacer);
                });
            }
            if (node.children && Array.isArray(node.children)) {
                recurse(node.children);
            }
        });
    }

    recurse(data);
    return data;
}

const patterns = [
    {
        regex: /Biktarvy®?/gi,
        replacer: "<span style='color:#CF0A2C;'>Biktarvy®</span>"
    },
    {
        regex: /(bictegravir 50mg|emtricitabine 200mg|tenofovir alafenamide 25mg)/gi,
        replacer: match => `<span style='color:#939598;'>${match}</span>`
    },
    {
        regex: /\b\d+(\.\d+)?%/g,
        replacer: match => `<b style='color:#CF0A2C;'>${match}</b>`
    }
];

const modData = replaceMultiplePatterns(emiailContent.children, patterns);
fs.writeFile('updatedData.json', JSON.stringify(modData, null, 2), (err) => {
    if (err) {
        console.error('Error writing file', err);
    } else {
        console.log('File has been saved as updatedData.json');
    }
});
