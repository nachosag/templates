# templates/python

Copy-paste toolchains for Python. Nothing toolchain-related lives in
the global `~/.config/zed/settings.json` — each project declares its own.

| Stack | Linter + formatter | Types |
|---|---|---|
| `ruff-basedpyright/` | ruff (built into Zed, config in `pyproject.toml`) | basedpyright strict (built into Zed) |

## Use

```bash
# 1. Copy the stack into the new project (never .venv)
cp -r templates/python/ruff-basedpyright/. my-project/
rm -rf my-project/.venv
cd my-project

# 2. Install (creates .venv, required by Zed's toolchain detection)
uv sync --group dev

# 3. Open and verify
zed .
uv run ruff check . && uv run ruff format --check . && uv run basedpyright && uv run pytest
```

Then rename `name` in `pyproject.toml`.

## Notes

- Ruff and basedpyright are built into Zed (like eslint/prettier for JS):
  no extension needed. `.zed/settings.json` pins both per project and
  sets format-on-save (organize imports via ruff, then ruff formatter).
- `pyrightconfig.json` sets `strict` mode plus `extraPaths: ["src"]`
  so the `src/` layout resolves in the editor.
- No `tasks.json`: everything runs in the terminal via `uv run`.
- `src/greet.py` + `tests/test_greet.py` are placeholders so the loop
  is green out of the box. Delete them once the real code exists.

## Adding a second flavor later

Copy `ruff-basedpyright/` to the new flavor name and flip these three
switches in the new `.zed/settings.json` — this is the whole "turn off"
recipe, nothing else remembers anything:

1. `language_servers`: add `"!basedpyright"` and `"!ruff"`, keep `"..."`
   so the new servers can register.
2. `formatter`: point it at the new tool (external command or other
   language server).
3. `code_actions_on_format`: remove `source.organizeImports.ruff` (or point
   it at the new tool).

Then swap the project files: `pyproject.toml` (`[tool.ruff]` out, new
tool config in), `pyrightconfig.json` out if the new stack brings its own
type checker, dev-group deps via `uv add --dev`, `uv lock`.
