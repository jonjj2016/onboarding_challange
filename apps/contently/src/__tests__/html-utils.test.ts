import {
  serializeToHtml,
  deserializeFromHtml,
} from '../modules/content-edit/rich-text-editor/html-utils';
import type { Descendant } from 'slate';

describe('serializeToHtml', () => {
  it('serializes a paragraph', () => {
    const nodes: Descendant[] = [{ type: 'p', children: [{ text: 'Hello world' }] }];
    expect(serializeToHtml(nodes)).toBe('<p>Hello world</p>');
  });

  it('serializes bold text', () => {
    const nodes: Descendant[] = [{ type: 'p', children: [{ text: 'Bold', bold: true }] }];
    expect(serializeToHtml(nodes)).toBe('<p><strong>Bold</strong></p>');
  });

  it('serializes a heading', () => {
    const nodes: Descendant[] = [{ type: 'h2', children: [{ text: 'Heading' }] }];
    expect(serializeToHtml(nodes)).toBe('<h2>Heading</h2>');
  });

  it('escapes HTML entities', () => {
    const nodes: Descendant[] = [
      { type: 'p', children: [{ text: '<script>alert("xss")</script>' }] },
    ];
    const html = serializeToHtml(nodes);
    expect(html).not.toContain('<script>');
    expect(html).toContain('&lt;script&gt;');
  });
});

describe('deserializeFromHtml', () => {
  it('returns empty paragraph for empty string', () => {
    const nodes = deserializeFromHtml('');
    expect(nodes).toEqual([{ type: 'p', children: [{ text: '' }] }]);
  });

  it('deserializes a paragraph', () => {
    const nodes = deserializeFromHtml('<p>Hello world</p>');
    expect(nodes).toEqual([{ type: 'p', children: [{ text: 'Hello world' }] }]);
  });

  it('deserializes bold text', () => {
    const nodes = deserializeFromHtml('<p><strong>Bold</strong></p>');
    expect(nodes).toEqual([{ type: 'p', children: [{ text: 'Bold', bold: true }] }]);
  });

  it('round-trips through serialize → deserialize', () => {
    const original: Descendant[] = [
      { type: 'h2', children: [{ text: 'Title' }] },
      { type: 'p', children: [{ text: 'Normal ' }, { text: 'bold', bold: true }] },
    ];
    const html = serializeToHtml(original);
    const restored = deserializeFromHtml(html);
    expect(serializeToHtml(restored)).toBe(html);
  });
});
