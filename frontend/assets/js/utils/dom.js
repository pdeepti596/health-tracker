export const $ = (id) => document.getElementById(id);

export function createElement(html) {
  const div = document.createElement("div");
  div.innerHTML = html.trim();
  return div.firstChild; 
}