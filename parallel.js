const mjBlockdata = require("./updatedData.json");
const fs = require("fs");
async function replaceMultiplePatternsParallel(data, patterns) {
    console.time("style");
    console.info("Content styling is started");

    const CONCURRENCY = 8;

    const nodesToProcess = [];

    function collect(nodes) {
        if (!Array.isArray(nodes)) return;
        for (const node of nodes) {
            if (node.block_type !== 'Footnotes' && node.content && typeof node.content === 'string') {
                if (node.tagName !== "mj-button") {
                    const isBackgroundHighlight = node.attributes?.color === "#edebe3"
                        && node.attributes?.['container-background-color'] === "#CF0A2C";
                    nodesToProcess.push({ node, isBackgroundHighlight });
                }
            }
            if (node.children && Array.isArray(node.children)) collect(node.children);
        }
    }

    collect(data);

    // worker pool
    let idx = 0;
    const results = [];

    async function worker() {
        while (true) {
            const currentIndex = idx++;
            if (currentIndex >= nodesToProcess.length) break;
            const { node, isBackgroundHighlight } = nodesToProcess[currentIndex];
            try {
                // const text = await getStyledContent(node.content, {}, isBackgroundHighlight);
                await new Promise(res => setTimeout(res, 20000));
                // node.content = text;

            } catch (err) {
                console.error(`Error processing node ${currentIndex}:`, err);
            }
        }
    }

    // spawn N workers
    const workers = Array.from({ length: Math.min(CONCURRENCY, nodesToProcess.length) }, () => worker());
    await Promise.allSettled(workers);

    console.info("Content styling is completed");
     console.timeEnd("style");
    return data;
}


async function replaceMultiplePatterns(data, patterns) {
    console.time("style");
    console.info("Content styling is strted")
    async function recurse(nodes) {
        if (!Array.isArray(nodes)) return;

        for (const node of nodes) {
            if (node.block_type !== 'Footnotes' && node.content && typeof node.content === 'string') {
                if (node.tagName !== "mj-button") {
                    let isBackgroundHighlight = node.attributes.color === "#edebe3" && node.attributes['container-background-color'] === "#CF0A2C";
                    // const text = await getStyledContent(node.content, {}, isBackgroundHighlight);
                    // node.content = text;
                    await new Promise(res => setTimeout(res, 10000));
                }
            }

            if (node.children && Array.isArray(node.children)) {
                await recurse(node.children);
            }
        }
    }


    await recurse(data);
    console.info("Content styling is completed");
     console.timeEnd("style");
    return data;
}

async function replaceMultipleBatchs(data, patterns) {
   console.time("style");
    console.info("Content styling started");

    const nodesToProcess = [];

    function collectNodes(nodes) {
        if (!Array.isArray(nodes)) return;
        for (const node of nodes) {
            if (node.block_type !== 'Footnotes' &&
                typeof node.content === 'string' &&
                node.tagName !== "mj-button") 
            {
                nodesToProcess.push(node);
            }
            if (node.children) collectNodes(node.children);
        }
    }

    collectNodes(data);

    const BATCH_SIZE = 10;

    for (let i = 0; i < nodesToProcess.length; i += BATCH_SIZE) {
        const batch = nodesToProcess.slice(i, i + BATCH_SIZE);

        const texts = batch.map(n => n.content);

        // Call LLM ONCE per batch
        const styledTexts = await getStyledContent(texts, patterns);

        // styledTexts should be an array, same length as texts
        styledTexts.forEach((styled, idx) => {
            batch[idx].content = styled;
        });
    }

    console.info("Content styling completed");
    console.timeEnd("style");
    return data;
}


// replaceMultiplePatterns(mjBlockdata);
// replaceMultiplePatternsParallel(mjBlockdata);

async function main(){
const res =await  replaceMultipleBatchs(mjBlockdata);
fs.writeFile('updatedDataBatch.json', JSON.stringify(res, null, 2), (err) => {
    if (err) {
        console.error('Error writing file', err);
    } else {
        console.log('File has been saved as updatedData.json');
    }
});
}
main().then();
