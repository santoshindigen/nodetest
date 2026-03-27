
const emaiData = require("./createEmail.json");
const fs = require("fs");
// 1) collect contents and keep node references
async function collectMjTextContents(data) {
    const contents = [];
    const nodeRefs = [];
    async function recurse(nodes) {
        if (!Array.isArray(nodes)) return;
        for (const node of nodes) {
            // collect only mj-text nodes (skip if no string content)
            if (node && node.tagName === 'mj-text' && typeof node.content === 'string' && node.content.trim() !== '') {
                contents.push(node.content);
                nodeRefs.push(node); // store reference to the actual node
            }
            // dive into children if present
            if (node && Array.isArray(node.children) && node.children.length) {
                await recurse(node.children);
            }
        }
    }
    await recurse(data);
    // build numbered single string (each on new line)
    const numberedString = contents.map((c, i) => `${i + 1}. ${c}`).join('\n');
    return { numberedString, contents, nodeRefs };
}


// 2) apply contents back into nodes (accepts array OR numbered string)
async function applyContentsBack(nodeRefs, input) {
    if (!Array.isArray(nodeRefs) || nodeRefs.length === 0) {
        throw new Error('nodeRefs must be a non-empty array of mj-text node references');
    }

    let newContents = [];

    if (Array.isArray(input)) {
        newContents = input;
    } else if (typeof input === 'string') {
        // parse numbered string of form:
        // 1. content line
        // 2. another content
        // We'll split by newlines and remove leading number + dot + space.
        const lines = input.split(/\r?\n/).filter(Boolean);
        newContents = lines.map(line => {
            // remove leading "N. " or "N) " if present
            return line.replace(/^\s*\d+\s*[.)]\s*/, '');
        });
    } else {
        throw new Error('input must be an array of strings or a numbered string');
    }

    // Basic length-check: if lengths mismatch, we will use min length and warn
    const useCount = Math.min(nodeRefs.length, newContents.length);
    if (nodeRefs.length !== newContents.length) {
        console.warn(`applyContentsBack: nodeRefs.length=${nodeRefs.length}, newContents.length=${newContents.length}. Using ${useCount} items.`);
    }

    for (let i = 0; i < useCount; i++) {
        const node = nodeRefs[i];
        const content = newContents[i];

        // assign back to content prop (you can modify how you want to wrap it)
        // If original content contained HTML wrapper (like <div>...</div>), you may wish to preserve or replace it.
        // Here we replace the whole node.content with the provided string.
        nodeRefs[i].content = content;
    }

    // return count of updated nodes for convenience
    return { updated: useCount, totalNodes: nodeRefs, providedContents: newContents };
}

async function main() {
    const { numberedString, contents, nodeRefs } = await collectMjTextContents(emaiData.children);

    console.log(nodeRefs); // "1. <div>...</div>\n2. <div>...</div>\n..."

    // edit numberedString (or contents array) as required...
    // Example: replace the second content text in the numbered string:
    // const changedNumbered = numberedString.replace(/^2\.\s.*$/m, '2. <div>NEW TEXT</div>');

    // write back
    const result = await applyContentsBack(nodeRefs, numberedString);
    fs.writeFile('updatedData-1.json', JSON.stringify(result.totalNodes, null, 2), (err) => {
        if (err) {
            console.error('Error writing file', err);
        } else {
            console.log('File has been saved as updatedData.json');
        }
    });
    
}
main();