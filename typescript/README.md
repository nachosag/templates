# templates/typescript

Two copy-paste toolchains for TypeScript. Nothing toolchain-related lives in
the global `~/.config/zed/settings.json` — each project declares its own.

| Stack | Linter | Formatter |
| --- | --- | --- |
| `oxlint-oxfmt/` | oxlint | oxfmt |
| `eslint-prettier/` | eslint | prettier |

Both share: strict `tsconfig.json`, `printWidth: 80`, pnpm-only scripts.

## Use

```bash
# 1. Copy one stack into the new project (example, never node_modules)
cp -r templates/typescript/oxlint-oxfmt/. my-project/
rm -rf my-project/node_modules
cd my-project

# 2. Install (creates node_modules/.bin, required by .zed/settings.json)
pnpm install

# 3. Open and verify
zed .
pnpm typecheck && pnpm lint && pnpm fmt:check && pnpm test
```

Then rename `"name"` in `package.json`.

## Switch stacks later

```bash
# From the project root, overwrite the project config with the other stack
cp templates/typescript/eslint-prettier/.zed/settings.json .zed/settings.json
cp templates/typescript/eslint-prettier/eslint.config.js .
cp templates/typescript/eslint-prettier/.prettierrc .
# remove oxc configs, update devDependencies, pnpm install
```

`oxfmt --migrate prettier` can help convert formatter settings.

## Notes

- The `.zed/settings.json` formatter runs the **local** binary via
  `pnpm exec`, so it works without global installs or Zed extensions.
- No `tasks.json`: lint/typecheck/test run in the terminal on demand.
- Each stack pins its language servers per project, so a globally
  installed extension never leaks into the other stack:
  the ox stack disables the built-in `eslint` (`"!eslint"`) and the
  bundled prettier (`"prettier": { "allowed": false }`);
  the eslint-prettier stack disables `oxlint`/`oxfmt` (`"!oxlint"`,
  `"!oxfmt"`). `"..."` keeps everything else (vtsls, tailwind when idle).
- The built-in `eslint` and `tailwindcss` language servers idle until a
  project brings its own config; no extension needed for either.
- `src/index.ts` is a placeholder so `tsc --noEmit` has input. Delete it
  once the real code (and tests) exist.
