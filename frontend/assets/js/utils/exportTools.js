// frontend/assets/js/utils/exportTools.js
function downloadBlob(filename, blob) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function escHtml(v) {
  return String(v ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function safeCsv(v) {
  const s = String(v ?? "");
  const escaped = s.replaceAll('"', '""');
  return /[",\n]/.test(escaped) ? `"${escaped}"` : escaped;
}

export function exportToCSV(filename, rows, columns) {
  if (!rows || !rows.length) {
    alert("No data to export");
    return;
  }

  const header = columns.map(c => safeCsv(c.label)).join(",");

  const body = rows
    .map(row =>
      columns.map(c => safeCsv(row?.[c.key])).join(",")
    )
    .join("\n");

  const csv = header + "\n" + body;
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });

  downloadBlob(filename, blob);
}

export function exportToPDF(title, rows, columns) {
  if (!rows || !rows.length) {
    alert("No data to export");
    return;
  }

  const generatedOn = new Date().toLocaleString();

  const tableHTML = `
    <h1>${escHtml(title)}</h1>
    <div class="meta">Generated on: ${escHtml(generatedOn)}</div>

    <table>
      <thead>
        <tr>
          ${columns.map(c => `<th>${escHtml(c.label)}</th>`).join("")}
        </tr>
      </thead>
      <tbody>
        ${rows
          .map(
            r => `
          <tr>
            ${columns
              .map(c => `<td>${escHtml(r?.[c.key])}</td>`)
              .join("")}
          </tr>
        `
          )
          .join("")}
      </tbody>
    </table>
  `;

  printHTML(title, tableHTML);
}

function printHTML(title, htmlContent) {
  const w = window.open("", "_blank");
  if (!w) return;

  w.document.open();
  w.document.write(`
    <html>
      <head>
        <title>${escHtml(title)}</title>
        <meta charset="utf-8" />
        <style>
          body {
            font-family: Arial, sans-serif;
            padding: 16px;
            color: #111827;
          }
          h1 {
            font-size: 18px;
            margin-bottom: 6px;
          }
          .meta {
            font-size: 12px;
            color: #6b7280;
            margin-bottom: 12px;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 8px;
          }
          th, td {
            border: 1px solid #e5e7eb;
            padding: 6px 8px;
            font-size: 11px;
            text-align: left;
            white-space: nowrap;
          }
          th {
            background: #f3f4f6;
          }
        </style>
      </head>
      <body>
        ${htmlContent}
      </body>
    </html>
  `);
  w.document.close();
  w.focus();
  w.print();
}

// =====================================
// Profile PDF Export (HTML-based)
// =====================================
export function exportProfileToPDF(title, htmlContent) {
  const w = window.open("", "_blank");
  if (!w) return;

  w.document.open();
  w.document.write(`
    <html>
      <head>
        <title>${escHtml(title)}</title>
        <meta charset="utf-8" />
        <style>
          body {
            font-family: Arial, sans-serif;
            padding: 20px;
            background: #ffffff;
            color: #111827;
          }
          h1 {
            font-size: 20px;
            margin-bottom: 12px;
          }
          h2 {
            font-size: 14px;
            margin-top: 16px;
            margin-bottom: 6px;
          }
          .meta {
            font-size: 12px;
            color: #6b7280;
            margin-bottom: 12px;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 8px;
          }
          th, td {
            border: 1px solid #e5e7eb;
            padding: 6px 8px;
            font-size: 12px;
            text-align: left;
          }
          th {
            background: #f3f4f6;
          }
        </style>
      </head>
      <body>
        ${htmlContent}
      </body>
    </html>
  `);
  w.document.close();
  w.focus();
  w.print();
}
