const markdownInput = document.querySelector("#markdown-input");
const rawHTMLOutput = document.querySelector("#html-output");
const htmlPreview = document.querySelector("#preview");
// console.log(markdownInput, htmlOutput)



function convertMarkdown() {
  const input = markdownInput.value;
  let html = input;
  html = html
    .replace(/^#(?!#)\s+(.*)/gm, "<h1>$1</h1>")
    .replace(/^##\s+(.*)/gm, "<h2>$1</h2>")
    .replace(/^###\s+(.*)/gm, "<h3>$1</h3>")
    .replace(/\*\*(.+?)\*\*/gm, "<strong>$1</strong>")
    .replace(/__(.+?)__/gm, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/gm, "<em>$1</em>")
    .replace(/_(.+?)_/gm, "<em>$1</em>")
    .replace(/!\[(.+?)\]\((.+?)\)/gm, `<img alt="$1" src="$2">`)
    .replace(/\[(.+?)\]\((.+?)\)/gm, `<a href="$2">$1</a>`)
    .replace(/^>\s+(.*)/gm, "<blockquote>$1</blockquote>")
  rawHTMLOutput.textContent = html;
  htmlPreview.innerHTML = html;
  return html;
}

markdownInput.addEventListener("input", convertMarkdown);
