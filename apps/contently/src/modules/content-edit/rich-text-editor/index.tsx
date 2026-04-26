import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import styled from '@emotion/styled';
import { Box, FormHelperText } from '@mui/material';
import {
  createEditor,
  Transforms,
  Editor,
  Element as SlateElement,
  type Descendant,
  type BaseEditor,
} from 'slate';
import { Slate, Editable, withReact, type ReactEditor } from 'slate-react';
import { withHistory, type HistoryEditor } from 'slate-history';
import { deserializeFromHtml, serializeToHtml } from './html-utils';
import { EditorToolbar } from './toolbar';

type CustomText = { text: string; bold?: boolean; italic?: boolean; underline?: boolean };
type BlockType = 'p' | 'h2' | 'ul' | 'ol' | 'li';
type CustomElement = { type: BlockType; children: Descendant[] };

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor & HistoryEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}

export const SlateEditorContext = createContext<(BaseEditor & ReactEditor & HistoryEditor) | null>(
  null,
);

export function useSlateEditor() {
  const editor = useContext(SlateEditorContext);
  if (!editor) throw new Error('Must be inside RichTextEditor');
  return editor;
}

export function isMarkActive(
  editor: BaseEditor & ReactEditor & HistoryEditor,
  format: string,
): boolean {
  const marks = Editor.marks(editor);
  return marks ? (marks as Record<string, boolean>)[format] === true : false;
}

export function toggleMark(editor: BaseEditor & ReactEditor & HistoryEditor, format: string): void {
  if (isMarkActive(editor, format)) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
}

export function isBlockActive(
  editor: BaseEditor & ReactEditor & HistoryEditor,
  type: string,
): boolean {
  const [match] = Editor.nodes(editor, {
    match: (n) => SlateElement.isElement(n) && (n as CustomElement).type === type,
  });
  return !!match;
}

export function toggleBlock(
  editor: BaseEditor & ReactEditor & HistoryEditor,
  type: BlockType,
  wrap = false,
): void {
  const isActive = isBlockActive(editor, type);
  if (wrap) {
    Transforms.unwrapNodes(editor, {
      match: (n) => SlateElement.isElement(n) && ['ul', 'ol'].includes((n as CustomElement).type),
      split: true,
    });
    if (!isActive) {
      Transforms.wrapNodes(editor, { type, children: [] });
      Transforms.setNodes(editor, { type: 'li' });
    } else {
      Transforms.setNodes(editor, { type: 'p' });
    }
    return;
  }
  Transforms.setNodes(editor, { type: isActive ? 'p' : type });
}

function renderElement({
  attributes,
  children,
  element,
}: {
  attributes: Record<string, unknown>;
  children: React.ReactNode;
  element: CustomElement;
}) {
  switch (element.type) {
    case 'h2':
      return <h2 {...attributes}>{children}</h2>;
    case 'ul':
      return (
        <ul {...attributes} style={{ listStyleType: 'disc', paddingLeft: 24 }}>
          {children}
        </ul>
      );
    case 'ol':
      return (
        <ol {...attributes} style={{ listStyleType: 'decimal', paddingLeft: 24 }}>
          {children}
        </ol>
      );
    case 'li':
      return <li {...attributes}>{children}</li>;
    default:
      return <p {...attributes}>{children}</p>;
  }
}

function renderLeaf({
  attributes,
  children,
  leaf,
}: {
  attributes: Record<string, unknown>;
  children: React.ReactNode;
  leaf: CustomText;
}) {
  let content = children;
  if (leaf.bold) content = <strong>{content}</strong>;
  if (leaf.italic) content = <em>{content}</em>;
  if (leaf.underline) content = <u>{content}</u>;
  return <span {...attributes}>{content}</span>;
}

const EditorWrapper = styled(Box)`
  border: 1px solid rgba(0, 0, 0, 0.23);
  border-radius: 4px;
  &:focus-within {
    border-color: #1976d2;
    box-shadow: 0 0 0 2px rgba(25, 118, 210, 0.2);
  }
`;

const EditableArea = styled(Editable)`
  padding: 12px 16px;
  min-height: 200px;
  outline: none;
  font-family: inherit;
  font-size: 1rem;
  line-height: 1.6;
`;

interface RichTextEditorProps {
  value: string;
  onChange: (html: string) => void;
  error?: string;
}

export function RichTextEditor({ value, onChange, error }: RichTextEditorProps) {
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);

  // oxlint-disable-next-line react-hooks/exhaustive-deps -- intentional: editor initialises once
  const initialValue = useMemo(() => deserializeFromHtml(value) as Descendant[], []);
  const [editorValue, setEditorValue] = useState<Descendant[]>(initialValue);

  const handleChange = useCallback(
    (nodes: Descendant[]) => {
      setEditorValue(nodes);
      onChange(serializeToHtml(nodes));
    },
    [onChange],
  );

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      const isMod = event.ctrlKey || event.metaKey;
      if (!isMod) return;
      if (event.key === 'b') {
        event.preventDefault();
        toggleMark(editor, 'bold');
      }
      if (event.key === 'i') {
        event.preventDefault();
        toggleMark(editor, 'italic');
      }
      if (event.key === 'u') {
        event.preventDefault();
        toggleMark(editor, 'underline');
      }
    },
    [editor],
  );

  return (
    <SlateEditorContext.Provider value={editor}>
      <Slate editor={editor} initialValue={editorValue} onChange={handleChange}>
        <EditorWrapper>
          <EditorToolbar />
          <EditableArea
            renderElement={renderElement as never}
            renderLeaf={renderLeaf as never}
            onKeyDown={handleKeyDown}
            placeholder="Start writing…"
          />
        </EditorWrapper>
        {error && <FormHelperText error>{error}</FormHelperText>}
      </Slate>
    </SlateEditorContext.Provider>
  );
}
