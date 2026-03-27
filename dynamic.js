const data = require("./prompt.json");
function buildComponentReplacementsBlock(components) {
  return components.map(item => {
    const phraseEscapedForDisplay = item.phrase.replace(/'/g, "\\'");
    const shownWrap = (item.wrap || '').replace(/\$&/g, item.phrase);
    return `- "${phraseEscapedForDisplay}" → ${shownWrap}`;
  }).join('\n');
}

// console.log(buildComponentReplacementsBlock(data.componentReplacements));

function getFactualAndScientificClaim(data) {
  const phrases = data || [];
  // Join all items as quoted strings separated by commas
  const joined = phrases.map(p => `"${p}"`).join(', ');
  return `- Examples of items to bold: ${joined}.`;
}
// console.log(getFactualAndScientificClaim(data.factualScientificClaims));

function clinicalAndScientificDataHiglight(data) {
  const groups = data || [];
  const lines = groups.map(group => `- ${group.join(', ')}`);
  return lines.join('\n');
}
// console.log(clinicalAndScientificDataHiglight(data.clinicalScientificDataHighlight))


function nameEntitiesHighlight(data) {
  const categories = data || {};
  const lines = Object.entries(categories).map(([key, values]) => {
    return `- ${key}: ${values.join(', ')}`;
  });

  return lines.join('\n');
}
//Rules 
function rulesAndUsecaseFormat(arr) {
  return arr.map(item => `• ${item}`).join('  \n');
}

console.log(nameEntitiesHighlight(data.nameEntitiesHighlights))
