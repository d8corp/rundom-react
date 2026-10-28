import { useStyles } from './useStyles'

const styles = {
  root: 'theme-root',
  primary: 'theme-primary',
}

describe('useStyles', () => {
  it('merges a class value into root', () => {
    expect(useStyles(styles, 'user')).toEqual({
      root: 'theme-root user',
      primary: 'theme-primary',
    })
  })

  it('merges keyed class values per style key', () => {
    expect(useStyles(styles, { root: 'user', primary: ['extra', false] })).toEqual({
      root: 'theme-root user',
      primary: 'theme-primary extra',
    })
  })

  it('ignores falsy values in arrays', () => {
    expect(useStyles(styles, ['user', false, undefined])).toEqual({
      root: 'theme-root user',
      primary: 'theme-primary',
    })
  })
})
