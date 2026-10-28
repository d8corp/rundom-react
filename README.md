# Rundom React

React port of [Rundom UI](https://github.com/d8corp/rune-hub-dom) — a theme-aware component
library built with React 19, TypeScript and InnetJS.

The library has no custom runtime: every component is a plain function component with regular
React props. Styles come from a single SCSS theme that is compiled into per-component CSS
chunks and environment variables.

## Install

```shell
npm install rundom-react react react-dom
```

React 18.2 or newer is required as a peer dependency.

## Usage

```tsx
import { Button, Flex, Input, Text } from 'rundom-react'

export function App () {
  return (
    <Flex vertical gap={12} padding={24}>
      <Text weight='bold'>Welcome to Rundom React</Text>
      <Input placeholder='What are we building?' clearable />
      <Flex gap={8}>
        <Button>Cancel</Button>
        <Button color='accent'>Create</Button>
      </Flex>
    </Flex>
  )
}
```

All components accept `class` and `className`. Both support strings, arrays and class objects:

```tsx
<Box className={{ active: true, muted: false }} />
```

Async button handlers show a loading state automatically:

```tsx
<Button onClick={async () => {
  await save()
}}>
  Save
</Button>
```

## Theme

Components read class names from `import.meta.env.RD_THEME_*` and inject their CSS once on
first render. Generate the variables from `theme.scss`:

```shell
npx rundom-react-theme -i theme.scss -o .env.theme
```

Options:

| Option | Default | Description |
| --- | --- | --- |
| `-i, --input <file>` | `theme.scss` | Source SCSS file |
| `-o, --output <file>` | `.env.theme` | Output env file |
| `-p, --prefix <prefix>` | `rd_` | Class name prefix |
| `--no-minify` | minified | Keep generated CSS readable |
| `-e, --error` | off | Print full error details |

Expose the generated file to your bundler. With InnetJS/Vite:

```shell
# .env
INNETJS_ENV_PREFIX=RD_
RD_THEME__PREFIX=rd_
__ENV_EXTENDS=.env.theme
```

SCSS selectors are mapped to env keys:

| SCSS | Env |
| --- | --- |
| `.button` | `RD_THEME_BUTTON__ROOT` |
| `.button_primary` | `RD_THEME_BUTTON__PRIMARY` |
| `.button_square-left` | `RD_THEME_BUTTON__SQUARE_LEFT` |
| all `.button*` rules | `RD_THEME_BUTTON` |
| global rules | `RD_THEME__ROOT` |

## Components

| Layer | Components |
| --- | --- |
| Primitive | `Flex`, `Box`, `Link`, `Spin` |
| Layout | `Card`, `Scrollbar` |
| Block | `Button`, `Field` |
| Inline | `Code`, `Divider` |
| Interaction | `Input`, `CheckBox`, `RadioBox` |
| Typography | `Typography`, `Text`, `Markdown` |
| Popup | `Message`, `Window`, `WindowHeader`, `WindowContent` |
| Icons | `BaseIcon`, `SearchIcon`, `CheckIcon`, `CloseIcon`, `MoonIcon`, `SunIcon`, and more |
| Helpers | `message`, `addUiCSS`, `viewTransition`, `useStyles` |

## Docs

```shell
npm run dev        # build the theme and start the docs site
npm start          # start the docs site
npm run build:docs # build the docs into docs/
```

The docs site covers quick start, theme CLI and every component with live examples.

## Development

```shell
npm run build:theme  # regenerate .env.theme from theme.scss
npm run build        # build the library into release/
npm test             # Jest + Testing Library
npm run test:coverage
npm run lint
npm run lint:fix
```

Generated folders (`release/`, `docs/`, `coverage/`, `bin/`, `node_modules/`) are not tracked.

## License

MIT
