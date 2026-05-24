
export function buildPreviewDocument(htmlFragment: string) {
    const content = htmlFragment.trim().length > 0
        ? htmlFragment
        : `<main class="placeholder">Preview appears while typing...</main>`;

    return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
      body {
        margin: 0;
        min-height: 100vh;
        display: grid;
        place-items: center;
        padding: 16px;
        box-sizing: border-box;
        font-family: "Segoe UI", Tahoma, sans-serif;
        color: #eef7ff;
        background: radial-gradient(circle at 20% 15%, rgba(54, 228, 255, 0.2), transparent 52%), #09101a;
      }
      .placeholder {
        border: 1px dashed rgba(192, 239, 255, 0.45);
        border-radius: 10px;
        color: rgba(238, 247, 255, 0.7);
        padding: 14px;
      }
      .demo-card {
        background: rgba(8, 20, 34, 0.9);
        border: 1px solid rgba(54, 228, 255, 0.35);
        border-radius: 12px;
        display: grid;
        gap: 10px;
        max-width: 280px;
        padding: 18px;
      }
      .demo-card h2,
      .demo-card p {
        margin: 0;
      }
      .demo-card button {
        background: linear-gradient(90deg, #36e4ff, #8bff9c);
        border: 0;
        border-radius: 8px;
        color: #061018;
        font-weight: 700;
        padding: 10px 12px;
      }
      .demo-grid {
        display: grid;
        gap: 10px;
        grid-template-columns: repeat(3, minmax(80px, 1fr));
        width: min(360px, 100%);
      }
      .demo-grid article {
        background: rgba(8, 20, 34, 0.9);
        border: 1px solid rgba(192, 239, 255, 0.2);
        border-radius: 10px;
        padding: 12px;
      }
      .demo-grid h3,
      .demo-grid p {
        margin: 0;
      }
    </style>
  </head>
  <body>${content}</body>
</html>`;
}