 function removeHtmlFence(input) {
  if (/^```html/.test(input) && /```$/.test(input.trim())) {
    return input.replace(/^```html\s*|\s*```$/g, '');
  }
  return input; // return as-is if no ```html fences
}
  let t='```html <div><sup>#</sup>Aunque no representa una cura definitiva, un tratamiento continuado y bien gestionado permite mejorar significativamente la calidad de vida de <span style="color:#CF0A2C;">las personas que viven con VIH</span> y ayuda a prevenir la transmisión del virus a <span style="color:#CF0A2C;">otras personas</span>.<sup>@, $,<span style="color:#CF0A2C;">13</span></sup></div>```';
  const tt = removeHtmlFence(t);
  console.log(tt)