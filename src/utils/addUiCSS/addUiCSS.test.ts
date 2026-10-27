import { addUiCSS } from './addUiCSS'

describe('addUiCSS', () => {
  afterEach(() => {
    document.head.querySelectorAll('style[data-rundom-react]').forEach(node => node.remove())
  })

  it('injects a style tag once per component', () => {
    addUiCSS('.a{color:red}', 'test-once')
    addUiCSS('.a{color:blue}', 'test-once')

    const styles = document.head.querySelectorAll('style[data-rundom-react="test-once"]')

    expect(styles).toHaveLength(1)
    expect(styles[0].textContent).toBe('.a{color:red}')
  })

  it('ignores empty css', () => {
    addUiCSS(undefined, 'test-empty')
    addUiCSS('', 'test-empty')

    expect(document.head.querySelector('style[data-rundom-react="test-empty"]')).toBeNull()
  })
})
