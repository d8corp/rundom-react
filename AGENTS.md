# AGENTS.md

`rundom-react` is the React port of [Rundom UI](https://github.com/d8corp/rune-hub-dom): a theme-driven UI component library built with React 19, TypeScript and InnetJS. The [original implementation](https://github.com/d8corp/rune-hub-dom) is the reference for behaviour, markup and theme class names.

## Rules

- Components are plain React function components. No custom runtime, no signals, no `ObservableProp` functions — props are static values.
- Public props use standard React names (`onClick`, `className`, `style`). The rundom-style `class` prop is also accepted everywhere via `StyledProps`.
- Every component folder is `src/ui/<layer>/<Name>/` with `<Name>.tsx` and `index.ts` (`export * from './Name'`).
- Theme CSS comes exclusively from `theme.scss` compiled into `.env.theme`. Components read class names from `import.meta.env.RD_THEME_*` and inject their CSS once with `addUiCSS`.
- Do not add component `.scss` files to the library. Use the existing theme classes.
- Merge theme classes with user classes with `useStyles(styles, class ?? className)` and `classes(...)` from `html-classes`.
- No unnecessary comments. Public APIs may have short JSDoc.
- Keep imports sorted (simple-import-sort rules are enforced).

## Core conventions

```tsx
import { classes } from 'html-classes'

import { useStyles } from '../../../hooks'
import { addUiCSS } from '../../../utils'

if (import.meta.env?.RD_THEME_BOX) {
  addUiCSS(import.meta.env.RD_THEME_BOX, 'box')
}

export const boxStyles = {
  root: import.meta.env?.RD_THEME_BOX__ROOT,
  primary: import.meta.env?.RD_THEME_BOX__PRIMARY,
}

export function Box ({ ... }) {
  const styles = useStyles(boxStyles, classProp ?? className)
  const root = classes([styles.root, styles[color], styles[view]])

  return <Flex {...props} className={root} />
}
```

- `useStyles(styles, className)` returns a copy of `styles` with `root` merged with the user class.
- `classes` accepts strings, arrays and truthy-key objects; class args also accept functions.
- Env key mapping: `.box_square-left` → `RD_THEME_BOX__SQUARE_LEFT`; `.window-header` → `RD_THEME_WINDOW_HEADER`.
- Theme helpers: `addUiCSS(css, name)`, `viewTransition(fn)`, `message(text, props)`.

## Layers

- `src/ui/primitive` — Flex, Box, Link, Spin
- `src/ui/layout` — Card, Scrollbar
- `src/ui/block` — Button, Field
- `src/ui/inline` — Code, Divider
- `src/ui/interaction` — Input, CheckBox, RadioBox
- `src/ui/typography` — Text, Typography, Markdown
- `src/ui/popup` — Message, Window, WindowHeader, WindowContent
- `src/ui/icons` — BaseIcon + icon set
- `src/helpers/message` — imperative `message()` helper
- `src/bin/theme.ts` — CLI that compiles `theme.scss` into `.env.theme`
- `src/docs` — InnetJS documentation site (React, custom History API router)

## Commands

- `npm run build:theme` — regenerate `.env.theme` from `theme.scss`
- `npm run dev` — build theme + start the docs site
- `npm start` — start the docs site
- `npm run build` — build the library into `release/` (artifact, not committed)
- `npm run build:docs` — build docs into `docs/` (artifact, not committed)
- `npm test` — Jest + Testing Library
- `npm run lint`

Never commit `release/`, `docs/`, `coverage/`, `bin/`, `node_modules/`.
