const Bottleneck = require("bottleneck");

// Global limiter — controls ALL LLM calls
const limiter = new Bottleneck({
  maxConcurrent: 2,  
  minTime: 250  
});

async function replaceMultiplePatterns(data, patterns) {
  console.info("Content styling is started");

  async function recurse(nodes) {
    if (!Array.isArray(nodes)) return;

    for (const node of nodes) {
      console.log("--", node.block_type + "\n");

      if (
        node.block_type !== "Footnotes" &&
        node.content &&
        typeof node.content === "string" &&
        node.tagName !== "mj-button"
      ) {
        const attrs = node.attributes || {};
        const isBackgroundHighlight =
          attrs.color === "#edebe3" &&
          attrs["container-background-color"] === "#CF0A2C";

        try {
          // Very important: LLM call is rate-limited here
          const text = await limiter.schedule(() =>
            getStyledContent(node.content, {}, isBackgroundHighlight)
          );

          node.content = text;
          console.info("Styled content updated\n");
        } catch (err) {
          console.error("LLM call failed:", err);
        }
      }

      if (node.children && Array.isArray(node.children)) {
        await recurse(node.children);
      }
    }
  }

  await recurse(data);
  console.info("Content styling is completed");
  return data;
}

module.exports = replaceMultiplePatterns;
