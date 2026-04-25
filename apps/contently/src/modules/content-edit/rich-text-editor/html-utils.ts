import type { Descendant, Text } from 'slate';
import { Element as SlateElement } from 'slate';

// ─── Serialise Slate nodes → HTML ────────────────────────────────────────────

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function serializeNode(node: Descendant): string {
  if (!SlateElement.isElement(node)) {
    // Text node
    const t = node as Text & { bold?: boolean; italic?: boolean; underline?: boolean };
    let text = escapeHtml(t.text);
    if (t.bold) text = `<strong>${text}</strong>`;
    if (t.italic) text = `<em>${text}</em>`;
    if (t.underline) text = `<u>${text}</u>`;
    return text;
  }

  const children = node.children.map(serializeNode).join('');
   
  switch ((node as any).type) {
    case 'h2':
      return `<h2>${children}</h2>`;
    case 'ul':
      return `<ul>${children}</ul>`;
    case 'ol':
      return `<ol>${children}</ol>`;
    case 'li':
      return `<li>${children}</li>`;
    default:
      return `<p>${children}</p>`;
  }
}

export function serializeToHtml(nodes: Descendant[]): string {
  return nodes.map(serializeNode).join('');
}

// ─── Deserialise HTML → Slate nodes ─────────────────────────────────────────

type SlateText = { text: string; bold?: boolean; italic?: boolean; underline?: boolean };
type SlateNode = SlateText | { type: string; children: (SlateText | SlateNode)[] };

function deserializeEl(
  el: ChildNode,
  marks: { bold?: boolean; italic?: boolean; underline?: boolean } = {},
): SlateNode[] {
  if (el.nodeType === Node.TEXT_NODE) {
    const text = el.textContent ?? '';
    if (!text) return [];
    return [{ text, ...marks }];
  }

  if (el.nodeType !== Node.ELEMENT_NODE) return [];

  const tag = (el as HTMLElement).tagName?.toLowerCase();

  // Mark elements — pass the mark down to children
  if (tag === 'strong' || tag === 'b') {
    return Array.from(el.childNodes).flatMap((c) => deserializeEl(c, { ...marks, bold: true }));
  }
  if (tag === 'em' || tag === 'i') {
    return Array.from(el.childNodes).flatMap((c) => deserializeEl(c, { ...marks, italic: true }));
  }
  if (tag === 'u') {
    return Array.from(el.childNodes).flatMap((c) =>
      deserializeEl(c, { ...marks, underline: true }),
    );
  }

  // Block elements — wrap children in a Slate element
  const children = Array.from(el.childNodes).flatMap((c) => deserializeEl(c, marks)) as (
    | SlateText
    | SlateNode
  )[];

  const safeChildren = children.length > 0 ? children : [{ text: '' }];

  switch (tag) {
    case 'h2':
      return [{ type: 'h2', children: safeChildren }];
    case 'ul':
      return [{ type: 'ul', children: safeChildren }];
    case 'ol':
      return [{ type: 'ol', children: safeChildren }];
    case 'li':
      return [{ type: 'li', children: safeChildren }];
    case 'p':
    case 'div':
      return [{ type: 'p', children: safeChildren }];
    default:
      // Unknown block — treat as paragraph wrapper if it has block children,
      // otherwise return its children inline
      return children.length > 0 ? children : [{ text: '' }];
  }
}

export function deserializeFromHtml(html: string): Descendant[] {
  if (!html) return [{ type: 'p', children: [{ text: '' }] }];
  try {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    const nodes = Array.from(doc.body.childNodes).flatMap((n) => deserializeEl(n)) as Descendant[];

    // Ensure all top-level nodes are block elements
    const blocks = nodes.filter((n) => SlateElement.isElement(n));
    return blocks.length > 0 ? blocks : [{ type: 'p', children: [{ text: '' }] }];
  } catch {
    return [{ type: 'p', children: [{ text: '' }] }];
  }
}
