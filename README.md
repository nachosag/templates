# templates

Copy-paste toolchains per language. The global `~/.config/zed/settings.json`
holds editor taste only — every project declares its own toolchain in
`.zed/settings.json` plus the tool's own config files.

## The one rule (all languages)

Zed ships defaults per language. Using anything else in a project means
two moves in that project's `.zed/settings.json`, nothing global:

1. **Turn off** what you don't use: `"language_servers"` entries prefixed
   with `"!"`, plus the bundled formatter flag when one exists.
2. **Turn on** what you use: `formatter` (external command or language
   server name) and the matching `code_actions_on_format`.

```json
{
  "languages": {
    "SomeLanguage": {
      "format_on_save": "on",
      "formatter": { "external": { "command": "my-tool", "arguments": [] } },
      "language_servers": ["!default-server", "..."]
    }
  }
}
```

`"..."` keeps every other registered server (types, idle helpers). Omit a
`"!"` only for servers you genuinely want running in that project.

## Zed defaults and their off-switches (verified)

| Language | Default | Off-switch |
| --- | --- | --- |
| TypeScript / JavaScript / TSX | vtsls, typescript-language-server, eslint, prettier, tailwind (idle) | `"!eslint"`, `"!typescript-language-server"`, `"prettier": { "allowed": false }` |
| Python | basedpyright, ruff | `"!basedpyright"`, `"!ruff"` |

Extension-provided servers (e.g. `oxc`'s `oxlint`/`oxfmt`) are global once
installed — deny them per project the same way (`"!oxlint"`, `"!oxfmt"`)
in stacks that don't use them.

## Layout

```text
templates/<language>/<stack>/
```

Each stack copies standalone: `.zed/settings.json`, tool configs,
manifest (`package.json` / `pyproject.toml`), lockfile, `.gitignore`,
and a placeholder so checks pass out of the box. Never copy
`node_modules/` or `.venv/`. See each language's README for exact steps.
