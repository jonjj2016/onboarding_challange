import { slugify } from '../utils/slugify';

describe('slugify', () => {
  it('lowercases and hyphenates words', () => {
    expect(slugify('Hello World')).toBe('hello-world');
  });

  it('removes special characters', () => {
    expect(slugify('The Ultimate Guide to Sourdough Bread!')).toBe(
      'the-ultimate-guide-to-sourdough-bread',
    );
  });

  it('collapses multiple spaces into one hyphen', () => {
    expect(slugify('foo   bar')).toBe('foo-bar');
  });

  it('strips leading and trailing hyphens', () => {
    expect(slugify('  hello  ')).toBe('hello');
  });

  it('returns empty string for empty input', () => {
    expect(slugify('')).toBe('');
  });
});
