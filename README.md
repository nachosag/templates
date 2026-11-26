# templates — configs para copiar y pegar

Acá guardo las configuraciones que dan trabajo escribir y que quiero reutilizar.
No es un paquete ni un setup global: elegís un directorio, copiás sus archivos
al root del proyecto y los adaptás. Cada proyecto queda dueño de su config.

## Camino rápido

1. Elegí un stack en la tabla de abajo.
2. Copiá sus archivos al root del proyecto.
3. Verificá con el comando del stack.

```bash
# lint + format con oxc
cp ~/dev/templates/oxlint-oxfmt/.oxlintrc.json ~/dev/templates/oxlint-oxfmt/.oxfmtrc.json .
oxlint . && oxfmt --check .

# TypeScript estricto: base + el preset del runtime
cp ~/dev/templates/tsconfig/base.json ~/dev/templates/tsconfig/node.json .
tsc --noEmit
```

En vez de `node.json` usá `bundler.json` (frontend) o `bun.json` según el
runtime.

## Stacks

| Directorio         | Archivos                          | Para qué                                      | Dependencias                                                           | Verificación                     |
| ------------------ | --------------------------------- | --------------------------------------------- | ---------------------------------------------------------------------- | -------------------------------- |
| `oxlint-oxfmt/`    | `.oxlintrc.json`, `.oxfmtrc.json` | Lint y format de JS/TS/JSX/TSX, HTML, CSS, MD | `oxlint`, `oxfmt` (globales con mise o locales)                        | `oxlint . && oxfmt --check .`    |
| `eslint-prettier/` | `eslint.config.js`, `.prettierrc` | Alternativa clásica a oxc                     | `eslint`, `@eslint/js`, `typescript-eslint`, `prettier` en el proyecto | `eslint . && prettier --check .` |
| `tsconfig/`        | `base.json` + 3 presets           | Base strict y preset por runtime              | `typescript`                                                           | `tsc --noEmit`                   |

Los presets de `tsconfig/` hacen `extends: "./base.json"`, así que **siempre**
se copia `base.json` al lado del preset elegido.

- `node.json` — NodeNext, solo `ES2022`, tipos de Node.
- `bundler.json` — ESNext + DOM, `noEmit`, para frontend con bundler.
- `bun.json` — Preserve + ESNext, tipos de Bun, `noEmit`.

## Reglas

| Regla                         | Por qué                                                                                                                                                |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Copiar, nunca symlinkear      | Las herramientas buscan config subiendo desde el archivo. Un symlink en `$HOME` solo alcanza archivos bajo `$HOME` y se rompe si se mueve el template. |
| Un config por proyecto        | Así el proyecto viaja a otra máquina con su estilo intacto.                                                                                            |
| Los `$schema` son opcionales  | Apuntan a `./node_modules/...`; si no están, el formateo igual funciona.                                                                               |
| Solo configs, sin manifiestos | Acá no van `package.json`, lockfiles ni `node_modules/`.                                                                                               |
