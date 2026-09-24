import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import React from "react"
import { renderToString } from "react-dom/server"
import { createServer } from "vite"

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const indexPath = path.join(root, "dist", "index.html")

if (!fs.existsSync(indexPath)) {
  console.error("dist/index.html not found - run `vite build` first")
  process.exit(1)
}

const vite = await createServer({
  root,
  logLevel: "warn",
  server: { middlewareMode: true },
  appType: "custom",
})

try {
  const { default: App } = await vite.ssrLoadModule("/src/App.tsx")
  const html = renderToString(React.createElement(App))
  const template = fs.readFileSync(indexPath, "utf8")
  const hydrated = template.replace(
    /<div id="root"><\/div>/,
    `<div id="root">${html}</div>`,
  )
  fs.writeFileSync(indexPath, hydrated)
  console.log(`Prerendered ${(html.length / 1024).toFixed(1)} kB of markup`)
} catch (error) {
  console.error(error)
  process.exitCode = 1
} finally {
  await vite.close()
}