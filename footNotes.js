// function formatFootnotes(content) {

//     let updated = content.replace(
//         /^<div[^>]*>/i,
//         "<div style='color:#707070'>"
//     );

//     return updated;
// }

// console.log(formatFootnotes("<div><b>Footnotes: </b><sup>§</sup>A retrospective analysis evaluated treatment adherence and its effect on virologic</div>"));
function formatFootnotes(content) {
    return content.replace(
        /^<div[^>]*>/i,
        "<div style='color:#707070'>"
    );
}

function updateFootnotes(data) {
    function checkEchNodeFn(node) {
        if (!node) return;
        if (node.content && typeof node.content === "string") {
            node.content = formatFootnotes(node.content);
        }
        if (Array.isArray(node.children)) {
            node.children.forEach(child => checkEchNodeFn(child));
        }
    }
    if (Array.isArray(data)) {
        data.forEach(item => checkEchNodeFn(item));
    } else {
        checkEchNodeFn(data);
    }

    return data;
}
console.log(JSON.stringify(updateFootnotes([
  {
    "file": ".",
    "absoluteFilePath": ".",
    "line": 118,
    "includedIn": [],
    "tagName": "mj-section",
    "attributes": {
      "padding-bottom": "5px",
      "padding-left": "0px",
      "padding-right": "0px",
      "padding-top": "5px",
      "sectionName": "Footnotes"
    },
    "children": [
      {
        "file": ".",
        "absoluteFilePath": ".",
        "line": 119,
        "includedIn": [],
        "tagName": "mj-column",
        "attributes": {
          "width": "100%"
        },
        "children": [
          {
            "icon": "short_text",
            "name": "builder.text",
            "tagName": "mj-text",
            "content": "<div><b> </b><sup>*</sup>Pediatric patients weighing at least 14 kg, with no prior antiretroviral treatment history.\nBiktarvy combines an integrase strand transfer inhibitor (bictegravir) with two nucleoside reverse transcriptase inhibitors (emtricitabine and tenofovir alafenamide) in a fixed-dose tablet.\nClinical trials have demonstrated that Biktarvy achieves and maintains virologic suppression comparable to leading regimens, with a favorable safety and tolerability profile.\nCommon adverse reactions include diarrhea, nausea, and headache.; <sup>†</sup>Aligning with global HIV care guidelines for durable viral suppression and improved quality of life.\nBefore initiation, assess renal function and HBV status. Biktarvy has no food requirements.\nSafety profile make it a preferred option for both treatment-naïve patients and those seeking regimen simplification.\nBiktarvy combines an integrase strand transfer inhibitor (bictegravir) with two nucleoside reverse transcriptase inhibitors (emtricitabine and tenofovir alafenamide) in a fixed-dose tablet.; <sup>¶</sup>This is our global website, intended for visitors seeking information on Gilead’s worldwide business. Some content on this site is not intended for people outside the United States. Visit our Global Operations page for links to our international corporate websites.; <sup>§</sup>Biktarvy should not be used if you are hypersensitive to its components or with certain medications like dofetilide, rifampin, or St. John's wort due to potential interactions.; <sup>*</sup>*Emtricitabine 200 mg/tenofovir alafenamide 25 mg.; <sup>†</sup>In adults over the age of 18.; <sup>†</sup>Virology, Oncology and Inflammation.; <sup>¶</sup>1. It combines three powerful antiretroviral agents in one small tablet: bictegravir, an integrase strand transfer inhibitor, plus two nucleoside reverse transcriptase inhibitors, emtricitabine and tenofovir alafenamide.\n\n2. Together, they block HIV replication at multiple stages, helping reduce the amount of virus in the body.\n\n3.Biktarvy is not for pre-exposure prophylaxis (PrEP). Always consult your healthcare provider before starting, stopping, or changing HIV treatment.; <sup>#</sup>A retrospective analysis evaluated treatment adherence and its effect on virologic outcomes in double-blind, placebo-controlled clinical studies in treatment-naïve (1489, 1490, 4458) or virologically suppressed (1844 and 4030) participants. Participants with ≥1 returned pill bottle and ≥1 on-treatment HIV-1 RNA measurement were included in the analysis. Adherence was measured by the number of pills taken divided by the number of pills prescribed. Assessment was limited to returned pill bottles.; <sup>@</sup>At Week 48 in pooled data from treatment-naïve participants: efficacy was 91% for BIKTARVY® (pooled [n=634]) vs 93% (ABC/3TC/DTG [n=315]) in Study 1489 (95% CI: -2.1 [-5.9 to 1.6]) and 93% (FTC/TAF + DTG [n=325]) in Study 1490 (95% CI: -1.9 [-5.6 to 1.8])=634]) vs 93% (ABC/3TC/DTG [n=315]).; <sup>*</sup>At Week 48 in pooled data from treatment-naïve participants: efficacy was 91% for BIKTARVY® (pooled [n=634]) vs 93% (ABC/3TC/DTG [n=315]) in Study 1489 (95% CI: -2.1 [-5.9 to 1.6]) and 93% (FTC/TAF + DTG [n=325]) in Study 1490 (95% CI: -1.9 [-5.6 to 1.8]).; <sup>†</sup>DTG + 2 NRTI regimens included: Study 1489, ABC/3TC/DTG (n=314) and Study 1490, DTG + FTC/TAF (n=323).; <sup>€</sup>Efficacy defined as HIV-1 RNA <50 copies/mL.; <sup>*</sup>BIKTARVY incluye BIC todos los FTC participantes que tomaron al menos unas dosis de.</div>",
            "block_type": "Footnotes",
            "attributes": {
              "font-size": "12px",
              "line-height": "17px",
              "padding-bottom": "5px",
              "padding-top": "5px",
              "padding-right": "25px",
              "padding-left": "25px",
              "block_type": "Footnotes",
              "approved": true,
              "approvedContentId": "approved_ref"
            }
          }
        ],
        "id": "hta"
      }
    ],
    "id": "aih"
  }
]),null,2));

