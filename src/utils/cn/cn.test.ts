import { cn } from './cn'

describe('cn', () => {
  it('joins strings and ignores falsy values', () => {
    expect(cn('a', false, undefined, null, 'b')).toBe('a b')
  })

  it('flattens arrays', () => {
    expect(cn(['a', ['b', false, ['c']]])).toBe('a b c')
  })

  it('supports class objects', () => {
    expect(cn({ a: true, b: false, c: 'd' })).toBe('a d')
  })

  it('removes duplicates while preserving order', () => {
    expect(cn('a', 'b', 'a')).toBe('a b')
  })

  it('returns an empty string without arguments', () => {
    expect(cn()).toBe('')
  })
})
